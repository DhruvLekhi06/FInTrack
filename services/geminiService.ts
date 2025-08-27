import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Transaction } from "../types.ts";

// Frontend env var injected by Vite at build time (yes, it's public on GH Pages)
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;

// Lazy-init client so the app doesn't crash if key is missing
let genAI: GoogleGenerativeAI | null = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
} else {
  console.warn("VITE_GEMINI_API_KEY not set. AI features are disabled.");
}

// Example: trivial helper that you can adapt to your existing calls
export async function getSpendingInsights(transactions: Transaction[]): Promise<string> {
  if (!genAI) return "AI features are disabled.";
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Summarize spending patterns in these transactions:\n${JSON.stringify(transactions).slice(0, 12000)}`;
    const result = await model.generateContent(prompt);
    const text = await result.response.text();
    return text.trim();
  } catch (err) {
    console.error("Gemini error:", err);
    return "Could not generate insights right now.";
  }
}
