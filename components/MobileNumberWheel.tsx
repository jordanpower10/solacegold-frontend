import React, { useEffect, useState } from 'react';
import { isMobileApp } from '../utils/mobileUtils';
import { motion } from 'framer-motion';

interface MobileNumberWheelProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
}

export default function MobileNumberWheel({
  min,
  max,
  step,
  value,
  onChange,
  formatValue = (val) => val.toString()
}: MobileNumberWheelProps) {
  const [values, setValues] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const nums = [];
    for (let i = min; i <= max; i += step) {
      nums.push(i);
    }
    setValues(nums);
  }, [min, max, step]);

  if (!isMobileApp()) {
    return (
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#e0b44a] transition-colors"
      />
    );
  }

  return (
    <div className="relative h-[180px] overflow-hidden bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[60px] w-full bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]/80 border-y border-[#e0b44a]/20" />
      </div>
      
      <motion.div
        className="h-full overflow-y-scroll no-scrollbar touch-pan-y"
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={(_, info) => {
          setIsDragging(false);
          const velocity = info.velocity.y;
          const movement = info.offset.y;
          
          // Calculate the closest value based on movement
          const itemHeight = 60;
          const index = Math.round(-movement / itemHeight);
          const boundedIndex = Math.max(0, Math.min(values.length - 1, index));
          
          onChange(values[boundedIndex]);
        }}
      >
        <div className="py-[60px]">
          {values.map((num) => (
            <div
              key={num}
              className={`h-[60px] flex items-center justify-center text-xl ${
                num === value ? 'text-[#e0b44a] font-bold' : 'text-gray-400'
              }`}
              onClick={() => !isDragging && onChange(num)}
            >
              {formatValue(num)}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 