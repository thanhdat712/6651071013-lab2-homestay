import React, { useState, useMemo } from 'react';
import { Search, Calendar, DollarSign, SlidersHorizontal, RotateCcw, Building2 } from 'lucide-react';
import { debounce, formatCurrency } from '../utils';
import type { FilterState } from '../utils';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  availableCities: string[];
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  availableCities,
  totalResults,
}) => {
  const [searchInput, setSearchInput] = useState(filters.searchTerm);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Debounced search term updater (300ms)
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        onFilterChange({ ...filters, searchTerm: term });
      }, 300),
    [filters, onFilterChange]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchInput(val);
    debouncedSearch(val);
  };

  const categories = ['Tất cả', 'Khách sạn', 'Homestay', 'Resort', 'Villa'];

  const handleReset = () => {
    setSearchInput('');
    onFilterChange({
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
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/90 mb-8">
      {/* Top Search & Primary Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
        {/* Keyword Search with Debounce 300ms */}
        <div className="relative">
          <label htmlFor="search-input" className="block text-xs font-semibold text-slate-700 mb-1">
            Tìm kiếm khách sạn / homestay
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="search-input"
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Tên, địa chỉ, tiện ích..."
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* City / Location */}
        <div>
          <label htmlFor="city-select" className="block text-xs font-semibold text-slate-700 mb-1">
            Điểm đến / Tỉnh thành
          </label>
          <select
            id="city-select"
            value={filters.city}
            onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          >
            <option value="Tất cả">Tất cả địa điểm</option>
            {availableCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Date Filter: Check-in */}
        <div>
          <label htmlFor="check-in-date" className="block text-xs font-semibold text-slate-700 mb-1">
            Ngày nhận phòng
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="check-in-date"
              type="date"
              value={filters.checkInDate}
              onChange={(e) => onFilterChange({ ...filters, checkInDate: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Date Filter: Check-out */}
        <div>
          <label htmlFor="check-out-date" className="block text-xs font-semibold text-slate-700 mb-1">
            Ngày trả phòng
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
            <input
              id="check-out-date"
              type="date"
              value={filters.checkOutDate}
              min={filters.checkInDate || undefined}
              onChange={(e) => onFilterChange({ ...filters, checkOutDate: e.target.value })}
              className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Category Pills & Advanced Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Lọc theo loại hình">
          <Building2 className="w-4 h-4 text-slate-400 mr-1 hidden sm:inline" aria-hidden="true" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onFilterChange({ ...filters, category: cat })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showAdvanced ? 'Thu gọn bộ lọc' : 'Lọc khoảng giá & Sắp xếp'}</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label="Đặt lại bộ lọc tìm kiếm"
            title="Đặt lại toàn bộ bộ lọc"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Advanced Price Range & Sort Expandable Panel */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/70 p-4 rounded-xl animate-fadeIn">
          {/* Price Range Filter */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Khoảng giá mỗi đêm:
              </span>
              <span className="text-xs font-bold text-emerald-700">
                {formatCurrency(filters.minPrice)} — {formatCurrency(filters.maxPrice)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label htmlFor="min-price-input" className="text-[11px] text-slate-500 block mb-0.5">
                  Tối thiểu (VND)
                </label>
                <input
                  id="min-price-input"
                  type="number"
                  step="100000"
                  min="0"
                  max={filters.maxPrice}
                  value={filters.minPrice}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      minPrice: Math.max(0, Number(e.target.value)),
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="max-price-input" className="text-[11px] text-slate-500 block mb-0.5">
                  Tối đa (VND)
                </label>
                <input
                  id="max-price-input"
                  type="number"
                  step="100000"
                  min={filters.minPrice}
                  max="10000000"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      maxPrice: Math.max(filters.minPrice, Number(e.target.value)),
                    })
                  }
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
            {/* Range slider for rapid adjustment */}
            <input
              type="range"
              min="500000"
              max="4000000"
              step="100000"
              value={filters.maxPrice}
              onChange={(e) =>
                onFilterChange({ ...filters, maxPrice: Number(e.target.value) })
              }
              aria-label="Điều chỉnh mức giá tối đa"
              className="w-full mt-3 accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Sort By */}
          <div>
            <label htmlFor="sort-select" className="block text-xs font-semibold text-slate-700 mb-1">
              Sắp xếp theo
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sortBy: e.target.value as FilterState['sortBy'],
                })
              }
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="rating-desc">Đánh giá cao nhất (sao)</option>
              <option value="price-asc">Giá từ thấp đến cao</option>
              <option value="price-desc">Giá từ cao đến thấp</option>
            </select>

            <div className="mt-3 text-xs text-slate-500">
              Đang hiển thị <span className="font-bold text-emerald-700">{totalResults}</span> điểm lưu trú phù hợp.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
