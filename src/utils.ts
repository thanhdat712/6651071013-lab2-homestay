// Type definitions for Hotel & Booking System
export interface HotelItem {
  id: string;
  name: string;
  category: 'Khách sạn' | 'Homestay' | 'Resort' | 'Villa';
  city: string;
  address: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  image: string;
  alt: string;
  description: string;
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  contactPhone: string;
  contactEmail: string;
  featured: boolean;
}

export interface FilterState {
  searchTerm: string;
  category: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  sortBy: 'price-asc' | 'price-desc' | 'rating-desc';
}

export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guestsCount: number;
  notes?: string;
}

// 4 Required Utility Functions according to Section III.4
export function formatCurrency(amount: number, currency: string = '₫'): string {
  const formattedNumber = amount.toLocaleString('vi-VN');
  return `${formattedNumber} ${currency}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return emailRegex.test(email);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  } as T;
}
