import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function Placeholder({ title }) {
  return (
    <div className="main-content">
      <div className="page-header">
        <h1>{title}</h1>
        <p>Coming soon — we'll build this next!</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
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
