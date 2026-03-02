import { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import { Assignment } from '../models/Assignment';
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getHint = async (req: Request, res: Response): Promise<void> => {
  const { assignmentId, userQuery } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);
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
  } catch (error) {
    console.error('LLM Hint error:', error);
    res.status(500).json({ error: 'Error generating hint' });
  }
};
