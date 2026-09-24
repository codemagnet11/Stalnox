import React from 'react';
import { ShoppingBag, FileText, Menu, X } from 'lucide-react';
import { RfqItem } from '../types.ts';

interface NavbarProps {
  rfqItems: RfqItem[];
  onOpenRfq: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ rfqItems, onOpenRfq }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const totalItemsCount = rfqItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b0f19]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a href="#" className="font-display text-2xl font-bold tracking-tight text-white hover:text-cyan-400 transition-colors">
          STALNOX
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#products" className="hover:text-cyan-400 hover:underline underline-offset-8 transition-colors">
            Products
          </a>
          <a href="#calculator" className="hover:text-cyan-400 hover:underline underline-offset-8 transition-colors">
            Flange Calculator
          </a>
          <a href="#metallurgy" className="hover:text-cyan-400 hover:underline underline-offset-8 transition-colors">
            Metallurgy
          </a>
          <a href="#quality" className="hover:text-cyan-400 hover:underline underline-offset-8 transition-colors">
            Quality & MTR
          </a>
          <a href="#certifications" className="hover:text-cyan-400 hover:underline underline-offset-8 transition-colors">
            Certifications
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRfq}
            className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-md transition-colors whitespace-nowrap"
            aria-label="View RFQ Request List"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">RFQ Basket</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {totalItemsCount}
            </span>
          </button>

          <button
            onClick={onOpenRfq}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm whitespace-nowrap"
          >
            Request Quote
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b0f19] px-6 py-4 space-y-3">
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Products
          </a>
          <a
            href="#calculator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Flange Calculator
          </a>
          <a
            href="#metallurgy"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Metallurgy
          </a>
          <a
            href="#quality"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Quality & MTR
          </a>
          <a
            href="#certifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-300 hover:text-cyan-400"
          >
            Certifications
          </a>
        </div>
      )}
    </header>
  );
};
