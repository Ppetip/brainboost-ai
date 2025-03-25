import { NextApiRequest, NextApiResponse } from 'next';
import { ChatAIClass } from '../../lib/ChatAIClass';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const chatAI = new ChatAIClass();
    const questions = await chatAI.getResponse('JavaScript basics');
    res.status(200).json(questions);
  } catch (error) {
    console.error('API Test Error:', error);
    res.status(500).json({ error: (error as Error).message });
  }
} 