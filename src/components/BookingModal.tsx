import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Calendar, User, Mail, Phone, Clock } from 'lucide-react';
import { formatCurrency, validateEmail } from '../utils';
import type { HotelItem, BookingFormData } from '../utils';

interface BookingModalProps {
  hotel: HotelItem;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ hotel, isOpen, onClose }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: hotel.availableFrom || '',
    checkOutDate: '',
    guestsCount: 2,
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape & Focus trap
  useEffect(() => {
    if (!isOpen) return;

    // Focus first input on open
    const timeout = setTimeout(() => {
      firstInputRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Trap focus
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ (ví dụ: ten@domain.com)';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9+]{9,13}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại từ 9 đến 12 chữ số';
    }

    if (!formData.checkInDate) {
      newErrors.checkInDate = 'Vui lòng chọn ngày nhận phòng';
    }

    if (!formData.checkOutDate) {
      newErrors.checkOutDate = 'Vui lòng chọn ngày trả phòng';
    } else if (formData.checkInDate && formData.checkOutDate <= formData.checkInDate) {
      newErrors.checkOutDate = 'Ngày trả phòng phải sau ngày nhận phòng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setBookingCode(`EMS-${randomNum}`);
      setIsSubmitted(true);
    }
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setErrors({});
    onClose();
  };

  // Calculate nights & total
  const nights =
    formData.checkInDate && formData.checkOutDate && formData.checkOutDate > formData.checkInDate
      ? Math.ceil(
          (new Date(formData.checkOutDate).getTime() - new Date(formData.checkInDate).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  const totalPrice = hotel.pricePerNight * nights;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col"
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-6 py-4 border-b border-slate-100 flex items-center justify-between z-10">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">
              Đặt phòng tại {hotel.name}
            </h2>
            <p className="text-xs text-emerald-700 font-medium">
              {hotel.city} • Giá: {formatCurrency(hotel.pricePerNight)} / đêm
            </p>
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Đóng hộp thoại đặt phòng"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Đặt phòng thành công!</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Cảm ơn quý khách <strong className="text-slate-800">{formData.fullName}</strong>. Xác nhận đặt phòng đã được gửi tới email <strong className="text-emerald-700">{formData.email}</strong>.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl text-left text-xs space-y-2 border border-slate-100 mb-6">
                <div className="flex justify-between">
                  <span className="text-slate-500">Mã đặt phòng:</span>
                  <span className="font-mono font-bold text-slate-800">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Thời gian lưu trú:</span>
                  <span className="font-semibold text-slate-800">{formData.checkInDate} → {formData.checkOutDate} ({nights} đêm)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tổng thanh toán:</span>
                  <span className="font-bold text-emerald-700">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20"
              >
                Hoàn tất
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="full-name" className="block text-xs font-semibold text-slate-700 mb-1">
                  Họ và tên khách hàng *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    ref={firstInputRef}
                    id="full-name"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="booking-email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Địa chỉ Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ban@example.com"
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-semibold text-slate-700 mb-1">
                    Số điện thoại *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912345678"
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="booking-checkin" className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày nhận phòng *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-checkin"
                      type="date"
                      value={formData.checkInDate}
                      onChange={(e) => setFormData({ ...formData, checkInDate: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.checkInDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.checkInDate && <p className="text-xs text-rose-500 mt-1">{errors.checkInDate}</p>}
                </div>

                <div>
                  <label htmlFor="booking-checkout" className="block text-xs font-semibold text-slate-700 mb-1">
                    Ngày trả phòng *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-checkout"
                      type="date"
                      value={formData.checkOutDate}
                      min={formData.checkInDate}
                      onChange={(e) => setFormData({ ...formData, checkOutDate: e.target.value })}
                      className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        errors.checkOutDate ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      }`}
                    />
                  </div>
                  {errors.checkOutDate && <p className="text-xs text-rose-500 mt-1">{errors.checkOutDate}</p>}
                </div>
              </div>

              {/* Guests */}
              <div>
                <label htmlFor="guests-count" className="block text-xs font-semibold text-slate-700 mb-1">
                  Số lượng khách (tối đa {hotel.maxGuests} người)
                </label>
                <select
                  id="guests-count"
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {Array.from({ length: hotel.maxGuests }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} khách
                    </option>
                  ))}
                </select>
              </div>

              {/* Pricing calculation summary */}
              <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Giá 1 đêm:</span>
                  <span>{formatCurrency(hotel.pricePerNight)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Số đêm tạm tính:</span>
                  <span>{nights} đêm</span>
                </div>
                <div className="flex items-center justify-between font-bold text-slate-900 pt-1.5 border-t border-emerald-200 text-sm">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-emerald-700">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Xác nhận đặt phòng</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
