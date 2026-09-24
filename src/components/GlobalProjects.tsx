import React from 'react';
import { CLIENT_SECTORS } from '../data/catalog.ts';
import { Globe2, ShieldCheck, Factory, CheckCircle2, ArrowUpRight } from 'lucide-react';

export const GlobalProjects: React.FC = () => {
  return (
    <section className="py-20 bg-[#0e1424] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-2">
            <span>Global EPC Deployment</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>38+ Maritime & Energy Markets</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Engineered for Severe Service & Extreme Pressures
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Supplying critical piping infrastructure to world-scale energy conglomerates, subsea construction contractors, and petrochemical complexes.
          </p>
        </div>

        {/* Sectors Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {CLIENT_SECTORS.map((sector, index) => (
            <div
              key={index}
              className="p-6 bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
            >
              <div className="text-xs font-mono font-semibold text-cyan-400 mb-2">
                APPLICATION {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-lg font-bold text-white mb-2">
                {sector.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {sector.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Quantified Project Case Studies Bar */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            {/* Case Study 1 */}
            <div className="pt-6 lg:pt-0 lg:pr-6 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                OFFSHORE CRUDE MANIFOLD · NORTH SEA
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                840x Duplex 2205 Heavy Wall Flanges
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Supplied Class 1500# and 2500# RTJ Weld Neck Flanges tested to -46°C Charpy impact with DNV-GL 3.2 inspection witnessing.
              </p>
              <div className="pt-2 text-xs text-emerald-400 font-mono font-semibold">
                ✓ 0% Dimensional Rejection · 100% On-Time Delivery
              </div>
            </div>

            {/* Case Study 2 */}
            <div className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                SWRO DESALINATION PLANT · ARABIAN GULF
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                2,100x Super Duplex 2507 Reducers & Tees
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                High chloride seawater intake headers manufactured in UNS S32750 with verified PREN ≥ 43.2 and ASTM A923 Method C ferric chloride corrosion resistance.
              </p>
              <div className="pt-2 text-xs text-emerald-400 font-mono font-semibold">
                ✓ 10-Year Severe Service Life Guaranteed
              </div>
            </div>

            {/* Case Study 3 */}
            <div className="pt-6 lg:pt-0 lg:pl-6 space-y-2">
              <div className="text-xs font-mono text-cyan-400 font-semibold">
                CRYOGENIC LNG TERMINAL · NORTH AMERICA
              </div>
              <h4 className="font-display text-lg font-bold text-white">
                316L Cryogenic Flanges & Butt-Weld Elbows
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Class 300# to 900# weld neck flanges and seamless 90° LR elbows certified for liquid methane lines operating at -162°C.
              </p>
              <div className="pt-2 text-xs text-emerald-400 font-mono font-semibold">
                ✓ ASME B31.3 Category M Fluid Certified
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
