import { storeCards } from "../../constants"

const StoreCards = () => {
  return (
    <section className="bg-acc-4 w-screen py-custom-1">
      <div className="screen gap-4 max-md:gap-2 flex-center flex-wrap">
        {storeCards.map((card) => (
          <div key={card.id} className="bg-acc-1 rounded-md p-3 w-[180px] h-[180px] max-mobile:h-fit max-mobile:w-full">
            <div className="">
              <img src={card.icon} alt="" width={36} height={36} className="float-start mr-5 max-mobile:float-end max-mobile:mr-0 max-mobile:ml-1"/>
              <p className="tp-2 font-livvic text-acc-4">
                {card.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StoreCards