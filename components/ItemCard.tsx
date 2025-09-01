import React, { SVGProps, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryItem, Category as CategoryType, ItemCategory } from '../types'; // Renamed Category to CategoryType to avoid conflict
import { getCategories, playNotificationSound, QuestionMarkCircleIcon, PREDEFINED_CATEGORIES } from '../constants';
import ConfirmationDialog from './ConfirmationDialog';

// Helper function to calculate date differences
const calculateDateDiff = (dateStr: string): { days: number, label: string, isPast: boolean } => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  date.setHours(0,0,0,0); 

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return { days: 0, label: "Today", isPast: false };
  if (diffDays < 0) return { days: Math.abs(diffDays), label: "ago", isPast: true };
  return { days: diffDays, label: "left", isPast: false };
};

const PencilIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
);

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.111 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const BellAlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
</svg>
);

interface ItemCardProps {
  item: InventoryItem;
  onDelete: (itemId: string) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete }) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  let categoryInfo: CategoryType | undefined = getCategories().find(c => c.id === item.category);

  if (!categoryInfo) {
    // If the category string from item.category doesn't match any known ID (predefined or custom),
    // create a temporary category object to display its name.
    categoryInfo = {
      id: item.category, // The string from the item
      name: item.category, // Display this string as the name
      icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} /> // Default icon
    };
     // If item.category was empty or null, try to assign 'Other' category as a last resort.
    if (!item.category || item.category.trim() === "") {
        categoryInfo = PREDEFINED_CATEGORIES.find(c => c.id === ItemCategory.OTHER) || {
            id: ItemCategory.OTHER, name: "Other", icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} />
        };
    }
  }
  
  const purchase = calculateDateDiff(item.purchaseDate);
  const daysSincePurchase = `${purchase.days} day${purchase.days !== 1 ? 's' : ''} ${purchase.label === 'ago' ? 'ago' : (purchase.label === 'Today' ? ' (Today)' : 'old')}`;
  
  let targetInfo: { text: string, isDue: boolean, className: string } | null = null;
  if (item.targetDate) {
    const target = calculateDateDiff(item.targetDate);
    const isDue = target.isPast || target.label === "Today";
    targetInfo = {
      text: target.label === "Today" ? "Target Today" : `${target.days} day${target.days !== 1 ? 's' : ''} ${target.label}`,
      isDue: isDue,
      className: isDue ? 'text-red-400 font-semibold' : 'text-yellow-400'
    };
  }

  const handleItemClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
        return;
    }
    if (targetInfo?.isDue && item.notificationSound !== 'none') {
      playNotificationSound(item.notificationSound);
    }
  };

  return (
    <>
      <div 
        className="bg-slate-700/80 backdrop-blur-sm border border-slate-600/70 rounded-xl shadow-xl p-4 md:p-5 hover:shadow-2xl hover:border-sky-500/50 hover:transform hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-4 cursor-pointer"
        onClick={handleItemClick}
        role="listitem"
        aria-labelledby={`item-name-${item.id}`}
      >
        {item.photo ? (
          <img src={item.photo} alt={item.name} className="w-full sm:w-28 h-28 object-cover rounded-lg bg-slate-600 flex-shrink-0 shadow-md" />
        ) : (
          <div className="w-full sm:w-28 h-28 bg-slate-600 rounded-lg flex items-center justify-center text-slate-500 flex-shrink-0 shadow-md">
            {categoryInfo.icon({className: "hero-icon-lg"})}
          </div>
        )}
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-1">
              <h3 id={`item-name-${item.id}`} className="text-xl font-semibold text-sky-400">{item.name}</h3>
              <div className="flex items-center text-xs bg-slate-600/70 px-2.5 py-1 rounded-full text-sky-300 shadow-sm border border-slate-500/50">
                  {categoryInfo.icon({className: "hero-icon w-4 h-4 mr-1.5 flex-shrink-0"})}
                  <span className="truncate">{categoryInfo.name}</span>
              </div>
          </div>
          
          <p className="text-slate-300 text-sm mb-2 h-12 overflow-y-auto custom-scrollbar">{item.description || 'No description.'}</p>
          
          <div className="space-y-1 text-slate-400 mt-2">
            <p className="text-base"> 
              Purchased: <span className="font-medium text-slate-200">{new Date(item.purchaseDate).toLocaleDateString()}</span> ({daysSincePurchase})
            </p>
            {targetInfo && (
               <p className={`text-base flex items-center ${targetInfo.className}`}> 
                  {targetInfo.isDue && <BellAlertIcon className="hero-icon w-4 h-4 mr-1.5 text-red-400 flex-shrink-0"/>}
                  Target: <span className="font-medium">{new Date(item.targetDate!).toLocaleDateString()}</span> ({targetInfo.text})
              </p>
            )}
          </div>
        </div>
        <div className="flex sm:flex-col items-center sm:items-end justify-end sm:justify-start space-x-2 sm:space-x-0 sm:space-y-2 mt-3 sm:mt-0 flex-shrink-0">
          <button 
              onClick={(e) => { e.stopPropagation(); navigate(`/edit/${item.id}`); }}
              className="p-2.5 rounded-full text-slate-300 hover:bg-slate-600/70 hover:text-sky-400 hover:shadow-md transition-all duration-150" 
              title="Edit Item"
              aria-label={`Edit ${item.name}`}
          >
            <PencilIcon className="hero-icon w-5 h-5" />
          </button>
          <button 
              onClick={(e) => { e.stopPropagation(); setIsDeleteDialogOpen(true); }} 
              className="p-2.5 rounded-full text-slate-300 hover:bg-slate-600/70 hover:text-red-500 hover:shadow-md transition-all duration-150" 
              title="Delete Item"
              aria-label={`Delete ${item.name}`}
          >
            <TrashIcon className="hero-icon w-5 h-5" />
          </button>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          onDelete(item.id);
          setIsDeleteDialogOpen(false);
        }}
        title="Delete Item"
        confirmButtonText="Delete"
        confirmButtonVariant="danger"
      >
        <p>Are you sure you want to delete <span className="font-semibold text-sky-400">{item.name}</span>?</p>
        <p className="mt-2 text-sm text-slate-400">This action cannot be undone.</p>
      </ConfirmationDialog>
    </>
  );
};

export default ItemCard;
