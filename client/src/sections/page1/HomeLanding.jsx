const HomeLanding = () => {
  return (
    <section className="bg-hero bg-cover bg-center bg-no-repeat h-screen w-screen ">
      <div className="screen h-full relative">
        <div className="text-white-1 font-livvic max-md:gap-y-2 text-start flex flex-col justify-start absolute bottom-[50px]">
          <div className="relative w-fit">
            <span className="max-md:blur absolute inset-0 rounded"></span>
            <h1 className='relative z-2 font-medium text-[4.8rem] max-md:text-[3.5rem] p-1'>
              Bloom Bistro
            </h1>
          </div>

          <div className="relative w-fit">
            <span className="max-md:blur absolute inset-0 rounded"></span>
            <h2 className="relative z-2 font-medium text-[2.6rem] max-md:text-[2.25rem] p-1">
              Every Meal Tells A Story
            </h2>
          </div>
          
          <div className="relative w-fit">
            <span className="max-md:blur absolute inset-0 rounded"></span>  
            <h3 className="relative z-2 font-normal text-5 max-md:text-[1.25rem] p-1">
              Explore our menu, know about us, and expericence the
              heart behind every meal.
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeLanding