import React from 'react';

interface MirrorAIReportProps {
  onViewReports: () => void;
  onGenerateNew: () => void;
  reportCount?: number;
}

export default function MirrorAIReport({ onViewReports, onGenerateNew, reportCount = 0 }: MirrorAIReportProps) {
  return (
    <div className="bg-[#0d1f0d] rounded-xl border border-[#1a3f1a] p-6 w-full max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[#1a3f1a] p-2 rounded-lg">
          <svg className="w-5 h-5 text-[#4ade80]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Mirror AI Report</h3>
          <p className="text-sm text-[#4ade80]">Elite Plan</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">Report Frequency:</p>
        <span className="text-sm text-[#4ade80]">Unlimited reports (Admin)</span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onViewReports}
          className="w-full bg-[#1a3f1a] hover:bg-[#2a4f2a] text-[#4ade80] py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>View Reports ({reportCount})</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
        
        <button
          onClick={onGenerateNew}
          className="w-full bg-[#4ade80] hover:bg-[#3fcf73] text-black py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>Generate New</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  );
} 