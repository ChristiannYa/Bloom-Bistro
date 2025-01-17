import PropTypes from 'prop-types';

const ImageUpload = ({ 
  handleImageUpload, 
  uploading, 
  image_url = ''
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        onChange={handleImageUpload}
        accept="image/*"
        className="mt-1 block w-full"
        required
      />
      {uploading && <p>Uploading...</p>}
      {image_url && (
        <img
          src={image_url}
          alt="Preview"
          className="mt-2 h-20 w-20 object-cover rounded"
        />
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  handleImageUpload: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  image_url: PropTypes.string
};

export default ImageUpload;
