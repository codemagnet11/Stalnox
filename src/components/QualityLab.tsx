import React, { useState } from 'react';
import { CERTIFICATIONS } from '../data/catalog.ts';
import { ShieldCheck, FileCheck2, Eye, CheckCircle, Award, Check } from 'lucide-react';

export const QualityLab: React.FC = () => {
  const [showMtrSample, setShowMtrSample] = useState(false);

  return (
    <section id="quality" className="py-20 bg-[#0b0f19] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-2">
            <span>Quality Assurance & Testing</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Zero-Defect Protocol</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Independent Metallurgical Lab & 100% PMI Inspection
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Every Stalnox flange and fitting is backed by heat-number traceable EN 10204 3.1 certification. Full NDT facilities guarantee metallurgical integrity before dispatch.
          </p>
        </div>

        {/* Quality Lab Grid with Photo & Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Photo Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 shadow-xl">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src="/src/assets/images/stalnox_metallurgical_lab_1790245287870.jpg"
                  alt="Stalnox Optical Emission Spectrometer and Ultrasonic Testing Lab"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-950/90 backdrop-blur-md rounded border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-white font-mono font-medium">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>In-House Testing Facility</span>
                    </span>
                    <span className="text-cyan-400 font-bold">100% Inspected</span>
                  </div>
                  <div className="text-slate-400 text-[11px] font-mono mt-1">
                    Direct spectrometer heat chemical validation & digital ultrasonic scans.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Capabilities List */}
          <div className="lg:col-span-6 space-y-4">
            {[
              {
                title: 'Positive Material Identification (PMI)',
                desc: '100% verification of each piece using portable Thermo Scientific XRF analyzers, guaranteeing alloy grade without element dilution.',
              },
              {
                title: 'Ultrasonic Testing (UT) & Liquid Penetrant (PT)',
                desc: 'Volumetric and surface crack detection on critical weld necks and high-pressure fittings per ASME Sec. V and EN ISO 9712.',
              },
              {
                title: 'Hydrostatic Pressure & Helium Leak Proofing',
                desc: 'Dedicated test benches capable of hydrostatic proof testing up to 10,000 PSI (690 bar) with digital chart recording.',
              },
              {
                title: 'Intergranular Corrosion Resistance (IGC)',
                desc: 'ASTM A262 Practice E testing and ferrite percentage determination (ASTM E562) to certify duplex microstructure.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900/70 border border-slate-800/80 rounded-lg flex items-start gap-3">
                <div className="p-2 bg-cyan-500/10 text-cyan-400 rounded shrink-0 mt-0.5">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowMtrSample(!showMtrSample)}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-cyan-400" />
                <span>{showMtrSample ? 'Hide Sample Test Certificate' : 'Inspect Sample EN 10204 3.1 MTR'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Sample EN 10204 3.1 MTR Document Viewer */}
        {showMtrSample && (
          <div className="mb-16 bg-slate-950 border border-cyan-500/40 rounded-lg p-6 shadow-2xl font-mono text-xs animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 tracking-wider">
                  STALNOX INSPECTION CERTIFICATE EN 10204 TYPE 3.1
                </span>
                <h4 className="text-base font-bold text-white mt-1">
                  MTR REF: STX-MTR-2026-9814B · HEAT #HX-8492
                </h4>
              </div>
              <div className="text-slate-400 text-right text-[11px] mt-2 sm:mt-0">
                <span>Date of Issue: 2026-09-15</span>
                <br />
                <span className="text-emerald-400 font-bold">STATUS: FULL PASS</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-slate-300">
              <div className="space-y-1">
                <p><span className="text-slate-500">Product:</span> ASME B16.5 Weld Neck Flange (WN), RF 125-250 Ra</p>
                <p><span className="text-slate-500">Nominal Size:</span> 4" NPS (DN 100) Class 300# SCH 40S</p>
                <p><span className="text-slate-500">Material Standard:</span> ASTM A182 / ASME SA182 Grade F316/316L Dual</p>
              </div>
              <div className="space-y-1">
                <p><span className="text-slate-500">Heat Treatment:</span> Solution Annealed at 1060°C, Rapid Water Quenched</p>
                <p><span className="text-slate-500">Corrosion Test:</span> ASTM A262 Practice E: Satisfactory (No IGC)</p>
                <p><span className="text-slate-500">Hardness:</span> 164 HBW (Max 187 HBW permitted)</p>
              </div>
            </div>

            {/* Chemical & Mechanical Verified Table */}
            <div className="overflow-x-auto border border-slate-800 rounded mb-4">
              <table className="w-full text-[11px] text-left">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-2">Analysis</th>
                    <th className="p-2">C %</th>
                    <th className="p-2">Si %</th>
                    <th className="p-2">Mn %</th>
                    <th className="p-2">P %</th>
                    <th className="p-2">S %</th>
                    <th className="p-2">Cr %</th>
                    <th className="p-2">Ni %</th>
                    <th className="p-2">Mo %</th>
                    <th className="p-2">N %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="bg-slate-950">
                    <td className="p-2 text-slate-400 font-semibold">Heat #HX-8492</td>
                    <td className="p-2 text-white">0.021</td>
                    <td className="p-2 text-white">0.48</td>
                    <td className="p-2 text-white">1.34</td>
                    <td className="p-2 text-white">0.024</td>
                    <td className="p-2 text-white">0.003</td>
                    <td className="p-2 text-cyan-300 font-bold">17.22</td>
                    <td className="p-2 text-cyan-300 font-bold">11.15</td>
                    <td className="p-2 text-cyan-300 font-bold">2.18</td>
                    <td className="p-2 text-white">0.045</td>
                  </tr>
                  <tr className="bg-slate-900/40 text-slate-500">
                    <td className="p-2">Spec ASTM A182</td>
                    <td className="p-2">≤ 0.030</td>
                    <td className="p-2">≤ 1.00</td>
                    <td className="p-2">≤ 2.00</td>
                    <td className="p-2">≤ 0.045</td>
                    <td className="p-2">≤ 0.030</td>
                    <td className="p-2">16.0-18.0</td>
                    <td className="p-2">10.0-14.0</td>
                    <td className="p-2">2.00-3.00</td>
                    <td className="p-2">≤ 0.10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <span>Third Party Inspection: Certified conforming to NACE MR0175 / ISO 15156.</span>
              <span className="text-cyan-400 font-bold">QA Lead Inspector: STALNOX LAB - QA ID #44</span>
            </div>
          </div>
        )}

        {/* International Standards & Certifications Badges */}
        <div id="certifications" className="border-t border-slate-800 pt-16">
          <div className="max-w-2xl mb-8">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              International Accreditations & Code Approvals
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authorized manufacturer for high-pressure equipment worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATIONS.map((cert, index) => (
              <div
                key={index}
                className="p-5 bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 font-mono font-bold text-white text-sm mb-1">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>{cert.code}</span>
                </div>
                <div className="text-xs text-slate-300 font-medium">{cert.label}</div>
                <div className="text-[11px] text-slate-500 font-mono mt-2">Audit Body: {cert.org}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
