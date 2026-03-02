"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHint = void 0;
const genai_1 = require("@google/genai");
const Assignment_1 = require("../models/Assignment");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ai = new genai_1.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const getHint = async (req, res) => {
    const { assignmentId, userQuery } = req.body;
    try {
        const assignment = await Assignment_1.Assignment.findById(assignmentId);
        if (!assignment) {
            res.status(404).json({ error: 'Assignment not found' });
            return;
        }
        const prompt = `
      You are an expert SQL tutor for a platform called CipherSQLStudio.
      A student is trying to solve the following assignment:
      Title: ${assignment.title}
      Question: ${assignment.question}
      
      The student's current query is: 
      "${userQuery}"
      
      Provide a helpful hint to guide the student towards the correct answer. 
      CRITICAL INSTRUCTION: Do NOT provide the exact or complete SQL solution. Only point out syntax errors, missing clauses (like GROUP BY or JOIN), or logical missteps. Be encouraging and concise.
    `;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        const hint = response.text || 'Keep trying! Focus on the requirements of the question.';
        res.status(200).json({ hint });
    }
    catch (error) {
        console.error('LLM Hint error:', error);
        res.status(500).json({ error: 'Error generating hint' });
    }
};
exports.getHint = getHint;
