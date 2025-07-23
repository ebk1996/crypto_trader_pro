import React, { useState, useEffect } from 'react';
import './App.css'
import { LogIn, UserPlus, LineChart, DollarSign, BarChart2, Settings, List, XCircle, CheckCircle } from 'lucide-react';

// Main App Component
const App = () => {
  // State to manage the current page view (login, signup, dashboard)
  const [currentPage, setCurrentPage] = useState('login');
  // State to manage user authentication status (simulated for frontend)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State for displaying messages (e.g., success, error)
  const [message, setMessage] = useState({ text: '', type: '' });

  // Effect to clear messages after a few seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Function to handle successful login (simulated)
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
    setMessage({ text: 'Logged in successfully!', type: 'success' });
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('login');
    setMessage({ text: 'Logged out successfully!', type: 'info' });
  };

  // Render different components based on authentication and current page
  const renderContent = () => {
    if (!isAuthenticated) {
      switch (currentPage) {
        case 'login':
          return <AuthForm type="login" onAuthSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} setMessage={setMessage} />;
        case 'signup':
          return <AuthForm type="signup" onAuthSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} setMessage={setMessage} />;
        default:
          return <AuthForm type="login" onAuthSuccess={handleLoginSuccess} setCurrentPage={setCurrentPage} setMessage={setMessage} />;
      }
    } else {
      return <Dashboard onLogout={handleLogout} setMessage={setMessage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter flex flex-col items-center justify-center p-4">
      {/* Global Message Display */}
      {message.text && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-2
            ${message.type === 'success' ? 'bg-green-600' : ''}
            ${message.type === 'error' ? 'bg-red-600' : ''}
            ${message.type === 'info' ? 'bg-blue-600' : ''}
          `}
        >
          {message.type === 'success' && <CheckCircle className="w-5 h-5" />}
          {message.type === 'error' && <XCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {renderContent()}
    </div>
  );
};

// Authentication Form Component (Login/Signup)
const AuthForm = ({ type, onAuthSuccess, setCurrentPage, setMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required.';
    if (!password) newErrors.password = 'Password is required.';
    if (type === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage({ text: 'Please correct the form errors.', type: 'error' });
      return;
    }

    setIsLoading(true);
    // --- Backend Integration Placeholder ---
    // In a real application, you would make an API call here to your Node.js/Express backend
    // For example:
    // try {
    //   const response = await fetch(`/api/auth/${type}`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     onAuthSuccess(); // Call the parent success handler
    //   } else {
    //     setMessage({ text: data.message || `Failed to ${type}.`, type: 'error' });
    //   }
    // } catch (error) {
    //   setMessage({ text: `Network error: ${error.message}`, type: 'error' });
    // } finally {
    //   setIsLoading(false);
    // }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Simulate success
    onAuthSuccess();
    setMessage({ text: `${type === 'login' ? 'Logged in' : 'Signed up'} successfully!`, type: 'success' });
    // --- End Backend Integration Placeholder ---
  };

  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 ${errors.email ? 'border-red-500' : 'border-gray-600'}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 ${errors.password ? 'border-red-500' : 'border-gray-600'}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>}
        </div>
        {type === 'signup' && (
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs italic mt-1">{errors.confirmPassword}</p>}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {type === 'login' ? 'Logging In...' : 'Signing Up...'}
            </div>
          ) : (
            type === 'login' ? 'Login' : 'Sign Up'
          )}
        </button>
      </form>
      <div className="mt-6 text-center">
        {type === 'login' ? (
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-indigo-400 hover:text-indigo-300 font-bold focus:outline-none"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-indigo-400 hover:text-indigo-300 font-bold focus:outline-none"
              disabled={isLoading}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ onLogout, setMessage }) => {
  const [tradeAmount, setTradeAmount] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC/USD');
  const [botConfig, setBotConfig] = useState(`// Your Node.js trading bot configuration goes here
// Example:
// module.exports = {
//   strategy: 'RSI_MACD',
//   pair: 'BTC/USD',
//   amount: 0.001,
//   takeProfit: 1.05,
//   stopLoss: 0.98,
//   indicators: {
//     rsi: { period: 14, overbought: 70, oversold: 30 },
//     macd: { fast: 12, slow: 26, signal: 9 }
//   }
// };
`);
  const [logs, setLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), message: 'Dashboard loaded.', type: 'info' },
    { timestamp: new Date().toLocaleTimeString(), message: 'Awaiting market data...', type: 'warning' },
  ]);

  // Function to simulate adding a log entry
  const addLog = (message, type = 'info') => {
    setLogs(prevLogs => [
      ...prevLogs,
      { timestamp: new Date().toLocaleTimeString(), message, type }
    ]);
  };

  // Handle Buy/Sell actions
  const handleTrade = async (type) => {
    if (!tradeAmount || !tradePrice || isNaN(tradeAmount) || isNaN(tradePrice) || parseFloat(tradeAmount) <= 0 || parseFloat(tradePrice) <= 0) {
      setMessage({ text: 'Please enter valid amount and price for the trade.', type: 'error' });
      addLog(`Failed to place ${type} order: Invalid input.`, 'error');
      return;
    }

    setMessage({ text: `Attempting to place ${type} order...`, type: 'info' });
    addLog(`Placing ${type} order for ${tradeAmount} ${selectedCurrency.split('/')[0]} at ${tradePrice} ${selectedCurrency.split('/')[1]}...`, 'info');

    // --- Backend Integration Placeholder ---
    // In a real application, you would send this trade request to your Node.js/Express backend
    // The backend would then interact with Kraken Pro API.
    // try {
    //   const response = await fetch('/api/trade', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${yourAuthToken}` },
    //     body: JSON.stringify({
    //       type: type, // 'buy' or 'sell'
    //       symbol: selectedCurrency,
    //       amount: parseFloat(tradeAmount),
    //       price: parseFloat(tradePrice)
    //     })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setMessage({ text: `Trade ${type} successful!`, type: 'success' });
    //     addLog(`Trade ${type} successful: ${data.tradeId}`, 'success');
    //   } else {
    //     setMessage({ text: data.message || `Trade ${type} failed.`, type: 'error' });
    //     addLog(`Trade ${type} failed: ${data.message}`, 'error');
    //   }
    // } catch (error) {
    //   setMessage({ text: `Network error: ${error.message}`, type: 'error' });
    //   addLog(`Network error during trade: ${error.message}`, 'error');
    // }

    // Simulate API call delay and success/failure
    await new Promise(resolve => setTimeout(resolve, 2000));
    const success = Math.random() > 0.3; // Simulate 70% success rate
    if (success) {
      setMessage({ text: `Trade ${type} successful!`, type: 'success' });
      addLog(`Trade ${type} successful for ${tradeAmount} ${selectedCurrency.split('/')[0]} at ${tradePrice} ${selectedCurrency.split('/')[1]}.`, 'success');
    } else {
      setMessage({ text: `Trade ${type} failed. Insufficient funds or market error.`, type: 'error' });
      addLog(`Trade ${type} failed for ${tradeAmount} ${selectedCurrency.split('/')[0]} at ${tradePrice} ${selectedCurrency.split('/')[1]}. Reason: Simulated error.`, 'error');
    }
    setTradeAmount('');
    setTradePrice('');
    // --- End Backend Integration Placeholder ---
  };

  const handleSaveBotConfig = async () => {
    setMessage({ text: 'Saving bot configuration...', type: 'info' });
    addLog('Attempting to save bot configuration...', 'info');

    // --- Backend Integration Placeholder ---
    // Send botConfig to your Node.js backend to be saved or deployed
    // try {
    //   const response = await fetch('/api/bot/config', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${yourAuthToken}` },
    //     body: JSON.stringify({ config: botConfig })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //     setMessage({ text: 'Bot configuration saved successfully!', type: 'success' });
    //     addLog('Bot configuration saved.', 'success');
    //   } else {
    //     setMessage({ text: data.message || 'Failed to save bot configuration.', type: 'error' });
    //     addLog(`Failed to save bot configuration: ${data.message}`, 'error');
    //   }
    // } catch (error) {
    //   setMessage({ text: `Network error: ${error.message}`, type: 'error' });
    //   addLog(`Network error saving bot config: ${error.message}`, 'error');
    // }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage({ text: 'Bot configuration saved successfully!', type: 'success' });
    addLog('Bot configuration saved successfully (simulated).', 'success');
    // --- End Backend Integration Placeholder ---
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Header */}
      <div className="lg:col-span-3 flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
        <h1 className="text-4xl font-extrabold text-indigo-400">Crypto AI Trader Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 transition duration-200 ease-in-out transform hover:scale-105"
        >
          <LogIn className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      {/* Trading Interface */}
      <div className="lg:col-span-1 bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-200 flex items-center space-x-2">
          <DollarSign className="w-6 h-6 text-green-400" />
          <span>Manual Trading</span>
        </h2>
        <div className="mb-4">
          <label htmlFor="currencySelect" className="block text-gray-300 text-sm font-bold mb-2">
            Select Currency Pair
          </label>
          <select
            id="currencySelect"
            className="shadow border rounded-lg w-full py-2 px-3 bg-gray-600 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            <option value="BTC/USD">BTC/USD</option>
            <option value="ETH/USD">ETH/USD</option>
            <option value="XRP/USD">XRP/USD</option>
            {/* Add more currency pairs as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
            Amount ({selectedCurrency.split('/')[0]})
          </label>
          <input
            type="number"
            id="amount"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-600"
            placeholder="e.g., 0.001"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
            step="any"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="price" className="block text-gray-300 text-sm font-bold mb-2">
            Price ({selectedCurrency.split('/')[1]})
          </label>
          <input
            type="number"
            id="price"
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-600"
            placeholder="e.g., 30000"
            value={tradePrice}
            onChange={(e) => setTradePrice(e.target.value)}
            step="any"
          />
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => handleTrade('buy')}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <BarChart2 className="w-5 h-5 rotate-90" />
            <span>Buy</span>
          </button>
          <button
            onClick={() => handleTrade('sell')}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <BarChart2 className="w-5 h-5 -rotate-90" />
            <span>Sell</span>
          </button>
        </div>
      </div>

      {/* Customizable Graph */}
      <div className="lg:col-span-2 bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-200 flex items-center space-x-2">
          <LineChart className="w-6 h-6 text-blue-400" />
          <span>Price Chart (Customizable)</span>
        </h2>
        <div className="flex-grow bg-gray-600 rounded-lg flex items-center justify-center text-gray-400 text-lg p-4">
          {/*
            This is a placeholder for your customizable graph.
            In a real application, you would integrate a charting library here,
            such as Recharts, Chart.js, or D3.js, to display real-time crypto data
            fetched from your backend (which would get it from Kraken Pro).
            You would also add controls for timeframes, indicators, etc.
          */}
          <p>Graph will be displayed here with real-time data.</p>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button className="bg-gray-600 hover:bg-gray-500 text-gray-200 py-2 px-4 rounded-lg text-sm transition duration-200">1H</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-gray-200 py-2 px-4 rounded-lg text-sm transition duration-200">4H</button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm transition duration-200">1D</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-gray-200 py-2 px-4 rounded-lg text-sm transition duration-200">1W</button>
          <button className="bg-gray-600 hover:bg-gray-500 text-gray-200 py-2 px-4 rounded-lg text-sm transition duration-200">1M</button>
        </div>
      </div>

      {/* Crypto Trade Bot Configuration */}
      <div className="lg:col-span-1 bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600">
        <h2 className="text-2xl font-bold mb-4 text-gray-200 flex items-center space-x-2">
          <Settings className="w-6 h-6 text-purple-400" />
          <span>AI Bot Configuration</span>
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Input your Node.js bot logic or configuration. This will be sent to your backend for execution.
          The AI prediction logic would typically reside in your backend or a separate AI service.
        </p>
        <textarea
          className="w-full h-64 bg-gray-600 text-gray-200 p-3 rounded-lg font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Paste your Node.js bot configuration or script here..."
          value={botConfig}
          onChange={(e) => setBotConfig(e.target.value)}
        ></textarea>
        <button
          onClick={handleSaveBotConfig}
          className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-200 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Save Bot Configuration</span>
        </button>
      </div>

      {/* Advanced Logging System */}
      <div className="lg:col-span-2 bg-gray-700 p-6 rounded-lg shadow-lg border border-gray-600 flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-200 flex items-center space-x-2">
          <List className="w-6 h-6 text-yellow-400" />
          <span>Activity Log</span>
        </h2>
        <div className="flex-grow bg-gray-600 rounded-lg p-4 overflow-y-auto h-80 custom-scrollbar">
          {logs.slice().reverse().map((log, index) => ( // Display latest logs first
            <div key={index} className={`mb-1 text-sm ${
              log.type === 'info' ? 'text-gray-300' :
              log.type === 'warning' ? 'text-yellow-300' :
              log.type === 'error' ? 'text-red-400' :
              log.type === 'success' ? 'text-green-400' : ''
            }`}>
              <span className="font-bold mr-2 text-gray-400">[{log.timestamp}]</span>
              {log.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;

