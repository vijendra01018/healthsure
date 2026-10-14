import { HealthArticle } from '../types/health';

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'art-pancreas-diabetes',
    title: {
      en: 'Understanding Pancreatic Health, Insulin & Diabetes',
      te: 'క్లోమం ఆరోగ్యం, ఇన్సులిన్ మరియు మధుమేహం గురించి అవగాహన'
    },
    category: 'diabetes_pancreas',
    summary: {
      en: 'The pancreas is essential for nutrient digestion and blood glucose regulation. Explore how beta cells synthesize insulin, how metabolic resistance develops, and which lab tests matter.',
      te: 'శరీరంలో చక్కెర స్థాయిలను నియంత్రించడంలో మరియు జీర్ణక్రియలో క్లోమం పాత్ర చాలా కీలకం. ఇన్సులిన్ పనితీరు మరియు డయాబెటిస్ గురించి వివరంగా తెలుసుకోండి.'
    },
    keyFacts: {
      en: [
        'Insulin acts as a biochemical molecular key that opens cell membranes to let glucose in for cellular energy production.',
        'Type 1 diabetes is an autoimmune condition requiring lifelong exogenous insulin administration.',
        'Type 2 diabetes develops progressively through cellular insulin resistance coupled with relative secretory deficiency.',
        'HbA1c measures the percentage of glycated hemoglobin, reflecting average glycemic control over the past 60 to 90 days.',
        'Lipase and amylase enzyme levels in blood spike dramatically during acute inflammation of the pancreas (pancreatitis).'
      ],
      te: [
        'రక్తంలోని గ్లూకోజ్ కణాల లోపలికి చేరడానికి ఇన్సులిన్ ఒక తాళం చెవిలా పనిచేస్తుంది.',
        'టైప్ 1 డయాబెటిస్ ఆటో ఇమ్యూన్ సమస్య వల్ల వస్తుంది, దీనికి క్రమం తప్పకుండా ఇన్సులిన్ అవసరం.',
        'టైప్ 2 డయాబెటిస్ ప్రధానంగా శరీర కణాలు ఇన్సులిన్‌కు సరైన రీతిలో స్పందించకపోవడం వల్ల వస్తుంది.',
        'HbA1c రక్త పరీక్ష గత 3 నెలల సగటు చక్కెర స్థాయిలను స్పష్టంగా తెలియజేస్తుంది.',
        'క్లోమశోథ (ప్యాంక్రియాటైటిస్) వచ్చినప్పుడు లైపేస్ మరియు అమైలేస్ ఎంజైమ్‌లు రక్తంలో తీవ్రంగా పెరుగుతాయి.'
      ]
    },
    warningSigns: {
      en: [
        'Persistent burning or gnawing upper abdominal pain radiating straight through to your back.',
        'Unexplained rapid weight loss accompanied by excessive thirst (polydipsia) and frequent nocturnal urination (polyuria).',
        'Fruity-smelling breath, rapid breathing, and severe nausea (possible Diabetic Ketoacidosis).'
      ],
      te: [
        'కడుపు పైభాగంలో ప్రారంభమై వీపు వెనుకకు వ్యాపించే తీవ్రమైన కడుపు నొప్పి.',
        'అతిదాహం, తరచుగా మూత్రవిసర్జన మరియు అకారణంగా బరువు తగ్గడం.',
        'నోటి నుండి పండ్ల వాసన రావడం, వికారం మరియు విపరీతమైన అలసట.'
      ]
    },
    references: [
      'World Health Organization (WHO) Global Report on Diabetes',
      'American Diabetes Association (ADA) Standards of Medical Care in Diabetes 2024',
      'Indian Council of Medical Research (ICMR) Guidelines for Management of Type 2 Diabetes'
    ],
    reviewedBy: 'Dr. V. Ramanathan, MD (Endocrinology), Apollo Hospitals & ICMR Fellow',
    reviewDate: '2024-11-15',
    readTime: '6 min read'
  },
  {
    id: 'art-womens-health',
    title: {
      en: "Women's Hormonal Health: Menstrual Cycle, PCOS & Thyroid Balance",
      te: 'మహిళల హార్మోన్ల ఆరోగ్యం: ఋతుచక్రం, పిసిఒఎస్ (PCOS) మరియు థైరాయిడ్'
    },
    category: 'women',
    summary: {
      en: 'A respectful guide to female reproductive endocrinology, distinguishing typical cycle variations from conditions like PCOS and thyroid dysfunction, and recognizing critical pregnancy warning signs.',
      te: 'మహిళల ఋతుక్రమ చక్రం, హార్మోన్ల మార్పులు, పిసిఒఎస్ మరియు గర్భధారణ సమయంలో తప్పక గమనించవలసిన కీలక హెచ్చరిక సంకేతాలపై సమగ్ర మార్గదర్శి.'
    },
    keyFacts: {
      en: [
        'A normal menstrual cycle ranges between 21 and 35 days, counted from the first day of menses to the first day of the next period.',
        'Polycystic Ovary Syndrome (PCOS) involves hormonal irregularities, often with elevated androgens and insulin resistance.',
        'Hypothyroidism (underactive thyroid) can cause prolonged, heavier bleeding, whereas hyperthyroidism often leads to scanty or missed periods.',
        'Lifestyle modifications including low-glycemic nutrition, strength training, and stress regulation directly improve ovulatory regularity.'
      ],
      te: [
        'సాధారణ ఋతుచక్రం 21 నుండి 35 రోజుల వ్యవధిలో ఉంటుంది.',
        'పిసిఒఎస్ అనేది హార్మోన్ల అసమతుల్యత వల్ల వచ్చే సమస్య, ఇది క్రమం తప్పిన పీరియడ్స్‌కు కారణమవుతుంది.',
        'థైరాయిడ్ సమస్యలు కూడా ఋతుక్రమం హెచ్చుతగ్గులకు ప్రధాన కారణం కావచ్చు.',
        'ఆరోగ్యకరమైన ఆహారం, వ్యాయామం మరియు ఒత్తిడిని తగ్గించుకోవడం ద్వారా హార్మోన్లను సమతుల్యంగా ఉంచుకోవచ్చు.'
      ]
    },
    warningSigns: {
      en: [
        'During pregnancy: Severe persistent headache, blurred vision, or upper right abdominal pain (signs of preeclampsia).',
        'Severe acute one-sided pelvic pain with dizziness or shoulder-tip pain (possible ectopic pregnancy emergency).',
        'Bleeding that saturates two or more maxi pads per hour for more than two consecutive hours.'
      ],
      te: [
        'గర్భధారణ సమయంలో: తీవ్రమైన తలనొప్పి, కంటి చూపు మందగించడం, లేదా కుడి పక్కన కడుపు నొప్పి (ప్రీక్లాంప్సియా లక్షణాలు).',
        'కడుపులో ఒక వైపు భరించలేని తీవ్రమైన నొప్పి మరియు తలతిరగడం.',
        'గంటకు రెండు కంటే ఎక్కువ ప్యాడ్లు తడిసిపోయేంత తీవ్రమైన రక్తస్రావం.'
      ]
    },
    references: [
      'American College of Obstetricians and Gynecologists (ACOG) Clinical Practice Guidelines',
      'The Rotterdam ESHRE/ASRM-Sponsored PCOS Consensus Workshop Group',
      'Federation of Obstetric and Gynaecological Societies of India (FOGSI)'
    ],
    reviewedBy: 'Dr. Sunita Rao, MS (OB/GYN), Fellow of Royal College of Obstetricians (FRCOG)',
    reviewDate: '2024-10-20',
    readTime: '7 min read'
  },
  {
    id: 'art-blood-donor-science',
    title: {
      en: 'Blood & Component Donation: Safety, Recovery & Eligibility',
      te: 'రక్తదానం మరియు భాగాల దానం: భద్రత, రికవరీ మరియు అర్హతలు'
    },
    category: 'donation',
    summary: {
      en: 'Learn how whole blood, platelets, and plasma donations save lives, why scientific recovery cooldowns protect donor wellness, and how compatibility is confirmed by blood banks.',
      te: 'రక్తదానం, ప్లేట్‌లెట్స్ మరియు ప్లాస్మా దానం ప్రాణాలను ఎలా కాపాడుతాయి? రక్తదానం తర్వాత శరీరం కోలుకోవడానికి విశ్రాంతి ఎందుకు అవసరమో తెలుసుకోండి.'
    },
    keyFacts: {
      en: [
        'A single whole blood donation provides red cells, plasma, and cryoprecipitate that can help up to three different patients.',
        'Whole blood donors must observe a minimum recovery period of 84 days (12 weeks for males, 16 weeks for females in many guidelines) for iron stores (ferritin) to replenish.',
        'Platelet apheresis donors can donate more frequently (every 14 days) because red blood cells are returned to the body.',
        'Blood type matching is based on ABO and Rh(D) antigens; O- is the universal red cell donor, while AB+ is the universal plasma donor.'
      ],
      te: [
        'ఒక్కసారి చేసే సంపూర్ణ రక్తదానం ముగ్గురి ప్రాణాలను కాపాడగలదు.',
        'సంపూర్ణ రక్తదానం చేసిన తర్వాత శరీరంలో ఐరన్ స్థాయిలు తిరిగి పెరగడానికి కనీసం 84 రోజుల విశ్రాంతి అవసరం.',
        'ప్లేట్‌లెట్స్ దానం చేసినవారు ప్రతి 14 రోజులకు ఒకసారి దానం చేయవచ్చు, ఎందుకంటే ఎర్ర రక్త కణాలు తిరిగి శరీరంలోకి చేరుతాయి.',
        'O- నెగటివ్ రక్తం అందరికీ సరిపడే యూనివర్సల్ దాతగా మరియు AB+ ప్లాస్మా యూనివర్సల్ దాతగా గుర్తింపు పొందాయి.'
      ]
    },
    warningSigns: {
      en: [
        'Post-donation lightheadedness or fainting: Sit or lie down immediately with legs elevated; hydrate generously.',
        'Swelling or expanding hematoma at the puncture site: Apply gentle cold compression and elevate the arm.',
        'Never donate blood if experiencing fever, active infection, or feeling unwell on the donation day.'
      ],
      te: [
        'రక్తదానం తర్వాత తలతిరగడం లేదా నీరసం అనిపిస్తే వెంటనే కాళ్ళు పైకి పెట్టి విశ్రాంతి తీసుకోండి.',
        'సూది వేసిన చోట వాపు లేదా రక్తపు గడ్డ కనిపిస్తే చల్లటి ఐస్ కాపడం పెట్టండి.',
        'జ్వరం, ఇన్ఫెక్షన్ లేదా నీరసంగా ఉన్నప్పుడు రక్తదానం చేయకూడదు.'
      ]
    },
    references: [
      'National Blood Transfusion Council (NBTC) India Guidelines',
      'World Health Organization (WHO) Blood Donor Selection Guidelines',
      'AABB (Association for the Advancement of Blood & Biotherapies) Standards'
    ],
    reviewedBy: 'Dr. K. Pradeep, MD (Transfusion Medicine & Immunohematology)',
    reviewDate: '2024-09-12',
    readTime: '5 min read'
  },
  {
    id: 'art-organ-tissue-donation',
    title: {
      en: 'Organ, Tissue & Stem Cell Donation: Myths vs Facts',
      te: 'అవయవ, కణజాల మరియు మూలకణ (స్టెమ్ సెల్) దానం: వాస్తవాలు'
    },
    category: 'donation',
    summary: {
      en: 'Demystifying deceased organ donation, living kidney/liver donation, cornea eye banking, and HLA stem cell matching through legal and ethical frameworks.',
      te: 'అవయవ దానం, కంటి దానం మరియు ఎముక మజ్జ మూలకణాల దానం గురించిన అపోహలు మరియు సరైన చట్టపరమైన సమాచారం.'
    },
    keyFacts: {
      en: [
        'Deceased organ donation occurs following certified Brain Death, verified through independent neurological tests by a statutory medical board.',
        'A single deceased donor can save up to eight lives and restore vision/mobility for over fifty individuals through tissues.',
        'Corneal eye donation must occur within 6 hours of cardiac death to successfully preserve ocular endothelial clarity.',
        'Official organ allocation is strictly governed by national registries (such as NOTTO) based on medical urgency and compatibility, never wealth or fame.'
      ],
      te: [
        'మెదడు మరణం (బ్రెయిన్ డెత్) సంభవించినప్పుడు వైద్య బృందం ధృవీకరించిన తర్వాతే అవయవ దానం సాధ్యమవుతుంది.',
        'ఒక్క అవయవ దాత గరిష్టంగా 8 మంది ప్రాణాలను కాపాడగలరు మరియు కంటి కార్నియా ద్వారా చూపును ఇవ్వగలరు.',
        'గుండె ఆగిన 6 గంటల లోపు కంటి కార్నియాను సేకరించడం అత్యంత ముఖ్యం.',
        'అవయవాల కేటాయింపు ప్రభుత్వం యొక్క అధికారిక రిజిస్ట్రీ (NOTTO) ద్వారా మాత్రమే అత్యవసర ప్రాతిపదికన జరుగుతుంది.'
      ]
    },
    warningSigns: {
      en: [
        'Commercial trade, brokering, or monetary compensation for organ donation is strictly illegal and punishable under the Transplantation of Human Organs and Tissues Act.',
        'Living donation involves rigorous physical and psychological evaluation to protect the living donor at every stage.'
      ],
      te: [
        'అవయవాల క్రయవిక్రయాలు చట్టవిరుద్ధం మరియు శిక్షార్హం.',
        'జీవించి ఉన్నప్పుడు అవయవ దానం చేయడానికి దాత యొక్క సంపూర్ణ శారీరక మరియు మానసిక ఆరోగ్యాన్ని క్షుణ్ణంగా పరీక్షిస్తారు.'
      ]
    },
    references: [
      'National Organ & Tissue Transplant Organisation (NOTTO), MoHFW Government of India',
      'The Transplantation of Human Organs and Tissues Act (THOTA)',
      'Organ Procurement and Transplantation Network (OPTN) Global Registry'
    ],
    reviewedBy: 'Dr. Meenakshi Sunder, MS, MCh (Surgical Transplantation)',
    reviewDate: '2024-10-05',
    readTime: '6 min read'
  },
  {
    id: 'art-medical-tests-explained',
    title: {
      en: 'Demystifying Medical Tests: CBC, HbA1c, Lipase, Ultrasound & CT',
      te: 'వైద్య పరీక్షల వివరణ: CBC, HbA1c, లైపేస్, అల్ట్రాసౌండ్ & CT స్కాన్'
    },
    category: 'tests',
    summary: {
      en: 'A clear guide explaining what routine laboratory and diagnostic imaging tests evaluate, what reference ranges mean, and what tests cannot tell you.',
      te: 'రక్త పరీక్షలు మరియు స్కానింగ్ పరీక్షలు ఏమి సూచిస్తాయి, సాధారణ రీడింగ్‌లు మరియు వాటి పరిమితులపై సరళమైన అవగాహన.'
    },
    keyFacts: {
      en: [
        'Complete Blood Count (CBC) examines red blood cells (oxygen delivery), white blood cells (immune defense), and platelets (clotting).',
        'Fasting Blood Sugar checks baseline glucose after 8–10 hours of overnight fasting; normal is under 100 mg/dL.',
        'Serum Lipase is the most sensitive biomarker for acute pancreatic injury, remaining elevated longer than amylase.',
        'Ultrasound uses sound waves without ionizing radiation, making it ideal for gallbladder stones, kidneys, and obstetrics.',
        'A diagnostic test result is never an isolated diagnosis; it must always be interpreted in context with clinical symptoms by your physician.'
      ],
      te: [
        'కంప్లీట్ బ్లడ్ కౌంట్ (CBC) రక్త కణాల సంఖ్య మరియు రోగనిరోధక శక్తిని తెలుపుతుంది.',
        'ఫాస్టింగ్ బ్లడ్ షుగర్ 8 గంటల ఖాళీ కడుపుతో చేసినప్పుడు 100 mg/dL కంటే తక్కువ ఉండాలి.',
        'క్లోమం వాపును గుర్తించడానికి లైపేస్ రక్త పరీక్ష అత్యంత ఖచ్చితమైనది.',
        'అల్ట్రాసౌండ్ పరీక్షలో ఎలాంటి రేడియేషన్ ఉండదు, ఇది గర్భస్థ శిశువు మరియు పొట్ట భాగాల పరీక్షకు సురక్షితమైనది.',
        'రిపోర్టులోని సంఖ్యలను కేవలం డాక్టర్ మాత్రమే మీ శారీరక లక్షణాలతో సరిపోల్చి నిర్ధారించాలి.'
      ]
    },
    warningSigns: {
      en: [
        'Never alter prescribed medications based solely on an at-home test kit without clinician verification.',
        'Significantly abnormal critical values (e.g. potassium above 6.0 mEq/L or hemoglobin below 7.0 g/dL) require emergency clinical intervention.'
      ],
      te: [
        'డాక్టర్ సలహా లేకుండా కేవలం లాబ్ రిపోర్టులు చూసి మందుల మోతాదును మార్చకూడదు.',
        'చాలా తక్కువ హిమోగ్లోబిన్ లేదా తీవ్రమైన మార్పులు ఉన్నప్పుడు తక్షణమే ఆసుపత్రికి వెళ్ళాలి.'
      ]
    },
    references: [
      'Cleveland Clinic Clinical Laboratory Guide',
      'Mayo Clinic Patient Diagnostics Overview',
      'All India Institute of Medical Sciences (AIIMS) Pathology Standards'
    ],
    reviewedBy: 'Dr. Anand Joshi, MD (Pathology & Laboratory Medicine)',
    reviewDate: '2024-12-01',
    readTime: '6 min read'
  },
  {
    id: 'art-first-aid-urgency',
    title: {
      en: 'First Aid Education & Recognizing Critical Emergency Red Flags',
      te: 'ప్రథమ చికిత్స విద్య మరియు అత్యవసర హెచ్చరికలను గుర్తించడం'
    },
    category: 'first_aid',
    summary: {
      en: 'Essential life-saving first-aid principles: Hands-only CPR, recovery positions, severe burn care, and knowing exactly when to call 108 / 112 emergency services.',
      te: 'జీవితాన్ని రక్షించే ప్రాథమిక ప్రథమ చికిత్స సూత్రాలు: సిపిఆర్ (CPR), కాలిన గాయాల సంరక్షణ మరియు అత్యవసర సేవల సమన్వయం.'
    },
    keyFacts: {
      en: [
        'Hands-only CPR involves pushing hard and fast in the center of the chest at 100–120 beats per minute (to the rhythm of "Stayin Alive").',
        'For choking in adults: Alternate five back blows with five abdominal thrusts (Heimlich maneuver).',
        'For minor burns: Cool under gentle running tap water for 15–20 minutes; never apply ice, butter, or toothpastes.',
        'The recovery position keeps the airway clear in an unconscious person who is breathing normally.'
      ],
      te: [
        'సిపిఆర్ (CPR) చేసేటప్పుడు ఛాతీ మధ్యలో నిమిషానికి 100 నుండి 120 సార్లు వేగంగా మరియు బలంగా నొక్కాలి.',
        'గొంతులో ఆహారం అడ్డం పడినప్పుడు వీపుపై 5 సార్లు తట్టడం మరియు పొట్ట వద్ద నొక్కడం చేయాలి.',
        'కాలిన గాయాలపై సాధారణ చల్లటి నీటిని 15 నిమిషాల పాటు పోయాలి; పేస్ట్ లేదా నూనెలు రాయకూడదు.',
        'స్పృహ లేని వ్యక్తి ఊపిరి తీసుకుంటుంటే వారిని ఒకవైపునకు ఒత్తిగిల పడుకోబెట్టాలి.'
      ]
    },
    warningSigns: {
      en: [
        'Call 108 / 112 immediately for: Unresponsiveness, absent breathing, severe arterial bleeding, anaphylactic throat swelling, or sudden paralysis.'
      ],
      te: [
        'స్పృహ కోల్పోవడం, ఊపిరి ఆడకపోవడం, తీవ్రమైన రక్తస్రావం లేదా పెదవులు ఉబ్బడం లాంటి సమయాల్లో వెంటనే 108 కి కాల్ చేయండి.'
      ]
    },
    references: [
      'American Heart Association (AHA) CPR & ECC Guidelines',
      'Red Cross International First Aid Guidelines',
      'Ministry of Health and Family Welfare (MoHFW) India Emergency Medicine Protocol'
    ],
    reviewedBy: 'Dr. R. Shalini, MBBS, MD (Emergency Medicine)',
    reviewDate: '2024-11-28',
    readTime: '5 min read'
  }
];
