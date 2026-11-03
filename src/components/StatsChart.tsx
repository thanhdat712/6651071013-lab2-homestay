import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import type { HotelItem } from '../types';
import { formatCurrency } from '../utils';
import { TrendingUp, PieChart as PieIcon, DollarSign, Award } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface StatsChartProps {
  hotels: HotelItem[];
}

export const StatsChart: React.FC<StatsChartProps> = ({ hotels }) => {
  // 1. Calculate Average Price by City
  const cityPriceMap = hotels.reduce((acc, h) => {
    if (!acc[h.city]) {
      acc[h.city] = { total: 0, count: 0 };
    }
    acc[h.city].total += h.pricePerNight;
    acc[h.city].count += 1;
    return acc;
  }, {} as Record<string, { total: number; count: number }>);

  const cityLabels = Object.keys(cityPriceMap);
  const cityAvgPrices = cityLabels.map((c) =>
    Math.round(cityPriceMap[c].total / cityPriceMap[c].count)
  );

  // 2. Count by Category
  const categoryCountMap = hotels.reduce((acc, h) => {
    acc[h.category] = (acc[h.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryLabels = Object.keys(categoryCountMap);
  const categoryCounts = categoryLabels.map((cat) => categoryCountMap[cat]);

  // 3. Price Brackets
  const brackets = {
    'Dưới 1 triệu': 0,
    '1 - 2 triệu': 0,
    '2 - 3 triệu': 0,
    'Trên 3 triệu': 0,
  };

  hotels.forEach((h) => {
    if (h.pricePerNight < 1000000) brackets['Dưới 1 triệu']++;
    else if (h.pricePerNight <= 2000000) brackets['1 - 2 triệu']++;
    else if (h.pricePerNight <= 3000000) brackets['2 - 3 triệu']++;
    else brackets['Trên 3 triệu']++;
  });

  // KPI Calculations
  const totalCount = hotels.length;
  const overallAvgPrice =
    totalCount > 0 ? hotels.reduce((s, h) => s + h.pricePerNight, 0) / totalCount : 0;
  const overallAvgRating =
    totalCount > 0 ? hotels.reduce((s, h) => s + h.rating, 0) / totalCount : 0;
  const topRated = [...hotels].sort((a, b) => b.rating - a.rating)[0];

  // Chart 1: Bar chart data (City prices)
  const barChartData = {
    labels: cityLabels,
    datasets: [
      {
        label: 'Giá trung bình (VND)',
        data: cityAvgPrices,
        backgroundColor: '#059669', // Emerald primary C=1
        borderRadius: 8,
        hoverBackgroundColor: '#047857',
      },
    ],
  };

  // Chart 2: Doughnut data (Category distribution)
  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: categoryCounts,
        backgroundColor: ['#059669', '#10b981', '#34d399', '#065f46'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  // Chart 3: Line / Bar for Price brackets
  const bracketData = {
    labels: Object.keys(brackets),
    datasets: [
      {
        label: 'Số lượng cơ sở lưu trú',
        data: Object.values(brackets),
        borderColor: '#059669',
        backgroundColor: 'rgba(5, 150, 105, 0.15)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#059669',
        pointRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Tổng điểm lưu trú</p>
            <p className="text-2xl font-black text-slate-900">{totalCount}</p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">Khắp các tỉnh thành VN</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Giá bình quân / đêm</p>
            <p className="text-xl font-black text-slate-900">{formatCurrency(overallAvgPrice)}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Phù hợp mọi ngân sách</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Điểm đánh giá TB</p>
            <p className="text-2xl font-black text-slate-900">{overallAvgRating.toFixed(2)} / 5.0</p>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Chất lượng dịch vụ chuẩn</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <PieIcon className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium">Top đánh giá cao nhất</p>
            <p className="text-sm font-bold text-slate-900 truncate max-w-[140px]">
              {topRated ? topRated.name : '—'}
            </p>
            <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
              {topRated ? `${topRated.rating} sao (${topRated.city})` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart: Price by City */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            Giá phòng trung bình theo địa điểm (VND)
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            So sánh chi phí lưu trú trung bình giữa các thành phố du lịch trọng điểm
          </p>
          <div className="h-72">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Giá TB: ${formatCurrency(Number(context.raw))}`,
                    },
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${Number(value) / 1000}k`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Doughnut Chart: Category Distribution */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            Cơ cấu loại hình lưu trú
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Tỷ lệ giữa Khách sạn, Homestay, Resort và Villa trong hệ thống
          </p>
          <div className="h-72 flex items-center justify-center">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      padding: 16,
                      usePointStyle: true,
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Line Chart: Price Brackets Distribution */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
            Phân bố số lượng phòng theo phân khúc ngân sách
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Số lượng điểm lưu trú sẵn có theo các khoảng giá (từ bình dân đến cao cấp)
          </p>
          <div className="h-64">
            <Line
              data={bracketData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
