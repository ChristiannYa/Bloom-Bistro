import PropTypes from 'prop-types';

const IngredientForm = ({ ingredient, index, updateIngredientNutrition, deleteIngredient }) => {
  const nutritionFields = [
    { key: 'calories', label: 'Calories', placeholder: 'Calories' },
    { key: 'protein', label: 'Protein', placeholder: 'Protein (g)' },
    { key: 'carbs', label: 'Carbs', placeholder: 'Carbs (g)' },
    { key: 'fat', label: 'Fat', placeholder: 'Fat (g)' },
    { key: 'fiber', label: 'Fiber', placeholder: 'Fiber (g)' }
  ];

  return (
    <div className="p-4 border rounded">
      <input
        type="text"
        placeholder="Ingredient Name"
        value={ingredient.title}
        onChange={(e) => updateIngredientNutrition(index, 'title', e.target.value)}
        className="w-full mb-2 border rounded p-2"
      />
      <div className="grid grid-cols-2 gap-4">
        {nutritionFields.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
              type="number"
              placeholder={placeholder}
              value={ingredient[key]}
              onChange={(e) => updateIngredientNutrition(index, key, Number(e.target.value))}
              className="border rounded p-2 w-full"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={() => deleteIngredient(index)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
        >
          Delete Ingredient
        </button>
      </div>
    </div>
  );
};

IngredientForm.propTypes = {
  ingredient: PropTypes.shape({
    title: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    fiber: PropTypes.number.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  updateIngredientNutrition: PropTypes.func.isRequired,
  deleteIngredient: PropTypes.func.isRequired
};

export default IngredientForm;
