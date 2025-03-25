import { useState } from 'react';
import { FaSync, FaPrint, FaSave } from 'react-icons/fa';

interface SeatingConfig {
  rows: number;
  cols: number;
  students: string[];
}

interface SavedLayout {
  name: string;
  config: SeatingConfig;
  arrangement: (string | null)[][];
}

export const SeatingChart = () => {
  const [config, setConfig] = useState<SeatingConfig>({
    rows: 5,
    cols: 6,
    students: [],
  });

  const [studentInput, setStudentInput] = useState('');
  const [arrangement, setArrangement] = useState<(string | null)[][]>([]);
  const [savedLayouts, setSavedLayouts] = useState<SavedLayout[]>([]);
  const [layoutName, setLayoutName] = useState('');

  // Initialize or reset the seating arrangement
  const initializeArrangement = () => {
    const newArrangement = Array(config.rows).fill(null)
      .map(() => Array(config.cols).fill(null));
    setArrangement(newArrangement);
  };

  // Handle student list input
  const handleStudentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStudentInput(e.target.value);
    const names = e.target.value.split('\n').filter(name => name.trim());
    setConfig(prev => ({ ...prev, students: names }));
  };

  // Randomly arrange students
  const randomizeSeating = () => {
    const newArrangement = Array(config.rows).fill(null)
      .map(() => Array(config.cols).fill(null));
    
    const shuffledStudents = [...config.students]
      .sort(() => Math.random() - 0.5);
    
    let studentIndex = 0;
    for (let i = 0; i < config.rows; i++) {
      for (let j = 0; j < config.cols; j++) {
        if (studentIndex < shuffledStudents.length) {
          newArrangement[i][j] = shuffledStudents[studentIndex];
          studentIndex++;
        }
      }
    }
    setArrangement(newArrangement);
  };

  // Save current layout
  const saveLayout = () => {
    if (!layoutName) return;
    const newLayout: SavedLayout = {
      name: layoutName,
      config: { ...config },
      arrangement: [...arrangement],
    };
    setSavedLayouts(prev => [...prev, newLayout]);
    setLayoutName('');
  };

  // Load saved layout
  const loadLayout = (layout: SavedLayout) => {
    setConfig(layout.config);
    setArrangement(layout.arrangement);
    setStudentInput(layout.config.students.join('\n'));
  };

  // Print seating chart
  const printChart = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Seating Chart Generator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Configuration</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Rows
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={config.rows}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      rows: parseInt(e.target.value) 
                    }))}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Columns
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={config.cols}
                    onChange={(e) => setConfig(prev => ({ 
                      ...prev, 
                      cols: parseInt(e.target.value) 
                    }))}
                    className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Student Names (one per line)
                </label>
                <textarea
                  value={studentInput}
                  onChange={handleStudentInput}
                  rows={8}
                  className="w-full p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="John Smith&#13;Jane Doe&#13;..."
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={initializeArrangement}
                  className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Create Grid
                </button>
                <button
                  onClick={randomizeSeating}
                  className="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Randomize
                </button>
              </div>
            </div>
          </div>

          {/* Save Layout Section */}
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Save Layout</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={layoutName}
                onChange={(e) => setLayoutName(e.target.value)}
                placeholder="Layout Name"
                className="flex-1 p-2 rounded border dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                onClick={saveLayout}
                disabled={!layoutName}
                className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded disabled:bg-gray-400"
              >
                <FaSave />
              </button>
            </div>
          </div>
        </div>

        {/* Seating Chart Display */}
        <div className="lg:col-span-2">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Seating Arrangement</h3>
              <button
                onClick={printChart}
                className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <FaPrint />
              </button>
            </div>

            <div className="grid gap-2" style={{
              gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`
            }}>
              {arrangement.map((row, i) => (
                row.map((student, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="aspect-square p-2 border-2 rounded flex items-center justify-center text-center
                      text-sm bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                  >
                    {student || '(empty)'}
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Saved Layouts */}
          {savedLayouts.length > 0 && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Saved Layouts</h3>
              <div className="grid grid-cols-2 gap-2">
                {savedLayouts.map((layout, index) => (
                  <button
                    key={index}
                    onClick={() => loadLayout(layout)}
                    className="p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                  >
                    {layout.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 