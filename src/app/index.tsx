import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import { Users } from './pages/Users';
import { NotFound } from './pages/NotFound';
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
