import React, { useState } from 'react';
import { FLANGE_SPECS_150, FLANGE_SPECS_300, MATERIAL_GRADES } from '../data/catalog.ts';
import { RfqItem } from '../types.ts';
import { Plus, Check, Info, FileSpreadsheet, Layers } from 'lucide-react';

interface FlangeCalculatorProps {
  onAddRfqItem: (item: Omit<RfqItem, 'id'>) => void;
}

export const FlangeCalculator: React.FC<FlangeCalculatorProps> = ({ onAddRfqItem }) => {
  const [pressureClass, setPressureClass] = useState<'150' | '300'>('150');
  const [selectedSize, setSelectedSize] = useState<string>('2"');
  const [flangeType, setFlangeType] = useState<'wn' | 'so' | 'blind' | 'sw'>('wn');
  const [selectedGrade, setSelectedGrade] = useState<string>('316l');
  const [facing, setFacing] = useState<'RF' | 'RTJ' | 'FF'>('RF');
  const [quantity, setQuantity] = useState<number>(10);
  const [schedule, setSchedule] = useState<string>('SCH 40S');
  const [justAdded, setJustAdded] = useState(false);

  const activeSpecs = pressureClass === '150' ? FLANGE_SPECS_150 : FLANGE_SPECS_300;
  const currentSpec = activeSpecs.find((s) => s.size === selectedSize) || activeSpecs[4]; // Default to 2"

  const typeLabels = {
    wn: 'Weld Neck (WN)',
    so: 'Slip-On (SO)',
    blind: 'Blind Flange (BL)',
    sw: 'Socket Weld (SW)',
  };

  const calculatedWeight = currentSpec.weightKg[flangeType];
  const weightLbs = (calculatedWeight * 2.20462).toFixed(1);

  const handleAddToRfq = () => {
    const gradeObj = MATERIAL_GRADES.find((g) => g.id === selectedGrade);
    onAddRfqItem({
      productName: `ASME B16.5 ${typeLabels[flangeType]}`,
      type: typeLabels[flangeType],
      size: selectedSize,
      pressureClass: `Class ${pressureClass}#`,
      grade: gradeObj ? gradeObj.name.split(' (')[0] : 'SS 316/316L',
      schedule: flangeType === 'wn' ? schedule : undefined,
      facing: facing === 'RF' ? 'Raised Face (125-250 Ra)' : facing === 'RTJ' ? 'Ring Joint (RTJ)' : 'Flat Face (FF)',
      quantity: quantity,
      specialRequirements: `Standard ASME B16.5 dimensions, EN 10204 3.1 MTR required`,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <section id="calculator" className="py-20 bg-[#0e1424] border-b border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-2">
            <span>Engineering Dimension Matrix</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ASME B16.5 Standard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Interactive Flange Dimension & Weight Calculator
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Lookup bolt circle diameters, hole counts, outside dimensions, and unit weights for procurement take-offs. Add calculated items directly to your formal RFQ inquiry.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-lg p-6 space-y-6">
            
            {/* Pressure Class Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Pressure Rating (ASME B16.5)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPressureClass('150')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded border transition-colors ${
                    pressureClass === '150'
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  Class 150# (PN 20)
                </button>
                <button
                  type="button"
                  onClick={() => setPressureClass('300')}
                  className={`py-2.5 px-4 text-xs font-semibold rounded border transition-colors ${
                    pressureClass === '300'
                      ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                      : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  Class 300# (PN 50)
                </button>
              </div>
            </div>

            {/* Flange Type Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Flange Configuration
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['wn', 'so', 'blind', 'sw'] as const).map((typeKey) => (
                  <button
                    key={typeKey}
                    type="button"
                    onClick={() => setFlangeType(typeKey)}
                    className={`py-2 px-3 text-xs font-medium rounded border text-center transition-colors ${
                      flangeType === typeKey
                        ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                        : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {typeKey === 'wn' ? 'Weld Neck' : typeKey === 'so' ? 'Slip-On' : typeKey === 'blind' ? 'Blind' : 'Socket Weld'}
                  </button>
                ))}
              </div>
            </div>

            {/* Nominal Pipe Size Grid */}
            <div>
              <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                Nominal Pipe Size (NPS)
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {activeSpecs.map((spec) => (
                  <button
                    key={spec.size}
                    type="button"
                    onClick={() => setSelectedSize(spec.size)}
                    className={`py-2 px-2 text-xs font-mono font-medium rounded border transition-colors text-center ${
                      selectedSize === spec.size
                        ? 'bg-cyan-400 text-slate-950 font-bold border-cyan-400'
                        : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                    }`}
                  >
                    {spec.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Grade & Facing Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Material Alloy
                </label>
                <select
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-cyan-400"
                >
                  {MATERIAL_GRADES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Sealing Face Type
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['RF', 'RTJ', 'FF'] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setFacing(f)}
                      className={`py-2 px-2 text-xs font-medium rounded border text-center transition-colors ${
                        facing === f
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300'
                          : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule & Quantity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {flangeType === 'wn' ? (
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Pipe Schedule (Bore)
                  </label>
                  <select
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded px-3 py-2 text-xs focus:outline-none focus:border-cyan-400"
                  >
                    <option value="SCH 10S">SCH 10S (Light)</option>
                    <option value="SCH 40S">SCH 40S / STD (Standard)</option>
                    <option value="SCH 80S">SCH 80S / XS (Extra Strong)</option>
                    <option value="SCH 160">SCH 160 (High Pressure)</option>
                    <option value="SCH XXS">SCH XXS (Extreme Pressure)</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                    Bore Standard
                  </label>
                  <div className="w-full bg-slate-950/60 border border-slate-800 text-slate-400 rounded px-3 py-2 text-xs">
                    Standard ANSI B16.5 Bore
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Inquiry Quantity (Pieces)
                </label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 5))}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-l text-xs"
                  >
                    -5
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-slate-950 border-y border-slate-700 text-center py-2 text-xs font-mono font-bold text-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 5)}
                    className="px-3 py-2 bg-slate-950 border border-slate-700 text-slate-300 hover:bg-slate-800 rounded-r text-xs"
                  >
                    +5
                  </button>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddToRfq}
                className={`w-full py-3 px-4 rounded font-semibold text-xs transition-all flex items-center justify-center gap-2 ${
                  justAdded
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-sm'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to RFQ Specification List!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add {quantity}x ({selectedSize} {typeLabels[flangeType]}) to RFQ Inquiry</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Technical Readout & Schematic Blueprint */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-900/90 border border-slate-800 rounded-lg p-6">
            
            {/* Header Readout */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-white font-display">
                    {selectedSize} NPS · Class {pressureClass}#
                  </h3>
                  <div className="text-xs text-cyan-400 font-mono">
                    DN {currentSpec.dn} mm · {typeLabels[flangeType]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Unit Est. Weight</div>
                  <div className="text-lg font-bold text-white font-mono font-mono-tabular">
                    {calculatedWeight.toFixed(1)} <span className="text-xs text-slate-400">kg</span>
                    <span className="text-xs text-slate-500 ml-1">({weightLbs} lbs)</span>
                  </div>
                </div>
              </div>

              {/* Dimensional Engineering Specs Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Outside Diameter (O)</div>
                  <div className="text-base font-bold text-white mt-1 font-mono-tabular">
                    {currentSpec.od} mm
                  </div>
                  <div className="text-[10px] text-slate-500">{(currentSpec.od / 25.4).toFixed(2)}"</div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Bolt Circle (BC / PCD)</div>
                  <div className="text-base font-bold text-white mt-1 font-mono-tabular">
                    {currentSpec.bc} mm
                  </div>
                  <div className="text-[10px] text-slate-500">{(currentSpec.bc / 25.4).toFixed(2)}"</div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Bolt Holes & Stud Size</div>
                  <div className="text-base font-bold text-white mt-1 font-mono-tabular">
                    {currentSpec.boltHoles} holes
                  </div>
                  <div className="text-[10px] text-slate-500">{currentSpec.boltSize}</div>
                </div>

                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-[11px] text-slate-400">Flange Thickness (C)</div>
                  <div className="text-base font-bold text-white mt-1 font-mono-tabular">
                    {currentSpec.thickness} mm
                  </div>
                  <div className="text-[10px] text-slate-500">Raised Face: {currentSpec.rfDiam} mm</div>
                </div>
              </div>

              {/* Interactive Vector Blueprint Rendering */}
              <div className="mt-5 p-4 bg-slate-950 rounded border border-slate-800 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs h-40 relative flex items-center justify-center">
                  <svg viewBox="0 0 300 160" className="w-full h-full text-slate-500">
                    {/* Flange Cross Section Blueprint */}
                    <g fill="none" stroke="currentColor" strokeWidth="1.5">
                      {/* Flange Disc */}
                      <path
                        d="M 40 90 L 260 90 L 260 120 L 40 120 Z"
                        className="fill-slate-800/60 stroke-cyan-400"
                      />
                      {/* Raised Face bottom */}
                      <path
                        d="M 80 120 L 220 120 L 220 128 L 80 128 Z"
                        className="fill-cyan-500/20 stroke-cyan-300"
                      />
                      {/* Weld Neck Hub or Slip-On Hub */}
                      {flangeType === 'wn' && (
                        <path
                          d="M 95 90 L 115 35 L 185 35 L 205 90 Z"
                          className="fill-slate-800/40 stroke-cyan-400"
                        />
                      )}
                      {flangeType === 'so' && (
                        <path
                          d="M 95 90 L 95 65 L 205 65 L 205 90 Z"
                          className="fill-slate-800/40 stroke-cyan-400"
                        />
                      )}
                      {/* Bore Hole (if not blind) */}
                      {flangeType !== 'blind' && (
                        <rect x="125" y="30" width="50" height="105" fill="#0b0f19" stroke="currentColor" strokeDasharray="3 3" />
                      )}
                      {/* Bolt Holes */}
                      <circle cx="62" cy="105" r="7" className="fill-[#0b0f19] stroke-cyan-400/80" />
                      <circle cx="238" cy="105" r="7" className="fill-[#0b0f19] stroke-cyan-400/80" />
                    </g>
                    
                    {/* Dimension lines & annotations */}
                    <line x1="40" y1="140" x2="260" y2="140" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="150" y="152" fill="#38bdf8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                      O = {currentSpec.od} mm
                    </text>
                  </svg>
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-1">
                  Blueprint: ASME B16.5 standard geometry tolerances (±1.5mm)
                </div>
              </div>
            </div>

            {/* Note & Compliance */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-400">
              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                All flanges forged from certified billet ingots, 100% supersonic tested with complete chemical & mechanical batch test documentation.
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
