
import { GoogleGenAI, Type } from "@google/genai";

// Use Vite's import.meta.env for environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || (typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : '');
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export interface AnalysisResult {
  tags: string[];
  summary: string;
  isAppropriate: boolean;
}

export async function analyzeFoodDescription(description: string): Promise<AnalysisResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this food donation description: "${description}". 
      Identify dietary tags (Halal, Vegan, Vegetarian, etc.) and create a one-sentence dignified summary for people in need. 
      Also check if the content is appropriate for a food support app.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Dietary and food type tags"
            },
            summary: {
              type: Type.STRING,
              description: "Dignified summary of the food"
            },
            isAppropriate: {
              type: Type.BOOLEAN,
              description: "Whether the description is safe and relevant"
            }
          },
          required: ["tags", "summary", "isAppropriate"]
        }
      }
    });

    // Directly access response.text property per guidelines (not a method call)
    const jsonStr = response.text?.trim() || '{}';
    const result = JSON.parse(jsonStr);
    
    return {
      tags: result.tags || [],
      summary: result.summary || "No summary available.",
      isAppropriate: result.isAppropriate ?? true
    };
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return {
      tags: [],
      summary: "Donation description processing failed.",
      isAppropriate: true
    };
  }
}