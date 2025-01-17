import { useEffect, useRef, useState } from 'react';

import { PrevButton, NextButton} from '../../components/SlideButtons';
import icons from '../../assets/icons/index';
import { reviews } from '../../constants';

const Reviews = () => {
  const [scrollState, setScrollState] = useState({
    isAtStart: true,
    isAtEnd: false,
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const checkScrollPosition = () => {
      if (container) {
        const isAtStart = container.scrollLeft <= 0;
        const isAtEnd =
          Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth;
        setScrollState({ isAtStart, isAtEnd });
      }
    };

    if (reviews.length > 0) {
      checkScrollPosition();
    }

    container?.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container?.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [containerRef]); // Add slide as well when fetching the data

  return (
    <section className="bg-acc-3 w-screen py-custom-1">
      <div
        ref={containerRef}
        className="screen flex scroll-horizontal hidden-scrollbar gap-5"
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-acc-2 rounded-md font-inter snap-center min-w-[240px] h-fit p-4 gap-y-3 flex flex-col"
          >
            <div className="flex gap-x-2">
              {/* photo wrapper */}
              <div className="bg-acc-3 rounded-full overflow-hidden w-[46px] aspect-square">
                <img
                  src={review.image}
                  alt=""
                  className="wh-full object-cover"
                />
              </div>
              {/* name and stars wrapper */}
              <div>
                <h3 className="tp-6 text-black-1">{review.name}</h3>
                {/* stars wrapper */}
                <div className="flex gap-x-1">
                  {[...Array(5)].map((_, index) => (
                    <img
                      key={index}
                      src={index < review.stars ? icons.star : icons.unfilledStar}
                      alt=""
                      width={12}
                      height={12}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="tp-2 text-black-1">{review.content}</p>
          </div>
        ))}
      </div>
      <div className="screen flex justify-between mt-8 max-mobile:hidden">
        <div className="flex gap-x-3">
          <PrevButton
            containerRef={containerRef}
            scrollDistance={300}
            scrollState={scrollState}
          />
          <NextButton
            containerRef={containerRef}
            scrollDistance={300}
            scrollState={scrollState}
          />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
