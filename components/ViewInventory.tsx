import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInventory } from '../hooks/useInventory';
import ItemCard from './ItemCard';
import { Category as CategoryType, InventoryItem } from '../types'; // Renamed Category to avoid conflict
import { getCategories, CUSTOM_CATEGORIES_STORAGE_KEY, ADD_NEW_CATEGORY_VALUE } from '../constants';
import CategoryInputDialog from './CategoryInputDialog'; // Import the new dialog

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const MagnifyingGlassIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>
);

const FunnelIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
</svg>
);

const AdjustmentsHorizontalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a2.25 2.25 0 1 1-4.5 0 .75.75 0 0 0 1.5-.638V3.75a.75.75 0 0 0-.75-.75H4.5A2.25 2.25 0 0 0 2.25 5.25v.75M10.5 6v2.25m0 0a2.25 2.25 0 0 1-4.5 0m4.5 0a.75.75 0 0 0 1.5-.638V5.25m0 9.75H3.75M3.75 15a2.25 2.25 0 0 1 4.5 0 .75.75 0 0 0-1.5.638V18a.75.75 0 0 0 .75.75h4.5a2.25 2.25 0 0 0 2.25-2.25v-.75m-9.75 0v-2.25m0 0a2.25 2.25 0 0 0 4.5 0m-4.5 0a.75.75 0 0 1-1.5.638V15.75m0-3.75H18M18 12a2.25 2.25 0 0 1 4.5 0 .75.75 0 0 0-1.5.638V15a.75.75 0 0 0 .75.75h4.5a2.25 2.25 0 0 0 2.25-2.25v-.75M18 12v-2.25m0 0a2.25 2.25 0 0 0 4.5 0m-4.5 0a.75.75 0 0 1-1.5.638V9.75" />
  </svg>
);


enum SortOption {
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  PURCHASE_DATE_NEWEST = 'purchase_date_newest',
  PURCHASE_DATE_OLDEST = 'purchase_date_oldest',
  TARGET_DATE_SOONEST = 'target_date_soonest',
  TARGET_DATE_LATEST = 'target_date_latest',
}

const ViewInventory: React.FC = () => {
  const navigate = useNavigate();
  const { items, deleteItem, isLoading } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<SortOption>(SortOption.NAME_ASC);
  const [currentCategories, setCurrentCategories] = useState<CategoryType[]>(getCategories());
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  useEffect(() => {
    const refreshCats = () => setCurrentCategories(getCategories());
    
    refreshCats(); 
    window.addEventListener('focus', refreshCats); // Refresh if categories change elsewhere
    
    return () => {
      window.removeEventListener('focus', refreshCats);
    };
  }, []); 

  const handleSaveNewCategory = (newCategoryName: string) => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return; // Basic check, dialog should enforce more

    const allCategories = getCategories();
    if (allCategories.some(c => c.name.toLowerCase() === trimmedName.toLowerCase())) {
      // This should ideally be caught by CategoryInputDialog
      alert(`Category "${trimmedName}" already exists.`);
      setSelectedCategoryFilter(trimmedName); // Select the existing one
      return;
    }

    try {
      const stored = localStorage.getItem(CUSTOM_CATEGORIES_STORAGE_KEY);
      const currentCustomNames: string[] = stored ? JSON.parse(stored) : [];
      
      if (!currentCustomNames.map(n => n.toLowerCase()).includes(trimmedName.toLowerCase())) {
        currentCustomNames.push(trimmedName);
        localStorage.setItem(CUSTOM_CATEGORIES_STORAGE_KEY, JSON.stringify(currentCustomNames));
        setCurrentCategories(getCategories()); 
        setSelectedCategoryFilter(trimmedName); // Filter by the newly added category
      } else {
         alert(`Category "${trimmedName}" (custom) already exists.`);
         setSelectedCategoryFilter(trimmedName);
      }
    } catch (error) {
      console.error("Failed to save custom category:", error);
      alert("Error saving custom category. Please check console for details.");
    }
    setIsAddCategoryDialogOpen(false);
  };

  const handleCategoryFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === ADD_NEW_CATEGORY_VALUE) {
      setIsAddCategoryDialogOpen(true);
      // Do not change selectedCategoryFilter yet, let the dialog handle it or user cancel
      // Reset the select visually if it's stuck on "Add New" after dialog closes
      e.target.value = selectedCategoryFilter; 
    } else {
      setSelectedCategoryFilter(value);
    }
  };

  const filteredAndSortedItems = useMemo(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategoryFilter);
    }

    return [...filtered].sort((a, b) => {
        switch (sortOption) {
            case SortOption.NAME_ASC:
                return a.name.localeCompare(b.name);
            case SortOption.NAME_DESC:
                return b.name.localeCompare(a.name);
            case SortOption.PURCHASE_DATE_NEWEST:
                return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
            case SortOption.PURCHASE_DATE_OLDEST:
                return new Date(a.purchaseDate).getTime() - new Date(b.purchaseDate).getTime();
            case SortOption.TARGET_DATE_SOONEST: {
                const dateA = a.targetDate ? new Date(a.targetDate).getTime() : Infinity;
                const dateB = b.targetDate ? new Date(b.targetDate).getTime() : Infinity;
                if (dateA === Infinity && dateB === Infinity) return 0; 
                if (dateA === Infinity) return 1; 
                if (dateB === Infinity) return -1; 
                return dateA - dateB;
            }
            case SortOption.TARGET_DATE_LATEST: {
                const dateA = a.targetDate ? new Date(a.targetDate).getTime() : -Infinity; 
                const dateB = b.targetDate ? new Date(b.targetDate).getTime() : -Infinity;
                if (dateA === -Infinity && dateB === -Infinity) return 0;
                if (dateA === -Infinity) return 1; 
                if (dateB === -Infinity) return -1; 
                 return dateB - dateA;
            }
            default:
                return 0;
        }
    });
  }, [items, searchTerm, selectedCategoryFilter, sortOption]);

  if (isLoading) {
    return <div className="h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white text-xl">Loading inventory...</div>;
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6">
      <header className="flex items-center justify-between mb-6 flex-shrink-0">
        <div className="flex items-center">
            <button 
              onClick={() => navigate('/')} 
              className="p-2 rounded-full hover:bg-slate-700/50 shadow-md hover:shadow-lg transition-colors mr-3"
              aria-label="Go to Home"
            >
              <ArrowLeftIcon className="hero-icon text-sky-400" />
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-sky-400">My Inventory</h1>
        </div>
        <button 
            onClick={() => navigate('/add')} 
            className="bg-sky-600 text-white font-semibold py-2 px-3 rounded-lg shadow-lg 
                       border-b-4 border-sky-800 hover:border-sky-700
                       hover:bg-sky-500 
                       active:bg-sky-600 active:border-b-2 active:translate-y-0.5
                       transform hover:-translate-y-0.5 transition-all duration-150 
                       focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900
                       flex items-center text-sm"
        >
          <PlusIcon className="hero-icon w-5 h-5 mr-1.5" /> Add
        </button>
      </header>

      {/* Filters and Search */}
      <div className="mb-6 p-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl shadow-xl flex-shrink-0">
        <div className="grid grid-cols-1 gap-4">
          <div className="relative">
             <label htmlFor="search-items" className="sr-only">Search items</label>
            <input
              type="text"
              id="search-items"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 text-white p-3 pl-10 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
            />
            <MagnifyingGlassIcon className="hero-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label htmlFor="category-filter" className="sr-only">Filter by category</label>
            <select
              id="category-filter"
              value={selectedCategoryFilter} 
              onChange={handleCategoryFilterChange}
              className="w-full bg-slate-700 border border-slate-600 text-white p-3 pl-10 rounded-lg shadow-md appearance-none focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600"
            >
              <option value="all" className="bg-slate-800 text-slate-100">All Categories</option>
              {currentCategories.map(cat => (
                <option key={cat.id} value={cat.id} className="bg-slate-800 text-slate-100">{cat.name}</option>
              ))}
              <option value="" disabled className="bg-slate-800 text-slate-500">──────────</option>
              <option value={ADD_NEW_CATEGORY_VALUE} className="text-sky-400 font-semibold bg-slate-800 hover:bg-sky-700">⊕ Add New Category...</option>
            </select>
             <FunnelIcon className="hero-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <label htmlFor="sort-options" className="sr-only">Sort items</label>
             <select
                id="sort-options"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full bg-slate-700 border border-slate-600 text-white p-3 pl-10 rounded-lg shadow-md appearance-none focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600"
            >
                <option value={SortOption.NAME_ASC} className="bg-slate-800 text-slate-100">Name (A-Z)</option>
                <option value={SortOption.NAME_DESC} className="bg-slate-800 text-slate-100">Name (Z-A)</option>
                <option value={SortOption.PURCHASE_DATE_NEWEST} className="bg-slate-800 text-slate-100">Purchase Date (Newest)</option>
                <option value={SortOption.PURCHASE_DATE_OLDEST} className="bg-slate-800 text-slate-100">Purchase Date (Oldest)</option>
                <option value={SortOption.TARGET_DATE_SOONEST} className="bg-slate-800 text-slate-100">Target Date (Soonest)</option>
                <option value={SortOption.TARGET_DATE_LATEST} className="bg-slate-800 text-slate-100">Target Date (Latest)</option>
            </select>
            <AdjustmentsHorizontalIcon className="hero-icon absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <main className="flex-grow overflow-y-auto">
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {filteredAndSortedItems.map(item => (
              <ItemCard key={item.id} item={item} onDelete={deleteItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 flex flex-col justify-center items-center h-full">
            <svg className="mx-auto h-20 w-20 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-slate-300">No items found</h3>
            {items.length === 0 ? (
               <p className="mt-1 text-sm text-slate-400">Your inventory is empty. Click "Add Item" to get started!</p>
            ) : (
               <p className="mt-1 text-sm text-slate-400">Try adjusting your search or filter criteria.</p>
            )}
          </div>
        )}
      </main>

      <CategoryInputDialog
        isOpen={isAddCategoryDialogOpen}
        onClose={() => {
            setIsAddCategoryDialogOpen(false);
            // Ensure the select dropdown doesn't get stuck on "Add New"
            const selectElement = document.getElementById('category-filter') as HTMLSelectElement | null;
            if (selectElement && selectElement.value === ADD_NEW_CATEGORY_VALUE) {
                selectElement.value = selectedCategoryFilter;
            }
        }}
        onSave={handleSaveNewCategory}
        existingCategoryNames={currentCategories.map(c => c.name)}
      />
    </div>
  );
};

export default ViewInventory;