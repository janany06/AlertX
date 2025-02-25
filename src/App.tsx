import React, { useState } from 'react';
import { AlertTriangle, Car, Shield, Activity, Bell, FileText, LogOut } from 'lucide-react';

type User = {
  email: string;
  name: string;
  initials: string;
};

type Page = 'login' | 'signup' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [user, setUser] = useState<User | null>(null);
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      message: 'Potential accident detected at Highway 101, Mile 245',
      severity: 'high'
    }
  ]);
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      time: '2 hours ago',
      location: 'Interstate 95, Mile 127',
      status: 'Resolved',
      statusColor: 'text-green-400'
    },
    {
      id: 2,
      time: '5 hours ago',
      location: 'Highway 101, Mile 245',
      status: 'In Progress',
      statusColor: 'text-yellow-400'
    },
    {
      id: 3,
      time: '1 day ago',
      location: 'Route 1, Mile 78',
      status: 'Resolved',
      statusColor: 'text-green-400'
    }
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const name = email.split('@')[0];
    const initials = name.substring(0, 2).toUpperCase();
    setUser({ email, name, initials });
    setCurrentPage('dashboard');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const name = email.split('@')[0];
    const initials = name.substring(0, 2).toUpperCase();
    setUser({ email, name, initials });
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const dismissAlert = (alertId: number) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const updateIncidentStatus = (incidentId: number, newStatus: string) => {
    setIncidents(incidents.map(incident => {
      if (incident.id === incidentId) {
        return {
          ...incident,
          status: newStatus,
          statusColor: newStatus === 'Resolved' ? 'text-green-400' : 'text-yellow-400'
        };
      }
      return incident;
    }));
  };

  if (currentPage === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-blue-400 mr-2" />
            <h1 className="text-3xl font-bold text-white">AlertX</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
            >
              Log In
            </button>
          </form>
          <p className="mt-4 text-center text-slate-400">
            Don't have an account?{' '}
            <button
              onClick={() => setCurrentPage('signup')}
              className="text-blue-400 hover:text-blue-300"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  }

  if (currentPage === 'signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <Shield className="h-10 w-10 text-blue-400 mr-2" />
            <h1 className="text-3xl font-bold text-white">AlertX</h1>
          </div>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="mt-1 block w-full rounded-md bg-slate-700 border-slate-600 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 transition-colors"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => setCurrentPage('login')}
              className="text-blue-400 hover:text-blue-300"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <h1 className="text-2xl font-bold text-white">AlertX</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative group">
                <Bell className="h-6 w-6 text-slate-300 hover:text-white transition-colors" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center text-xs text-white">
                    {alerts.length}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{user?.initials}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Alert Banner */}
        {alerts.map(alert => (
          <div key={alert.id} className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <div>
                  <h2 className="text-red-500 font-semibold">Active Alert</h2>
                  <p className="text-slate-300">{alert.message}</p>
                </div>
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </div>
        ))}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-300">Active Vehicles</h3>
              <Car className="h-5 w-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-white">247</p>
            <p className="text-sm text-slate-400">+12 from yesterday</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-green-500/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-300">Risk Level</h3>
              <Activity className="h-5 w-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-white">Low</p>
            <p className="text-sm text-slate-400">Normal conditions</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 hover:border-yellow-500/50 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-slate-300">Response Time</h3>
              <Bell className="h-5 w-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-white">1.2m</p>
            <p className="text-sm text-slate-400">Average response time</p>
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Incidents</h2>
            <FileText className="h-5 w-5 text-slate-400" />
          </div>
          
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div key={incident.id} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                <div>
                  <p className="text-slate-200">{incident.location}</p>
                  <p className="text-sm text-slate-400">{incident.time}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={incident.status}
                    onChange={(e) => updateIncidentStatus(incident.id, e.target.value)}
                    className="bg-slate-700 text-slate-200 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <span className={`${incident.statusColor} text-sm font-medium`}>
                    {incident.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;