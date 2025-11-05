
export interface StoryInputs {
  petName: string;
  favoritePlace: string;
  favoriteColor: string;
  ghostType: string;
  mood: string;
}

export interface Story {
  id: string;
  inputs: StoryInputs;
  text: string;
  imageUrl: string;
}

export type LoadingState = {
  story: boolean;
  image: boolean;
  audio: boolean;
  isGenerating: boolean;
};
