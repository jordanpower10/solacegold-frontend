import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format, fromUnixTime } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceData {
  dates: string[];
  prices: number[];
}

export default function GoldPriceChart() {
  const [chartData, setChartData] = useState<any>(null);
  const [timeframe, setTimeframe] = useState('1Y');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#e0b44a',
        bodyColor: '#fff',
        borderColor: '#2a2a2a',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems[0].label || '';
          },
          label: (context) => {
            return `€${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#666',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
      y: {
        grid: {
          color: '#2a2a2a',
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#666',
          callback: (value) => `€${value.toString()}`,
        },
      },
    },
  };

  useEffect(() => {
    fetchGoldData();
  }, [timeframe]);

  const getDaysFromTimeframe = () => {
    switch (timeframe) {
      case '1M': return 30;
      case '3M': return 90;
      case '6M': return 180;
      case '1Y': return 365;
      default: return 365;
    }
  };

  const fetchGoldData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const days = getDaysFromTimeframe();
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/tether-gold/market_chart?vs_currency=eur&days=${days}&interval=daily`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch gold price data');
      }

      const data = await response.json();
      const processedData = processChartData(data.prices);

      setChartData({
        labels: processedData.dates,
        datasets: [
          {
            label: 'Gold Price (EUR/oz)',
            data: processedData.prices,
            borderColor: '#e0b44a',
            backgroundColor: 'rgba(224, 180, 74, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#e0b44a',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2,
          },
        ],
      });
    } catch (err) {
      setError('Failed to load gold price data. Please try again later.');
      console.error('Error fetching gold price data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const processChartData = (priceData: [number, number][]): PriceData => {
    return {
      dates: priceData.map(([timestamp]) => format(fromUnixTime(timestamp / 1000), 'MMM d')),
      prices: priceData.map(([, price]) => price)
    };
  };

  return (
    <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-4xl">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-[#e0b44a]">Gold Price Chart</h2>
        <div className="flex gap-2">
          {['1M', '3M', '6M', '1Y'].map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                timeframe === period
                  ? 'bg-[#e0b44a] text-black'
                  : 'bg-[#2a2a2a] text-gray-400 hover:bg-[#3a3a3a]'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e0b44a]"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center text-red-400">
            {error}
          </div>
        ) : chartData ? (
          <Line data={chartData} options={options} />
        ) : null}
      </div>
    </div>
  )
}