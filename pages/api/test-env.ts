import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const hasKey = !!process.env.OPENAI_API_KEY;
  res.status(200).json({ 
    hasKey,
    keyLength: process.env.OPENAI_API_KEY?.length || 0 
  });
} 