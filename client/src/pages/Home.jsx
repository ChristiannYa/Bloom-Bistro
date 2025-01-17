import HomeLanding from "../sections/page1/HomeLanding"
import Slide from "../sections/page1/Slide"
import Proudly from "../sections/page1/Proudly"
import StoreCards from "../sections/page1/StoreCards"
import Reviews from "../sections/page1/Reviews"
import StoreInfo from "../sections/page1/StoreInfo"

const Home = () => {
  return (
    <div>
      <HomeLanding/>
      <Slide/>
      <Proudly/>
      <StoreCards/>
      <Reviews/>
      <StoreInfo/>
    </div>
  )
}

export default Home