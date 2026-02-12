
import { GoogleGenAI, Type } from "@google/genai";
import { SentimentResult } from "../types";

export const geminiService = {
  /**
   * Always create a new GoogleGenAI instance right before making an API call 
   * to ensure it uses the most up-to-date API key.
   */
  getAI() {
    return new GoogleGenAI({ apiKey: process.env.API_KEY });
  },

  async generateBrandNames(keywords: string[], tone: string): Promise<string[]> {
    const ai = this.getAI();
    const prompt = `Generate 10 creative and catchy brand names for a business in the niche of: ${keywords.join(", ")}. The brand tone should be ${tone}. Return only a comma-separated list of names.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    // response.text is a property, not a method
    return response.text?.split(',').map(n => n.trim()) || [];
  },

  async generateLogo(brandName: string, description: string): Promise<string | undefined> {
    const ai = this.getAI();
    const prompt = `A clean, modern, professional minimalist logo for a brand named "${brandName}". Description: ${description}. The logo should be iconic, symmetrical, and look like a corporate brand identity.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    // The output response may contain both image and text parts; iterate to find the image part.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return undefined;
  },

  async generateContent(type: string, brandDescription: string, audience: string): Promise<string> {
    const ai = this.getAI();
    const prompt = `Write high-converting ${type} content for a brand described as: "${brandDescription}". Targeted audience: ${audience}. Make it engaging and professional.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  },

  async analyzeSentiment(feedback: string): Promise<SentimentResult> {
    const ai = this.getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the sentiment of this brand feedback: "${feedback}". Provide a structured JSON analysis.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER, description: "Sentiment score from 0 to 100" },
            label: { type: Type.STRING, description: "One of: Positive, Neutral, Negative" },
            breakdown: {
              type: Type.OBJECT,
              properties: {
                trust: { type: Type.NUMBER },
                excitement: { type: Type.NUMBER },
                satisfaction: { type: Type.NUMBER }
              },
              required: ["trust", "excitement", "satisfaction"]
            },
            summary: { type: Type.STRING }
          },
          required: ["score", "label", "breakdown", "summary"]
        },
      },
    });

    return JSON.parse(response.text || "{}");
  },

  async chatAssistant(history: { role: string; parts: { text: string }[] }[], message: string) {
    const ai = this.getAI();
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview', // Pro model is better for complex branding reasoning
      history: history,
      config: {
        systemInstruction: "You are BrandCraft Assistant, an expert in branding, marketing, and business strategy. Help users brainstorm names, logos, content strategies, and market positioning.",
      }
    });

    const response = await chat.sendMessage({ message });
    return response.text;
  }
};
