import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Logger from '@/lib/logger';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  isActive: boolean;
  totalVotes: number;
}

export default function PollPage() {
  const router = useRouter();
  const { id } = router.query;
  const [hasVoted, setHasVoted] = useState(false);
  const [poll, setPoll] = useState<Poll | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  useEffect(() => {
    if (id) {
      Logger.log('info', 'api', 'PollPage', 'Fetching poll data', { pollId: id });
      fetchPoll();
    }
  }, [id]);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`/api/polls/${id}`);
      if (!response.ok) {
        throw new Error('Poll not found');
      }
      const data = await response.json();
      setPoll(data);
      Logger.log('info', 'api', 'PollPage', 'Poll data fetched successfully', {
        pollId: id,
        question: data.question
      });
    } catch (err) {
      Logger.log('error', 'api', 'PollPage', 'Failed to fetch poll', {
        pollId: id,
        error: err.message
      });
      setError('Failed to load poll');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVote = async (optionId: string) => {
    if (hasVoted) return;
    
    Logger.log('info', 'vote', 'PollPage', 'Vote attempt', {
      pollId: id,
      optionId
    });
    
    setIsVoting(true);
    try {
      const response = await fetch(`/api/polls/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ optionId }),
      });

      if (!response.ok) {
        throw new Error('Failed to vote');
      }

      const updatedPoll = await response.json();
      setPoll(updatedPoll);
      setHasVoted(true);
      
      // Store vote in localStorage to prevent multiple votes
      localStorage.setItem(`poll-${id}`, optionId);
      
      Logger.log('info', 'vote', 'PollPage', 'Vote successful', {
        pollId: id,
        optionId,
        totalVotes: updatedPoll.totalVotes
      });
    } catch (err) {
      Logger.log('error', 'vote', 'PollPage', 'Vote failed', {
        pollId: id,
        optionId,
        error: err.message
      });
      setError('Failed to submit vote');
    } finally {
      setIsVoting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
          <FaSpinner className="animate-spin" />
          <span>Loading poll...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 dark:text-red-400">
          {error}
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300">
          Poll not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 dark:text-white">
            {poll.question}
          </h1>
          
          <div className="space-y-4">
            {poll.options.map(option => (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={hasVoted || isVoting}
                className={`w-full p-4 rounded-lg text-left transition-colors
                  ${hasVoted
                    ? 'bg-gray-100 dark:bg-gray-700 cursor-not-allowed'
                    : 'bg-blue-50 dark:bg-blue-900 hover:bg-blue-100 dark:hover:bg-blue-800'
                  }`}
              >
                <span className="text-gray-900 dark:text-white">
                  {option.text}
                </span>
                {hasVoted && (
                  <div className="mt-2">
                    <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-500"
                        style={{ 
                          width: `${(option.votes / poll.totalVotes) * 100}%` 
                        }}
                      />
                    </div>
                    <div className="mt-1 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                      <span>{option.votes} votes</span>
                      <span>
                        {poll.totalVotes > 0 
                          ? `${Math.round((option.votes / poll.totalVotes) * 100)}%` 
                          : '0%'}
                      </span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {hasVoted && (
            <div className="mt-6 text-center text-gray-500 dark:text-gray-400">
              Total votes: {poll.totalVotes}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 