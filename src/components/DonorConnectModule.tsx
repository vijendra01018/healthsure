import React, { useState } from 'react';
import { BloodGroup, BloodRequest, DonationType, DonorProfile, Language } from '../types/health';
import {
  BLOOD_COMPATIBILITY,
  calculateCooldownDays,
  RECOVERY_DESCRIPTIONS,
  RECOVERY_PERIODS,
  SAMPLE_BLOOD_REQUESTS
} from '../data/donorData';
import {
  AlertCircle,
  Bell,
  BellOff,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Droplet,
  Filter,
  Heart,
  Hospital,
  Info,
  MapPin,
  ShieldCheck,
  UserCheck,
  Users
} from 'lucide-react';

interface DonorConnectModuleProps {
  language: Language;
  onNavigateToHospitals?: () => void;
}

export const DonorConnectModule: React.FC<DonorConnectModuleProps> = ({
  language,
  onNavigateToHospitals
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'my_profile' | 'compatibility' | 'recovery_rules'>('requests');

  // Simulated Donor Profile (stored in localStorage or memory)
  const [profile, setProfile] = useState<DonorProfile>(() => {
    const saved = localStorage.getItem('mg_donor_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      id: 'usr-donor-101',
      displayName: 'Arjun S. (Demonstration)',
      bloodGroup: 'O+',
      locationCity: 'Hyderabad',
      pincode: '500082',
      preferredTypes: ['whole_blood', 'platelets'],
      isAvailable: true,
      notificationConsent: true,
      lastDonationDate: '2026-08-20', // Sample date
      lastDonationType: 'whole_blood',
      totalDonationsCount: 4
    };
  });

  const [filterBloodGroup, setFilterBloodGroup] = useState<string>('all');
  const [filterUrgency, setFilterUrgency] = useState<string>('all');
  const [registeredSuccess, setRegisteredSuccess] = useState<boolean>(false);
  const [respondedRequests, setRespondedRequests] = useState<Record<string, 'considered' | 'declined'>>({});

  // Calculate current cooldown status for this donor
  const cooldown = calculateCooldownDays(profile.lastDonationDate, profile.lastDonationType);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('mg_donor_profile', JSON.stringify(profile));
    setRegisteredSuccess(true);
    setTimeout(() => setRegisteredSuccess(false), 3000);
  };

  const handleRecordDonation = (type: DonationType) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updated: DonorProfile = {
      ...profile,
      lastDonationDate: todayStr,
      lastDonationType: type,
      totalDonationsCount: profile.totalDonationsCount + 1,
      isAvailable: false // Automatically sets to recovery cooldown
    };
    setProfile(updated);
    localStorage.setItem('mg_donor_profile', JSON.stringify(updated));
  };

  // Filter requests
  const filteredRequests = SAMPLE_BLOOD_REQUESTS.filter((req) => {
    if (filterBloodGroup !== 'all' && req.bloodGroup !== filterBloodGroup) return false;
    if (filterUrgency !== 'all' && req.urgency !== filterUrgency) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="p-6 md:col-span-7 z-10 space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-cyan-400" />
              <span>Smart Donor Connect Network</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {language === 'te' ? 'రక్తదాతల అనుసంధానం & రికవరీ సంరక్షణ' : 'Blood Donor Connect & Recovery Management'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              {language === 'te'
                ? 'ధృవీకరించబడిన ఆసుపత్రి అభ్యర్థనలు, శాస్త్రీయ రక్త సరిపోలిక నిబంధనలు మరియు దాతల ఆరోగ్య పరిరక్షణకు ప్రత్యేక రికవరీ సమయం.'
                : 'Connect with verified hospital blood requests, view compatibility matrices, and manage safe recovery periods with zero notification spam.'}
            </p>
          </div>
          <div className="md:col-span-5 h-48 md:h-full relative overflow-hidden bg-slate-950">
            <img
              src="/src/assets/images/donor_blood_care_1791968619203.jpg"
              alt="High-tech modern blood bank donation care and testing laboratory"
              className="w-full h-full object-cover object-center opacity-80 hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/90 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'requests' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Hospital className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'ధృవీకరించబడిన అభ్యర్థనలు' : 'Verified Hospital Requests'}</span>
          </button>
          <button
            onClick={() => setActiveTab('my_profile')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'my_profile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'నా దాత ప్రొఫైల్' : 'Donor Profile & Status'}</span>
          </button>
          <button
            onClick={() => setActiveTab('compatibility')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'compatibility' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Droplet className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'రక్త సరిపోలిక నిబంధనలు' : 'Compatibility Matrix'}</span>
          </button>
          <button
            onClick={() => setActiveTab('recovery_rules')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'recovery_rules' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'రికవరీ & విశ్రాంతి నియమాలు' : 'Cooldown Guidelines'}</span>
          </button>
        </div>
      </div>

      {/* Donor Recovery & Notification Status Banner */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${cooldown.isEligible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Eligibility Status</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${cooldown.isEligible ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}`}>
                {cooldown.isEligible ? 'Eligible for Evaluation' : `In Recovery Cooldown (${cooldown.daysRemaining} days remaining)`}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Next estimated eligibility date: <strong className="text-white">{cooldown.eligibleDateStr}</strong>. Routine notifications are automatically suppressed while in recovery.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              const updated = { ...profile, isAvailable: !profile.isAvailable };
              setProfile(updated);
              localStorage.setItem('mg_donor_profile', JSON.stringify(updated));
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              profile.isAvailable
                ? 'bg-slate-950 text-slate-300 border-slate-700 hover:border-slate-500'
                : 'bg-emerald-950/40 text-emerald-300 border-emerald-800 hover:bg-emerald-900/40'
            }`}
          >
            {profile.isAvailable ? <BellOff className="w-3.5 h-3.5 text-amber-400" /> : <Bell className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{profile.isAvailable ? 'Pause Alerts' : 'Resume Alerts'}</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Verified Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-cyan-400" />
              <span className="font-medium text-slate-300">Filter Requests:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={filterBloodGroup}
                onChange={(e) => setFilterBloodGroup(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg focus:outline-none"
              >
                <option value="all">All Blood Groups</option>
                <option value="O-">O- (Universal)</option>
                <option value="O+">O+</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>

              <select
                value={filterUrgency}
                onChange={(e) => setFilterUrgency(e.target.value)}
                className="bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg focus:outline-none"
              >
                <option value="all">All Urgency Levels</option>
                <option value="Critical Emergency">Critical Emergency</option>
                <option value="Urgent">Urgent</option>
                <option value="Routine">Routine</option>
              </select>
            </div>
          </div>

          {/* Academic Demonstration Notice */}
          <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Sample Demonstration Data: Requests displayed are illustrative examples for college project evaluation. Direct donation requires authorized hospital cross-matching.</span>
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRequests.map((req) => {
              const responseState = respondedRequests[req.id];
              const isUrgent = req.urgency === 'Critical Emergency';

              return (
                <div
                  key={req.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isUrgent
                      ? 'bg-slate-900/90 border-rose-900/60 shadow-[0_0_20px_rgba(225,29,72,0.1)]'
                      : 'bg-slate-900/70 border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded font-semibold ${
                          isUrgent ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        }`}>
                          {req.urgency}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">Posted: {req.postedDate}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-1.5">{req.hospitalName}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        <span>{req.city} (PIN: {req.pincode})</span>
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold font-mono text-cyan-300">{req.bloodGroup}</div>
                      <div className="text-[11px] text-slate-400">{req.unitsRequired} Units Needed</div>
                    </div>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between">
                    <span><strong>Component: </strong>{req.component}</span>
                    <span className="text-emerald-400 font-medium">✓ Verified Hospital Desk</span>
                  </div>

                  <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800/80">
                    <a
                      href={`tel:${req.contactPhone}`}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
                    >
                      {req.contactPhone}
                    </a>

                    <div className="flex items-center gap-2">
                      {responseState === 'considered' ? (
                        <span className="text-xs text-emerald-400 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" />
                          <span>Pledged to Contact Hospital</span>
                        </span>
                      ) : responseState === 'declined' ? (
                        <span className="text-xs text-slate-500">Passed without pressure</span>
                      ) : (
                        <>
                          <button
                            onClick={() => setRespondedRequests((prev) => ({ ...prev, [req.id]: 'declined' }))}
                            className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-400 hover:text-white text-xs"
                          >
                            Pass
                          </button>
                          <button
                            onClick={() => setRespondedRequests((prev) => ({ ...prev, [req.id]: 'considered' }))}
                            className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium"
                          >
                            Consider Responding
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: My Profile & Simulation */}
      {activeTab === 'my_profile' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Voluntary Donor Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Manage your voluntary blood group, locality, and simulated donation records. Personal phone numbers and street addresses are never publicly visible.
              </p>
            </div>
            {registeredSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-950/50 px-3 py-1.5 rounded-lg border border-emerald-800">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Profile Saved</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  value={profile.displayName}
                  onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Blood Group
                </label>
                <select
                  value={profile.bloodGroup}
                  onChange={(e) => setProfile({ ...profile, bloodGroup: e.target.value as BloodGroup })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                >
                  <option value="O+">O Positive (O+)</option>
                  <option value="O-">O Negative (O-)</option>
                  <option value="A+">A Positive (A+)</option>
                  <option value="A-">A Negative (A-)</option>
                  <option value="B+">B Positive (B+)</option>
                  <option value="B-">B Negative (B-)</option>
                  <option value="AB+">AB Positive (AB+)</option>
                  <option value="AB-">AB Negative (AB-)</option>
                  <option value="Unknown">Unknown (Pending Test)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  City / District
                </label>
                <input
                  type="text"
                  value={profile.locationCity}
                  onChange={(e) => setProfile({ ...profile, locationCity: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  General PIN Code
                </label>
                <input
                  type="text"
                  value={profile.pincode}
                  onChange={(e) => setProfile({ ...profile, pincode: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Notification Consent */}
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={profile.notificationConsent}
                  onChange={(e) => setProfile({ ...profile, notificationConsent: e.target.checked })}
                  className="w-4 h-4 rounded text-cyan-500 bg-slate-900 border-slate-700"
                />
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  I consent to receive occasional verified hospital blood requests matching my blood type and general area.
                </span>
              </label>
              <p className="text-[11px] text-slate-400 pl-7">
                No repeated spam alerts. Alerts are suppressed whenever you are in recovery cooldown or marked unavailable.
              </p>
            </div>

            {/* Simulation: Record a Confirmed Donation */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Simulate Confirmed Donation (Testing Recovery Engine)
              </div>
              <p className="text-xs text-slate-300">
                Clicking one of the buttons below records a completed donation today and starts the respective clinical recovery countdown.
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => handleRecordDonation('whole_blood')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-cyan-800 text-cyan-300 hover:bg-cyan-950 text-xs font-medium"
                >
                  Record Whole Blood Donation (84-Day Cooldown)
                </button>
                <button
                  type="button"
                  onClick={() => handleRecordDonation('platelets')}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-teal-800 text-teal-300 hover:bg-teal-950 text-xs font-medium"
                >
                  Record Platelet Donation (14-Day Cooldown)
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors shadow-md"
              >
                Save Donor Profile
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Compatibility Matrix */}
      {activeTab === 'compatibility' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
          <div>
            <h3 className="text-lg font-bold text-white">Red Blood Cell Compatibility Matrix</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Red blood cell compatibility is determined by the presence or absence of A, B, and Rh(D) surface antigens.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(Object.keys(BLOOD_COMPATIBILITY) as BloodGroup[])
              .filter((bg) => bg !== 'Unknown')
              .map((bg) => {
                const info = BLOOD_COMPATIBILITY[bg];
                const isUserType = profile.bloodGroup === bg;

                return (
                  <div
                    key={bg}
                    className={`p-4 rounded-xl border space-y-2 ${
                      isUserType
                        ? 'bg-cyan-950/40 border-cyan-500/70 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold font-mono text-white">{bg}</span>
                      {isUserType && (
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-1.5 py-0.5 rounded border border-cyan-800">
                          Your Type
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-slate-300 space-y-1 pt-1 border-t border-slate-800/80">
                      <div>
                        <span className="text-slate-400">Can Give To: </span>
                        <strong className="text-emerald-300">{info.canDonateTo.join(', ')}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Can Receive From: </span>
                        <strong className="text-cyan-300">{info.canReceiveFrom.join(', ')}</strong>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Clinical Transfusion Safety Rule: </strong>
            While ABO/Rh compatibility provides initial categorization, blood banks must always perform laboratory cross-matching (major and minor crossmatch) to screen for unexpected atypical red cell antibodies before transfusion.
          </div>
        </div>
      )}

      {/* Tab 4: Recovery Rules */}
      {activeTab === 'recovery_rules' && (
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Clinical Recovery & Cooldown Guidelines</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Why different blood components require distinct recovery intervals before a donor is medically eligible to donate again.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 uppercase">Whole Blood</span>
              <div className="text-2xl font-bold text-white font-mono">84 Days</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {RECOVERY_DESCRIPTIONS.whole_blood}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-teal-400 uppercase">Platelet Apheresis</span>
              <div className="text-2xl font-bold text-white font-mono">14 Days</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {RECOVERY_DESCRIPTIONS.platelets}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 uppercase">Plasma Apheresis</span>
              <div className="text-2xl font-bold text-white font-mono">28 Days</div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {RECOVERY_DESCRIPTIONS.plasma}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
