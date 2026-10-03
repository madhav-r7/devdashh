import React, { useState } from 'react';
import { 
  ArrowDown, 
  Check, 
  Code2
} from 'lucide-react';
import { EVIDENCE_GRAPH_DATA } from '../data/mockData';

export default function EvidenceGraphView({ selectedSkillFilter = 'all' }) {
  const [activeFilter, setActiveFilter] = useState(selectedSkillFilter);

  const filteredData = activeFilter === 'all' 
    ? EVIDENCE_GRAPH_DATA 
    : EVIDENCE_GRAPH_DATA.filter(d => d.skillName.toLowerCase().includes(activeFilter.toLowerCase()) || d.skillId === activeFilter);

  return (
    <div className="p-8 sm:p-12 max-w-7xl mx-auto space-y-10 animate-fadeIn">
      
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/[0.12]">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight font-display">
            Evidence Graph
          </h1>
          <p className="text-white/90 text-lg sm:text-xl mt-2 font-display">
            Proof dependency trees connecting skills to repositories, test suites, and audit records.
          </p>
        </div>

        {/* Skill Filter Buttons */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-mono shrink-0 transition-all border ${
              activeFilter === 'all'
                ? 'bg-white text-black border-white font-bold shadow-md'
                : 'bg-white/[0.05] text-white/80 border-white/[0.16] hover:text-white hover:bg-white/[0.12] hover:border-white/30'
            }`}
          >
            All Skills (4 Trees)
          </button>
          {EVIDENCE_GRAPH_DATA.map((item) => (
            <button
              key={item.skillId}
              onClick={() => setActiveFilter(item.skillId)}
              className={`px-4 py-2 rounded-xl text-sm font-mono shrink-0 transition-all border ${
                activeFilter === item.skillId
                  ? 'bg-white text-black border-white font-bold shadow-md'
                  : 'bg-white/[0.05] text-white/80 border-white/[0.16] hover:text-white hover:bg-white/[0.12] hover:border-white/30'
              }`}
            >
              {item.skillName}
            </button>
          ))}
        </div>
      </div>

      {/* 2. GRAPH TREES */}
      <div className="space-y-8">
        {filteredData.map((tree) => (
          <div 
            key={tree.skillId}
            className="mono-card p-8 sm:p-10 space-y-6 border-white/[0.18] shadow-2xl"
          >
            {/* Root Node: Skill */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-5 rounded-2xl bg-white/[0.08] border border-white/[0.2] shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-white/[0.12] border border-white/[0.3] flex items-center justify-center text-white font-mono shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-white/80 uppercase tracking-wider font-semibold">ROOT SKILL</div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">{tree.skillName}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-sm">
                <span className="text-white/80 font-medium">Verified Score:</span>
                <span className="text-white font-bold text-lg">{tree.score}%</span>
                <div className="w-28 bg-white/[0.15] rounded-full h-2 overflow-hidden">
                  <div className="bg-white h-full shadow-[0_0_10px_#ffffff]" style={{ width: `${tree.score}%` }} />
                </div>
              </div>
            </div>

            {/* Downward Branching Visual */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2.5 text-xs font-mono text-white uppercase tracking-wider font-bold">
                <ArrowDown className="w-4 h-4 text-white" />
                <span>EVIDENCE PROOF POINTS</span>
                <ArrowDown className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Child Evidence Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {tree.connections.map((conn, idx) => (
                <div
                  key={idx}
                  className="mono-card p-5 border-white/[0.14] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-white mb-2 uppercase tracking-wider font-semibold">
                      <span>{conn.role}</span>
                      <span>NODE #0{idx + 1}</span>
                    </div>

                    <h4 className="font-bold text-white text-base sm:text-lg font-display">
                      {conn.name}
                    </h4>

                    {conn.score && (
                      <div className="mt-3 p-2.5 rounded-xl bg-white/[0.08] border border-white/[0.16] text-sm font-mono text-white font-bold">
                        {conn.score}
                      </div>
                    )}

                    {conn.proofPoints && (
                      <ul className="mt-3 space-y-2 text-sm text-white/90 font-body">
                        {conn.proofPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-white shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/[0.1] text-xs text-white font-mono flex items-center justify-between">
                    <span>Audit Status</span>
                    <span className="text-white font-bold">✓ Verified</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
