import React from 'react';
import { Link } from 'react-router-dom';
import hotelsData from '../data/data.json';
import type { HotelItem } from '../types';
import { StatsChart } from '../components/StatsChart';
import { ArrowLeft, BarChart3, Sparkles } from 'lucide-react';

export const StatsPage: React.FC = () => {
  const allHotels: HotelItem[] = hotelsData as HotelItem[];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Navigation header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Về trang khám phá & đặt phòng</span>
        </Link>

        <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
          <span>Tính năng F=3: Biểu đồ thống kê trực quan (Chart.js)</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20">
            <BarChart3 className="w-6 h-6" aria-hidden="true" />
          </div>
          <span>Báo cáo & Thống kê thị trường Lưu trú</span>
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          Tổng hợp dữ liệu chi phí lưu trú bình quân theo từng vùng miền, cơ cấu phân bổ các loại hình du lịch nghỉ dưỡng và phân bố theo ngân sách của 22+ cơ sở lưu trú hàng đầu Việt Nam.
        </p>
      </div>

      {/* Main Charts & Analytics Section */}
      <StatsChart hotels={allHotels} />
    </div>
  );
};
