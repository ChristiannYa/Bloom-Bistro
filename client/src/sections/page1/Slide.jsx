import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { PrevButton, NextButton } from '../../components/SlideButtons';

import { slide } from '../../constants';

const Slide = () => {
  // const [slide, setSlide] = useState([]);
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

    if (slide.length > 0) {
      checkScrollPosition();
    }

    container?.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      container?.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [containerRef]);

  return (
    <section className="bg-acc-2 w-screen py-custom-1">
      <div className="screen flex-center flex-col gap-10">
        <div className="w-full flex-center flex-col gap-x-8">
          <main ref={containerRef} id="slide" className="scroll-horizontal hidden-scrollbar w-full flex gap-x-5">
            {slide.map((item) => (
              <figure
                key={item.id}
                className="rounded-xl snap-center overflow-hidden w-[200px] h-[200px] flex flex-col flex-shrink-0"
              >
                <figcaption className="bg-acc-1 font-inter text-acc-2 tp-10 w-full py-2">
                  {item.name}
                </figcaption>
                <div className="bg-acc-3 flex-center flex-1">
                  <img
                    src={item.image_url}
                    alt="menu category"
                    className="object-cover w-fit"
                  />
                </div>
              </figure>
            ))}
          </main>
        </div>
        <div className="w-full flex justify-between">
          <div className='flex gap-x-3'>
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
          <Link to='/menu' className='bg-acc-1 font-inter text-acc-2 tp-10 rounded-md w-fit px-4 py-2'>
            Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Slide;
