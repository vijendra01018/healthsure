import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Emergency keywords detector for high-risk triage safety
const EMERGENCY_KEYWORDS = [
  'chest pain', 'crushing chest', 'heart attack', 'cannot breathe', 'difficulty breathing',
  'stroke', 'face drooping', 'slurred speech', 'vomiting blood', 'coughing blood',
  'unconscious', 'severe head trauma', 'anaphylaxis', 'poisoning', 'suicidal'
];

function checkUrgentSymptoms(text: string): boolean {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

// Curated verified educational responses for demo or fallback
const FALLBACK_KNOWLEDGE: Record<string, { en: string; te: string }> = {
  diabetes: {
    en: "The pancreas produces insulin, a hormone that permits body cells to absorb glucose from the bloodstream. In Type 1 diabetes, the immune system mistakenly targets insulin-producing beta cells. In Type 2 diabetes, cells become resistant to insulin or the pancreas produces insufficient amounts. Key diagnostic evaluations include Fasting Plasma Glucose and HbA1c (which reflects average blood sugar over 2–3 months). Always consult an endocrinologist or physician for individualized testing.",
    te: "క్లోమము (Pancreas) ఇన్సులిన్ అనే హార్మోన్‌ను ఉత్పత్తి చేస్తుంది, ఇది కణాలకు గ్లూకోజ్‌ను గ్రహించడంలో సహాయపడుతుంది. టైప్ 1 మరియు టైప్ 2 డయాబెటిస్ రక్తంలో చక్కెర నియంత్రణపై ప్రభావం చూపుతాయి. రక్త పరీక్షలు (HbA1c, Fasting Blood Sugar) ద్వారా ఆరోగ్య స్థితిని గమనించవచ్చు. ఖచ్చితమైన నిర్ధారణ మరియు చికిత్స కోసం వైద్యుడిని సంప్రదించండి."
  },
  pancreas: {
    en: "The pancreas is a dual-function vital organ located behind the stomach. Its exocrine function releases digestive enzymes (amylase, lipase, protease) into the duodenum, while its endocrine function regulates blood sugar through insulin and glucagon. Severe persistent upper abdominal pain radiating to the back accompanied by nausea requires prompt medical assessment to rule out acute pancreatitis.",
    te: "క్లోమం పొట్ట వెనుక భాగంలో ఉండే ముఖ్యమైన అవయవం. ఇది జీర్ణక్రియకు అవసరమైన ఎంజైమ్‌లు (లైపేస్, అమైలేస్) మరియు రక్తంలో చక్కెరను నియంత్రించే ఇన్సులిన్‌ను ఉత్పత్తి చేస్తుంది. తీవ్రమైన కడుపు నొప్పి మరియు వాంతులు ఉంటే వెంటనే వైద్యుడిని సంప్రదించాలి."
  },
  blood_donation: {
    en: "Voluntary blood donation saves lives daily. Whole blood donors typically follow an 84-day (12-week) recovery period, while platelet apheresis donors require around 14 days and plasma donors around 28 days. Blood group compatibility must always be cross-matched and verified by qualified transfusion specialists at authorized blood banks.",
    te: "స్వచ్ఛంద రక్తదానం ప్రాణాలను కాపాడుతుంది. సంపూర్ణ రక్తదానం చేసిన తర్వాత కనీసం 84 రోజుల విశ్రాంతి అవసరం. రక్త సమూహ సరిపోలికను మరియు ఆరోగ్య అర్హతను ధృవీకరించబడిన బ్లడ్ బ్యాంక్ నిపుణులు మాత్రమే నిర్ధారిస్తారు."
  },
  pcos: {
    en: "Polycystic Ovary Syndrome (PCOS) is a common endocrine and metabolic condition characterized by hormonal imbalances, irregular menstrual cycles, and multiple small follicles on the ovaries. Symptoms can include acne, hirsutism, and weight fluctuations. Diagnosis is based on comprehensive clinical criteria (like the Rotterdam criteria), pelvic ultrasound, and hormone panels.",
    te: "పిసిఒఎస్ (PCOS) అనేది హార్మోన్ల అసమతుల్యత వల్ల వచ్చే సాధారణ పరిస్థితి. ఇది ఋతుక్రమ సమస్యలు, మొటిమలు మరియు బరువు పెరగడానికి కారణం కావచ్చు. ఆరోగ్యకరమైన జీవనశైలి మరియు వైద్యుల మార్గదర్శకత్వంతో దీనిని నియంత్రించవచ్చు."
  }
};

// POST /api/chat: Educational Health Assistant
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'en', context = '' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message string is required' });
      return;
    }

    const isUrgent = checkUrgentSymptoms(message);

    // If API client is available, call gemini-3.8-flash
    if (aiClient && process.env.GEMINI_API_KEY) {
      try {
        const systemInstruction = `You are MediGuide AI Healthcare Educational Assistant. Tagline: "Better Health. Together."
You provide friendly, accurate, and accessible healthcare education in ${language === 'te' ? 'Telugu' : 'English'}.

CRITICAL MANDATORY SAFETY RULES:
1. You are an educational and health literacy assistant, NOT a doctor or autonomous diagnostic system.
2. NEVER diagnose conditions with certainty, never prescribe medicines, and never tell users to alter or stop medical treatments.
3. If the user presents any red-flag or urgent symptoms (such as crushing chest pain, sudden numbness/weakness, stroke signs, difficulty breathing, sudden severe abdominal pain, coughing blood), you MUST IMMEDIATELY and PROMINENTLY advise them to seek emergency services (e.g. dial 108/112 in India, 911 in the US) or visit the nearest emergency department right away.
4. Explain medical concepts in clear, easy-to-understand terms. Include what tests are commonly used and questions they can discuss with their qualified physician.
5. Emphasize that symptoms alone do not confirm conditions without clinical examination.`;

        const promptText = `User Query: "${message}"\n${context ? `Additional Context: ${context}` : ''}\nRespond in ${language === 'te' ? 'Telugu' : 'English'} with structured, compassionate, and educational guidance.`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: promptText,
          config: {
            systemInstruction,
          },
        });

        const reply = response.text || '';
        res.json({
          reply,
          isUrgent,
          source: 'gemini-ai',
          disclaimer: 'Educational guidance only. Always seek advice from a qualified medical doctor.'
        });
        return;
      } catch (err: any) {
        console.warn('Gemini API call failed, falling back to local medical engine:', err?.message || err);
      }
    }

    // High quality local educational fallback
    let reply = '';
    const lowerMsg = message.toLowerCase();

    if (isUrgent) {
      reply = language === 'te'
        ? "⚠️ అత్యవసర హెచ్చరిక: మీరు పేర్కొన్న లక్షణాలు (ఉదా: తీవ్రమైన ఛాతీ నొప్పి, శ్వాస తీసుకోవడంలో తీవ్ర ఇబ్బంది లేదా ఆకస్మిక బలహీనత) తక్షణ వైద్య సహాయం అవసరమైనవి కావచ్చు. దయచేసి వెంటనే అత్యవసర సేవలైన 108/112 కు కాల్ చేయండి లేదా సమీపంలోని అత్యవసర ఆసుపత్రికి వెళ్ళండి."
        : "⚠️ URGENT MEDICAL WARNING: The symptoms you described may indicate a medical emergency requiring immediate assessment. Please call emergency services (such as 108, 112, or 911) or proceed immediately to the nearest hospital emergency department.";
    } else if (lowerMsg.includes('pancreas') || lowerMsg.includes('pancreatitis') || lowerMsg.includes('lipase')) {
      reply = language === 'te' ? FALLBACK_KNOWLEDGE.pancreas.te : FALLBACK_KNOWLEDGE.pancreas.en;
    } else if (lowerMsg.includes('diabet') || lowerMsg.includes('sugar') || lowerMsg.includes('glucose') || lowerMsg.includes('hba1c')) {
      reply = language === 'te' ? FALLBACK_KNOWLEDGE.diabetes.te : FALLBACK_KNOWLEDGE.diabetes.en;
    } else if (lowerMsg.includes('blood') || lowerMsg.includes('donor') || lowerMsg.includes('platelet') || lowerMsg.includes('plasma')) {
      reply = language === 'te' ? FALLBACK_KNOWLEDGE.blood_donation.te : FALLBACK_KNOWLEDGE.blood_donation.en;
    } else if (lowerMsg.includes('period') || lowerMsg.includes('pcos') || lowerMsg.includes('women') || lowerMsg.includes('menstrual') || lowerMsg.includes('pregnancy')) {
      reply = language === 'te' ? FALLBACK_KNOWLEDGE.pcos.te : FALLBACK_KNOWLEDGE.pcos.en;
    } else {
      reply = language === 'te'
        ? `మెడిగైడ్ AI మీ ఆరోగ్య ప్రయాణంలో మార్గదర్శకత్వం అందిస్తుంది. "${message}" గురించి మరింత తెలుసుకోవడానికి మా హెల్త్ ఎడ్యుకేషన్ లైబ్రరీ లేదా హ్యూమన్ బాడీ ఎక్స్‌ప్లోరర్‌ను పరిశీలించండి. మీకు తీవ్రమైన లక్షణాలు ఉంటే అర్హత కలిగిన వైద్యుడిని సంప్రదించండి.`
        : `MediGuide AI is here to help you understand your health journey. In relation to "${message}", symptoms can originate from multiple physiological factors. We recommend exploring our interactive Human Body Explorer and Health Library, and consulting a healthcare provider for any persistent or concerning symptoms.`;
    }

    res.json({
      reply,
      isUrgent,
      source: 'verified-knowledge-engine',
      disclaimer: 'Educational guidance only. Not a medical diagnosis or prescription.'
    });
  } catch (error: any) {
    res.status(500).json({ error: 'Server error processing health assistant query' });
  }
});

// Setup Vite or static serving
async function bootstrap() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MediGuide AI server running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap().catch(console.error);
