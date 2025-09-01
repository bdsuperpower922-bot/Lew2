
import React, { useState, useEffect, SVGProps } from 'react';
import { Category } from '../types';
import { 
    getCategories, 
    QuestionMarkCircleIcon, 
    ADD_NEW_CATEGORY_VALUE, 
    CUSTOM_CATEGORIES_STORAGE_KEY,
    PREDEFINED_CATEGORIES 
} from '../constants';
import CategoryInputDialog from './CategoryInputDialog'; // Import the new dialog

interface CategorySelectorProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(getCategories());
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false);

  useEffect(() => {
    const refreshCategories = () => setAvailableCategories(getCategories());
    refreshCategories(); 

    // Refresh categories when window gains focus, e.g., after adding a category in another tab/component
    window.addEventListener('focus', refreshCategories);
    return () => {
        window.removeEventListener('focus', refreshCategories);
    };
  }, []);

  const handleSaveNewCategory = (newCategoryName: string) => {
    // Validation is handled in CategoryInputDialog, but a light re-check here is okay
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    const allCurrentCategories = getCategories();
    if (allCurrentCategories.some(c => c.id.toLowerCase() === trimmedName.toLowerCase() || c.name.toLowerCase() === trimmedName.toLowerCase())) {
      // This case should ideally be caught by CategoryInputDialog, but good for robustness
      alert(`Category "${trimmedName}" already exists.`);
      onCategoryChange(trimmedName); // Select existing if name matches
      setIsAddCategoryDialogOpen(false);
      return;
    }

    try {
      const stored = localStorage.getItem(CUSTOM_CATEGORIES_STORAGE_KEY);
      const currentCustomNames: string[] = stored ? JSON.parse(stored) : [];
      
      if (!currentCustomNames.map(n => n.toLowerCase()).includes(trimmedName.toLowerCase())) {
        currentCustomNames.push(trimmedName);
        localStorage.setItem(CUSTOM_CATEGORIES_STORAGE_KEY, JSON.stringify(currentCustomNames));
        // alert(`Category "${trimmedName}" added successfully.`); // Optional: User sees dialog close.
        const updatedCategories = getCategories();
        setAvailableCategories(updatedCategories);
        onCategoryChange(trimmedName); // Select the newly added category
      } else {
         // Should be caught by dialog, but good for robustness
         alert(`Category "${trimmedName}" (custom) already exists.`);
         onCategoryChange(trimmedName);
      }
    } catch (error) {
      console.error("Failed to save custom category:", error);
      alert("Error saving custom category. Please check console for details.");
    }
    setIsAddCategoryDialogOpen(false);
    setIsOpen(false); // Close dropdown as well
  };

  const handleSelectCategory = (categoryId: string) => {
    if (categoryId === ADD_NEW_CATEGORY_VALUE) {
      setIsOpen(false); // Close dropdown first
      setIsAddCategoryDialogOpen(true);
    } else {
      onCategoryChange(categoryId);
      setIsOpen(false);
    }
  };
  
  // Find current category, with robust fallback logic
  let currentCategory = availableCategories.find(c => c.id === selectedCategory);
  if (!currentCategory) {
    const allCats = getCategories(); // Ensure we have the absolute latest list
    currentCategory = allCats.find(c => c.id === selectedCategory);
    if (!currentCategory) { // If still not found (e.g. selectedCategory is an old custom one that got deleted)
        currentCategory = {
            id: selectedCategory, 
            name: selectedCategory || "Select Category", // Display the ID as name if it's a non-empty string
            icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} />
        };
        // If selectedCategory was empty or only whitespace, try to default to "Other" or first available.
        if (!selectedCategory || selectedCategory.trim() === "") {
             const otherCat = allCats.find(c => c.id === 'Other'); // Default to 'Other'
             const firstCat = allCats.length > 0 ? allCats[0] : undefined; // Or first in list
             currentCategory = otherCat || firstCat || {id: 'unknown', name: 'Select Category', icon: (props: SVGProps<SVGSVGElement>) => <QuestionMarkCircleIcon {...props} />};
             // If we defaulted, update the parent form's state if the resolved category is valid
             if (currentCategory.id !== 'unknown' && currentCategory.id !== selectedCategory) {
                 onCategoryChange(currentCategory.id);
             }
        }
    }
  }


  return (
    <div className="relative w-full">
      <label htmlFor="category-selector-button" className="block text-sm font-medium text-slate-300 mb-1">Category</label>
      <button
        type="button"
        id="category-selector-button"
        onClick={() => {
            if (!isOpen) {
              // Refresh categories when opening dropdown, in case they changed
              setAvailableCategories(getCategories()); 
            }
            setIsOpen(!isOpen);
        }}
        className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md flex items-center justify-between
                   hover:border-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 focus:shadow-lg"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {currentCategory.icon({ className: "hero-icon mr-3 text-sky-400 flex-shrink-0"})}
          <span className="truncate">{currentCategory.name}</span>
        </span>
        <ChevronDownIcon className={`hero-icon text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div 
            className="absolute z-20 mt-1 w-full bg-slate-700/95 backdrop-blur-md border border-slate-600 rounded-lg shadow-xl max-h-72 overflow-y-auto"
            role="listbox"
            aria-labelledby="category-selector-button"
        >
          {availableCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
              className={`p-3 flex items-center cursor-pointer hover:bg-slate-600/80 transition-colors duration-150 
                          ${selectedCategory === category.id ? 'bg-sky-600 text-white font-semibold' : 'text-slate-200'}`}
              role="option"
              aria-selected={selectedCategory === category.id}
            >
              {category.icon({ className: "hero-icon mr-3 flex-shrink-0"})}
              {category.name}
            </div>
          ))}
          <div className="border-t border-slate-600 my-1"></div>
          <div
            onClick={() => handleSelectCategory(ADD_NEW_CATEGORY_VALUE)}
            className="p-3 flex items-center cursor-pointer text-sky-400 hover:bg-sky-700/30 hover:text-sky-300 transition-colors duration-150 font-medium"
            role="option"
            aria-selected={false}
           >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="hero-icon mr-3 flex-shrink-0 w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Add New Category...
          </div>
        </div>
      )}
      <CategoryInputDialog 
        isOpen={isAddCategoryDialogOpen}
        onClose={() => setIsAddCategoryDialogOpen(false)}
        onSave={handleSaveNewCategory}
        existingCategoryNames={availableCategories.map(c => c.name)}
      />
    </div>
  );
};

export default CategorySelector;
