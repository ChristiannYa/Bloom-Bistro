import API_URL from '../config/api';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const FoodInfo = () => {
  const { slug } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${API_URL}/api/menu-items/${slug}`);
        if (!response.ok) {
          window.location.href = '/menu';
          return;
        }
        const data = await response.json();
        setItemDetails(data);
      } catch (err) {
        console.error('Failed to fetch item details: ', err);
        window.location.href = '/menu';
      }
    };
    fetchDetails();
  }, [slug]);

  return (
    <section className="bg-acc-4 py-custom-2">
      <div className="screen">
        {itemDetails && (
          <div className="flex flex-col gap-y-4">
            <h3 className="main-header mb-4">{itemDetails.title}</h3>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <img
                src={itemDetails.image_url}
                alt={itemDetails.title}
                className="h-[200px] rounded-sm"
              />
              <div className="flex flex-col w-2/5 max-md:w-3/4">
                <h4 className="text-black-1 font-inter font-medium text-2">
                  Ingredients
                </h4>
                <p className="text-black-1 font-inter font-normal text-1 capitalize">
                  {itemDetails.ingredients}
                </p>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-black-1 font-inter font-medium text-2">
                Nutrition Facts
              </h3>
              <div className="macros-grid">
                {itemDetails.nutrition_labels.map((label, index) => (
                  <div
                    key={index}
                    className="bg-acc-2 rounded-md overflow-hidden h-fit px-3 py-[6px]"
                  >
                    <h3 className="text-black-1 font-inter font-normal text-1 capitalize">
                      {label.title}
                    </h3>
                    <ul className="text-black-2 font-inter font-light text-1">
                      <li>Calories: {label.calories}</li>
                      <li>Protein: {label.protein}g</li>
                      <li>Carbs: {label.carbs}g</li>
                      <li>Fat: {label.fat}g</li>
                      <li>Fiber: {label.fiber}g</li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {itemDetails.notes && (
              <aside className="flex flex-col gap-y-2">
                {itemDetails.notes.map((note, index) => (
                  <div key={index}>
                    <h3 className="ext-black-1 font-inter font-normal text-1 capitalize">
                      {note.title}
                    </h3>
                    <p className="text-black-2 font-inter font-light text-1">
                      {note.content}
                    </p>
                  </div>
                ))}
              </aside>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodInfo;
