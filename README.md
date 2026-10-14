# MediGuide AI — Better Health. Together.

MediGuide AI is a smart, visual, accessible healthcare education and assistance platform designed to empower individuals of all technical abilities with evidence-based health literacy.

Developed as a modern college project, MediGuide AI combines a futuristic DNA-inspired aesthetic (deep navy backgrounds, neon cyan/teal accents, glowing double-helix animations, and interactive anatomical visualizations) with an intuitive, friendly user interface.

> **Important Clinical & Ethical Disclaimer:**  
> MediGuide AI is an educational and health assistance platform, **not** an autonomous diagnostic or treatment system. It does not replace licensed medical professionals, confirm clinical diagnoses, or prescribe pharmaceuticals.

---

## Key Features & Modules

### 1. Interactive Human Body Explorer
- **Anterior (Front) & Posterior (Back) Views:** Interactive anatomical SVG with glowing interactive hotspots.
- **Organs Covered:** Brain & Nervous System, Heart & Circulation, Lungs & Respiratory, Digestive Tract, Liver & Kidneys, Pancreas & Metabolic Axis, Reproductive System, and Skeletal & Muscular Frame.
- **Detailed Clinical Breakdown:** Physiological function, common conditions, prevention & wellness strategies, and urgent warning signs.
- **Accessible Text-Based Alternative:** Complete screen-reader accessible linear directory mode conforming to WCAG AA.

### 2. Educational Health Assistant
- **5-Step Guided Questionnaire:** Primary body region, symptom description, onset duration, severity rating (Mild, Moderate, Severe), and immediate red-flag screening.
- **Urgent Red-Flag Detection:** Instant emergency notification and 108/112 ambulance referral for critical conditions (crushing chest pain, stroke symptoms, acute air hunger).
- **Interactive AI Healthcare Guide:** Server-side API endpoint (`/api/chat`) powered by Google Gemini (`gemini-3.8-flash`) with strict clinical guardrails and a verified fallback knowledge engine.

### 3. Women's Health & Hormonal Wellness
- **Menstrual Cycle Education:** Hormonal fluctuations across Menstrual, Follicular, Ovulation, and Luteal phases.
- **Optional Local Cycle Estimator:** Zero cloud transmission—all dates remain strictly on the user's local device (`localStorage`), with an instant "Delete My Data" feature.
- **PCOS vs Thyroid Dynamics:** Clear comparison of metabolic/androgen markers vs TSH/thyroid regulation.
- **Pregnancy Warning Signs:** Preeclampsia symptoms, fluid leakage, and when to seek urgent obstetric care.

### 4. Pancreas & Diabetes Health
- **Dual Function Architecture:** Exocrine digestive enzyme synthesis (Amylase, Lipase, Proteases) and Endocrine hormone regulation (Insulin, Glucagon).
- **Type 1 vs Type 2 Diabetes vs Pancreatitis:** Differences in pathophysiology, autoimmunity, and lifestyle management.
- **Diagnostic Tests Demystified:** What HbA1c, Fasting Blood Sugar, Serum Lipase/Amylase, and Abdominal Ultrasound/CT tell you—and what they *cannot* tell you.
- **Doctor Consultation Checklist:** Copyable questions to discuss with your physician or endocrinologist.

### 5. Smart Blood Donor Connect & Recovery Management
- **Voluntary Donor Registration:** Blood group, locality PIN code, notification consent, and voluntary status.
- **Verified Hospital Requests:** Sample clinical requests with blood components (PRBC, SDP platelets, FFP plasma) and urgency levels.
- **Scientific Recovery & Cooldown Engine:**
  - Whole Blood: **84-day cooldown** (12 weeks for iron store reconstitution).
  - Platelet Apheresis: **14-day cooldown**.
  - Plasma Apheresis: **28-day cooldown**.
- **Spam Suppression:** Routine notifications are automatically blocked during donor cooldown or when marked unavailable.
- **Blood Group Compatibility Matrix:** ABO and Rh(D) donor and recipient rules.

### 6. Organ, Eye & Stem Cell Donation
- **Solid Organs, Cornea Eye Banking, Tissues, and Stem Cells:** Detailed timings and procedures.
- **Myth vs Fact Buster:** Debunking common misconceptions about emergency medical care, age limits, and religious acceptance.
- **Official Registry Referrals:** Links to NOTTO (National Organ & Tissue Transplant Organisation), Jeevandan, and DATRI.
- **Family Discussion Pledge Simulator:** Digital intent card to facilitate discussions with next-of-kin.

### 7. Health Education Library
- Categorized evidence-based articles with reading times, key facts, warning signs, and reputable citations (WHO, ICMR, CDC, ACOG).
- Bilingual support in **English** and **Telugu (తెలుగు)**.

### 8. Find Hospitals, Blood Banks & 24/7 Trauma Centers
- Searchable directory by city, PIN code, or service type.
- Instant emergency dialers for 108 Ambulance, 112 Unified Helpline, and 181 Women's Helpline.

---

## Technical Architecture & Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons.
- **Interactive Visuals:** 60fps HTML5 Canvas 3D mathematical projection of DNA double helix (`DnaCanvas.tsx`), custom SVG anatomical body explorer with pulsing hotspots.
- **Backend:** Express full-stack server (`server.ts`) integrating Vite middlewares in development.
- **AI Integration:** Google GenAI SDK (`@google/genai`) using model `gemini-3.8-flash` on the server-side with local knowledge fallback.
- **Accessibility:** Text scaling (`Default`, `Large`, `Extra Large`), high-contrast toggle, WCAG AA compliance, and screen-reader alternatives.

---

## Running the Project

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation & Startup
```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

### Environment Variables (Optional)
Configure in `.env`:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
PORT=3000
```
*Note: If `GEMINI_API_KEY` is not provided, MediGuide AI automatically uses its comprehensive verified clinical knowledge engine for all educational inquiries.*
