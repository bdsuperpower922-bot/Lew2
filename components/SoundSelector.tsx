
import React from 'react';
import { SoundOption } from '../types';
import { SOUND_OPTIONS, playNotificationSound } from '../constants';

interface SoundSelectorProps {
  selectedSound: string;
  onSoundChange: (soundId: string) => void;
}

const SpeakerWaveIcon = (props: React.SVGProps<SVGSVGElement>) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6a3 3 0 0 1 3-3h1.5a3 3 0 0 1 3 3v1.5m0 0L16.5 9.75M8.25 7.5L6.75 9.75m7.5-2.25H12m3 0H9m3 0V3.75M3 12h18M3 12a9 9 0 0 0-2.25 5.688c0 1.01.313 1.958.856 2.736 1.003 1.422 2.586 2.403 4.39 2.65.796.109 1.61.166 2.438.166h.032c.828 0 1.642-.057 2.438-.166 1.804-.247 3.387-1.228 4.39-2.65.543-.778.856-1.726.856-2.736A9 9 0 0 0 21 12M8.083 15a1.5 1.5 0 0 1-1.419-1.016L5.25 9.75M15.917 15a1.5 1.5 0 0 0 1.419-1.016L18.75 9.75" />
</svg>
);

const PlayCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
  </svg>
);


const SoundSelector: React.FC<SoundSelectorProps> = ({ selectedSound, onSoundChange }) => {
  
  const handleSoundPreview = (e: React.MouseEvent, soundId: string) => {
    e.stopPropagation(); 
    if (soundId !== 'none') {
      playNotificationSound(soundId);
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="sound-selector" className="block text-sm font-medium text-slate-300 mb-1">Notification Sound</label>
      <div className="relative">
        <select
          id="sound-selector"
          value={selectedSound}
          onChange={(e) => onSoundChange(e.target.value)}
          className="w-full bg-slate-700 border border-slate-600 text-white p-3 rounded-lg shadow-md appearance-none 
                     focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-600
                     pr-10" // Added pr-10 for icon spacing
        >
          {SOUND_OPTIONS.map((sound: SoundOption) => (
            <option key={sound.id} value={sound.id} className="bg-slate-800 text-slate-100 py-1">
              {sound.name}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
           <SpeakerWaveIcon className="hero-icon w-5 h-5"/>
        </div>
         {selectedSound !== 'none' && (
          <button 
            type="button" 
            onClick={(e) => handleSoundPreview(e, selectedSound)}
            className="absolute inset-y-0 right-10 flex items-center p-2 text-sky-400 hover:text-sky-300 focus:outline-none focus:ring-1 focus:ring-sky-500 rounded-full"
            title="Preview Sound"
            aria-label="Preview selected sound"
            >
            <PlayCircleIcon className="hero-icon w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SoundSelector;
