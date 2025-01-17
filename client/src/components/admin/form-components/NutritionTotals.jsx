import PropTypes from 'prop-types';

const NutritionTotals = ({ totals }) => {
  const nutritionFields = [
    { label: 'Calories', key: 'calories', unit: '' },
    { label: 'Protein', key: 'protein', unit: 'g' },
    { label: 'Carbs', key: 'carbs', unit: 'g' },
    { label: 'Fat', key: 'fat', unit: 'g' },
    { label: 'Fiber', key: 'fiber', unit: 'g' }
  ];

  return (
    <div className="p-4 border rounded bg-gray-50">
      <h4 className="mb-2 font-semibold">
        Approximate Totals (Auto-Calculated)
      </h4>
      <div className="grid grid-cols-2 gap-4">
        {nutritionFields.map(({ label, key, unit }) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm text-gray-600">{label} {unit}</label>
            <span className="font-medium">{totals[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

NutritionTotals.propTypes = {
  totals: PropTypes.object.isRequired
}

export default NutritionTotals