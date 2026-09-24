import React, { useState } from 'react';
import { MATERIAL_GRADES } from '../data/catalog.ts';
import { MaterialGrade } from '../types.ts';
import { Calculator, CheckCircle2, ShieldAlert, Sparkles, Layers } from 'lucide-react';

export const MaterialSpecs: React.FC = () => {
  const [selectedGradeId, setSelectedGradeId] = useState<string>('316l');
  
  // Custom PREN calculator state
  const [calcCr, setCalcCr] = useState<number>(22.0);
  const [calcMo, setCalcMo] = useState<number>(3.2);
  const [calcN, setCalcN] = useState<number>(0.18);

  const calculatedCustomPren = Number((calcCr + 3.3 * calcMo + 16 * calcN).toFixed(1));

  const activeGrade = MATERIAL_GRADES.find((g) => g.id === selectedGradeId) || MATERIAL_GRADES[1];

  return (
    <section id="metallurgy" className="py-20 bg-[#0e1424] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-cyan-400 uppercase tracking-wider mb-2">
            <span>Alloy Metallurgy & Standards</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>ASTM A182 / EN 10088-3</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certified Stainless Steel & High-Nickel Alloys
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Inspect verified chemistry boundaries, tensile yields, and PREN pitting corrosion resistance indices for critical process environments.
          </p>
        </div>

        {/* Grade Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {MATERIAL_GRADES.map((grade) => (
            <button
              key={grade.id}
              onClick={() => setSelectedGradeId(grade.id)}
              className={`px-4 py-2 text-xs font-semibold rounded border transition-colors ${
                selectedGradeId === grade.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-mono'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {grade.name.split(' (')[0]}
            </button>
          ))}
        </div>

        {/* Selected Grade Metallurgy Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Main Specs Card */}
          <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-lg p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-2">
              <div>
                <h3 className="font-display text-xl font-bold text-white">
                  {activeGrade.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-cyan-400 font-mono mt-1">
                  <span>UNS {activeGrade.uns}</span>
                  <span aria-hidden="true">·</span>
                  <span>EN {activeGrade.enNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeGrade.category} Steel</span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded border border-slate-800">
                <span className="text-xs text-slate-400">PREN Index:</span>
                <span className="font-mono font-bold text-cyan-400 text-base font-mono-tabular">
                  {activeGrade.pren.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Chemical Composition Table */}
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono mb-3">
                Nominal Chemical Composition (Weight %)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Chromium (Cr)</div>
                  <div className="text-white font-bold mt-1">{activeGrade.cr}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Nickel (Ni)</div>
                  <div className="text-white font-bold mt-1">{activeGrade.ni}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Molybdenum (Mo)</div>
                  <div className="text-white font-bold mt-1">{activeGrade.mo}</div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Key Balance</div>
                  <div className="text-white font-bold mt-1">{activeGrade.other}</div>
                </div>
              </div>
            </div>

            {/* Mechanical Properties Row */}
            <div>
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider font-mono mb-3">
                Mechanical Strength & Thermal Performance
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Yield Strength (0.2% Offset)</div>
                  <div className="text-white font-bold text-sm mt-1 font-mono-tabular">
                    ≥ {activeGrade.yieldStrengthMin} MPa
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Tensile Strength (Rm)</div>
                  <div className="text-white font-bold text-sm mt-1 font-mono-tabular">
                    ≥ {activeGrade.tensileStrengthMin} MPa
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded border border-slate-800/80">
                  <div className="text-slate-500 text-[11px]">Service Temperature</div>
                  <div className="text-white font-bold text-sm mt-1 font-mono-tabular">
                    {activeGrade.tempRange}
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Service Applications */}
            <div className="p-4 bg-slate-950/60 rounded border border-slate-800">
              <span className="text-xs font-semibold text-slate-300 block mb-1 font-mono">
                Primary Recommended Operating Regimes:
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeGrade.bestFor}
              </p>
            </div>

          </div>

          {/* Interactive PREN Pitting Resistance Estimator */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-lg p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-white font-display text-base font-bold mb-1">
                <Calculator className="w-4 h-4 text-cyan-400" />
                <span>PREN Calculator</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 font-mono">
                Pitting Resistance Equivalent Number:
                <br />
                <span className="text-cyan-400">PREN = %Cr + 3.3(%Mo) + 16(%N)</span>
              </p>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>% Chromium (Cr)</span>
                    <span className="text-white">{calcCr.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="30"
                    step="0.5"
                    value={calcCr}
                    onChange={(e) => setCalcCr(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>% Molybdenum (Mo)</span>
                    <span className="text-white">{calcMo.toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.2"
                    value={calcMo}
                    onChange={(e) => setCalcMo(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>% Nitrogen (N)</span>
                    <span className="text-white">{calcN.toFixed(2)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.02"
                    value={calcN}
                    onChange={(e) => setCalcN(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* PREN Result Gauge Card */}
            <div className="p-4 bg-slate-950 rounded border border-slate-800 text-center">
              <div className="text-xs text-slate-400 font-mono">Calculated PREN Rating</div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono font-mono-tabular mt-1">
                {calculatedCustomPren}
              </div>
              <div className="text-[11px] mt-2 font-mono">
                {calculatedCustomPren >= 40 ? (
                  <span className="text-emerald-400 font-medium">✓ Seawater & Critical Sour Gas Immune (PREN ≥ 40)</span>
                ) : calculatedCustomPren >= 32 ? (
                  <span className="text-cyan-400 font-medium">✓ High Marine & Brine Resistant (PREN ≥ 32)</span>
                ) : (
                  <span className="text-slate-400 font-medium">Standard Industrial Corrosion Resistance</span>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
