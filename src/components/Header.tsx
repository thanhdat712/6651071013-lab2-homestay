import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, BarChart3, Home, Menu, X, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
              <Hotel className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                Emerald<span className="text-emerald-600">Stay</span>
              </span>
              <span className="hidden sm:block text-xs font-semibold text-emerald-700 tracking-wider uppercase">
                Khách sạn & Homestay Việt Nam
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Điều hướng chính">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60'
              }`}
            >
              <Home className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Khám phá & Đặt phòng</span>
            </Link>

            <Link
              to="/stats"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/stats')
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-sm'
                  : 'text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Biểu đồ thống kê</span>
            </Link>

            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>MSSV: 6651071013</span>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label={isMobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav
            className="md:hidden py-4 border-t border-emerald-100 space-y-2 animate-fadeIn"
            aria-label="Điều hướng trên điện thoại"
          >
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive('/')
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Home className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>Khám phá & Đặt phòng</span>
            </Link>

            <Link
              to="/stats"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive('/stats')
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-5 h-5 text-emerald-600" aria-hidden="true" />
              <span>Biểu đồ thống kê</span>
            </Link>

            <div className="px-4 py-2 pt-3 border-t border-slate-100 text-xs font-semibold text-emerald-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" aria-hidden="true" />
              <span>Dự án cá nhân MSSV 6651071013</span>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
