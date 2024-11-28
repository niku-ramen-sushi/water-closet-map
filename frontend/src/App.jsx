import ToiletMap from './components/pages/ToiletMap.jsx';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login.jsx';
import Notfound from './components/pages/Notfound.jsx';
import ProtectedRoute from './components/auths/ProtectedRoute.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/map"
        element={
          <ProtectedRoute>
            <ToiletMap />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default App;
