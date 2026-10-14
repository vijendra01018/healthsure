import React, { useState } from 'react';
import { EMERGENCY_NUMBERS, MEDICAL_SERVICES } from '../data/hospitalsData';
import { Language, MedicalService } from '../types/health';
import {
  Clock,
  Droplet,
  Heart,
  Hospital,
  MapPin,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

interface HospitalsDirectoryProps {
  language: Language;
}

export const HospitalsDirectory: React.FC<HospitalsDirectoryProps> = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredServices = MEDICAL_SERVICES.filter((service) => {
    if (selectedType !== 'all' && service.type !== selectedType) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      service.name.toLowerCase().includes(q) ||
      service.city.toLowerCase().includes(q) ||
      service.pincode.includes(q) ||
      service.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* 24x7 Emergency Helplines Strip */}
      <div className="p-5 rounded-2xl bg-rose-950/40 border-2 border-rose-600/70 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
          <PhoneCall className="w-4 h-4 animate-pulse text-rose-400" />
          <span>{language === 'te' ? '24/7 అత్యవసర సహాయ కేంద్రాలు (Emergency Helplines)' : 'Immediate 24/7 Medical Emergency Helplines'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {EMERGENCY_NUMBERS.map((em, idx) => (
            <a
              key={idx}
              href={`tel:${em.number}`}
              className="p-3 rounded-xl bg-slate-950/70 border border-rose-900/60 hover:border-rose-500 transition-colors flex items-center justify-between"
            >
              <div>
                <div className="text-[11px] text-slate-300 font-medium truncate max-w-[150px]">{em.title}</div>
                <div className="text-[10px] text-slate-400">{em.desc}</div>
              </div>
              <div className="text-base font-bold font-mono text-rose-300 flex items-center gap-1">
                <span>{em.number}</span>
                <Phone className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Directory Search & Filters */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {language === 'te' ? 'ఆసుపత్రులు మరియు బ్లడ్ బ్యాంకుల డైరెక్టరీ' : 'Hospitals, Blood Banks & Authorized Centers'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'te'
                ? 'ధృవీకరించబడిన ఆసుపత్రులు, రక్తనిధి కేంద్రాలు మరియు అవయవ మార్పిడి నోడల్ డెస్క్‌లను శోధించండి.'
                : 'Verified medical centers, emergency trauma units, and licensed blood banks.'}
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, PIN, or name..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:border-cyan-500 focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 pt-2 border-t border-slate-800 overflow-x-auto text-xs font-medium">
          {['all', 'Hospital', 'Blood Bank', 'Emergency 24x7', 'Organ Donation Center'].map((type) => {
            const isSelected = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All Services' : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-mono uppercase text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                    {service.type}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1.5 leading-snug">{service.name}</h3>
                </div>
                {service.distanceKm && (
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    ~{service.distanceKm} km
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-300 flex items-start gap-1.5 mt-2.5">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>{service.address}, {service.city} — {service.pincode}</span>
              </p>

              <div className="flex flex-wrap gap-2 pt-3 text-[11px]">
                {service.hasEmergencyICU && (
                  <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800">
                    ✓ 24/7 ICU & Trauma
                  </span>
                )}
                {service.hasBloodBank && (
                  <span className="px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800">
                    ✓ Licensed Blood Transfusion Center
                  </span>
                )}
                <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  🕒 {service.openHours}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
              <a
                href={`tel:${service.phone}`}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-mono flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{service.phone}</span>
              </a>

              <a
                href={`tel:${service.emergencyNumber}`}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Emergency ({service.emergencyNumber})</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
