import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Safely initialize client only if key exists, otherwise we'll handle errors gracefully
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateStylistResponse = async (userMessage: string, contextInfo: string): Promise<string> => {
  if (!ai) {
    return "I'm currently offline (API Key missing). Please check back later!";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: `You are Walkin's AI Stylist. Your tone is cool, knowledgeable, and helpful.
        You help customers find the perfect sneakers from our catalog.
        Use the provided PRODUCT CONTEXT to recommend specific shoes.
        Keep answers short (under 50 words) unless asked for details.
        If you recommend a shoe, mention its exact name so they can search for it.
        
        PRODUCT CONTEXT:
        ${contextInfo}
        `,
      }
    });
    
    return response.text || "I'm having trouble thinking of a style right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having a bit of a brain freeze. Try asking again!";
  }
};