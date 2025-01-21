import { Link } from 'react-router-dom';

import { slide } from '../../constants';

const Slide = () => {
  return (
    <section className="bg-acc-2 w-screen py-custom-1">
      <div className="screen flex-center flex-col gap-10">
        <div className="w-full flex-center flex-col gap-x-8">
          <main id="slide" className="slide">
            {slide.map((item) => (
              <div key={item.id} className="slide__item">
                <div className="slide__desc bg-acc-1 text-acc-2">
                  <p className="font-livvic text-xl text-center">{item.name}</p>
                </div>
                <div className="slide__imgwrap flex-center">
                  <img
                    src={item.image_url}
                    alt="Category item"
                    className="wh-full"
                  />
                </div>
              </div>
            ))}
          </main>
        </div>
        <div className="w-full flex justify-center">
          <Link
            to="/menu"
            className="bg-acc-1 font-livvic text-acc-2 rounded-md w-fit px-4 py-2"
          >
            View Menu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Slide;
