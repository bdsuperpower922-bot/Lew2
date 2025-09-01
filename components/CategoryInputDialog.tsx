import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface CategoryInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categoryName: string) => void;
  existingCategoryNames: string[]; // For validation
  currentCategoryName?: string; // For editing (optional)
}

const CategoryInputDialog: React.FC<CategoryInputDialogProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  existingCategoryNames,
  currentCategoryName = ''
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCategoryName(currentCategoryName); // Reset or set to current for editing
      setError(''); // Clear previous errors
    }
  }, [isOpen, currentCategoryName]);

  const handleSave = () => {
    const trimmedName = categoryName.trim();
    if (!trimmedName) {
      setError('Category name cannot be empty.');
      return;
    }
    if (trimmedName.toLowerCase() !== currentCategoryName.toLowerCase() && 
        existingCategoryNames.some(name => name.toLowerCase() === trimmedName.toLowerCase())) {
      setError(`Category "${trimmedName}" already exists.`);
      return;
    }
    onSave(trimmedName);
    onClose(); // Close dialog on successful save
  };

  const handleModalClose = () => {
    setCategoryName(''); // Clear name on close
    setError('');
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} title={currentCategoryName ? "Edit Category" : "Add New Category"}>
      <div className="space-y-4">
        <div>
          <label htmlFor="categoryNameInput" className="block text-sm font-medium text-slate-300 mb-1">
            Category Name
          </label>
          <input
            type="text"
            id="categoryNameInput"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
              if (error) setError(''); // Clear error on input change
            }}
            placeholder="e.g., Garden Tools, Collectibles"
            className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
            autoFocus
          />
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleModalClose}
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-600 hover:bg-slate-500 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Save Category
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CategoryInputDialog;