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
