import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { topic, numberOfQuestions = 5 } = req.body;

    const prompt = `Generate a quiz about ${topic} with ${numberOfQuestions} multiple choice questions. 
    Format the response as a JSON array of questions, where each question has:
    - question: the question text
    - options: array of 4 possible answers
    - correctAnswer: the index (0-3) of the correct answer
    
    Example format:
    {
      "questions": [
        {
          "question": "What is...",
          "options": ["A", "B", "C", "D"],
          "correctAnswer": "0"
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful quiz generator." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response from AI');
    }

    const parsedResponse = JSON.parse(response);

    if (!Array.isArray(parsedResponse.questions)) {
      throw new Error('Invalid response format from AI');
    }

    return res.status(200).json(parsedResponse);
  } catch (error) {
    console.error('Quiz generation error:', error);
    return res.status(500).json({ error: 'Failed to generate quiz' });
  }
} 