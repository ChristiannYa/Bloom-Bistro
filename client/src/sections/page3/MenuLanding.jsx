import API_URL from '../../config/api';
import { useEffect, useState } from 'react';
import MenuItem from './MenuItem';

const MenuLanding = () => {
  console.log('API URL: ', API_URL);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const beverages = menuItems.filter((item) => item.category_id === 5);
  const regularItems = menuItems.filter((item) => item.category_id !== 5);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message);
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  // Fetch menu items
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu-items`);
        if (!response.ok) throw new Error('Failed to fetch menu items');
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError(err.message);
        setMenuItems([]);
      }
    };
    fetchMenuItems();
  }, []);

  const displayedItems =
    selectedCategory === 'all'
      ? [...regularItems].sort(() => Math.random() - 0.5)
      : regularItems.filter((item) => item.category_id === selectedCategory);

  if (error) {
    return <div>Error loading menu: {error}</div>;
  }

  return (
    <section className="pt-custom-2 pb-custom-1 bg-acc-4">
      <div className="screen flex flex-col gap-y-[25px]">
        <nav className="flex justify-center">
          <ul className="scroll-horizontal flex mx-auto gap-x-5 w-fit">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`font-inter font-semibold text-1 text-center border-hover-1 rounded-md min-w-[160px] py-2 cursor-pointer ${
                  selectedCategory === category.id
                    ? 'text-acc-3 bg-acc-1'
                    : 'text-acc-1 bg-acc-3'
                }`}
              >
                {category.title}
              </li>
            ))}
          </ul>
        </nav>

        <h3 className="main-header">
          {selectedCategory === 'all'
            ? 'Menu'
            : categories.find((cat) => cat.id === selectedCategory)?.title}
        </h3>

        {/* menuItems array */}
        <div className="menu-grid">
          {displayedItems.map((item) => (
            <MenuItem
              key={item.id}
              data={item}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>

        {/* bevergaes array */}
        <div className="flex flex-wrap gap-4 border-t border-acc-1 pt-5">
          {beverages.map((item) => (
            <MenuItem
              key={item.id}
              data={item}
              selectedCategory={selectedCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuLanding;
