import React, { useState } from 'react';
import { PRODUCTS } from '../data/catalog.ts';
import { ProductItem, RfqItem } from '../types.ts';
import { ArrowRight, Check, Plus, ExternalLink, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

interface ProductCatalogProps {
  onAddRfqItem: (item: Omit<RfqItem, 'id'>) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onAddRfqItem }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'flanges' | 'fittings' | 'forged' | 'specialty'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [modalAdded, setModalAdded] = useState(false);
  const [inquirySize, setInquirySize] = useState('2"');
  const [inquiryClass, setInquiryClass] = useState('Class 150#');
  const [inquiryGrade, setInquiryGrade] = useState('SS 316/316L');
  const [inquiryQty, setInquiryQty] = useState(25);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddFromModal = () => {
    if (!selectedProduct) return;
    onAddRfqItem({
      productName: selectedProduct.name,
      type: selectedProduct.category.toUpperCase(),
      size: inquirySize,
      pressureClass: inquiryClass,
      grade: inquiryGrade,
      quantity: inquiryQty,
      specialRequirements: `Standards: ${selectedProduct.standards.slice(0, 2).join(', ')}. EN 10204 3.1 MTR.`,
    });
    setModalAdded(true);
    setTimeout(() => {
      setModalAdded(false);
      setSelectedProduct(null);
    }, 1200);
  };

  const handleQuickAdd = (product: ProductItem) => {
    onAddRfqItem({
      productName: product.name,
      type: product.category.toUpperCase(),
      size: '2" (DN 50)',
      pressureClass: product.pressureClass.split('/')[0].trim(),
      grade: 'ASTM A182 F316/316L',
      quantity: 10,
      specialRequirements: `Standards: ${product.standards[0]}`,
    });
  };

  return (
    <section id="products" className="py-20 bg-[#0b0f19] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            {/* Zero-Pill kicker */}
            <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-2">
              <span>Manufacturing Scope</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>100% Forged & Machined</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Flanges & Butt-Weld Piping Components
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              All components manufactured under strict ISO 9001 and PED quality assurance with complete lot traceability from melt to machined finished piece.
            </p>
          </div>

          {/* Interactive Filter Tabs - Functional Segmented Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-md">
            {[
              { id: 'all', label: 'All Products' },
              { id: 'flanges', label: 'Flanges (ASME / DIN)' },
              { id: 'fittings', label: 'Butt-Weld Fittings' },
              { id: 'forged', label: 'Forged 3000# / 6000#' },
              { id: 'specialty', label: 'Isolation & Specialty' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/80 border border-slate-800 rounded-lg overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 brightness-95"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                
                {/* Unboxed Metadata Overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span className="font-semibold text-white">{product.standards[0]}</span>
                  <span className="text-cyan-400">{product.pressureClass}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Clean unboxed metadata row */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono mt-1">
                    <span>{product.sizeRange}</span>
                    <span aria-hidden="true">·</span>
                    <span>{product.schedules[0]}</span>
                  </div>

                  <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="mt-4 space-y-1.5 text-xs text-slate-400">
                    {product.features.slice(0, 2).map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold shrink-0">✓</span>
                        <span className="line-clamp-1">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(product)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <span>View Specifications</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickAdd(product)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5 text-cyan-400" />
                    <span>RFQ Item</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                  <span>{selectedProduct.category.toUpperCase()} SPECIFICATION</span>
                  <span aria-hidden="true">·</span>
                  <span>ASME / DIN CERTIFIED</span>
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {selectedProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="text-slate-400 hover:text-white text-lg font-mono p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider mb-1 font-mono">Overview</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-3 rounded border border-slate-800 font-mono">
                <div>
                  <span className="text-slate-500 block">Standards:</span>
                  <span className="text-white font-medium">{selectedProduct.standards.join(', ')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Pressure Class:</span>
                  <span className="text-white font-medium">{selectedProduct.pressureClass}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Size Spectrum:</span>
                  <span className="text-white font-medium">{selectedProduct.sizeRange}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-200 uppercase tracking-wider mb-2 font-mono">Engineering Key Features</h4>
                <ul className="space-y-1.5 text-slate-300">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct RFQ Addition Row */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="font-semibold text-white font-mono uppercase tracking-wider">Configure & Add to Inquiry</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Size</label>
                    <select
                      value={inquirySize}
                      onChange={(e) => setInquirySize(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded p-1.5 text-xs"
                    >
                      <option value="1/2&quot;">1/2" (DN 15)</option>
                      <option value="1&quot;">1" (DN 25)</option>
                      <option value="2&quot;">2" (DN 50)</option>
                      <option value="3&quot;">3" (DN 80)</option>
                      <option value="4&quot;">4" (DN 100)</option>
                      <option value="6&quot;">6" (DN 150)</option>
                      <option value="8&quot;">8" (DN 200)</option>
                      <option value="10&quot;">10" (DN 250)</option>
                      <option value="12&quot;">12" (DN 300)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Rating</label>
                    <select
                      value={inquiryClass}
                      onChange={(e) => setInquiryClass(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded p-1.5 text-xs"
                    >
                      <option value="Class 150#">Class 150#</option>
                      <option value="Class 300#">Class 300#</option>
                      <option value="Class 600#">Class 600#</option>
                      <option value="Class 900#">Class 900#</option>
                      <option value="Class 1500#">Class 1500#</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Alloy</label>
                    <select
                      value={inquiryGrade}
                      onChange={(e) => setInquiryGrade(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded p-1.5 text-xs"
                    >
                      <option value="SS 304/304L">SS 304/304L</option>
                      <option value="SS 316/316L">SS 316/316L</option>
                      <option value="Duplex 2205">Duplex 2205</option>
                      <option value="Super Duplex 2507">Super Duplex 2507</option>
                      <option value="Inconel 625">Inconel 625</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={inquiryQty}
                      onChange={(e) => setInquiryQty(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-slate-700 text-white rounded p-1.5 text-xs font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleAddFromModal}
                    className="px-5 py-2 text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-slate-950 rounded transition-colors flex items-center gap-1.5"
                  >
                    {modalAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to RFQ Basket</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
