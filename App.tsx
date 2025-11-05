import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Story, StoryInputs, LoadingState } from './types';
import { GHOST_TYPES, MOODS, PLACES, COLORS, PET_TYPES } from './constants';
import { generateStory, generateNarration } from './services/geminiService';
import Header from './components/Header';
import StoryForm from './components/StoryForm';
import StoryDisplay from './components/StoryDisplay';
import StoryLibrary from './components/StoryLibrary';

// Audio decoding utilities
const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

const decodeAudioData = async (
  data: Uint8Array,
  ctx: AudioContext,
): Promise<AudioBuffer> => {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length;
  const buffer = ctx.createBuffer(1, frameCount, 24000); // 24kHz sample rate, mono
  const channelData = buffer.getChannelData(0);
  for (let i = 0; i < frameCount; i++) {
    channelData[i] = dataInt16[i] / 32768.0;
  }
  return buffer;
};


export default function App() {
  const [inputs, setInputs] = useState<StoryInputs>({
    petName: '',
    petType: PET_TYPES[0],
    favoritePlace: '',
    favoriteColor: COLORS[0],
    ghostType: GHOST_TYPES[0],
    mood: MOODS[0],
  });
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [storyLibrary, setStoryLibrary] = useState<Story[]>([]);
  const [loading, setLoading] = useState<LoadingState>({
    story: false,
    audio: false,
    isGenerating: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    try {
      const savedStories = localStorage.getItem('petGhostStoryLibrary');
      if (savedStories) {
        setStoryLibrary(JSON.parse(savedStories));
      }
    } catch (e) {
      console.error("Failed to load stories from localStorage", e);
    }
    
    // Initialize AudioContext on user interaction (handled in playNarration)
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);
  
  const handleSelectChange = useCallback((name: string, value: string) => {
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSurpriseMe = useCallback(() => {
    setInputs({
      petName: '',
      petType: PET_TYPES[Math.floor(Math.random() * PET_TYPES.length)],
      favoritePlace: PLACES[Math.floor(Math.random() * PLACES.length)],
      favoriteColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      ghostType: GHOST_TYPES[Math.floor(Math.random() * GHOST_TYPES.length)],
      mood: MOODS[Math.floor(Math.random() * MOODS.length)],
    });
  }, []);
  
  const handleSubmit = async () => {
    if (!inputs.petName) {
      setError("Please tell us your pet's name!");
      return;
    }
    setError(null);
    setCurrentStory(null);
    setLoading({ story: true, audio: false, isGenerating: true });
    
    try {
      const storyText = await generateStory(inputs);
      setLoading(prev => ({ ...prev, story: false }));
      
      const newStory: Story = {
        id: new Date().toISOString(),
        inputs,
        text: storyText,
      };
      setCurrentStory(newStory);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setLoading({story: false, audio: false, isGenerating: false});
    }
  };
  
  const playNarration = useCallback(async (text: string) => {
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    // Stop any currently playing audio
    if (audioSourceRef.current) {
      audioSourceRef.current.stop();
      audioSourceRef.current = null;
    }

    setLoading(prev => ({ ...prev, audio: true }));
    setError(null);
    try {
      const base64Audio = await generateNarration(text);
      const audioBytes = decode(base64Audio);
      const audioBuffer = await decodeAudioData(audioBytes, audioContextRef.current);
      
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
      
      audioSourceRef.current = source;
      source.onended = () => {
          if (audioSourceRef.current === source) {
            audioSourceRef.current = null;
          }
      };

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(prev => ({ ...prev, audio: false }));
    }
  }, []);

  const saveCurrentStory = useCallback(() => {
    if (currentStory && !storyLibrary.some(story => story.id === currentStory.id)) {
      const updatedLibrary = [...storyLibrary, currentStory];
      setStoryLibrary(updatedLibrary);
      localStorage.setItem('petGhostStoryLibrary', JSON.stringify(updatedLibrary));
    }
  }, [currentStory, storyLibrary]);

  const viewStoryFromLibrary = (story: Story) => {
    setCurrentStory(story);
    setInputs(story.inputs);
    setShowLibrary(false);
  };
  
  const deleteStoryFromLibrary = (storyId: string) => {
    const updatedLibrary = storyLibrary.filter(story => story.id !== storyId);
    setStoryLibrary(updatedLibrary);
    localStorage.setItem('petGhostStoryLibrary', JSON.stringify(updatedLibrary));
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-gray-800 font-sans p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-7xl">
        <Header onLibraryClick={() => setShowLibrary(true)} libraryCount={storyLibrary.length} />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <StoryForm 
            inputs={inputs} 
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
            onSubmit={handleSubmit} 
            onSurpriseMe={handleSurpriseMe} 
            isLoading={loading.isGenerating} 
            error={error}
            setError={setError}
          />
          <StoryDisplay 
            story={currentStory} 
            loading={loading}
            onPlayNarration={playNarration}
            onSaveStory={saveCurrentStory}
            isStorySaved={currentStory ? storyLibrary.some(s => s.id === currentStory.id) : false}
          />
        </main>
      </div>
      {showLibrary && (
        <StoryLibrary 
          stories={storyLibrary} 
          onClose={() => setShowLibrary(false)} 
          onSelectStory={viewStoryFromLibrary}
          onDeleteStory={deleteStoryFromLibrary}
        />
      )}
    </div>
  );
}
