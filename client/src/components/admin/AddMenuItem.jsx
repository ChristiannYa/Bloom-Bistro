import API_URL from '../../config/api';
import { useState, useEffect } from 'react';
import BasicDetails from '../admin/form-components/BasicDetails';
import ImageUpload from '../admin/form-components/ImageUpload';
import NutritionTotals from '../admin/form-components/NutritionTotals';
import IngredientForm from '../admin/form-components/IngredientForm';

const AddMenuItem = () => {
  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isBeverage, setIsBeverage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${API_URL}/api/categories`);
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
    image_url: '',
    ingredients: '',
    ingredient_nutrition: [],
    nutrition_labels: JSON.stringify([
      {
        title: 'Approximate totals',
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
      },
    ]),
    notes: JSON.stringify([
      {
        title: '',
        content: '',
      },
    ]),
  });

  const resetForm = () => {
    const baseFields = {
      title: '',
      price: '',
      image_url: '',
      category_id: isBeverage ? 5 : '',
    };

    setFormData((prev) => ({
      ...prev,
      ...baseFields,
      ...(isBeverage
        ? {}
        : {
            description: '',
            ingredients: '',
            nutrition_labels: '',
            notes: '',
          }),
    }));
  };

  const validateForm = () => {
    const baseValidation =
      formData.title && formData.price && formData.image_url;

    if (isBeverage) {
      return baseValidation;
    }

    return (
      baseValidation &&
      formData.description &&
      formData.ingredients &&
      formData.category_id &&
      formData.nutrition_labels
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

  const deleteIngredient = (indexToDelete) => {
    const updatedIngredients = formData.ingredient_nutrition.filter(
      (_, index) => index !== indexToDelete
    );
    const totals = calculateTotalIng(updatedIngredients);

    setFormData((prev) => ({
      ...prev,
      ingredient_nutrition: updatedIngredients,
      nutrition_labels: JSON.stringify([
        {
          title: 'Approximate totals',
          ...totals,
        },
        ...updatedIngredients,
      ]),
    }));
  };

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
      {
        calories: 0,
        protein: 0,
        carbs: 0,
        fat: 0,
        fiber: 0,
      }
    );
  };

  const updateIngredientNutrition = (index, field, value) => {
    const updatedNutrition = [...formData.ingredient_nutrition];
    updatedNutrition[index][field] = value;

    const totals = calculateTotalIng(updatedNutrition);

    setFormData((prev) => ({
      ...prev,
      ingredient_nutrition: updatedNutrition,
      nutrition_labels: JSON.stringify([
        {
          title: 'Approximate totals',
          ...totals,
        },
        ...updatedNutrition,
      ]),
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    // Get token from localStorage
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();

      setFormData((prev) => ({
        ...prev,
        image_url: data.url,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/admin/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Menu item added successfully!');
        resetForm();
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6">
        Add New {isBeverage ? 'Beverage' : 'Menu Item'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Item Type Selector */}
        <select
          onChange={(e) => setIsBeverage(e.target.value === 'beverage')}
          className="w-full p-2 border rounded"
        >
          <option value="regular">Regular Item</option>
          <option value="beverage">Beverage</option>
        </select>

        {/* Basic Details - required */}
        <BasicDetails
          formData={formData}
          handleChange={handleChange}
          categories={categories}
          isBeverage={isBeverage}
        />

        <ImageUpload
          handleImageUpload={handleImageUpload}
          uploading={uploading}
          imageUrl={formData.image_url}
        />

        {/* Additional Details (Only for Regular Items) */}
        {!isBeverage && (
          <div className="space-y-4">
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
          </div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItem;
