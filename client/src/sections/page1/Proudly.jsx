import icons from '../../assets/icons';

const Proudly = () => {
  return (
    <section className="bg-proudly bg-cover bg-[90%_center] bg-no-repeat w-screen h-screen relative">
      <div className="screen mx-auto gap-y-3 -translate-x-1/2 flex-center flex-col absolute bottom-[50px] left-1/2">
        <div className="bg-acc-3 rounded px-2 w-fit">
          <p className="font-livvic text-black-1 font-medium text-3 text-center">
            We&rsquo;ve proudly served the community for over 5 years and
            counting
          </p>
        </div>

        <div className="bg-acc-3 rounded px-2 w-fit">
          <p className="text-[1.3rem] font-livvic text-black-2 text-center font-medium">
            Here&rsquo;s to many more years of serving smiles, warm meals, and
            cherished memories
          </p>
        </div>
      </div>
      <img
        src={icons.divisor}
        alt=""
        className="w-screen h-[35px] max-md:h-[25px] absolute bottom-0 left-0 right-0"
      />
    </section>
  );
};

export default Proudly;
