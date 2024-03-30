import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAi.getGenerativeModel({ model: "gemini-pro" });

export default model;