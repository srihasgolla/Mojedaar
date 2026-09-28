export type ScreenType = 'home' | 'shop' | 'product' | 'cart';

export interface Product {
  id: string;
  name: string;
  category: 'ankle' | 'crew' | 'noshow';
  categoryLabel: string;
  moods: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  subtitle: string;
  badge?: string;
  badgeType?: 'new' | 'bestseller' | 'lowstock' | 'limited' | 'fresh' | 'hot';
  image: string;
  bgColor: string;
  icon: string;
  popularity: number;
  description: string;
  fabricDetails: string;
  galleryImages: {
    label: string;
    url: string;
    bgColor: string;
  }[];
  lengthOptions: {
    id: string;
    label: string;
    sublabel: string;
    price: number;
    originalPrice: number;
  }[];
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  style: string;
  price: number;
  quantity: number;
  image: string;
  icon: string;
  bgColor: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  timeAgo: string;
  verified: boolean;
  avatarLetter: string;
  avatarBg: string;
}
