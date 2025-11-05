import React, { useState } from 'react';

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-[#16213e] to-[#0f3460] w-full max-w-md rounded-2xl shadow-2xl border border-blue-800/50 p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">Enter Your Gemini API Key</h2>
        <p className="text-blue-300 mb-4">
          To generate stories, you need a Google Gemini API key. You can create one for free.
        </p>
        <div className="space-y-4">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Paste your API key here"
            className="w-full p-3 bg-blue-900/50 border border-blue-700/50 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all placeholder-blue-300/70"
            aria-label="Gemini API Key Input"
          />
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            Get an API Key from Google AI Studio &rarr;
          </a>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg shadow-lg font-bold text-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
