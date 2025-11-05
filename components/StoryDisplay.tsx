
import React from 'react';
import { Story, LoadingState } from '../types';

interface StoryDisplayProps {
  story: Story | null;
  loading: LoadingState;
  onPlayNarration: (text: string) => void;
  onSaveStory: () => void;
  isStorySaved: boolean;
}

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
    </svg>
);

const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, loading, onPlayNarration, onSaveStory, isStorySaved }) => {
  const { isGenerating, story: storyLoading, image: imageLoading, audio: audioLoading } = loading;

  const renderPlaceholder = () => (
    <div className="text-center text-blue-300">
      <div className="text-6xl mb-4 animate-pulse">✨</div>
      <h3 className="text-xl font-semibold">Your magical story will appear here!</h3>
      <p>Fill out the form and let the adventure begin.</p>
    </div>
  );

  const renderLoading = () => (
      <div className="text-center text-blue-200">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-400 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold">Conjuring a tale...</h3>
          <p className="mt-2 text-sm">
              {storyLoading && "Brewing up the perfect words..."}
              {imageLoading && !storyLoading && "Painting a picture with moonlight..."}
          </p>
      </div>
  );

  return (
    <div className="mt-8 lg:mt-0 p-6 bg-slate-800/40 rounded-2xl shadow-2xl border border-blue-800/50 flex flex-col justify-center items-center min-h-[400px] lg:min-h-full">
      {!story && !isGenerating && renderPlaceholder()}
      {isGenerating && renderLoading()}
      {story && (
        <div className="w-full animate-fade-in">
          <div className="aspect-square w-full max-w-sm mx-auto bg-blue-900/50 rounded-lg mb-6 overflow-hidden flex items-center justify-center">
            <img src={story.imageUrl} alt={`Illustration for ${story.inputs.petName}'s story`} className="w-full h-full object-cover" />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button 
                onClick={() => onPlayNarration(story.text)} 
                disabled={audioLoading}
                className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
              <PlayIcon />
              {audioLoading ? 'Loading...' : 'Read Aloud'}
            </button>
            <button 
                onClick={onSaveStory} 
                disabled={isStorySaved}
                className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-600">
              <SaveIcon />
              {isStorySaved ? 'Saved' : 'Save Story'}
            </button>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg max-h-80 overflow-y-auto">
            <h3 className="text-xl font-bold mb-2 text-purple-300">A Story for {story.inputs.petName}</h3>
            <p className="text-blue-200 whitespace-pre-wrap leading-relaxed">{story.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoryDisplay;
