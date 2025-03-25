import type { NextApiRequest, NextApiResponse } from 'next';

// In a real app, this would be in a database
let polls = new Map();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      const poll = polls.get(id);
      if (!poll) {
        return res.status(404).json({ error: 'Poll not found' });
      }
      return res.status(200).json(poll);

    case 'POST':
      // Handle voting
      const { optionId } = req.body;
      const existingPoll = polls.get(id);
      if (!existingPoll) {
        return res.status(404).json({ error: 'Poll not found' });
      }

      const updatedOptions = existingPoll.options.map(option => {
        if (option.id === optionId) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });

      const updatedPoll = {
        ...existingPoll,
        options: updatedOptions,
        totalVotes: existingPoll.totalVotes + 1
      };

      polls.set(id, updatedPoll);
      return res.status(200).json(updatedPoll);

    case 'PUT':
      // Create or update poll
      polls.set(id, { ...req.body, totalVotes: 0 });
      return res.status(200).json(polls.get(id));

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 