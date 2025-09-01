import React from 'react';
import { Link } from 'react-router-dom';

// Heroicons SVGs (as React components for better control)
const PlusCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const Cog6ToothIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.11v1.093c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.27.96-.12 1.45l-.773.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.893c-.09.543-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-.96.27-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.094c0-.55.398-1.019.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773c.39-.39.903-.44 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.893Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const titleString = "Mobile Inventory Pro";
const colors = [
  '#FF6B6B', '#FFD93D', '#FFB347', '#C3AED6', '#D9A8E2', '#FFABE1', 
  '#87CEEB', '#A2D9A1', '#90EE90', '#ADD8E6' 
];

const HomeView: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <header className="p-6 text-center relative">
        <h1 className="text-4xl font-bold tracking-tight title-mumble-jumble">
          {titleString.split('').map((char, index) => (
            <span key={index} style={{ color: char === ' ' ? 'inherit' : colors[index % colors.length] }}>
              {char}
            </span>
          ))}
        </h1>
        <p className="text-slate-400 mt-2">Your personal item tracker and reminder.</p>
         <Link 
            to="/settings" 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-sky-400 transition-colors" 
            aria-label="Open settings"
            title="Settings"
          >
            <Cog6ToothIcon className="hero-icon w-7 h-7 sm:w-8 sm:h-8" />
        </Link>
      </header>
      
      <main className="flex-grow flex flex-col overflow-hidden p-2 sm:p-4">
        <Link 
          to="/add" 
          className="flex-1 bg-sky-600/90 backdrop-blur-sm hover:bg-sky-500/90 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 m-2 
                     rounded-xl shadow-2xl hover:shadow-sky-500/50 
                     transform hover:scale-[1.03] hover:-translate-y-1
                     border border-transparent hover:border-sky-500/30"
          aria-label="Add new item to inventory"
        >
          <PlusCircleIcon className="hero-icon-xl text-white mb-4" />
          <span className="text-3xl font-semibold">Add New Item</span>
          <span className="text-sky-200 mt-1">Register a purchased item</span>
        </Link>
        
        <Link 
          to="/view" 
          className="flex-1 bg-emerald-600/90 backdrop-blur-sm hover:bg-emerald-500/90 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 m-2 
                     rounded-xl shadow-2xl hover:shadow-emerald-500/50 
                     transform hover:scale-[1.03] hover:-translate-y-1
                     border border-transparent hover:border-emerald-500/30"
          aria-label="View current inventory"
        >
          <EyeIcon className="hero-icon-xl text-white mb-4" />
          <span className="text-3xl font-semibold">View Inventory</span>
          <span className="text-emerald-200 mt-1">Browse your tracked items</span>
        </Link>
      </main>
      <footer className="p-4 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Mobile Inventory Pro
      </footer>
    </div>
  );
};

export default HomeView;