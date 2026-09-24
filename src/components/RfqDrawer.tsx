import React, { useState } from 'react';
import { RfqItem } from '../types.ts';
import { X, Trash2, CheckCircle2, FileDown, Send, ShieldCheck, Plus } from 'lucide-react';

interface RfqDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  rfqItems: RfqItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onAddCustomItem: (item: Omit<RfqItem, 'id'>) => void;
}

export const RfqDrawer: React.FC<RfqDrawerProps> = ({
  isOpen,
  onClose,
  rfqItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  onAddCustomItem,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [destinationPort, setDestinationPort] = useState('Rotterdam Port (CIF)');
  const [incoterm, setIncoterm] = useState('CIF');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  // Manual Quick Add state inside drawer
  const [showManualAdd, setShowManualAdd] = useState(false);
  const [manualName, setManualName] = useState('ASME B16.5 Weld Neck Flange');
  const [manualSize, setManualSize] = useState('3"');
  const [manualClass, setManualClass] = useState('Class 300#');
  const [manualGrade, setManualGrade] = useState('SS 316/316L');
  const [manualQty, setManualQty] = useState(10);

  if (!isOpen) return null;

  const handleManualAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCustomItem({
      productName: manualName,
      type: 'CUSTOM MTO LINE',
      size: manualSize,
      pressureClass: manualClass,
      grade: manualGrade,
      quantity: manualQty,
      specialRequirements: 'Specified per custom BOM line',
    });
    setShowManualAdd(false);
  };

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitting(true);

    setTimeout(() => {
      const generatedCode = `STX-RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedCode(generatedCode);
      setSubmitting(false);
    }, 900);
  };

  const handleReset = () => {
    setSubmittedCode(null);
    onClearAll();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-2xl bg-[#0b0f19] border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
              Procurement & Engineering RFQ
            </div>
            <h3 className="text-xl font-display font-bold text-white mt-0.5">
              Request For Quotation (RFQ)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            aria-label="Close RFQ Drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body Scroll Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {submittedCode ? (
            /* Confirmation Success State */
            <div className="p-8 text-center space-y-6 bg-slate-900/90 border border-slate-800 rounded-lg">
              <div className="w-16 h-16 mx-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-2xl font-display font-bold text-white">
                  Quotation Request Dispatched
                </h4>
                <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{name}</strong> ({company || 'Corporate Client'}). Your technical specification has been routed to Stalnox's Senior Piping Estimators.
                </p>
              </div>

              <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Inquiry Tracking Ref:</span>
                  <span className="text-cyan-400 font-bold font-mono-tabular">{submittedCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Specified Pieces:</span>
                  <span className="text-white font-mono-tabular">
                    {rfqItems.reduce((a, b) => a + b.quantity, 0)} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivery Terms:</span>
                  <span className="text-white">{incoterm} · {destinationPort}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MTR Requirement:</span>
                  <span className="text-emerald-400 font-semibold">EN 10204 3.1 Certified</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Official proforma quotation with material certifications and shipping lead-times will arrive at <strong className="text-cyan-300">{email}</strong> within 4 business hours.
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="w-full py-3 px-4 rounded bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-colors"
              >
                Close & Return to Catalog
              </button>
            </div>
          ) : (
            <>
              {/* Specified Line Items Area */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                    Specified Items ({rfqItems.length})
                  </h4>
                  {rfqItems.length > 0 && (
                    <button
                      type="button"
                      onClick={onClearAll}
                      className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 font-mono"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear All</span>
                    </button>
                  )}
                </div>

                {rfqItems.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/60 border border-dashed border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-400">
                      No components added yet. Use the Flange Dimension Calculator or Product Catalog to add items to your RFQ inquiry.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowManualAdd(true)}
                      className="mt-4 px-3.5 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-slate-700 rounded transition-colors"
                    >
                      + Add Custom MTO Line Item
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {rfqItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-slate-900/90 border border-slate-800 rounded-lg flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="font-bold text-white font-display text-sm">
                            {item.productName}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-slate-400 font-mono text-[11px]">
                            <span className="text-cyan-400 font-semibold">{item.size}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.pressureClass}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.grade}</span>
                            {item.schedule && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{item.schedule}</span>
                              </>
                            )}
                            {item.facing && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>{item.facing}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter & Delete */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center bg-slate-950 border border-slate-700 rounded">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, -5)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              -
                            </button>
                            <span className="px-2 py-1 font-mono font-bold text-white min-w-[32px] text-center font-mono-tabular">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, 5)}
                              className="px-2 py-1 text-slate-400 hover:text-white"
                            >
                              +
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {!showManualAdd && (
                      <button
                        type="button"
                        onClick={() => setShowManualAdd(true)}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 py-1"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add another custom pipe or fitting specification</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Manual Line Item Form Drawer */}
              {showManualAdd && (
                <form onSubmit={handleManualAddSubmit} className="p-4 bg-slate-950 border border-slate-700 rounded-lg space-y-3 text-xs">
                  <div className="flex items-center justify-between font-mono font-semibold text-slate-200">
                    <span>Quick Add Line Item</span>
                    <button
                      type="button"
                      onClick={() => setShowManualAdd(false)}
                      className="text-slate-500 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-slate-400 block mb-1">Description</label>
                      <input
                        type="text"
                        value={manualName}
                        onChange={(e) => setManualName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Size</label>
                      <input
                        type="text"
                        value={manualSize}
                        onChange={(e) => setManualSize(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Rating / Class</label>
                      <input
                        type="text"
                        value={manualClass}
                        onChange={(e) => setManualClass(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Grade</label>
                      <input
                        type="text"
                        value={manualGrade}
                        onChange={(e) => setManualGrade(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-400 rounded font-semibold text-xs"
                    >
                      Save to RFQ List
                    </button>
                  </div>
                </form>
              )}

              {/* Contact & Destination Details Form */}
              <form id="rfq-form" onSubmit={handleSubmitInquiry} className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                  Contact & Logistics Specifications
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="procurement@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Company / EPC Contractor</label>
                    <input
                      type="text"
                      placeholder="e.g. Petrochem Engineering Corp."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">Incoterms</label>
                    <select
                      value={incoterm}
                      onChange={(e) => setIncoterm(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="CIF">CIF (Cost, Insurance & Freight)</option>
                      <option value="FOB">FOB (Free On Board Origin Port)</option>
                      <option value="DAP">DAP (Delivered at Place)</option>
                      <option value="EXW">EXW (Ex Works Factory Gate)</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs">
                  <label className="text-slate-400 block mb-1">Destination Port or Delivery City</label>
                  <input
                    type="text"
                    value={destinationPort}
                    onChange={(e) => setDestinationPort(e.target.value)}
                    placeholder="e.g. Houston TX, Rotterdam, Singapore, Jebel Ali"
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="text-xs">
                  <label className="text-slate-400 block mb-1">
                    Special Testing Requirements / Technical Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. 100% PMI required, Charpy V-Notch impact testing at -46°C, DNV-GL third party witnessing, special export wooden crating..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Includes EN 10204 3.1 MTR with full chemical and mechanical values.</span>
                </div>
              </form>
            </>
          )}

        </div>

        {/* Drawer Footer Actions */}
        {!submittedCode && (
          <div className="p-6 border-t border-slate-800 bg-[#0b0f19] flex items-center justify-between gap-4">
            <div className="text-xs">
              <span className="text-slate-400 block">Total Items:</span>
              <span className="text-white font-mono font-bold font-mono-tabular">
                {rfqItems.reduce((a, b) => a + b.quantity, 0)} units
              </span>
            </div>

            <button
              type="submit"
              form="rfq-form"
              disabled={submitting || rfqItems.length === 0}
              className="px-6 py-3 bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:pointer-events-none text-slate-950 font-semibold text-xs rounded transition-colors flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              {submitting ? (
                <span>Routing Specification...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Formal Engineering RFQ</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
