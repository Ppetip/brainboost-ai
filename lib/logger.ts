type LogLevel = 'info' | 'warning' | 'error';
type LogAction = 'input' | 'click' | 'create' | 'vote' | 'api';

interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  action: LogAction;
  component: string;
  details: string;
  data?: any;
}

class Logger {
  private static logs: LogEntry[] = [];
  private static maxLogs = 1000;

  static async log(level: LogLevel, action: LogAction, component: string, details: string, data?: any) {
    const entry: LogEntry = {
      timestamp: new Date(),
      level,
      action,
      component,
      details,
      data
    };

    this.logs.unshift(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.pop();
    }

    // Send log to logging server
    try {
      await fetch('http://localhost:3001/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      console.error('Failed to send log to logging server:', error);
    }

    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[${entry.timestamp.toISOString()}] ${level.toUpperCase()} - ${component}: ${details}`,
        data || ''
      );
    }
  }

  static getLogs() {
    return this.logs;
  }

  static clearLogs() {
    this.logs = [];
  }
}

export default Logger; 