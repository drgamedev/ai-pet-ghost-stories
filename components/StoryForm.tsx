import React from 'react';
import { StoryInputs } from '../types';
import { GHOST_TYPES, MOODS, PET_TYPES, COLORS } from '../constants';

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v2.586l.707-.707a1 1 0 011.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 6.586V4a1 1 0 011-1zM5 10a1 1 0 011-1h2.586l-.707-.707a1 1 0 011.414-1.414l2 2a1 1 0 010 1.414l-2 2a1 1 0 01-1.414-1.414L8.586 11H6a1 1 0 01-1-1zm10 0a1 1 0 01-1 1h-2.586l.707.707a1 1 0 01-1.414 1.414l-2-2a1 1 0 010-1.414l2-2a1 1 0 011.414 1.414L11.414 9H14a1 1 0 011 1z" clipRule="evenodd" />
    </svg>
);

interface StoryFormProps {
  inputs: StoryInputs;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onSubmit: () => void;
  onSurpriseMe: () => void;
  isLoading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
}

const StoryForm: React.FC<StoryFormProps> = ({ inputs, onInputChange, onSelectChange, onSubmit, onSurpriseMe, isLoading, error, setError }) => {
  const inputBaseClasses = "w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F35A6]/80 focus:outline-none transition-all placeholder-gray-400";
  const labelBaseClasses = "block text-sm font-medium mb-2 text-gray-700";

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-[#0F35A6]">Create Your Story</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-[#BF0436] px-4 py-3 rounded-lg relative mb-4 flex justify-between items-center" role="alert">
          <span className="block sm:inline font-medium">{error}</span>
          <button onClick={() => setError(null)} className="font-bold text-xl leading-none">&times;</button>
        </div>
      )}
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="petType" className={labelBaseClasses}>Choose a Pet</label>
              <select id="petType" name="petType" value={inputs.petType} onChange={onInputChange} className={inputBaseClasses}>
                {PET_TYPES.map(type => <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="petName" className={labelBaseClasses}>Pet's Name</label>
              <input type="text" id="petName" name="petName" value={inputs.petName} onChange={onInputChange} placeholder="e.g., Milo, Luna" className={inputBaseClasses} />
            </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="favoritePlace" className={labelBaseClasses}>A Favorite Place</label>
              <input type="text" id="favoritePlace" name="favoritePlace" value={inputs.favoritePlace} onChange={onInputChange} placeholder="e.g., under the oak tree" className={inputBaseClasses} />
            </div>
            <div>
              <label htmlFor="favoriteColor" className={labelBaseClasses}>A Favorite Color</label>
              <select id="favoriteColor" name="favoriteColor" value={inputs.favoriteColor} onChange={onInputChange} className={inputBaseClasses}>
                {COLORS.map(color => <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>)}
              </select>
            </div>
        </div>
        
        <div>
            <label htmlFor="ghostType" className={labelBaseClasses}>Ghost Type</label>
            <div className="flex flex-wrap gap-2">
                {GHOST_TYPES.map(type => (
                    <button key={type} onClick={() => onSelectChange('ghostType', type)} className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colors ${inputs.ghostType === type ? 'bg-[#0F35A6] text-white border-[#0F35A6]' : 'bg-white text-gray-700 border-gray-300 hover:border-[#0F35A6] hover:text-[#0F35A6]'}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label htmlFor="mood" className={labelBaseClasses}>Story Mood</label>
            <select id="mood" name="mood" value={inputs.mood} onChange={onInputChange} className={inputBaseClasses}>
              {MOODS.map(mood => <option key={mood} value={mood}>{mood.charAt(0).toUpperCase() + mood.slice(1)}</option>)}
            </select>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button onClick={onSurpriseMe} disabled={isLoading} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#E3F4D1] text-[#4D691D] font-semibold hover:bg-[#D9EABF] border border-[#CDE3B8] rounded-lg shadow-sm transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            <SparklesIcon />
            Surprise Me!
          </button>
          <button onClick={onSubmit} disabled={isLoading} className="flex-1 px-6 py-3 bg-[#BF0436] hover:bg-[#A6032F] text-white rounded-lg shadow-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
            {isLoading ? 'Creating Magic...' : 'Write My Story'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryForm;