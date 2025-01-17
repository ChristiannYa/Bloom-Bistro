import PropTypes from 'prop-types';
import icons from '../assets/icons';

export const NextButton = ({ containerRef, scrollDistance = 300, scrollState }) => {
  const nextSlide = (container, scrollDistance) => {
    const maxScroll = container.scrollWidth - container.clientWidth;
    const newScrollPosition = Math.min(
      container.scrollLeft + scrollDistance,
      maxScroll
    );
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={() => nextSlide(containerRef.current, scrollDistance)}
      disabled={scrollState.isAtEnd}
      className="z-3"
    >
      <img src={icons.next} alt="" />
    </button>
  );
};

export const PrevButton = ({ containerRef, scrollDistance = 300, scrollState }) => {
  const prevSlide = (container, scrollDistance) => {
    const newScrollPosition = Math.max(
      container.scrollLeft - scrollDistance,
      0
    );
    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={() => prevSlide(containerRef.current, scrollDistance)}
      disabled={scrollState.isAtStart}
      className="z-3"
    >
      <img src={icons.prev} alt="" />
    </button>
  );
};

const buttonPropTypes = {
  containerRef: PropTypes.shape({ 
    current: PropTypes.object 
  }).isRequired,
  scrollDistance: PropTypes.number,
  scrollState: PropTypes.shape({
    isAtStart: PropTypes.bool,
    isAtEnd: PropTypes.bool
  }).isRequired
};

NextButton.propTypes = buttonPropTypes;
PrevButton.propTypes = buttonPropTypes;
