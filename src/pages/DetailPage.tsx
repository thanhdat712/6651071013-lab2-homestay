import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import type { HotelItem } from '../types';
import hotelsData from '../data/data.json';
import { BookingModal } from '../components/BookingModal';
import { HotelCard } from '../components/HotelCard';
import { formatCurrency } from '../utils';
import {
  ArrowLeft,
  MapPin,
  Star,
  Users,
  Bed,
  Bath,
  Check,
  Calendar,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allHotels: HotelItem[] = hotelsData as HotelItem[];
  const hotel = allHotels.find((h) => h.id === id);

  if (!hotel) {
    return <Navigate to="/" replace />;
  }

  // Similar hotels (same category or city)
  const similarHotels = allHotels
    .filter((h) => h.id !== hotel.id && (h.city === hotel.city || h.category === hotel.category))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-900 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Quay lại danh sách phòng</span>
        </Link>
      </div>

      {/* Main Hotel Overview */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Main Image Banner */}
          <div className="lg:col-span-7 relative aspect-[16/11] lg:aspect-auto overflow-hidden bg-slate-100">
            <img
              src={hotel.image}
              alt={hotel.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-md">
                {hotel.category}
              </span>
              {hotel.featured && (
                <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-white shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                  Nổi bật
                </span>
              )}
            </div>
          </div>

          {/* Hotel Details Panel */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              {/* Rating & reviews */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" aria-hidden="true" />
                  <span>{hotel.rating.toFixed(1)} / 5.0</span>
                </div>
                <span className="text-xs text-slate-500">
                  ({hotel.reviewsCount} lượt đánh giá thực tế từ khách du lịch)
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
                {hotel.name}
              </h1>

              {/* Location */}
              <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-6">
                <MapPin className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{hotel.address}</span>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100 text-center mb-6">
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <Users className="w-5 h-5 text-emerald-600 mx-auto mb-1" aria-hidden="true" />
                  <span className="text-xs font-bold text-slate-800 block">Tối đa {hotel.maxGuests} khách</span>
                  <span className="text-[10px] text-slate-500">Phù hợp gia đình</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <Bed className="w-5 h-5 text-emerald-600 mx-auto mb-1" aria-hidden="true" />
                  <span className="text-xs font-bold text-slate-800 block">{hotel.bedrooms} phòng ngủ</span>
                  <span className="text-[10px] text-slate-500">Giường đệm êm</span>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-xl">
                  <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" aria-hidden="true" />
                  <span className="text-xs font-bold text-slate-800 block">{hotel.bathrooms} phòng tắm</span>
                  <span className="text-[10px] text-slate-500">Nước nóng 24/7</span>
                </div>
              </div>

              {/* Availability Period */}
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-6 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                <Calendar className="w-4 h-4 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                <span>
                  Thời gian nhận phòng khả dụng:{' '}
                  <strong className="text-emerald-800">{hotel.availableFrom}</strong> đến{' '}
                  <strong className="text-emerald-800">{hotel.availableTo}</strong>
                </span>
              </div>
            </div>

            {/* Price Box & Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Giá trọn gói mỗi đêm</span>
                <div className="text-2xl font-black text-emerald-700">
                  {formatCurrency(hotel.pricePerNight)}
                  <span className="text-xs font-normal text-slate-500"> / đêm</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-600/25 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Đặt phòng ngay</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Content & Amenities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Description & Story */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Giới thiệu về không gian & trải nghiệm
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {hotel.description}
            </p>
          </div>

          {/* Amenities Checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
              Tiện nghi & Dịch vụ nổi bật
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {hotel.amenities.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Contact & Host Information */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-4">Thông tin liên hệ & Hỗ trợ</h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Hotline đặt phòng</span>
                  <a
                    href={`tel:${hotel.contactPhone.replace(/\s/g, '')}`}
                    className="font-bold text-emerald-700 hover:underline"
                  >
                    {hotel.contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Email xác nhận</span>
                  <a
                    href={`mailto:${hotel.contactEmail}`}
                    className="font-semibold text-slate-800 hover:text-emerald-700"
                  >
                    {hotel.contactEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 leading-relaxed space-y-2">
              <p>✔ Miễn phí hủy phòng trong vòng 48h trước giờ nhận phòng.</p>
              <p>✔ Nhận phòng từ 14:00, trả phòng trước 12:00 trưa hôm sau.</p>
              <p>✔ Xuất hóa đơn VAT theo yêu cầu doanh nghiệp.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Similar / Recommended hotels section */}
      {similarHotels.length > 0 && (
        <section aria-label="Gợi ý phòng tương tự" className="mt-16">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Điểm lưu trú tương tự có thể bạn sẽ thích
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Khám phá thêm các khách sạn, homestay cùng khu vực {hotel.city} hoặc cùng loại hình
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarHotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>
        </section>
      )}

      {/* Booking Modal */}
      <BookingModal
        hotel={hotel}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
