export type ScreenType = 'home' | 'shop' | 'product' | 'cart' | 'feedback';

export interface FeedbackSubmission {
  id: string;
  orderId?: string;
  customerName: string;
  socksRating: number; // 1 to 5 socks
  socksRatingLabel: string;
  vibeTag: string;
  favoriteAspect: string;
  nextDesignWish: string;
  reviewText: string;
  submittedAt: string;
  verifiedOrder: boolean;
}

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
