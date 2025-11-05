import { GoogleGenAI, Modality } from "@google/genai";
import { StoryInputs } from '../types';

const getAiClient = () => {
    // Use the API key from environment variables, or a fallback for demonstration purposes.
    const apiKey = process.env.API_KEY || 'AIzaSyD1LpiKup6-wlqFGvF55cRrWkLRPuro84o';
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
      - Main Character: A ${inputs.petType} named ${inputs.petName}.
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
