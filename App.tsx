import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeView from './components/HomeView';
import AddItemForm from './components/AddItemForm';
import ViewInventory from './components/ViewInventory';
import SettingsView from './components/SettingsView'; // Import SettingsView
import MobileFrame from './components/MobileFrame';

const App: React.FC = () => {
  return (
    <MobileFrame>
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/add" element={<AddItemForm />} />
          <Route path="/edit/:itemId" element={<AddItemForm />} />
          <Route path="/view" element={<ViewInventory />} />
          <Route path="/settings" element={<SettingsView />} /> {/* Add settings route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </MobileFrame>
  );
};

export default App;