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

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#0F35A6] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 16c1.255 0 2.443-.29 3.5-.804V4.804zM14.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 0114.5 16c1.255 0 2.443-.29 3.5-.804v-10A7.968 7.968 0 0014.5 4z" />
    </svg>
);


const StoryLibrary: React.FC<StoryLibraryProps> = ({ stories, onClose, onSelectStory, onDeleteStory }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-200 p-6 flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#0F35A6]">My Story Library</h2>
          <button onClick={onClose} className="text-3xl text-gray-400 hover:text-gray-600">&times;</button>
        </div>
        <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          {stories.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Your saved stories will appear here.</p>
          ) : (
            <ul className="space-y-3">
              {stories.map(story => (
                <li key={story.id} className="bg-white p-3 rounded-lg flex items-center justify-between gap-3 transition-colors hover:bg-gray-50 border border-gray-200">
                  <div className="flex items-center gap-4 cursor-pointer flex-grow min-w-0" onClick={() => onSelectStory(story)}>
                    <BookIcon />
                    <div className="flex-grow truncate">
                      <p className="font-semibold text-gray-800 truncate">A story for {story.inputs.petName}</p>
                      <p className="text-sm text-gray-500">Featuring a {story.inputs.ghostType} ghost</p>
                    </div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); onDeleteStory(story.id); }} className="p-2 text-[#BF0436] hover:text-[#A6032F] hover:bg-red-50 rounded-full transition-colors flex-shrink-0">
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