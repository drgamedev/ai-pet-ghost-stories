
import React from 'react';
import { Story } from '../types';

interface StoryLibraryProps {
  stories: Story[];
  onClose: () => void;
  onSelectStory: (story: Story) => void;
  onDeleteStory: (storyId: string) => void;
}

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
  </svg>
);


const StoryLibrary: React.FC<StoryLibraryProps> = ({ stories, onClose, onSelectStory, onDeleteStory }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-gradient-to-br from-[#16213e] to-[#0f3460] w-full max-w-2xl rounded-2xl shadow-2xl border border-blue-800/50 p-6 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-300">My Story Library</h2>
          <button onClick={onClose} className="text-3xl text-blue-300 hover:text-white">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2">
          {stories.length === 0 ? (
            <p className="text-center text-blue-300 py-10">Your saved stories will appear here.</p>
          ) : (
            <ul className="space-y-3">
              {stories.map(story => (
                <li key={story.id} className="bg-slate-800/60 p-3 rounded-lg flex items-center justify-between gap-3 transition-colors hover:bg-slate-700/60">
                  <div className="flex items-center gap-4 cursor-pointer flex-grow" onClick={() => onSelectStory(story)}>
                    <img src={story.imageUrl} alt="" className="w-16 h-16 rounded-md object-cover flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-semibold text-blue-100">A story for {story.inputs.petName}</p>
                      <p className="text-sm text-blue-400">Featuring a {story.inputs.ghostType} ghost</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteStory(story.id); }} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-full transition-colors">
                    <TrashIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryLibrary;
