import PropTypes from 'prop-types';
import '../styles/components/burger.scss';

const Burger = ({isActive, toggle}) => {
  return (
    <div className="md:hidden flex justify-end mb-6">
      <label
        className="burger-menu"
        id="burger"
      >
        <input type="checkbox" checked={isActive} onChange={toggle} className=''/>
      </label>
    </div>
  );
};

Burger.propTypes = {
  isActive: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
};

export default Burger;
