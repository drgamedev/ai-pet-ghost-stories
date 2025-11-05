import { GoogleGenAI, Modality } from "@google/genai";
import { StoryInputs } from '../types';
import { getApiKey } from './apiKeyService';

const getAiClient = () => {
    const apiKey = getApiKey();
    if (!apiKey) {
        throw new Error("API_KEY_NOT_SET");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateStory = async (inputs: StoryInputs): Promise<string> => {
    const ai = getAiClient();
    const prompt = `
      Write a short, family-friendly bedtime story for a child aged 4-10.
      The story must be between 300 and 500 words.
      The tone should be wholesome, imaginative, and gently spooky, focusing on curiosity and friendship, not fear.
      It should feel like a magical, warm, and calming adventure.

      Please include the following elements:
      - Main Character: A pet named ${inputs.petName}.
      - Location: The story happens at or near "${inputs.favoritePlace}".
      - A Ghost: A ${inputs.ghostType} ghost.
      - A prominent color: The color ${inputs.favoriteColor} should be featured in a magical way.
      - Story Mood: The story should have a ${inputs.mood} feeling.

      Do not include any scary elements. The ghost should be a friend.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating story:", error);
        throw new Error("Failed to generate the story. Please try again.");
    }
};

export const generateIllustration = async (inputs: StoryInputs): Promise<string> => {
    const ai = getAiClient();
    const prompt = `
      Create a cute, cartoon-style illustration for a children's bedtime story.
      The style should be soft, rounded, and magical, like a gentle animated movie (think Casper meets Clifford the Big Red Dog).
      The scene features a pet named ${inputs.petName} and a ${inputs.ghostType} ghost, which is ${inputs.favoriteColor}.
      They are in a location that looks like "${inputs.favoritePlace}".
      The overall mood is ${inputs.mood} and friendly.
    `;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });
        const base64ImageBytes = response.generatedImages[0].image.imageBytes;
        return `data:image/png;base64,${base64ImageBytes}`;
    } catch (error) {
        console.error("Error generating illustration:", error);
        throw new Error("Failed to create the illustration. Please try again.");
    }
};

export const generateNarration = async (text: string): Promise<string> => {
    const ai = getAiClient();
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text: `Read this children's story in a calm, soothing voice: ${text}` }] }],
            config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                    voiceConfig: {
                        prebuiltVoiceConfig: { voiceName: 'Kore' },
                    },
                },
            },
        });

        const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (!base64Audio) {
            throw new Error("No audio data received from API.");
        }
        return base64Audio;
    } catch (error) {
        console.error("Error generating narration:", error);
        throw new Error("Failed to generate narration. Please try again.");
    }
};
