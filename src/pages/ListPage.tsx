import React, { useState, useMemo } from 'react';
import hotelsData from '../data/data.json';
import { HotelCard } from '../components/HotelCard';
import { FilterBar } from '../components/FilterBar';
import { StatsChart } from '../components/StatsChart';
import type { HotelItem, FilterState } from '../utils';
import { useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  MapPin,
  Compass,
  BarChart3,
  CheckCircle2,
  LayoutGrid,
} from 'lucide-react';

export const ListPage: React.FC = () => {
  const allHotels: HotelItem[] = hotelsData as HotelItem[];
  const [searchParams, setSearchParams] = useSearchParams();

  // Pure derived state from URL: 'list' (Rooms & Filters) or 'stats' (Market Chart & Analytics)
  const activeTab = searchParams.get('tab') === 'stats' ? 'stats' : 'list';

  const handleTabChange = (tab: 'list' | 'stats') => {
    if (tab === 'stats') {
      setSearchParams({ tab: 'stats' });
    } else {
      setSearchParams({});
    }
  };

  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    category: 'Tất cả',
    city: 'Tất cả',
    minPrice: 400000,
    maxPrice: 4000000,
    checkInDate: '',
    checkOutDate: '',
    guests: 1,
    sortBy: 'rating-desc',
  });

  // Extract unique cities
  const availableCities = useMemo(() => {
    return Array.from(new Set(allHotels.map((h) => h.city))).sort();
  }, [allHotels]);

  // Filtered & sorted hotels list
  const filteredHotels = useMemo(() => {
    return allHotels
      .filter((hotel) => {
        // Search term (name, address, amenities)
        if (filters.searchTerm.trim()) {
          const query = filters.searchTerm.toLowerCase();
          const matchName = hotel.name.toLowerCase().includes(query);
          const matchCity = hotel.city.toLowerCase().includes(query);
          const matchAddress = hotel.address.toLowerCase().includes(query);
          const matchAmenities = hotel.amenities.some((a) => a.toLowerCase().includes(query));
          if (!matchName && !matchCity && !matchAddress && !matchAmenities) {
            return false;
          }
        }

        // Category filter
        if (filters.category !== 'Tất cả' && hotel.category !== filters.category) {
          return false;
        }

        // City filter
        if (filters.city !== 'Tất cả' && hotel.city !== filters.city) {
          return false;
        }

        // Price range filter
        if (hotel.pricePerNight < filters.minPrice || hotel.pricePerNight > filters.maxPrice) {
          return false;
        }

        // Date range filter
        if (filters.checkInDate && hotel.availableFrom && hotel.availableFrom > filters.checkInDate) {
          return false;
        }
        if (filters.checkOutDate && hotel.availableTo && hotel.availableTo < filters.checkOutDate) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
        if (filters.sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
        return b.rating - a.rating;
      });
  }, [allHotels, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Hero Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-8 sm:p-12 mb-10 shadow-xl border border-emerald-700/50">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold backdrop-blur-md mb-4 border border-emerald-400/30">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Đề tài D=0: Đặt phòng Khách sạn/Homestay • Màu C=1: Emerald</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-white">
            Khám phá kỳ nghỉ mơ ước tại <span className="text-emerald-300">Việt Nam</span>
          </h1>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6 max-w-2xl">
            Tận hưởng không gian lưu trú độc đáo từ homestay bản địa mộc mạc, villa rừng thông đến resort biển 5 sao đẳng cấp với giá tốt nhất và xác nhận tức thì.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-200">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              22+ điểm lưu trú xác thực
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              Lọc theo khoảng giá & ngày
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              Biểu đồ trực quan dữ liệu
            </span>
          </div>
        </div>
      </section>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300/60 shadow-inner">
          <button
            type="button"
            onClick={() => handleTabChange('list')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'list'
                ? 'bg-white text-emerald-800 shadow-md shadow-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-4 h-4" aria-hidden="true" />
            <span>Khám phá & Bộ lọc</span>
            <span className="ml-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {filteredHotels.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('stats')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'stats'
                ? 'bg-white text-emerald-800 shadow-md shadow-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" aria-hidden="true" />
            <span>Biểu đồ thị trường (Chart.js)</span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Hiển thị theo chuẩn kiến trúc: <strong>1 Route / 1 Page File</strong>
        </div>
      </div>

      {/* TAB 1: ROOM LIST & FILTERS */}
      {activeTab === 'list' && (
        <section aria-label="Khu vực tìm kiếm và danh sách phòng">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Compass className="w-6 h-6 text-emerald-600" aria-hidden="true" />
              <span>Danh sách Khách sạn & Homestay</span>
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Hiển thị <strong className="text-emerald-700">{filteredHotels.length}</strong> / {allHotels.length} kết quả phù hợp
            </p>
          </div>

          {/* Filter Component (Tính năng 2: Lọc khoảng giá / ngày + Debounce) */}
          <FilterBar
            filters={filters}
            onFilterChange={setFilters}
            availableCities={availableCities}
            totalResults={filteredHotels.length}
          />

          {/* Hotel Cards Grid - Strict 3 Breakpoints */}
          {filteredHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Không tìm thấy địa điểm phù hợp</h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
                Rất tiếc không có khách sạn hoặc homestay nào phù hợp với bộ lọc hiện tại của bạn. Hãy thử thay đổi khoảng giá, ngày lưu trú hoặc từ khóa tìm kiếm.
              </p>
              <button
                type="button"
                onClick={() =>
                  setFilters({
                    searchTerm: '',
                    category: 'Tất cả',
                    city: 'Tất cả',
                    minPrice: 400000,
                    maxPrice: 4000000,
                    checkInDate: '',
                    checkOutDate: '',
                    guests: 1,
                    sortBy: 'rating-desc',
                  })
                }
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-sm"
              >
                Xóa bộ lọc
              </button>
            </div>
          )}
        </section>
      )}

      {/* TAB 2: MARKET STATS (CHART.JS) */}
      {activeTab === 'stats' && (
        <section aria-label="Báo cáo thống kê thị trường">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <BarChart3 className="w-5 h-5" aria-hidden="true" />
              </div>
              <span>Phân tích dữ liệu lưu trú & Giá phòng</span>
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
              Tổng hợp trực quan hóa bằng thư viện Chart.js về chi phí lưu trú trung bình giữa các vùng miền, cơ cấu phân bổ các loại hình du lịch và phân khúc ngân sách của 22 khách sạn & homestay thực tế.
            </p>
          </div>

          <StatsChart hotels={allHotels} />
        </section>
      )}
    </div>
  );
};
