import { GoogleGenAI, GenerateContentResponse, Type, Content as GeminiChatMessage } from "@google/genai";
import { Transaction, Category, ChatMessage } from '../types.ts';
import { CATEGORIES } from '../constants.ts';

const API_KEY: string | undefined = import.meta.env.VITE_GEMINI_API_KEY as any;

// Conditionally initialize the AI client
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("API_KEY environment variable not set. Gemini API features will be disabled.");
}

export const getSpendingInsights = async (transactions: Transaction[]): Promise<string> => {
    // Check for AI client availability in each function
    if (!ai) return "AI features are disabled. Please set your API_KEY.";
    try {
        const prompt = `You are a friendly and insightful personal finance assistant for a user in India. Analyze the following JSON data of their recent transactions. Provide clear, actionable insights in a conversational tone, formatted as Markdown. Identify spending trends (e.g., 'Your spending on Zomato/Swiggy has increased...'). Highlight potential savings areas. Praise good saving habits. Keep insights concise and easy to read. Transaction data: ${JSON.stringify(transactions)}`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text;
    } catch (error) {
        console.error("Error fetching spending insights:", error);
        return "Sorry, I couldn't generate insights at the moment. Please try again later.";
    }
};

export const categorizeTransactionsFromText = async (text: string): Promise<Partial<Transaction>[]> => {
    if (!ai) {
        alert("AI features are disabled. Please set your API_KEY.");
        return [];
    }
    try {
        const categoryList = CATEGORIES.map(c => c.name).join(', ');
        const prompt = `You are an expert at parsing financial transaction data for Indian users. Analyze the following text. For each transaction, identify the merchant/description, amount, and date. Categorize each transaction into one of these categories: ${categoryList}. Return a JSON array of objects with 'description', 'amount', 'date' (in YYYY-MM-DD format), and 'category' (use the id from the categories list provided). Text: \n\n${text}`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            description: { type: Type.STRING },
                            amount: { type: Type.NUMBER },
                            date: { type: Type.STRING },
                            category: { type: Type.STRING },
                        },
                    },
                },
            },
        });
        
        const jsonStr = response.text.trim();
        const parsedData = JSON.parse(jsonStr);

        return parsedData.map((item: any) => {
            const category = CATEGORIES.find(c => c.name.toLowerCase() === item.category.toLowerCase()) || CATEGORIES.find(c => c.id === 'other');
            return { ...item, category: category?.id, type: 'expense' };
        });

    } catch (error) {
        console.error("Error categorizing transactions:", error);
        throw new Error("Failed to parse statement. The format might be unsupported.");
    }
};

export const getAIAssistantResponse = async (prompt: string, history: ChatMessage[], financialContext: any): Promise<string> => {
    if (!ai) return "AI features are disabled. Please set your API_KEY.";

    const systemInstruction = `You are "FinPal", a world-class, friendly, and professional financial wellness assistant for users in India. Your goal is to provide simple, actionable advice.
- Use simple language. Explain complex terms like 'XIRR' or 'expense ratio' in a relatable way (e.g., "think of it like...").
- Be conversational and empathetic.
- When asked for advice (e.g., "Can I afford this phone?"), analyze the user's financial data and provide a balanced view, not just a yes/no. For example: "Based on your savings, you could afford it, but it would delay your Goa trip goal by 2 months. Have you considered...".
- Keep your answers concise and formatted in Markdown for readability.
- Refer to the user's data contextually (e.g., "I see you have an SIP in Parag Parikh...").
- Today's date is ${new Date().toLocaleDateString()}.`;

    const chatHistory: GeminiChatMessage[] = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
    }));

    // Remove the latest user message from history as it's the current prompt
    chatHistory.pop(); 

    try {
        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
            history: chatHistory,
        });

        const contextMessage = `Here is the user's current financial data (use this for context but don't mention it unless relevant): ${JSON.stringify(financialContext)}`;
        
        const response: GenerateContentResponse = await chat.sendMessage({ message: `${contextMessage}\n\nUser query: ${prompt}`});
        
        return response.text;
    } catch (error) {
        console.error("Error getting AI assistant response:", error);
        return "I'm sorry, I'm having trouble thinking right now. Please try asking me again in a moment.";
    }
};