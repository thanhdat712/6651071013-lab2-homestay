import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Users, Bed, ArrowRight, ShieldCheck } from 'lucide-react';
import type { HotelItem } from '../types';
import { formatCurrency, truncateText } from '../utils';

interface HotelCardProps {
  hotel: HotelItem;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col">
      {/* Image & Badge Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={hotel.image}
          alt={hotel.alt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/90 text-white backdrop-blur-sm shadow-sm">
            {hotel.category}
          </span>
          {hotel.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/95 text-white backdrop-blur-sm shadow-sm flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
              Nổi bật
            </span>
          )}
        </div>

        {/* Rating overlay badge */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/95 text-slate-800 text-xs font-bold backdrop-blur-sm shadow-md">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" aria-hidden="true" />
          <span>{hotel.rating.toFixed(1)}</span>
          <span className="text-slate-600 font-normal">({hotel.reviewsCount})</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 mb-1.5">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">{hotel.city} • {truncateText(hotel.address, 28)}</span>
          </div>

          {/* Name */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mb-2">
            <Link to={`/item/${hotel.id}`} className="focus:outline-none focus:underline">
              {hotel.name}
            </Link>
          </h3>

          {/* Short description */}
          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {truncateText(hotel.description, 95)}
          </p>

          {/* Highlights & specs */}
          <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 mb-4 border-b border-slate-100">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              Tối đa {hotel.maxGuests} khách
            </span>
            <span className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              {hotel.bedrooms} phòng ngủ
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-slate-600 block">Giá từ</span>
            <div className="text-lg font-extrabold text-emerald-700">
              {formatCurrency(hotel.pricePerNight)}
              <span className="text-xs font-normal text-slate-600"> / đêm</span>
            </div>
          </div>

          <Link
            to={`/item/${hotel.id}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-600 hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label={`Xem chi tiết ${hotel.name}`}
          >
            <span>Chi tiết</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
};
