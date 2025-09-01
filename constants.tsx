
import React, { type SVGProps } from 'react';
import { ItemCategory, Category, SoundOption } from './types';

// Heroicons (Outline) SVGs as React components
const AcademicCapIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.25c2.773 0 5.491-.635 8.231-1.761a60.436 60.436 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.75c2.996 0 5.792.645 8.449 1.786a50.637 50.637 0 0 0-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

const BoltIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
  </svg>
);

const ShoppingBagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>
);

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

const WrenchScrewdriverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.527-1.04 1.526-1.556 2.631-1.268l-.744-.744a2.652 2.652 0 0 0-3.752-3.752l-.743-.744c.288-1.106-.23-2.105-1.268-2.631L3 3l2.496 3.03L3 11.42 11.42 15.17Z" />
  </svg>
);

const HeartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
);

const GiftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.035 1.285-.535 1.285a1.125 1.125 0 0 1-.928-.549l-.321-.642a3 3 0 0 0-2.226-1.617l-.494-.125a2.25 2.25 0 0 1-1.528-.21l-.327-.155A2.25 2.25 0 0 0 5.334 8.41l-.256-.256a2.25 2.25 0 0 1 0-3.182l.006-.006a2.25 2.25 0 0 0 .19-.288C5.884 3.452 6.558 3 7.5 3h5.25Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.031c0-.102.034-.2.102-.284A2.253 2.253 0 0 0 12 2.25c-.29 0-.57.053-.825.15L12 3.031Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75h6m-6 3h6m-6-3v3.375c0 .621.504 1.125 1.125 1.125h3.75c.621 0 1.125-.504 1.125-1.125V12.75m0 0A2.25 2.25 0 0 0 13.5 15h.75a2.25 2.25 0 0 0 2.25-2.25V12a2.25 2.25 0 0 0-2.25-2.25h-1.5m-3 4.5v.75c0 .621.504 1.125 1.125 1.125h1.5" />
  </svg>
);


export const QuestionMarkCircleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

const TagIcon = (props: SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h13.5m-13.5 7.5h13.5m-1.875-3.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m0 0h.008v.008H12v-.008Zm0 0H12m6.375 0H12m0 0h-.375m.375 0h.375m-3.375 0h.375m-3.75 0h.375M9 12h1.5M9 12H7.5m9 0h1.5m-1.5 0H15M9 8.25h1.5M9 8.25H7.5m9 0h1.5m-1.5 0H15m-6.75 0h1.5m-1.5 0H12" />
</svg>
);


const CakeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H4.5a1.5 1.5 0 0 1-1.5-1.5V11.25m18 0a18.021 18.021 0 0 0-1.398-7.365L18.375 2.25l-2.29.916a17.908 17.908 0 0 1-10.17 0L3.625 2.25 2.102 3.885A18.022 18.022 0 0 0 3 11.25m18 0c0 .38-.02.755-.057 1.125H3.057A32.203 32.203 0 0 1 3 11.25m18 0v-1.125c0-.621-.504-1.125-1.125-1.125H4.125C3.504 9 3 9.504 3 10.125V11.25m6.75 7.5H14.25" />
  </svg>
);

const GlobeAltIcon = (props: SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0 1 12 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3.284 14.253A11.978 11.978 0 0 0 12 16.5c2.998 0 5.74-1.1 7.843-2.918M3.284 14.253A8.959 8.959 0 0 0 3 12c0-.778.099-1.533.284-2.253m0 0A11.953 11.953 0 0 0 12 10.5c2.998 0 5.74-1.1 7.843-2.918M3.284 9.747A8.959 8.959 0 0 0 3 12c0 .778.099 1.533.284 2.253" />
</svg>
);


export const PREDEFINED_CATEGORIES: Category[] = [
  { id: ItemCategory.FOOD, name: 'Food & Groceries', icon: (props: SVGProps<SVGSVGElement>) => <CakeIcon {...props} /> },
  { id: ItemCategory.ELECTRONICS, name: 'Electronics', icon: (props: SVGProps<SVGSVGElement>) => <BoltIcon {...props} /> },
  { id: ItemCategory.CLOTHING, name: 'Apparel & Accessories', icon: (props: SVGProps<SVGSVGElement>) => <ShoppingBagIcon {...props} /> },
  { id: ItemCategory.HOME_GOODS, name: 'Home Goods', icon: (props: SVGProps<SVGSVGElement>) => <HomeIcon {...props} /> },
  { id: ItemCategory.TOOLS_HARDWARE, name: 'Tools & Hardware', icon: (props: SVGProps<SVGSVGElement>) => <WrenchScrewdriverIcon {...props} /> },
  { id: ItemCategory.HEALTH_BEAUTY, name: 'Health & Beauty', icon: (props: SVGProps<SVGSVGElement>) => <HeartIcon {...props} /> },
  { id: ItemCategory.BOOKS_MEDIA, name: 'Books & Media', icon: (props: SVGProps<SVGSVGElement>) => <AcademicCapIcon {...props} /> },
  { id: ItemCategory.SPORTS_OUTDOORS, name: 'Sports & Outdoors', icon: (props: SVGProps<SVGSVGElement>) => <GlobeAltIcon {...props} /> },
  { id: ItemCategory.TOYS_GAMES, name: 'Toys & Games', icon: (props: SVGProps<SVGSVGElement>) => <GiftIcon {...props} /> },
  { id: ItemCategory.AUTOMOTIVE, name: 'Automotive', icon: (props: SVGProps<SVGSVGElement>) => <WrenchScrewdriverIcon {...props} /> }, 
  { id: ItemCategory.PET_SUPPLIES, name: 'Pet Supplies', icon: (props: SVGProps<SVGSVGElement>) => <TagIcon {...props} /> },
  { id: ItemCategory.OFFICE_SUPPLIES, name: 'Office Supplies', icon: (props: SVGProps<SVGSVGElement>) => <AcademicCapIcon {...props} /> }, 
  // "Other" is deliberately last in this predefined list.
  // getCategories logic will handle sorting and final placement of "Other".
  { id: ItemCategory.OTHER, name: 'Other', icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} /> },
];

export const CUSTOM_CATEGORIES_STORAGE_KEY = 'inventoryAppCustomCategories';
export const ADD_NEW_CATEGORY_VALUE = "add_new_category_option";


export const getCategories = (): Category[] => {
  let customCategoryNames: string[] = [];
  try {
    const storedCustom = localStorage.getItem(CUSTOM_CATEGORIES_STORAGE_KEY);
    if (storedCustom) {
      customCategoryNames = JSON.parse(storedCustom);
      if (!Array.isArray(customCategoryNames) || !customCategoryNames.every(name => typeof name === 'string')) {
        console.warn("Invalid custom categories format in localStorage. Resetting.");
        customCategoryNames = [];
        localStorage.setItem(CUSTOM_CATEGORIES_STORAGE_KEY, JSON.stringify([]));
      }
    }
  } catch (e) {
    console.error("Failed to load or parse custom categories:", e);
    localStorage.removeItem(CUSTOM_CATEGORIES_STORAGE_KEY); // Clear corrupted data
    customCategoryNames = [];
  }

  const customCategoryObjects: Category[] = customCategoryNames
    .map(name => name.trim()) // Trim names
    .filter(name => name !== "") // Filter out empty names after trimming
     // Ensure custom category names are unique and don't clash with predefined IDs/names (case-insensitive)
    .filter((name, index, self) => 
        self.findIndex(n => n.toLowerCase() === name.toLowerCase()) === index &&
        !PREDEFINED_CATEGORIES.some(pc => pc.id.toLowerCase() === name.toLowerCase() || pc.name.toLowerCase() === name.toLowerCase())
    )
    .map(name => ({
      id: name, // Custom categories use their name as ID
      name: name, 
      icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} />
    }));
  
  // Combine predefined and valid custom categories
  const allCategories = [...PREDEFINED_CATEGORIES, ...customCategoryObjects];
  
  // Separate "Other" category
  const otherCategory = allCategories.find(c => c.id === ItemCategory.OTHER);
  
  // Filter out "Other" for sorting, then sort alphabetically by name
  const sortedCategories = allCategories
    .filter(c => c.id !== ItemCategory.OTHER)
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Add "Other" category at the end if it exists
  if (otherCategory) {
    return [...sortedCategories, otherCategory];
  }
  return sortedCategories;
};


export const SOUND_OPTIONS: SoundOption[] = [
  { id: 'none', name: 'No Sound' },
  { id: 'default_ping', name: 'Default Ping' },
  { id: 'gentle_chime', name: 'Gentle Chime' },
  { id: 'short_alert', name: 'Short Alert' },
  { id: 'digital_alarm', name: 'Digital Alarm' },
];

export const DEFAULT_SOUND = SOUND_OPTIONS[1].id; // Default Ping


export const playNotificationSound = (soundId: string) => {
  if (soundId === 'none') return;
  
  console.log(`Playing sound: ${soundId}`);
  
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (!audioContext) return;
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; 
    
    switch(soundId) {
      case 'default_ping':
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); 
        break;
      case 'gentle_chime':
        oscillator.frequency.setValueAtTime(880, audioContext.currentTime); 
        break;
      case 'short_alert':
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
        break;
      case 'digital_alarm':
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
        break;
      default:
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    }

    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.3); 
  } catch (error) {
    console.warn("Could not play sound:", error);
  }
};
