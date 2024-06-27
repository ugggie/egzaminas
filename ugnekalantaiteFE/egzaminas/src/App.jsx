import './App.css';
import Login from './components/pages/Login';
import Registration from './components/pages/Registration';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './services/privateRoutes';
import { AuthProvider } from './services/AuthContext';
import Home from './components/pages/Home';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className='App'>
          <Routes>
            <Route path='/' element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/home" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
            {/* Uncomment and use these routes as needed */}
            {/* 
            <Route path="/" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
            <Route path="/list" element={<PrivateRoute roles={['User', 'Admin']}><Home /></PrivateRoute>} />
            <Route path="/projects/:projectId/delete" element={<PrivateRoute roles={['Admin']}><DeleteProjectPage /></PrivateRoute>} />
            <Route path="/create" element={<PrivateRoute roles={['User', 'Admin']}><Create /></PrivateRoute>} />
            <Route path="/projects/:id" element={<PrivateRoute roles={['User', 'Admin']}><ProjectDetails /></PrivateRoute>} />
            <Route path="/projects/:id/edit" element={<PrivateRoute roles={['User', 'Admin']}><EditProject /></PrivateRoute>} />
            <Route path="/projects/:id/create-task" element={<PrivateRoute roles={['User', 'Admin']}><CreateTask /></PrivateRoute>} />
            <Route path="/projects/:id/taskboard" element={<PrivateRoute roles={['User', 'Admin']}><TaskBoard /></PrivateRoute>} />
            */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
