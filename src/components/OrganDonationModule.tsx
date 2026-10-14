import React, { useState } from 'react';
import { Language } from '../types/health';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Eye,
  Heart,
  HelpCircle,
  Info,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

interface OrganDonationModuleProps {
  language: Language;
}

const MYTHS_AND_FACTS = [
  {
    myth: {
      en: 'If hospital staff know I am a registered organ donor, they won’t work as hard to save my life.',
      te: 'నేను అవయవ దాతగా నమోదైతే, వైద్యులు నన్ను కాపాడటానికి శ్రద్ధ చూపరు.'
    },
    fact: {
      en: 'Completely false. The medical team treating you in emergency care is entirely separate from the transplant surgical team. Organ donation is only ever evaluated after certified Brain Death has been confirmed by four independent statutory medical specialists.',
      te: 'ఇది పూర్తిగా అవాస్తవం. అత్యవసర చికిత్స చేసే వైద్యుల బృందం మరియు అవయవ మార్పిడి బృందం పూర్తిగా వేర్వేరు. మెదడు మరణం (బ్రెయిన్ డెత్) ధృవీకరించబడిన తర్వాత మాత్రమే అవయవ దానం అంశం ప్రస్తావనకు వస్తుంది.'
    }
  },
  {
    myth: {
      en: 'Major world religions prohibit organ and tissue donation.',
      te: 'మతాలు అవయవ దానాన్ని అనుమతించవు.'
    },
    fact: {
      en: 'All major worldwide faith traditions (including Hinduism, Christianity, Islam, Buddhism, and Sikhism) consider voluntary, altruistic organ and tissue donation to be one of the highest acts of compassion and giving.',
      te: 'అన్ని ప్రధాన మతాలు నిస్వార్థ అవయవ దానాన్ని ప్రాణాలను కాపాడే అత్యున్నత దానంగా గౌరవిస్తాయి.'
    }
  },
  {
    myth: {
      en: 'I am too old or have medical conditions, so my organs cannot be used.',
      te: 'నాకు వయసు ఎక్కువైంది లేదా సమస్యలు ఉన్నాయి, కాబట్టి నా అవయవాలు పనికిరావు.'
    },
    fact: {
      en: 'There is no strict upper age cut-off for organ or eye donation. Even individuals with past medical history can often donate corneas or specific organs. Qualified transplant coordinators evaluate viability at the time of donation.',
      te: 'అవయవ లేదా కంటి దానానికి ఖచ్చితమైన వయోపరిమితి లేదు. వృద్ధాప్యంలో కూడా కంటి కార్నియాను దానం చేసి ఇతరులకు చూపును ప్రసాదించవచ్చు.'
    }
  }
];

export const OrganDonationModule: React.FC<OrganDonationModuleProps> = ({ language }) => {
  const [pledgeName, setPledgeName] = useState<string>('');
  const [pledgeOrganTypes, setPledgeOrganTypes] = useState<string[]>(['All Organs & Tissues']);
  const [isPledged, setIsPledged] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-3">
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5" />
          <span>Gift of Life Literacy</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {language === 'te' ? 'అవయవ, కణజాల మరియు మూలకణ దానం' : 'Organ, Tissue & Stem Cell Donation'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          {language === 'te'
            ? 'అవయవ దానం ద్వారా ప్రాణాలను ఎలా నిలబెట్టవచ్చో, కంటి దానం ప్రాముఖ్యత మరియు అధికారిక ప్రభుత్వ రిజిస్ట్రీల ద్వారా ఎలా నమోదు చేసుకోవాలో తెలుసుకోండి.'
            : 'Explore deceased and living organ donation, cornea eye banking, tissue preservation, stem cell registries, and the legal framework governing ethical allocation.'}
        </p>
      </div>

      {/* Ethical & Legal Guardrail Notice */}
      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-white">Statutory & Ethical Governance: </strong>
          Organ donation in India is governed strictly by the <em>Transplantation of Human Organs and Tissues Act (THOTA)</em>. Commercial transactions, monetary compensation, or private brokering are criminal offenses. All allocations are coordinated through transparent waitlists by NOTTO (National Organ & Tissue Transplant Organisation).
        </div>
      </div>

      {/* Donation Categories Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Solid Organs */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
            <Heart className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-white">Solid Organs</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Kidneys, Liver, Heart, Lungs, Pancreas, and Intestine. A single deceased donor can save up to eight lives.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Timing: Coordinated immediately following verified brain death in ICU.
          </div>
        </div>

        {/* Eye & Cornea */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center text-teal-400">
            <Eye className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-white">Corneal Eye Banking</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            The clear front layer of the eye restores sight to people with corneal blindness. Can be donated after circulatory death.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Timing: Harvested within 6 hours of death by an eye bank team.
          </div>
        </div>

        {/* Tissues & Valves */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-950 border border-indigo-800 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-white">Tissues & Heart Valves</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Skin for severe burn victims, bone grafts for orthopedic reconstructive surgery, and cardiac heart valves for pediatric patients.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Timing: Can be retrieved up to 24 hours in mortuary tissue banks.
          </div>
        </div>

        {/* Stem Cells */}
        <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2.5">
          <div className="w-8 h-8 rounded-lg bg-violet-950 border border-violet-800 flex items-center justify-center text-violet-400">
            <Users className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-sm text-white">Stem Cells & Marrow</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Peripheral blood stem cells (PBSC) cure leukemia, thalassemia, and aplastic anemia. Donated painlessly while alive via apheresis.
          </p>
          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            Process: HLA genetic cheek swab registry registration.
          </div>
        </div>
      </div>

      {/* Myths vs Facts Accordion / Cards */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-cyan-400" />
          <span>{language === 'te' ? 'అపోహలు vs వాస్తవాలు' : 'Common Myths vs Clinical Facts'}</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {MYTHS_AND_FACTS.map((mf, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2.5">
              <div className="text-xs text-rose-300 font-semibold flex items-start gap-1.5">
                <span className="text-rose-400 font-mono">MYTH:</span>
                <span>{mf.myth[language]}</span>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800/80 flex items-start gap-1.5">
                <span className="text-cyan-400 font-mono font-bold">FACT:</span>
                <span>{mf.fact[language]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Registries & Referral Links */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-cyan-400" />
          <span>Official Authorized Registries & Pledge Portals</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://notto.mohfw.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-cyan-400">Government of India</div>
              <div className="text-sm font-bold text-white mt-1">NOTTO Official Registry</div>
              <p className="text-xs text-slate-400 mt-1">National Organ & Tissue Transplant Organisation</p>
            </div>
            <div className="text-xs text-cyan-400 flex items-center gap-1 mt-3">
              <span>Visit Portal</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://jeevandan.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-teal-400">Telangana State</div>
              <div className="text-sm font-bold text-white mt-1">Jeevandan Cadaver Registry</div>
              <p className="text-xs text-slate-400 mt-1">State Deceased Organ Transplantation Scheme</p>
            </div>
            <div className="text-xs text-teal-400 flex items-center gap-1 mt-3">
              <span>Visit Portal</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>

          <a
            href="https://datri.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-violet-400">Stem Cells</div>
              <div className="text-sm font-bold text-white mt-1">DATRI Blood Stem Cell Registry</div>
              <p className="text-xs text-slate-400 mt-1">India’s largest voluntary stem cell donor registry</p>
            </div>
            <div className="text-xs text-violet-400 flex items-center gap-1 mt-3">
              <span>Visit Portal</span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        </div>
      </div>

      {/* Family Discussion Pledge Simulator */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>Simulate Your Donor Pledge Card</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              The single most important step in organ donation is discussing your decision with your family members so they can honor your wishes.
            </p>
          </div>
        </div>

        {!isPledged ? (
          <div className="max-w-md space-y-3 pt-2">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                value={pledgeName}
                onChange={(e) => setPledgeName(e.target.value)}
                placeholder="e.g. Ananya Rao"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <button
              onClick={() => {
                if (pledgeName.trim()) setIsPledged(true);
              }}
              disabled={!pledgeName.trim()}
              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-medium transition-colors"
            >
              Generate Educational Pledge Card
            </button>
          </div>
        ) : (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 border border-cyan-500/50 max-w-lg space-y-3 shadow-xl">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
              <span>VOLUNTARY PLEDGE INTENT</span>
              <span>MEDIGUIDE AI</span>
            </div>
            <div className="text-lg font-bold text-white">{pledgeName}</div>
            <p className="text-xs text-slate-300">
              "In the hope that I may help someone after my death, I hereby declare my intent to donate my organs and tissues for transplantation."
            </p>
            <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Share this card with your next-of-kin to confirm your altruistic wishes.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
