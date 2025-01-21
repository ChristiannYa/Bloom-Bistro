import API_URL from '../../config/api';
import { useEffect, useState } from 'react';

import MenuSkeleton from './MenuSkeleton';
import MenuItem from './MenuItem';

const MenuLanding = () => {
  const FORCE_LOADING = false;

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const beverages = menuItems.filter((item) => item.category_id === 5);
  const regularItems = menuItems.filter((item) => item.category_id !== 5);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [categoriesResponse, menuItemsResponse] = await Promise.all([
          fetch(`${API_URL}/api/categories`),
          fetch(`${API_URL}/api/menu-items`),
        ]);

        if (!categoriesResponse.ok)
          throw new Error('Failed to fetch categories');
        if (!menuItemsResponse.ok)
          throw new Error('Failed to fetch menu items');

        const [categoriesData, menuItemsData] = await Promise.all([
          categoriesResponse.json(),
          menuItemsResponse.json(),
        ]);

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setMenuItems(menuItemsData);
      } catch (err) {
        setError(err.message);
        setCategories([]);
        setMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const displayedItems =
    selectedCategory === 'all'
      ? [...regularItems].sort(() => Math.random() - 0.5)
      : regularItems.filter((item) => item.category_id === selectedCategory);

  if (isLoading || FORCE_LOADING) {
    return <MenuSkeleton />;
  }

  if (error) {
    return <div>Error loading menu: {error}</div>;
  }

  return (
    <section className="pt-custom-2 pb-custom-1">
      <div className="screen flex flex-col gap-y-[25px]">
        <nav>
          <ul className="flex justify-center flex-wrap gap-x-5 gap-y-3">
            <li
              onClick={() => setSelectedCategory('all')}
              className={`font-inter font-semibold text-1 text-center border-hover-1 rounded-md min-w-[160px] py-2 cursor-pointer  ${
                selectedCategory === 'all'
                  ? 'text-acc-3 bg-acc-1'
                  : 'text-acc-1 bg-acc-3'
              }`}
            >
              All
            </li>
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

        {selectedCategory !== 5 && <h2 className="main-header">Beverages</h2>}

        {/* bevergaes array */}
        <div className="flex flex-wrap gap-4">
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
