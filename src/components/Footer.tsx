import React from 'react';
import { Hotel, Heart, MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Hotel className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Emerald<span className="text-emerald-400">Stay</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Nền tảng đặt phòng khách sạn, resort, homestay & biệt thự cao cấp hàng đầu tại các địa điểm du lịch nổi tiếng Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800 px-3 py-1.5 rounded-md w-fit">
              <span>Đề tài cá nhân: Đặt phòng Khách sạn/Homestay</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition-colors">
                  Danh sách khách sạn & homestay
                </Link>
              </li>
              <li>
                <Link to="/?tab=stats" className="hover:text-emerald-400 transition-colors">
                  Thống kê thị trường & giá phòng
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Chính sách đặt & hủy phòng</span>
              </li>
              <li>
                <span className="text-slate-500">Hỗ trợ khách hàng 24/7</span>
              </li>
            </ul>
          </div>

          {/* Assignment & Student metadata */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Thông tin đồ án thực hành
            </h3>
            <div className="text-sm space-y-2.5 text-slate-400">
              <p className="flex items-center gap-2">
                <strong className="text-white">MSSV:</strong> 6651071013
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-white">Môn học:</strong> Thiết kế Web - Thực hành Lab 2
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-white">Chủ đề (D=0):</strong> Đặt phòng khách sạn/homestay
              </p>
              <p className="flex items-center gap-2">
                <strong className="text-white">Màu chủ đạo (C=1):</strong> Emerald (#059669)
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  Việt Nam
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  1900 6868
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                  contact@emeraldstay.vn
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 EmeraldStay. Thiết kế và phát triển bởi SV 6651071013.</p>
          <p className="flex items-center gap-1">
            Xây dựng với <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" aria-hidden="true" /> React 18, Vite & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
