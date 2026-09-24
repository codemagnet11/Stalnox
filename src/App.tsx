/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductCatalog } from './components/ProductCatalog.tsx';
import { FlangeCalculator } from './components/FlangeCalculator.tsx';
import { MaterialSpecs } from './components/MaterialSpecs.tsx';
import { QualityLab } from './components/QualityLab.tsx';
import { GlobalProjects } from './components/GlobalProjects.tsx';
import { Footer } from './components/Footer.tsx';
import { RfqDrawer } from './components/RfqDrawer.tsx';
import { RfqItem } from './types.ts';
import { FileText, Sparkles, MessageSquareQuote } from 'lucide-react';

export default function App() {
  const [isRfqOpen, setIsRfqOpen] = useState<boolean>(false);
  const [rfqItems, setRfqItems] = useState<RfqItem[]>([
    {
      id: 'default-1',
      productName: 'ASME B16.5 Weld Neck Flange (WN)',
      type: 'Weld Neck (WN)',
      size: '2" (DN 50)',
      pressureClass: 'Class 150#',
      grade: 'ASTM A182 F316/316L Dual',
      schedule: 'SCH 40S',
      facing: 'Raised Face (125-250 Ra)',
      quantity: 20,
      specialRequirements: 'EN 10204 3.1 MTR with full spectro PMI analysis',
    },
    {
      id: 'default-2',
      productName: 'ASME B16.9 Seamless 90° LR Elbow',
      type: 'BUTT-WELD FITTING',
      size: '3" (DN 80)',
      pressureClass: 'Full Pipe Rating',
      grade: 'ASTM A403 WP316L',
      schedule: 'SCH 40S',
      quantity: 15,
      specialRequirements: '100% pickled and passivated, beveled to ASME B16.25',
    },
  ]);

  const handleAddRfqItem = (newItem: Omit<RfqItem, 'id'>) => {
    const item: RfqItem = {
      ...newItem,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setRfqItems((prev) => [item, ...prev]);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setRfqItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
    );
  };

  const handleRemoveItem = (id: string) => {
    setRfqItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAll = () => {
    setRfqItems([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 3-Zone Top Bar */}
      <Navbar
        rfqItems={rfqItems}
        onOpenRfq={() => setIsRfqOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenRfq={() => setIsRfqOpen(true)}
          onExploreCatalog={() => scrollToSection('products')}
          onOpenCalculator={() => scrollToSection('calculator')}
        />

        {/* Product Lineup Showcase */}
        <ProductCatalog
          onAddRfqItem={handleAddRfqItem}
        />

        {/* Interactive ASME B16.5 & DIN Dimension Calculator */}
        <FlangeCalculator
          onAddRfqItem={handleAddRfqItem}
        />

        {/* Material Metallurgy & PREN Calculator */}
        <MaterialSpecs />

        {/* Quality Lab, Testing Protocols & Sample MTR Viewer */}
        <QualityLab />

        {/* EPC Project Credentials & Severe Service Sectors */}
        <GlobalProjects />

        {/* Pre-Footer Action Banner */}
        <section className="py-16 bg-gradient-to-b from-[#0b0f19] to-[#070b12] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Engineering Tender & MTO Inquiries
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Need Custom Heavy-Wall Flanges or Fast-Track Forgings?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
                Our metallurgical engineering desk handles bespoke forgings, special blind covers up to 72" NPS, and tailored weld preps. Submit your material take-off for immediate assessment.
              </p>
              <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsRfqOpen(true)}
                  className="px-6 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs rounded transition-all shadow-md shadow-cyan-500/10 whitespace-nowrap"
                >
                  Launch Detailed RFQ Builder
                </button>
                <a
                  href="mailto:engineering@stalnox-alloys.com"
                  className="px-5 py-3.5 bg-slate-850 hover:bg-slate-800 text-white border border-slate-700 rounded font-semibold text-xs transition-colors whitespace-nowrap"
                >
                  Direct Email: rfq@stalnox-alloys.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Authoritative B2B Footer */}
      <Footer onOpenRfq={() => setIsRfqOpen(true)} />

      {/* RFQ Proforma & Inquiry Drawer */}
      <RfqDrawer
        isOpen={isRfqOpen}
        onClose={() => setIsRfqOpen(false)}
        rfqItems={rfqItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearAll={handleClearAll}
        onAddCustomItem={handleAddRfqItem}
      />
    </div>
  );
}
