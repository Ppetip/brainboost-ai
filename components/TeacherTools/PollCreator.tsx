import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaQrcode, FaSpinner, FaCopy, FaTrash } from 'react-icons/fa';

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
  createdAt: Date;
}

export const PollCreator = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  const [showQR, setShowQR] = useState(false);

  const createPoll = async () => {
    if (!question.trim() || options.filter(opt => opt.trim()).length < 2) return;
    
    setIsCreating(true);
    try {
      const newPoll: Poll = {
        id: Date.now().toString(),
        question,
        options: options.filter(opt => opt.trim()).map(text => ({
          id: Math.random().toString(36).substr(2, 9),
          text,
          votes: 0
        })),
        isActive: true,
        createdAt: new Date()
      };

      const response = await fetch(`/api/polls/${newPoll.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPoll),
      });

      if (!response.ok) {
        throw new Error('Failed to create poll');
      }

      setPolls(prev => [newPoll, ...prev]);
      setQuestion('');
      setOptions(['', '']);
      setSelectedPoll(newPoll);
    } catch (error) {
      console.error('Error creating poll:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const addOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const getPollUrl = (pollId: string) => {
    return `${window.location.origin}/polls/${pollId}`;
  };

  const copyPollLink = async (pollId: string) => {
    const url = getPollUrl(pollId);
    try {
      await navigator.clipboard.writeText(url);
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const openPollInNewTab = (pollId: string) => {
    window.open(getPollUrl(pollId), '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Interactive Poll Creator</h2>

      {/* Create New Poll */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Poll Question
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question..."
            className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Options
          </label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  placeholder={`Option ${index + 1}`}
                  className="flex-1 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(index)}
                    className="p-3 text-red-500 hover:text-red-600"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </div>
          {options.length < 6 && (
            <button
              onClick={addOption}
              className="mt-3 text-blue-600 dark:text-blue-400 hover:underline"
            >
              + Add Option
            </button>
          )}
        </div>

        <button
          onClick={createPoll}
          disabled={isCreating || !question.trim() || options.filter(opt => opt.trim()).length < 2}
          className={`w-full py-3 rounded-lg font-semibold text-white
            ${isCreating || !question.trim() || options.filter(opt => opt.trim()).length < 2
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isCreating ? (
            <span className="flex items-center justify-center">
              <FaSpinner className="animate-spin mr-2" />
              Creating Poll...
            </span>
          ) : (
            'Create Poll'
          )}
        </button>
      </div>

      {/* Active Polls */}
      {polls.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Your Polls</h3>
          <div className="space-y-4">
            {polls.map(poll => (
              <div
                key={poll.id}
                className={`p-4 rounded-lg border ${
                  selectedPoll?.id === poll.id
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {poll.question}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created {poll.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyPollLink(poll.id)}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
                      title="Copy link"
                    >
                      <FaCopy />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPoll(poll);
                        setShowQR(true);
                      }}
                      className="p-2 text-blue-600 dark:text-blue-400 hover:text-blue-700"
                      title="Show QR code"
                    >
                      <FaQrcode />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {poll.options.map(option => (
                    <div key={option.id} className="flex justify-between items-center">
                      <span className="text-gray-700 dark:text-gray-300">{option.text}</span>
                      <span className="text-gray-500 dark:text-gray-400">{option.votes} votes</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => openPollInNewTab(poll.id)}
                  className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                >
                  Open Live Poll
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQR && selectedPoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Scan to Join Poll
            </h3>
            <div className="bg-white p-4 rounded-lg flex justify-center">
              <QRCodeSVG
                value={getPollUrl(selectedPoll.id)}
                size={200}
                level="H"
                includeMargin
              />
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="mt-4 w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 