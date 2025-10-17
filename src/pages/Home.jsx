import Layout from "../components/Layout/Layout"
import Slider from "../components/Home/Slider/Slider"
import Banner from "../components/Home/Banner/Banner"
import Motive from "../components/Home/Motive/Motive"
import Features from "../components/Home/Features/Features"
// import Tawqeet from "../components/Home/Tawqeet/Tawqeet"
import Courses from "../components/Home/Courses/Courses"
import Temp1 from "../components/Temp/Temp1"
import Teachers from "../components/Home/Teachers/Teachers"
import Counters from "../components/Home/Counter/Counters"

const Home = () => {
  return (
    <Layout>
      <Slider />
      <Banner />
      <Motive />
      <Features />
      {/* <Tawqeet /> */}
      <Courses />
      <Counters />
      <Temp1 />
      <section className="py-5"></section>
      <Teachers />
    </Layout>
  )
}

export default Home