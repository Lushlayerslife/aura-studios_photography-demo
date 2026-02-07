import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Sessions from './components/Sessions';
import Clients from './components/Clients';
import Galleries from './components/Galleries';
import Invoices from './components/Invoices';
import Templates from './components/Templates';
import Workflows from './components/Workflows';
import Analytics from './components/Analytics';
import Team from './components/Team';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <Sidebar onLogout={() => setIsAuthenticated(false)} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/workflows" element={<Workflows />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/team" element={<Team />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
