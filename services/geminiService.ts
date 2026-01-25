
import { GoogleGenAI, Type } from "@google/genai";

// Always use the API_KEY from process.env directly per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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