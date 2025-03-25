import OpenAI from 'openai';
import type { Question } from '../types/quiz';

const SYSTEM_PROMPT = `
You are an educational quiz generator. Create engaging multiple-choice questions about the given topic.
Each question should:
1. Be clear and accurate
2. Have 4 choices with only one correct answer
3. Include plausible but clearly incorrect alternatives
4. Be educational and thought-provoking

Return ONLY a JSON array of question objects with this exact format:
[{
  "question": "Question text here?",
  "choices": ["Correct answer", "Wrong answer 1", "Wrong answer 2", "Wrong answer 3"],
  "correctAnswer": 0
}]
The correctAnswer must be the index (0-3) of the correct choice.
Generate exactly 4 questions.
`;

const STUDY_BUDDY_PROMPT = `
You are a helpful study buddy AI. Provide clear, concise, and educational responses.
Break down complex topics into understandable parts.
Include examples where helpful.
If relevant, suggest additional resources or related topics to explore.
`;

export class ChatAIClass {
  private openai: OpenAI;

  constructor() {
    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
  }

  async getResponse(prompt: string, type: string) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          type
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('ChatAI Error:', error);
      throw error;
    }
  }

  private parseResponse(response: string): Question[] {
    try {
      // Clean the response string
      const cleanJson = response
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const questions = JSON.parse(cleanJson);

      // Validate the structure
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }

      questions.forEach((q, i) => {
        if (!q.question || !Array.isArray(q.choices) || 
            q.choices.length !== 4 || 
            typeof q.correctAnswer !== 'number' ||
            q.correctAnswer < 0 || q.correctAnswer > 3) {
          throw new Error(`Invalid question format at index ${i}`);
        }
      });

      return questions;
    } catch (error) {
      console.error('Parse Error:', error);
      throw new Error('Failed to parse AI response');
    }
  }
} 