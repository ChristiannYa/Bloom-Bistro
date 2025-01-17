import { location } from "../../constants"

const StoreInfo = () => {
  return (
    <section className="w-screen bg-acc-4 py-custom-1">
      <div className="screen">
        <div className="font-livvic flex items-end gap-x-6 max-md:flex-col max-md:items-start">
          {/* image wrapper */}
          <div>
            <img src="./src/assets/images/map.png" alt="map" />
          </div>
           {/* location content */}
          <div className="flex flex-col wh-fit">
            <h1 className="text-black-1 font-medium text-6">
              Come Try Our Menu!
            </h1>
            {location.map(item => (
              <div key={item.id} className="">
                <h2 className="text-black-1 font-medium text-4">
                  {item.title}
                </h2>
                {Array.isArray(item.content) ? (
                  <ul>
                    {item.content.map((line, index) => (
                      <li key={index} className="tp-8 text-black-2">
                        {line}
                      </li>
                    ))}
                  </ul>
                ): (
                  <p className="tp-8 text-black-2">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div> 
        </div>
      </div>
    </section>
  )
}

export default StoreInfo