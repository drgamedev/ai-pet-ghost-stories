import React from 'react';
import { Story, LoadingState } from '../types';

interface StoryDisplayProps {
  story: Story | null;
  loading: LoadingState;
  onPlayNarration: (text: string) => void;
  onSaveStory: () => void;
  isStorySaved: boolean;
}

const PlayIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>);
const SaveIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>);

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, loading, onPlayNarration, onSaveStory, isStorySaved }) => {
  const { isGenerating, story: storyLoading, audio: audioLoading } = loading;

  const renderPlaceholder = () => (
    <div className="text-center text-gray-500">
      <div className="text-6xl mb-4 opacity-50">📖</div>
      <h3 className="text-xl font-semibold">Your magical story will appear here!</h3>
      <p>Fill out the form and let the adventure begin.</p>
    </div>
  );

  const renderLoading = () => (
      <div className="text-center text-gray-600">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#0F35A6] mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold">Conjuring a tale...</h3>
          <p className="mt-2 text-sm">
              {storyLoading && "Brewing up the perfect words..."}
          </p>
      </div>
  );

  return (
    <div className="mt-8 lg:mt-0 p-6 bg-gray-50 rounded-2xl shadow-lg border border-gray-200 flex flex-col justify-center items-center min-h-[500px] lg:min-h-full">
      {!story && !isGenerating && renderPlaceholder()}
      {isGenerating && renderLoading()}
      {story && (
        <div className="w-full animate-fade-in flex flex-col h-full">
          <h3 className="text-2xl font-bold mb-4 text-[#0F35A6] text-center">A Story for {story.inputs.petName}</h3>
          <div className="flex justify-center gap-4 mb-4">
            <button 
                onClick={() => onPlayNarration(story.text)} 
                disabled={audioLoading}
                className="flex items-center gap-2 px-5 py-2 bg-[#7AA61C] hover:bg-[#689018] text-white font-semibold rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <PlayIcon />
              {audioLoading ? 'Loading...' : 'Read Aloud'}
            </button>
            <button 
                onClick={onSaveStory} 
                disabled={isStorySaved}
                className="flex items-center gap-2 px-5 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold rounded-lg shadow-sm transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400">
              <SaveIcon />
              {isStorySaved ? 'Saved' : 'Save Story'}
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg flex-grow overflow-y-auto border border-gray-200 max-h-[40vh] sm:max-h-[50vh] lg:max-h-full">
            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-justify">{story.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;