import Layout from "../components/Layout/Layout"
import Heading from "../components/Heading/Heading"
import Banner from "../components/Home/Banner/Banner"
import Motive from "../components/Home/Motive/Motive"
import Features from "../components/Home/Features/Features"
import Teachers from "../components/Home/Teachers/Teachers"

const AboutUs = () => {
  return (
    <Layout>
      <Heading title="আমাদের পরিচিতি" current="পরিচিতি" />
      <Banner />
      <Motive />
      <Features />
      <Teachers />
    </Layout>
  )
}

export default AboutUs