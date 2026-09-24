import React from 'react';
import { ArrowRight, Download, ShieldCheck, Layers, Gauge, Award } from 'lucide-react';

interface HeroProps {
  onOpenRfq: () => void;
  onExploreCatalog: () => void;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenRfq,
  onExploreCatalog,
  onOpenCalculator,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0b0f19] border-b border-slate-800">
      {/* Background Graphic Grid */}
      <div className="absolute inset-0 steel-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 steel-mesh-gradient pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-16 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Trust Kicker - Zero-Pill Discipline */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-medium text-cyan-400/90 tracking-wide uppercase">
              <span>ASME B16.5 & DIN EN 1092-1</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>ISO 9001:2015 & PED Certified</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>EN 10204 3.1 Traceable</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] max-w-2xl text-balance">
              Precision Stainless Steel Flanges & High-Pressure Piping Systems
            </h1>

            {/* Value Proposition */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              Stalnox engineers and supplies high-integrity forged stainless steel flanges, seamless butt-weld elbows, tees, and 6000# fittings in 304L, 316L, Duplex 2205, and Nickel 625 for critical marine, oil & gas, and process industries.
            </p>

            {/* Primary Action Group */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenRfq}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-all shadow-md hover:shadow-cyan-500/20 whitespace-nowrap"
              >
                <span>Request Fast B2B Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-md transition-colors whitespace-nowrap"
              >
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span>Flange Dimension Tool</span>
              </button>
            </div>

            {/* Claim-to-Proof Quantitative Adjacency Bar */}
            <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono-tabular">1/2" - 72"</div>
                <div className="text-xs text-slate-400 mt-0.5">NPS Size Spectrum</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono-tabular">2500# / PN400</div>
                <div className="text-xs text-slate-400 mt-0.5">Max Pressure Rating</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono-tabular">100% PMI</div>
                <div className="text-xs text-slate-400 mt-0.5">Spectro Verified Alloy</div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-white font-mono-tabular">48h Rapid</div>
                <div className="text-xs text-slate-400 mt-0.5">Stock Dispatch Available</div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
              
              {/* Cinematic Generated Flange Photo */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] w-full bg-slate-900">
                <img
                  src="/src/assets/images/hero_stalnox_flange_1790245239351.jpg"
                  alt="Precision CNC-machined stainless steel weld-neck flanges by Stalnox"
                  className="w-full h-full object-cover object-center brightness-[0.96] contrast-[1.05]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Measured Contrast Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/30 to-transparent" />

                {/* Overlaid Technical Spec Card */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-950/85 backdrop-blur-md rounded border border-slate-700/80 text-xs text-slate-300">
                  <div className="flex items-center justify-between font-mono font-medium text-white mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                      <span>STALNOX FORGE LOT #8942-A</span>
                    </span>
                    <span className="text-cyan-400 font-bold">ASME B16.5 WN</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400 text-[11px] font-mono">
                    <span>Grade: ASTM A182 F316/316L Dual</span>
                    <span>Serrated RF: 125-250 Ra</span>
                  </div>
                </div>
              </div>

              {/* Technical Features Strip */}
              <div className="p-4 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 text-slate-300">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>3.1 Test Certificate Included</span>
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-slate-400">NACE MR0175 Compliant</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
