
import { type SVGProps } from 'react';

export enum ItemCategory {
  FOOD = 'Food & Groceries',
  ELECTRONICS = 'Electronics',
  CLOTHING = 'Apparel & Accessories',
  HOME_GOODS = 'Home Goods',
  TOOLS_HARDWARE = 'Tools & Hardware',
  HEALTH_BEAUTY = 'Health & Beauty',
  BOOKS_MEDIA = 'Books & Media',
  SPORTS_OUTDOORS = 'Sports & Outdoors',
  TOYS_GAMES = 'Toys & Games',
  AUTOMOTIVE = 'Automotive',
  PET_SUPPLIES = 'Pet Supplies',
  OFFICE_SUPPLIES = 'Office Supplies',
  OTHER = 'Other',
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  photo?: string; // base64 string
  purchaseDate: string; // ISO date string
  targetDate?: string; // ISO date string (optional)
  category: string; // Changed from ItemCategory to string
  notificationSound: string; 
}

export interface Category {
  id: string; // Changed from ItemCategory to string
  name: string;
  icon: (props: SVGProps<SVGSVGElement>) => React.ReactNode;
}

export interface SoundOption {
  id: string;
  name: string;
  filePath?: string; // Optional: path to an actual sound file
}
