import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { InventoryItem, ItemCategory } from '../types'; // ItemCategory still useful for predefined keys
import { useInventory } from '../hooks/useInventory';
import CategorySelector from './CategorySelector';
import SoundSelector from './SoundSelector';
import { getCategories, DEFAULT_SOUND, PREDEFINED_CATEGORIES } from '../constants';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
</svg>
);

const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-3.75h.008v.008H12v-.008Z" />
  </svg>
);

const AddItemForm: React.FC = () => {
  const navigate = useNavigate();
  const { itemId } = useParams<{ itemId?: string }>();
  const { addItem, updateItem, getItemById, isLoading } = useInventory();

  // Initialize category with the ID of the first category from getCategories, or a default
  const getDefaultCategory = () => {
    const categories = getCategories();
    return categories.length > 0 ? categories[0].id : ItemCategory.OTHER;
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState<string | undefined>(undefined);
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split('T')[0]);
  const [targetDate, setTargetDate] = useState('');
  const [category, setCategory] = useState<string>(getDefaultCategory()); // Changed to string
  const [notificationSound, setNotificationSound] = useState<string>(DEFAULT_SOUND);
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);

  const isEditing = Boolean(itemId);

  useEffect(() => {
    if (isLoading) { 
      return;
    }

    if (isEditing && itemId) {
      const itemToEdit = getItemById(itemId);
      if (itemToEdit) {
        setName(itemToEdit.name);
        setDescription(itemToEdit.description);
        setPhoto(itemToEdit.photo);
        setPhotoPreview(itemToEdit.photo);
        setPurchaseDate(itemToEdit.purchaseDate);
        setTargetDate(itemToEdit.targetDate || '');
        setCategory(itemToEdit.category); // Will be a string
        setNotificationSound(itemToEdit.notificationSound);
      } else {
        console.warn(`Edit mode: Item with ID "${itemId}" not found after loading. Navigating back.`);
        navigate('/view');
      }
    } else if (!isEditing) {
      // Reset form for new item
      setName('');
      setDescription('');
      setPhoto(undefined);
      setPhotoPreview(undefined);
      setPurchaseDate(new Date().toISOString().split('T')[0]);
      setTargetDate('');
      setCategory(getDefaultCategory());
      setNotificationSound(DEFAULT_SOUND);
    }
  }, [itemId, isEditing, getItemById, navigate, isLoading]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !purchaseDate) {
        alert("Item name and purchase date are required.");
        return;
    }

    const itemData = {
      name,
      description,
      photo,
      purchaseDate,
      targetDate: targetDate || undefined, 
      category, // category is already a string
      notificationSound,
    };

    if (isEditing && itemId) {
      updateItem({ ...itemData, id: itemId });
    } else {
      addItem(itemData);
    }
    navigate('/view');
  };

  if (isLoading && isEditing) { 
    return (
      <div className="h-full bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-center">
        <p className="text-xl">Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6">
      <header className="flex items-center mb-6 max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-slate-700/50 shadow-md hover:shadow-lg transition-colors mr-3"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="hero-icon text-sky-400" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-400">{isEditing ? 'Edit Item' : 'Add New Item'}</h1>
      </header>
      
      <div className="bg-slate-800/70 p-6 sm:p-8 rounded-xl shadow-2xl max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="itemName" className="block text-sm font-medium text-slate-300 mb-1">Item Name*</label>
            <input
              type="text"
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
              placeholder="e.g., Smartphone, Winter Coat"
            />
          </div>

          <div>
            <label htmlFor="itemDescription" className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              id="itemDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
              placeholder="Optional: model, color, size, notes..."
            />
          </div>

          <div>
            <label htmlFor="itemPhoto" className="block text-sm font-medium text-slate-300 mb-1">Photo</label>
            <div className="mt-1 flex items-center space-x-4">
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="w-24 h-24 object-cover rounded-lg bg-slate-700 shadow-md" />
              ) : (
                <div className="w-24 h-24 bg-slate-700 rounded-lg flex items-center justify-center text-slate-500 shadow-md">
                  <CameraIcon className="hero-icon-lg" />
                </div>
              )}
              <input
                type="file"
                id="itemPhoto"
                aria-label="Upload item photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="block w-full text-sm text-slate-400 cursor-pointer
                           file:mr-3 file:py-2 file:px-4
                           file:rounded-lg file:border-0 file:shadow-md
                           file:text-sm file:font-semibold 
                           file:bg-sky-600 file:text-white
                           hover:file:bg-sky-500 file:transition-colors file:cursor-pointer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                  <label htmlFor="purchaseDate" className="flex items-center text-sm font-medium text-slate-300 mb-1">
                    <CalendarDaysIcon className="hero-icon w-5 h-5 mr-2 text-sky-400 flex-shrink-0" />
                    Purchase Date*
                  </label>
                  <input
                  type="date"
                  id="purchaseDate"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  required
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
                  />
              </div>
              <div>
                  <label htmlFor="targetDate" className="flex items-center text-sm font-medium text-slate-300 mb-1">
                    <CalendarDaysIcon className="hero-icon w-5 h-5 mr-2 text-yellow-400 flex-shrink-0" />
                    Target Replacement Date
                  </label>
                  <input
                  type="date"
                  id="targetDate"
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600 placeholder-slate-400"
                  />
              </div>
          </div>
          
          <CategorySelector selectedCategory={category} onCategoryChange={setCategory} />
          <SoundSelector selectedSound={notificationSound} onSoundChange={setNotificationSound} />

          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold p-3.5 rounded-lg shadow-lg 
                         border-b-4 border-green-700 hover:border-green-600
                         hover:bg-green-500 
                         active:bg-green-600 active:border-b-2 active:translate-y-0.5
                         transform hover:-translate-y-0.5 transition-all duration-150 
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              {isEditing ? 'Save Changes' : 'Add Item to Inventory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;