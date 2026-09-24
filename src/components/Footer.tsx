import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRfq }) => {
  return (
    <footer className="bg-[#070b12] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="font-display text-2xl font-bold tracking-tight text-white inline-block">
              STALNOX
            </a>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Global manufacturer and precision stockist of high-integrity stainless steel flanges, butt-weld pipe fittings, and high-pressure forged components for demanding energy, marine, and process infrastructure.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-slate-400 font-mono text-[11px]">
              <span>ISO 9001:2015</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>PED 2014/68/EU Module H</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>CE 0035</span>
            </div>
          </div>

          {/* Column 1: Products */}
          <div className="space-y-3">
            <h4 className="font-mono font-semibold text-white uppercase tracking-wider text-xs">
              Product Scope
            </h4>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Weld Neck Flanges (WN)</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Slip-On & Blind Flanges</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Seamless Butt-Weld Elbows</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Equal & Reducing Tees</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Forged Fittings 3000# / 6000#</a></li>
              <li><a href="#products" className="hover:text-cyan-400 transition-colors">Spectacle Blinds & Spacers</a></li>
            </ul>
          </div>

          {/* Column 2: Technical Tools */}
          <div className="space-y-3">
            <h4 className="font-mono font-semibold text-white uppercase tracking-wider text-xs">
              Engineering Tools
            </h4>
            <ul className="space-y-2">
              <li><a href="#calculator" className="hover:text-cyan-400 transition-colors">ASME B16.5 Calculator</a></li>
              <li><a href="#metallurgy" className="hover:text-cyan-400 transition-colors">PREN Alloy Corrosion Tool</a></li>
              <li><a href="#metallurgy" className="hover:text-cyan-400 transition-colors">Duplex & Inconel Comparison</a></li>
              <li><a href="#quality" className="hover:text-cyan-400 transition-colors">Sample EN 10204 3.1 MTR</a></li>
              <li>
                <button onClick={onOpenRfq} className="text-cyan-400 hover:underline">
                  Request Custom RFQ Proforma
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Global Sales */}
          <div className="space-y-3">
            <h4 className="font-mono font-semibold text-white uppercase tracking-wider text-xs">
              Global Sales Desk
            </h4>
            <div className="space-y-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href="mailto:sales@stalnox-alloys.com" className="hover:text-cyan-400 transition-colors">
                  rfq@stalnox-alloys.com
                </a>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>+1 (800) 582-7825 / +44 20 7946 0912</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Precision Forging & Distribution Hub, Industrial Zone 4, Port Logistics Park</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Stalnox Piping Solutions Ltd. All engineering rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">ASME Boiler & Pressure Vessel Compliance</span>
            <span className="hover:text-slate-400 cursor-pointer">Quality Manual QA-01</span>
            <span className="hover:text-slate-400 cursor-pointer">Sales Terms & Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
