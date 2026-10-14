import { OrganInfo } from '../types/health';

export const ORGANS_DATA: OrganInfo[] = [
  {
    id: 'brain',
    name: { en: 'Brain & Nervous System', te: 'మెదడు మరియు నాడీ వ్యవస్థ' },
    system: 'Nervous System',
    location: {
      en: 'Protected within the cranial cavity of the skull.',
      te: 'పుర్రె లోపలి భాగంలో రక్షించబడి ఉంటుంది.'
    },
    function: {
      en: 'Serves as the central command center for cognition, memory, motor function, involuntary reflexes, sensory perception, and regulation of vital homeostatic functions.',
      te: 'ఆలోచన, జ్ఞాపకశక్తి, కదలికలు, ఇంద్రియ అనుభూతులు మరియు శారీరక సమతుల్యతను నియంత్రించే కేంద్రం.'
    },
    commonConditions: {
      en: ['Tension and Migraine Headaches', 'Sleep Disorders & Insomnia', 'Stroke (Ischemic/Hemorrhagic)', 'Neuropathy', 'Concussion'],
      te: ['మైగ్రేన్ మరియు తలనొప్పి', 'నిద్రలేమి సమస్యలు', 'పక్షవాతం (స్ట్రోక్)', 'నరాల బలహీనత', 'మెదడు గాయాలు']
    },
    prevention: {
      en: [
        'Get 7–8 hours of quality sleep nightly to facilitate glymphatic waste clearance.',
        'Engage in regular aerobic exercise to support neuroplasticity and blood flow.',
        'Manage chronic stress through mindfulness or progressive relaxation.',
        'Wear protective helmets during sports and motorcycling.'
      ],
      te: [
        'రోజుకు 7-8 గంటలు మంచి నిద్రపోవడం.',
        'క్రమం తప్పకుండా నడక లేదా వ్యాయామం చేయడం.',
        'ఒత్తిడిని అదుపులో ఉంచుకోవడం.',
        'బైక్ నడిపేటప్పుడు హెల్మెట్ ధరించడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'FAST Stroke signs: Facial drooping, Arm weakness, Slurred speech.',
        'Sudden, excruciating "thunderclap" headache unlike any prior pain.',
        'Sudden loss of vision, balance, or coordination.',
        'Confusion or loss of consciousness following head trauma.'
      ],
      te: [
        'ముఖం ఒక వైపునకు వంగిపోవడం, చేయి లేదా కాలు బలహీనపడటం, మాట తడబడటం (స్ట్రోక్ లక్షణాలు).',
        'హఠాత్తుగా వచ్చే తీవ్రమైన తలనొప్పి.',
        'కంటి చూపు లేదా సమతుల్యత హఠాత్తుగా కోల్పోవడం.',
        'తల దెబ్బతిన్న తర్వాత స్పృహ కోల్పోవడం.'
      ]
    },
    relatedArticleId: 'art-brain-health',
    coordinates: {
      front: { cx: 200, cy: 65, r: 24 },
      back: { cx: 200, cy: 65, r: 24 }
    }
  },
  {
    id: 'heart',
    name: { en: 'Heart & Circulatory System', te: 'గుండె మరియు రక్త ప్రసరణ వ్యవస్థ' },
    system: 'Cardiovascular System',
    location: {
      en: 'Located in the middle thoracic cavity (mediastinum), slightly to the left of the sternum.',
      te: 'ఛాతీ మధ్య భాగంలో, రొమ్ము ఎముకకు కొద్దిగా ఎడమవైపున ఉంటుంది.'
    },
    function: {
      en: 'Muscular pump that circulates oxygen- and nutrient-rich blood throughout the body while returning deoxygenated blood to the lungs.',
      te: 'శరీరంలోని అన్ని భాగాలకు ఆక్సిజన్ మరియు పోషకాలతో కూడిన రక్తాన్ని పంపింగ్ చేసే కీలక కండర అవయవం.'
    },
    commonConditions: {
      en: ['Coronary Artery Disease', 'Hypertension (High Blood Pressure)', 'Arrhythmias (Irregular Heartbeat)', 'Heart Failure'],
      te: ['గుండె ధమనుల సమస్యలు', 'అధిక రక్తపోటు (బి.పి)', 'గుండె లయ తప్పడం (అరిథ్మియా)', 'గుండె వైఫల్యం']
    },
    prevention: {
      en: [
        'Maintain a heart-healthy diet low in saturated fats and refined sodium.',
        'Aim for at least 150 minutes of moderate aerobic activity weekly.',
        'Monitor blood pressure, blood glucose, and lipid profiles periodically.',
        'Avoid tobacco use and limit alcohol intake.'
      ],
      te: [
        'ఉప్పు, నూనె తక్కువగా ఉండే సమతుల్య ఆహారం తీసుకోవడం.',
        'వారానికి కనీసం 150 నిమిషాలు నడక లేదా వ్యాయామం చేయడం.',
        'రక్తపోటు మరియు కొలెస్ట్రాల్‌ను క్రమం తప్పకుండా పరీక్షించుకోవడం.',
        'ధూమపానం మరియు మద్యపానానికి దూరంగా ఉండటం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Crushing chest pressure, tightness, or squeezing pain.',
        'Pain radiating to the left arm, jaw, neck, or back.',
        'Shortness of breath accompanied by cold sweats and dizziness.',
        'Rapid, irregular heart palpitations with lightheadedness.'
      ],
      te: [
        'ఛాతీలో తీవ్రమైన ఒత్తిడి లేదా నొప్పి.',
        'నొప్పి ఎడమ చేయి, దవడ లేదా వీపు వైపు వ్యాపించడం.',
        'చల్లని చెమటలు మరియు తలతిరగడంతో పాటు శ్వాస ఆడకపోవడం.',
        'గుండె వేగంగా లేదా అసాధారణంగా కొట్టుకోవడం.'
      ]
    },
    relatedArticleId: 'art-heart-care',
    coordinates: {
      front: { cx: 215, cy: 155, r: 20 },
      back: { cx: 210, cy: 155, r: 18 }
    }
  },
  {
    id: 'lungs',
    name: { en: 'Lungs & Respiratory System', te: 'ఊపిరితిత్తులు మరియు శ్వాసకోశ వ్యవస్థ' },
    system: 'Respiratory System',
    location: {
      en: 'Flanking both sides of the heart within the ribcage.',
      te: 'ఛాతీ పక్కటెముకల లోపల గుండెకు ఇరువైపులా ఉంటాయి.'
    },
    function: {
      en: 'Facilitates gas exchange by bringing inhaled oxygen into capillaries and expelling metabolic carbon dioxide through exhaled air.',
      te: 'పీల్చుకున్న గాలి నుండి ఆక్సిజన్‌ను రక్తంలోకి చేర్చి, కార్బన్ డయాక్సైడ్‌ను బయటకు పంపే శ్వాసక్రియను నిర్వహిస్తాయి.'
    },
    commonConditions: {
      en: ['Asthma', 'Chronic Obstructive Pulmonary Disease (COPD)', 'Pneumonia', 'Bronchitis', 'Allergic Rhinitis'],
      te: ['ఆస్తమా', 'దీర్ఘకాలిక ఊపిరితిత్తుల వ్యాధి (COPD)', 'న్యుమోనియా', 'శ్వాసకోశ ఇన్ఫెక్షన్లు', 'అలెర్జీలు']
    },
    prevention: {
      en: [
        'Avoid direct exposure to tobacco smoke, biomass smoke, and industrial particulates.',
        'Practice deep diaphragmatic breathing exercises.',
        'Ensure proper indoor air ventilation and consider HEPA air purification.',
        'Stay up to date with seasonal influenza and pneumococcal immunizations as recommended.'
      ],
      te: [
        'ధూమపానం మరియు కాలుష్య వాతావరణానికి దూరంగా ఉండటం.',
        'ప్రాణాయామం మరియు లోతైన శ్వాస వ్యాయామాలు చేయడం.',
        'ఇంటిలో గాలి ప్రసరణ బాగుండేలా చూసుకోవడం.',
        'వైద్యుల సలహా మేరకు తగిన టీకాలు తీసుకోవడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Severe acute struggle to breathe or gasping for air.',
        'Bluish or grayish tint to lips, tongue, or nail beds (cyanosis).',
        'Coughing up noticeable amounts of blood (hemoptysis).',
        'Inability to speak in full sentences due to air hunger.'
      ],
      te: [
        'శ్వాస తీసుకోవడంలో తీవ్రమైన ఇబ్బంది లేదా ఆయాసం.',
        'పెదవులు లేదా గోళ్లు నీలం రంగులోకి మారడం.',
        'దగ్గుతో పాటు రక్తం పడటం.',
        'ఆయాసం వల్ల మాట్లాడలేకపోవడం.'
      ]
    },
    relatedArticleId: 'art-respiratory-health',
    coordinates: {
      front: { cx: 180, cy: 150, r: 22 },
      back: { cx: 180, cy: 150, r: 22 }
    }
  },
  {
    id: 'pancreas',
    name: { en: 'Pancreas & Metabolic Axis', te: 'క్లోమము మరియు జీవక్రియ వ్యవస్థ' },
    system: 'Endocrine & Digestive Systems',
    location: {
      en: 'Transversely situated across the posterior abdominal wall, deep behind the stomach.',
      te: 'పొట్ట వెనుక భాగంలో అడ్డంగా అమరి ఉంటుంది.'
    },
    function: {
      en: 'Dual-action gland: Exocrine cells secrete digestive enzymes (lipase, amylase, proteases) into the duodenum; Endocrine Islets of Langerhans synthesize insulin and glucagon to govern blood glucose.',
      te: 'ఇది జీర్ణక్రియకు అవసరమైన ఎంజైమ్‌లు మరియు రక్తంలో గ్లూకోజ్ స్థాయిలను నియంత్రించే ఇన్సులిన్, గ్లూకాగాన్ హార్మోన్లను ఉత్పత్తి చేస్తుంది.'
    },
    commonConditions: {
      en: ['Type 1 and Type 2 Diabetes Mellitus', 'Acute and Chronic Pancreatitis', 'Exocrine Pancreatic Insufficiency (EPI)', 'Pancreatic Cysts'],
      te: ['టైప్ 1 మరియు టైప్ 2 డయాబెటిస్', 'క్లోమశోథ (ప్యాంక్రియాటైటిస్)', 'ఎంజైమ్ లోపం', 'సిస్టులు']
    },
    prevention: {
      en: [
        'Maintain balanced nutritional intake rich in dietary fiber and complex carbohydrates.',
        'Avoid high binge alcohol consumption and heavy saturated fats.',
        'Engage in regular physical activity to preserve insulin sensitivity.',
        'Screen annual HbA1c and fasting blood sugar levels regularly.'
      ],
      te: [
        'పీచు పదార్థాలు ఎక్కువగా ఉండే సమతుల్య ఆహారం తీసుకోవడం.',
        'అధిక మద్యపానం మరియు అధిక కొవ్వు పదార్థాలకు దూరంగా ఉండటం.',
        'క్రమం తప్పకుండా నడక ద్వారా ఇన్సులిన్ సామర్థ్యాన్ని పెంచుకోవడం.',
        'సంవత్సరానికి ఒకసారి రక్తంలో చక్కెర పరీక్షలు (HbA1c) చేయించుకోవడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Sudden, severe, unyielding upper abdominal pain that shoots through to the back.',
        'Abdominal pain accompanied by repeated vomiting, fever, and rapid pulse.',
        'Extremely high or low blood sugar with confusion, fruity breath odor, or collapse.'
      ],
      te: [
        'కడుపు పైభాగంలో తీవ్రమైన నొప్పి వీపు వైపు వ్యాపించడం.',
        'తీవ్రమైన కడుపు నొప్పితో పాటు వాంతులు, జ్వరం రావడం.',
        'రక్తంలో చక్కెర స్థాయిలు తీవ్రంగా హెచ్చుతగ్గులు కావడం, స్పృహ తగ్గడం.'
      ]
    },
    relatedArticleId: 'art-pancreas-diabetes',
    coordinates: {
      front: { cx: 200, cy: 205, r: 16 },
      back: { cx: 200, cy: 205, r: 16 }
    }
  },
  {
    id: 'liver_kidneys',
    name: { en: 'Liver, Gallbladder & Kidneys', te: 'కాలేయం మరియు మూత్రపిండాలు' },
    system: 'Metabolic & Excretory System',
    location: {
      en: 'Liver occupies the right upper abdominal quadrant; kidneys are situated retroperitoneally on either side of the lumbar spine.',
      te: 'కాలేయం పొట్ట కుడి పైభాగంలో, మూత్రపిండాలు వెన్నెముకకు ఇరువైపులా వెనుక భాగంలో ఉంటాయి.'
    },
    function: {
      en: 'The liver detoxifies chemicals, metabolizes drugs, and secretes bile. The kidneys continuously filter metabolic waste, balance electrolyte concentrations, and regulate blood volume and pressure.',
      te: 'కాలేయం శరీరంలోని విషపదార్థాలను శుభ్రపరచి పిత్తరసాన్ని విడుదల చేస్తుంది. మూత్రపిండాలు రక్తాన్ని శుద్ధి చేసి వ్యర్థాలను మూత్రం ద్వారా బయటకు పంపుతాయి.'
    },
    commonConditions: {
      en: ['Fatty Liver Disease (MASLD)', 'Viral Hepatitis', 'Kidney Stones (Nephrolithiasis)', 'Chronic Kidney Disease (CKD)'],
      te: ['ఫ్యాటీ లివర్ సమస్య', 'హెపటైటిస్ (పచ్చకామెర్లు)', 'మూత్రపిండాలలో రాళ్ళు', 'దీర్ఘకాలిక మూత్రపిండాల వ్యాధి']
    },
    prevention: {
      en: [
        'Stay appropriately hydrated with clean water daily.',
        'Avoid self-medication with unprescribed NSAID pain relievers or untested supplements.',
        'Maintain healthy lipid levels to safeguard hepatic steatosis.',
        'Keep blood pressure within target limits to protect delicate renal glomeruli.'
      ],
      te: [
        'ప్రతిరోజూ తగినంత స్వచ్ఛమైన నీరు త్రాగడం.',
        'డాక్టర్ సలహా లేకుండా పెయిన్ కిల్లర్ మందులు అధికంగా వాడకపోవడం.',
        'ఆహారంలో నూనె మరియు కొవ్వును తగ్గించి కాలేయాన్ని ఆరోగ్యంగా ఉంచుకోవడం.',
        'రక్తపోటును నియంత్రణలో ఉంచుకోవడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Sudden severe agonizing flank/back pain radiating to the groin (renal colic).',
        'Visible blood in the urine (hematuria).',
        'Yellowing of skin and whites of the eyes (jaundice) with dark tea-colored urine.',
        'Sudden complete cessation of urination.'
      ],
      te: [
        'నడుము లేదా పక్కటెముకల వెనుక భరించలేని తీవ్రమైన నొప్పి.',
        'మూత్రంలో రక్తం కనిపించడం.',
        'కళ్ళు మరియు చర్మం పసుపు రంగులోకి మారడం (కామెర్లు).',
        'మూత్రం పూర్తిగా ఆగిపోవడం.'
      ]
    },
    relatedArticleId: 'art-liver-kidney-health',
    coordinates: {
      front: { cx: 175, cy: 195, r: 20 },
      back: { cx: 220, cy: 210, r: 18 }
    }
  },
  {
    id: 'digestive',
    name: { en: 'Digestive Tract (Stomach & Intestines)', te: 'జీర్ణకోశ వ్యవస్థ (కడుపు మరియు పేగులు)' },
    system: 'Gastrointestinal System',
    location: {
      en: 'Extends continuously from the esophagus through the peritoneal cavity to the rectum.',
      te: 'అన్నవాహిక నుండి మొదలై పొట్ట మరియు పేగుల ద్వారా విస్తరించి ఉంటుంది.'
    },
    function: {
      en: 'Breaks down ingested food into absorbable micronutrients, houses the symbiotic gut microbiome, and synthesizes critical neurotransmitters including serotonin.',
      te: 'ఆహారాన్ని జీర్ణం చేసి పోషకాలను శరీరానికి అందిస్తుంది మరియు పేగుల ఆరోగ్యాన్ని కాపాడుతుంది.'
    },
    commonConditions: {
      en: ['Gastroesophageal Reflux Disease (GERD)', 'Irritable Bowel Syndrome (IBS)', 'Gastritis & Peptic Ulcers', 'Celiac Disease'],
      te: ['ఎసిడిటీ మరియు గ్యాస్ సమస్యలు', 'ఐబిఎస్ (IBS)', 'గ్యాస్ట్రిటిస్ మరియు కడుపు పూత (అల్సర్లు)', 'జీర్ణక్రియ అసమతుల్యత']
    },
    prevention: {
      en: [
        'Consume abundant prebiotic plant fibers and fermented probiotic foods.',
        'Chew food thoroughly and maintain regular meal schedules.',
        'Limit ultra-processed items, excessive artificial sweeteners, and smoking.'
      ],
      te: [
        'పీచు పదార్థాలు మరియు తాజా కూరగాయలు ఎక్కువగా తీసుకోవడం.',
        'ఆహారాన్ని నమిలి నెమ్మదిగా తినడం మరియు సమయానికి భోజనం చేయడం.',
        'జంక్ ఫుడ్ మరియు వేపుళ్లను తగ్గించడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Vomiting blood or material resembling dark coffee grounds.',
        'Black, tarry, foul-smelling stools (melena).',
        'Rigid, rock-hard abdomen tender to light touch with high fever.',
        'Persistent inability to keep any fluids down for over 24 hours.'
      ],
      te: [
        'వాంతిలో రక్తం లేదా నల్లని పదార్థం పడటం.',
        'మలంలో రక్తం లేదా నల్లటి మలం రావడం.',
        'కడుపు గట్టిపడి తీవ్రమైన నొప్పి మరియు జ్వరం రావడం.',
        'రోజంతా నీరు కూడా త్రాగలేనంత తీవ్రమైన వాంతులు.'
      ]
    },
    relatedArticleId: 'art-gut-health',
    coordinates: {
      front: { cx: 200, cy: 245, r: 22 },
      back: { cx: 200, cy: 245, r: 20 }
    }
  },
  {
    id: 'reproductive',
    name: { en: 'Reproductive & Endocrine Axis', te: 'పునరుత్పత్తి మరియు హార్మోన్ల వ్యవస్థ' },
    system: 'Reproductive & Endocrine System',
    location: {
      en: 'Situated primarily within the lower pelvic cavity.',
      te: 'శరీర దిగువ కటి (పెల్విక్) భాగంలో ఉంటుంది.'
    },
    function: {
      en: 'Governs sexual differentiation, gametogenesis, menstrual and reproductive cycles, and produces vital sex steroid hormones (estrogen, progesterone, testosterone).',
      te: 'హార్మోన్ల సమతుల్యత, ఋతుచక్రం మరియు పునరుత్పత్తి ప్రక్రియలను నియంత్రిస్తుంది.'
    },
    commonConditions: {
      en: ['Polycystic Ovary Syndrome (PCOS)', 'Endometriosis', 'Thyroid-related Menstrual Irregularities', 'Benign Prostatic Hyperplasia (BPH)'],
      te: ['పిసిఒఎస్ (PCOS)', 'ఎండోమెట్రియోసిస్', 'థైరాయిడ్ సంబంధిత ఋతుక్రమ మార్పులు', 'హార్మోన్ల సమస్యలు']
    },
    prevention: {
      en: [
        'Attend scheduled routine wellness screenings (Pap smears, pelvic exams, testicular checks).',
        'Practice safe intimacy to prevent transmission of infectious agents.',
        'Track menstrual health patterns to notice subtle cycle shifts.',
        'Prioritize hormonal balance through sleep, nutrient density, and stress moderation.'
      ],
      te: [
        'నియమిత ఆరోగ్య పరీక్షలు చేయించుకోవడం.',
        'ఋతుక్రమ తేదీలను గమనించుకోవడం.',
        'మంచి పోషకాహారం మరియు సరైన నిద్ర ద్వారా హార్మోన్లను సమతుల్యంగా ఉంచుకోవడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Acute, sudden, severe lower abdominal or pelvic pain (potential ovarian torsion or ruptured ectopic pregnancy).',
        'Abnormally heavy bleeding soaking through multiple pads per hour with dizziness or fainting.',
        'High fever with sudden pelvic tenderness and foul-smelling discharge.'
      ],
      te: [
        'కడుపు దిగువ భాగంలో ఆకస్మిక, భరించలేని తీవ్రమైన నొప్పి.',
        'అధిక రక్తస్రావం మరియు కళ్ళు తిరిగి పడిపోవడం.',
        'తీవ్రమైన కడుపు నొప్పితో పాటు అధిక జ్వరం.'
      ]
    },
    relatedArticleId: 'art-womens-health',
    coordinates: {
      front: { cx: 200, cy: 295, r: 18 },
      back: { cx: 200, cy: 295, r: 18 }
    }
  },
  {
    id: 'skeletal_muscular',
    name: { en: 'Bones, Joints & Muscular Frame', te: 'ఎముకలు, కీళ్ళు మరియు కండరాల వ్యవస్థ' },
    system: 'Musculoskeletal System',
    location: {
      en: 'Forms the complete architectural scaffold supporting the entire human body.',
      te: 'మొత్తం శరీరానికి ఆధారాన్ని మరియు ఆకారాన్ని ఇచ్చే వ్యవస్థ.'
    },
    function: {
      en: 'Provides structural rigidity, protects internal visceral organs, enables voluntary locomotion, serves as a reservoir for calcium, and produces blood cells within bone marrow.',
      te: 'శరీరానికి బలం, నడకకు కదలికలను అందిస్తుంది. ఎముక మజ్జ (బోన్ మ్యారో) లో రక్త కణాలను ఉత్పత్తి చేస్తుంది.'
    },
    commonConditions: {
      en: ['Osteoarthritis & Rheumatoid Arthritis', 'Osteoporosis (Bone Density Loss)', 'Lumbar Disc Herniation & Sciatica', 'Muscle Strains & Tendinitis'],
      te: ['కీళ్లవాతం (ఆర్థరైటిస్)', 'ఎముకల బలహీనత (ఆస్టియోపోరోసిస్)', 'వెన్నునొప్పి మరియు సయాటికా', 'కండరాల నొప్పులు']
    },
    prevention: {
      en: [
        'Incorporate progressive resistance strength training 2–3 times weekly.',
        'Maintain adequate Vitamin D3 synthesis and dietary calcium intake.',
        'Use ergonomic seating and lift heavy objects using knees rather than the lumbar spine.',
        'Perform gentle dynamic mobility stretching daily.'
      ],
      te: [
        'ఎముకలు బలంగా ఉండటానికి తగినంత విటమిన్ డి మరియు కాల్షియం తీసుకోవడం.',
        'వారానికి 2-3 సార్లు కండరాల వ్యాయామం చేయడం.',
        'బరువులు ఎత్తేటప్పుడు సరైన భంగిమ పాటించడం.'
      ]
    },
    urgentSymptoms: {
      en: [
        'Inability to bear any weight after a fall or hearing a distinct crack or visible bone deformity.',
        'Sudden hot, swollen, intensely red joint with fever (possible septic arthritis).',
        'Severe back pain accompanied by sudden loss of bowel or bladder control (cauda equina syndrome).'
      ],
      te: [
        'కింద పడినప్పుడు ఎముక విరిగిపోవడం లేదా నడవలేకపోవడం.',
        'కీలు అకస్మాత్తుగా వాచిపోయి, ఎర్రబడి తీవ్రమైన జ్వరం రావడం.',
        'తీవ్రమైన వెన్నునొప్పితో పాటు మూత్ర విసర్జనపై నియంత్రణ కోల్పోవడం.'
      ]
    },
    relatedArticleId: 'art-bone-density',
    coordinates: {
      front: { cx: 200, cy: 375, r: 24 },
      back: { cx: 200, cy: 375, r: 24 }
    }
  }
];
