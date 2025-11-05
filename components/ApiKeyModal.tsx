import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave, onClose }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-stone-800/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-stone-50 w-full max-w-md rounded-2xl shadow-2xl border border-stone-200 p-6 flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start mb-4">
            <div>
                <h2 className="text-2xl font-bold text-stone-700">Enter Your Gemini API Key</h2>
                <p className="text-stone-500 mt-1">
                  To generate stories, you need a Google Gemini API key.
                </p>
            </div>
            <button onClick={onClose} className="text-3xl text-stone-400 hover:text-stone-600 -mt-2">&times;</button>
        </div>
        <div className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full p-3 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:outline-none transition-all placeholder-stone-400"
            aria-label="Gemini API Key Input"
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors font-medium"
          >
            Get an API Key from Google AI Studio &rarr;
          </a>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="px-6 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg shadow-lg font-bold text-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;