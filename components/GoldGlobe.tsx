import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the Globe component with SSR disabled
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#0d0d0d]">
      <div className="text-[#e0b44a]">Loading Globe...</div>
    </div>
  )
})

// Major gold regions (approximate coordinates with area coverage)
const GOLD_REGIONS = [
  {
    // North America (COMEX/NYSE region)
    coordinates: [
      [45, -130], [45, -70],
      [30, -70], [30, -130]
    ],
    name: 'North America'
  },
  {
    // Western Europe (London/Zurich)
    coordinates: [
      [55, -10], [55, 10],
      [45, 10], [45, -10]
    ],
    name: 'Western Europe'
  },
  {
    // East Asia (Tokyo/Shanghai)
    coordinates: [
      [45, 115], [45, 145],
      [30, 145], [30, 115]
    ],
    name: 'East Asia'
  },
  {
    // Middle East (Dubai)
    coordinates: [
      [30, 45], [30, 60],
      [20, 60], [20, 45]
    ],
    name: 'Middle East'
  },
  {
    // South Africa
    coordinates: [
      [-20, 15], [-20, 35],
      [-30, 35], [-30, 15]
    ],
    name: 'South Africa'
  },
  {
    // Australia
    coordinates: [
      [-25, 115], [-25, 155],
      [-35, 155], [-35, 115]
    ],
    name: 'Australia'
  }
];

interface GlobePolygon {
  coordinates: number[][];
  name: string;
}

interface GlobeData {
  polygons: GlobePolygon[];
}

export default function GoldGlobe() {
  const [globeSize, setGlobeSize] = useState(300)
  const globeRef = useRef<any>(null)
  const [globeData, setGlobeData] = useState<GlobeData>({
    polygons: []
  })

  // Handle window resize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setGlobeSize(window.innerWidth < 640 ? 280 : 300)
      }
      handleResize() // Set initial size
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Initialize globe data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGlobeData({ 
        polygons: GOLD_REGIONS
      })
    }
  }, [])

  return (
    <div className="w-full flex justify-center">
      <div className={`w-[${globeSize}px] h-[${globeSize}px] relative`}>
        {typeof window !== 'undefined' && (
          <Globe
            ref={globeRef}
            width={globeSize}
            height={globeSize}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            hexPolygonsData={globeData.polygons}
            hexPolygonResolution={3}
            hexPolygonMargin={0.3}
            hexPolygonColor={() => `rgba(255, 215, 0, 0.15)`}
            hexPolygonLabel={(d: any) => (d as GlobePolygon).name}
            backgroundColor="rgba(0,0,0,0)"
            atmosphereColor="#ffd70030"
            atmosphereAltitude={0.25}
          />
        )}
      </div>
    </div>
  )
} 