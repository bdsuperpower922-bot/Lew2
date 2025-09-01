import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ArrowLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
);

const ArrowDownTrayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ArrowUpTrayIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m0 0L12 12m0 0L7.5 12m4.5-4.5V21" />
    </svg>
);


const CloudArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z" />
  </svg>
);

// A generic cloud icon for provider buttons
const CloudIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z" />
    </svg>
);


const LOCAL_STORAGE_KEY = 'inventoryAppItems';

const SettingsView: React.FC = () => {
  const navigate = useNavigate();
  const [showCloudOptions, setShowCloudOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportData = () => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItems && storedItems !== '[]') {
        const blob = new Blob([storedItems], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'inventory_backup.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Inventory data exported successfully as inventory_backup.json!');
      } else {
        alert('No inventory data found to export.');
      }
    } catch (error) {
      console.error("Failed to export data:", error);
      alert('An error occurred while exporting data. Please try again.');
    }
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleRestoreData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!window.confirm("Are you sure you want to restore? This will overwrite your current inventory data.")) {
        event.target.value = ''; // Reset file input
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
        if (typeof text !== 'string') {
          throw new Error("Failed to read file content.");
        }
        const restoredItems = JSON.parse(text);
        
        // Basic validation
        if (!Array.isArray(restoredItems) || !restoredItems.every(item => typeof item === 'object' && item !== null && 'id' in item && 'name' in item)) {
          throw new Error("Invalid backup file format. Expected an array of inventory items.");
        }

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(restoredItems));
        alert('Inventory restored successfully! Please navigate to "View Inventory" or refresh the page to see the changes.');
      } catch (error: any) {
        console.error("Failed to restore data:", error);
        alert(`An error occurred while restoring data: ${error.message || 'Invalid file format or content.'}`);
      } finally {
         event.target.value = ''; // Reset file input so the same file can be selected again if needed
      }
    };
    reader.onerror = () => {
        alert("Failed to read the selected file.");
        event.target.value = '';
    }
    reader.readAsText(file);
  };


  const handleCloudProviderClick = (providerName: string) => {
    alert(`Connecting to ${providerName}... This feature is coming soon!`);
  };

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-900 to-slate-800 text-white p-4 sm:p-6">
      <header className="flex items-center mb-6 sm:mb-8 max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-slate-700/50 shadow-md hover:shadow-lg transition-colors mr-3"
          aria-label="Go back"
        >
          <ArrowLeftIcon className="hero-icon text-sky-400" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-400">Settings</h1>
      </header>

      <main className="max-w-3xl mx-auto space-y-8">
        <section 
            aria-labelledby="data-management-heading" 
            className="bg-slate-800/70 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <h2 id="data-management-heading" className="text-xl sm:text-2xl font-semibold text-sky-300 mb-6">Data Management</h2>
          
          <div className="space-y-4">
            <button
              onClick={handleExportData}
              className="w-full flex items-center justify-center bg-emerald-600 text-white font-semibold p-3.5 rounded-lg shadow-lg 
                         border-b-4 border-emerald-700 hover:border-emerald-600
                         hover:bg-emerald-500 
                         active:bg-emerald-600 active:border-b-2 active:translate-y-0.5
                         transform hover:-translate-y-0.5 transition-all duration-150 
                         focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label="Export inventory data as JSON file"
            >
              <ArrowDownTrayIcon className="hero-icon w-5 h-5 mr-2.5" />
              Export Inventory (JSON)
            </button>
             <p className="text-xs text-slate-400 text-center !mb-1">Download your inventory data as a JSON file for local backup.</p>


            <input 
                type="file"
                ref={fileInputRef}
                onChange={handleRestoreData}
                accept=".json"
                className="hidden"
                aria-hidden="true"
            />
            <button
              onClick={handleRestoreClick}
              className="w-full flex items-center justify-center bg-teal-600 text-white font-semibold p-3.5 rounded-lg shadow-lg 
                         border-b-4 border-teal-700 hover:border-teal-600
                         hover:bg-teal-500 
                         active:bg-teal-600 active:border-b-2 active:translate-y-0.5
                         transform hover:-translate-y-0.5 transition-all duration-150 
                         focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-800"
              aria-label="Restore inventory data from JSON file"
            >
              <ArrowUpTrayIcon className="hero-icon w-5 h-5 mr-2.5" />
              Restore Inventory (JSON)
            </button>
            <p className="text-xs text-slate-400 text-center !mt-1">Restore data from a previously exported JSON backup file. This will overwrite current data.</p>
          </div>
        </section>

        <section 
            aria-labelledby="cloud-backup-heading"
            className="bg-slate-800/70 p-6 sm:p-8 rounded-xl shadow-2xl"
        >
          <h2 id="cloud-backup-heading" className="text-xl sm:text-2xl font-semibold text-sky-300 mb-6">Cloud Backup</h2>
          
          <button
            onClick={() => setShowCloudOptions(prev => !prev)}
            className="w-full flex items-center justify-center bg-blue-600 text-white font-semibold p-3.5 rounded-lg shadow-lg 
                       border-b-4 border-blue-700 hover:border-blue-600
                       hover:bg-blue-500 
                       active:bg-blue-600 active:border-b-2 active:translate-y-0.5
                       transform hover:-translate-y-0.5 transition-all duration-150 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-expanded={showCloudOptions}
            aria-controls="cloud-options-panel"
          >
            <CloudArrowUpIcon className="hero-icon w-5 h-5 mr-2.5" />
            {showCloudOptions ? 'Hide Cloud Options' : 'Backup to Cloud Storage'}
          </button>
           <p className="text-xs text-slate-400 text-center mt-4">
            Securely back up your inventory to your preferred cloud service. (Feature coming soon)
           </p>

          {showCloudOptions && (
            <div id="cloud-options-panel" className="mt-6 space-y-3 animate-fadeIn">
              <p className="text-sm text-slate-300 mb-3">Choose a cloud service to backup your data:</p>
              {[
                { name: 'Google Drive', provider: 'Google Drive' },
                { name: 'Microsoft OneDrive', provider: 'Microsoft OneDrive' },
                { name: 'Dropbox', provider: 'Dropbox' },
              ].map((service) => (
                <button
                  key={service.name}
                  onClick={() => handleCloudProviderClick(service.provider)}
                  className="w-full flex items-center text-left bg-slate-700 hover:bg-slate-600/80 text-slate-200 font-medium p-3 rounded-lg shadow-md transition-colors duration-150
                             border border-slate-600 hover:border-sky-500/70 focus:outline-none focus:ring-1 focus:ring-sky-500"
                  aria-label={`Backup to ${service.name} (coming soon)`}
                >
                  <CloudIcon className="hero-icon w-5 h-5 mr-3 text-sky-400 flex-shrink-0" />
                  {service.name}
                  <span className="ml-auto text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">Coming Soon</span>
                </button>
              ))}
            </div>
          )}
        </section>
        
      </main>
       <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default SettingsView;