import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

export async function explainMistake(word, userAnswer, errorType) {
  const prompt = `
    You are MaoBai, a friendly panda teacher.
    Student answered "${userAnswer}" for word "${word.simplified}" (${word.meaning}).
    Error type: ${errorType}.
    Explain gently in 1 sentence. Give a memory trick. Use panda emoji. Max 30 words.
  `;
  
  try {
    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (e) {
    return `🐼 Remember: "${word.simplified}" means "${word.meaning}"!`;
  }
}
