import React, { useEffect, useState, useRef } from 'react';
import { isMobileApp } from '../utils/mobileUtils';
import { motion, PanInfo } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nums = [];
    for (let i = min; i <= max; i += step) {
      nums.push(i);
    }
    setValues(nums);
  }, [min, max, step]);

  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    if (!containerRef.current) return;
    
    const itemHeight = 60;
    const containerHeight = containerRef.current.offsetHeight;
    const centerY = containerHeight / 2;
    
    // Calculate the current position relative to the center
    const currentY = info.point.y - containerRef.current.getBoundingClientRect().top;
    const offsetY = currentY - centerY;
    
    // Calculate which item should be selected
    const itemIndex = Math.round(-offsetY / itemHeight);
    const boundedIndex = Math.max(0, Math.min(values.length - 1, itemIndex));
    
    // Add some momentum based on velocity
    const velocity = info.velocity.y;
    const momentumOffset = Math.round(velocity / 1000); // Adjust sensitivity
    const finalIndex = Math.max(0, Math.min(values.length - 1, boundedIndex + momentumOffset));
    
    onChange(values[finalIndex]);
  };

  const getCurrentValueIndex = () => {
    return values.findIndex(v => v === value);
  };

  const currentIndex = getCurrentValueIndex();
  const offsetY = currentIndex * 60;

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
    <div 
      ref={containerRef}
      className="relative h-[180px] overflow-hidden bg-[#1a1a1a] rounded-lg border border-[#2a2a2a]"
    >
      {/* Selection indicator */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="h-[60px] w-full bg-gradient-to-b from-[#1a1a1a]/80 via-transparent to-[#1a1a1a]/80 border-y border-[#e0b44a]/20" />
      </div>
      
      <motion.div
        className="h-full"
        drag="y"
        dragConstraints={{ top: -((values.length - 1) * 60), bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={true}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={{ y: -offsetY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{ 
          paddingTop: '60px', 
          paddingBottom: '60px',
          touchAction: 'pan-y'
        }}
      >
        {values.map((num, index) => (
          <div
            key={num}
            className={`h-[60px] flex items-center justify-center text-xl transition-colors ${
              num === value ? 'text-[#e0b44a] font-bold' : 'text-gray-400'
            }`}
            onClick={() => !isDragging && onChange(num)}
            style={{ touchAction: 'pan-y' }}
          >
            {formatValue(num)}
          </div>
        ))}
      </motion.div>
    </div>
  );
} 