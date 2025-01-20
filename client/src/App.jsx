import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './admin/pages/Login';
import FoodInfo from './pages/FoodInfo';
import AddMenuItem from './components/admin/AddMenuItem';
import UpdateNutrition from './components/admin/UpdateNutrition';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="login" element={<Login />} />
          <Route path="/menu/:slug" element={<FoodInfo />} />
          <Route path="admin/add-item" element={<AddMenuItem />} />
          <Route
            path="/admin/menu-items/:id/nutrition"
            element={<UpdateNutrition />}
          />
        </Route>
      </Routes>
    </div>
  );
}