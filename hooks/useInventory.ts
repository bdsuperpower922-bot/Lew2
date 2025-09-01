
import { useState, useEffect, useCallback } from 'react';
import { InventoryItem } from '../types';

const LOCAL_STORAGE_KEY = 'inventoryAppItems';

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error("Failed to load items from localStorage:", error);
      // Potentially clear corrupted data or notify user
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    setIsLoading(false);
  }, []);

  const saveItems = useCallback((newItems: InventoryItem[]) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newItems));
      setItems(newItems);
    } catch (error) {
      console.error("Failed to save items to localStorage:", error);
      // Notify user that data might not be saved
      alert("Error: Could not save changes. Your browser's storage might be full or disabled.");
    }
  }, []);

  const addItem = useCallback((item: Omit<InventoryItem, 'id'>) => {
    const newItem = { ...item, id: new Date().toISOString() + Math.random().toString(36).substring(2,9) };
    // Sort by name after adding
    const updatedItems = [...items, newItem].sort((a, b) => a.name.localeCompare(b.name));
    saveItems(updatedItems);
  }, [items, saveItems]);

  const updateItem = useCallback((updatedItem: InventoryItem) => {
    const updatedItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item))
                              .sort((a, b) => a.name.localeCompare(b.name));
    saveItems(updatedItems);
  }, [items, saveItems]);

  const deleteItem = useCallback((itemId: string) => {
    const updatedItems = items.filter(item => item.id !== itemId);
    saveItems(updatedItems);
  }, [items, saveItems]);

  const getItemById = useCallback((itemId: string): InventoryItem | undefined => {
    return items.find(item => item.id === itemId);
  }, [items]);

  return { items, addItem, updateItem, deleteItem, getItemById, isLoading };
};
