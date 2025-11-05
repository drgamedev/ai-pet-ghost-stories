
import React from 'react';
import { StoryInputs } from '../types';
import { GHOST_TYPES, MOODS } from '../constants';

interface StoryFormProps {
  inputs: StoryInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
  onSurpriseMe: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.586l.707-.707a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 6.586V4a1 1 0 011-1zM5 10a1 1 0 011-1h2.586l-.707-.707a1 1 0 011.414-1.414l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L8.586 11H6a1 1 0 01-1-1zm10 0a1 1 0 01-1 1h-2.586l.707.707a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414L11.414 9H14a1 1 0 011 1z" clipRule="evenodd" />
    </svg>
);


const StoryForm: React.FC<StoryFormProps> = ({ inputs, onInputChange, onSubmit, onSurpriseMe, isLoading, error, setError }) => {
  const inputBaseClasses = "w-full p-3 bg-blue-900/50 border border-blue-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-blue-300/70";

  return (
    <div className="bg-slate-800/40 p-6 rounded-2xl shadow-2xl border border-blue-800/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">Create Your Story</h2>
      
      {error && (
        <div className="bg-red-500/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg relative mb-4 flex justify-between items-center" role="alert">
          <span className="block sm:inline">{error}</span>
          <button onClick={() => setError(null)} className="font-bold text-xl">&times;</button>
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label htmlFor="petName" className="block text-sm font-medium mb-1 text-blue-200">Pet's Name</label>
          <input type="text" id="petName" name="petName" value={inputs.petName} onChange={onInputChange} placeholder="e.g., Milo, Luna" className={inputBaseClasses} />
        </div>
        <div>
          <label htmlFor="favoritePlace" className="block text-sm font-medium mb-1 text-blue-200">A Favorite Place</label>
          <input type="text" id="favoritePlace" name="favoritePlace" value={inputs.favoritePlace} onChange={onInputChange} placeholder="e.g., under the oak tree" className={inputBaseClasses} />
        </div>
        <div>
          <label htmlFor="favoriteColor" className="block text-sm font-medium mb-1 text-blue-200">A Favorite Color</label>
          <input type="text" id="favoriteColor" name="favoriteColor" value={inputs.favoriteColor} onChange={onInputChange} placeholder="e.g., sky blue" className={inputBaseClasses} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ghostType" className="block text-sm font-medium mb-1 text-blue-200">Ghost Type</label>
            <select id="ghostType" name="ghostType" value={inputs.ghostType} onChange={onInputChange} className={inputBaseClasses}>
              {GHOST_TYPES.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="mood" className="block text-sm font-medium mb-1 text-blue-200">Story Mood</label>
            <select id="mood" name="mood" value={inputs.mood} onChange={onInputChange} className={inputBaseClasses}>
              {MOODS.map(mood => <option key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</option>)}
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={onSurpriseMe} disabled={isLoading} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <SparklesIcon />
            Surprise Me!
          </button>
          <button onClick={onSubmit} disabled={isLoading} className="flex-1 px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg shadow-lg font-bold text-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Creating Magic...' : 'Write My Story'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;
