
export interface StoryInputs {
  petName: string;
  petType: string;
  favoritePlace: string;
  favoriteColor: string;
  ghostType: string;
  mood: string;
}

export interface Story {
  id: string;
  inputs: StoryInputs;
  text: string;
}

export type LoadingState = {
  story: boolean;
  audio: boolean;
  isGenerating: boolean;
};