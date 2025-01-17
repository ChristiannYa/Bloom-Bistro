import { useEffect, useState } from 'react';
import BeverageItem from './BeverageItem';

const BeverageLanding = () => {
  const [beverages, setBeverages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/beverages');
        if (!response.ok) throw new Error('Failed to fetch beverages');
        const data = await response.json();
        setBeverages(data);
      } catch (err) {
        setError(err.message);
        setBeverages([]);
      }
    };

    fetchBeverages();
  }, []);

  if (error) {
    return <div>Error loading beverages: {error}</div>;
  }

  return (
    <section className="pt-custom-2 pb-custom-1 bg-acc-4">
      <h3 className="main-header">Beverages</h3>
      <div className="menu-grid">
        {beverages.map((beverage) => (
          <BeverageItem key={beverage.id} data={beverage} />
        ))}
      </div>
    </section>
  );
};

export default BeverageLanding;
