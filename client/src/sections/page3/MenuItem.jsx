import API_URL from '../../config/api';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuItems = (props) => {
  const { id, title, image_url, price, description, slug, category_id } =
    props.data;
  const isAdmin = true;
  const isBeverage = category_id === 5;

  const handleDelete = async (id) => {
    console.log('Deleting item with ID:', id);
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${API_URL}/api/admin/menu-items/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Delete response:', response);

        if (response.ok) {
          console.log('Item deleted successfully');
          window.location.reload();
        } else {
          const errorData = await response.json();
          console.error('Delete failed:', errorData);
        }
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  const ImageComponent = () => (
    <div className="rounded-md overflow-hidden w-full h-[180px]">
      {isBeverage ? (
        <img
          src={image_url}
          alt="menu item"
          loading="lazy"
          className="wh-full object-cover"
        />
      ) : (
        <Link to={slug}>
          <img
            src={image_url}
            alt="menu item"
            loading="lazy"
            className="wh-full object-cover scale-hover"
          />
        </Link>
      )}
    </div>
  );

  return (
    <div
      className={`bg-acc-2 font-inter rounded-md wh-fit p-2 ${
        isBeverage ? 'max-md:flex-grow' : ''
      }`}
    >
      <div
        className={`rounded-md overflow-hidden h-[180px] ${
          isBeverage ? 'w-[120px] max-md:w-full' : 'w-full'
        }`}
      >
        <ImageComponent />
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex flex-col">
          <h3 className="text-black-1 font-medium capitalize">{title}</h3>
          <p className="text-black-2 text-08">{description}</p>
        </div>
        <div className="flex flex-col justify-center items-end gap-y-1">
          <p className="text-black-1 font-light">${price}</p>
        </div>
        {isAdmin && (
          <button
            onClick={() => handleDelete(id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

MenuItems.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image_url: PropTypes.string,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    slug: PropTypes.string.isRequired,
    category_id: PropTypes.number.isRequired,
  }),
  selectedCategory: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default MenuItems;
