import API_URL from '../../config/api';
import { useEffect, useState } from 'react';
import NutritionTotals from '../admin/form-components/NutritionTotals';
import IngredientForm from '../admin/form-components/IngredientForm';
import { useParams } from 'react-router-dom';

const UpdateNutrition = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchMenuItem = async () => {
      const response = await fetch(`${API_URL}/api/admin/menu-items/${id}`);
      const data = await response.json();
      setMenuItem(data);
      setFormData({
        ingredient_nutrition: data.nutrition_labels.slice(1) || [],
        nutrition_labels: JSON.stringify(data.nutrition_labels),
      });
    };
    fetchMenuItem();
  }, [id]);

  if (!formData) return <div>Loading...</div>;

  const getTotals = () => {
    const labels = JSON.parse(formData.nutrition_labels);
    return labels[0] || { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 };
  };

  const calculateTotalIng = (ingredients) => {
    return ingredients.reduce(
      (totals, ingredient) => ({
        calories: totals.calories + Number(ingredient.calories),
        protein: totals.protein + Number(ingredient.protein),
        carbs: totals.carbs + Number(ingredient.carbs),
        fat: totals.fat + Number(ingredient.fat),
        fiber: totals.fiber + Number(ingredient.fiber),
      }),
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 }
    );
  };

  const addIngredientNutrition = () => {
    const newIngredient = {
      title: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
    };
    setFormData((prev) => ({
      ...prev,
      ingredient_nutrition: [...prev.ingredient_nutrition, newIngredient],
    }));
  };

  const updateIngredientNutrition = (index, field, value) => {
    const updatedNutrition = [...formData.ingredient_nutrition];
    updatedNutrition[index][field] = value;

    const totals = calculateTotalIng(updatedNutrition);

    setFormData((prev) => ({
      ...prev,
      ingredient_nutrition: updatedNutrition,
      nutrition_labels: JSON.stringify([
        { title: 'Approximate totals', ...totals },
        ...updatedNutrition,
      ]),
    }));
  };

  const deleteIngredient = (indexToDelete) => {
    const updatedIngredients = formData.ingredient_nutrition.filter(
      (_, index) => index !== indexToDelete
    );
    const totals = calculateTotalIng(updatedIngredients);

    setFormData((prev) => ({
      ...prev,
      ingredient_nutrition: updatedIngredients,
      nutrition_labels: JSON.stringify([
        { title: 'Approximate totals', ...totals },
        ...updatedIngredients,
      ]),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API_URL}/api/admin/menu-items/${menuItem.id}/nutrition`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nutrition_labels: formData.nutrition_labels }),
        }
      );
      if (response.ok) {
        alert('Nutrition information updated successfully!');
      }
    } catch (error) {
      console.error('Error updating nutrition:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md mt-20">
      <div className="py-4">
        <h2 className="text-2xl font-bold">
          Update Nutrition Information for {menuItem?.title}
        </h2>
        {menuItem?.image_url && (
          <img
            src={menuItem.image_url}
            alt={menuItem.title}
            className="w-24 h-20 object-cover rounded"
          />
        )}
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <NutritionTotals totals={getTotals()} />

        <div className="space-y-4">
          <h4 className="font-medium">Ingredient Details</h4>
          <div className="gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {formData.ingredient_nutrition.map((ingredient, index) => (
              <IngredientForm
                key={index}
                ingredient={ingredient}
                index={index}
                updateIngredientNutrition={updateIngredientNutrition}
                deleteIngredient={deleteIngredient}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addIngredientNutrition}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add Ingredient
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Update Nutrition Information
        </button>
      </form>
    </div>
  );
};

export default UpdateNutrition;
