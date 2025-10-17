import ScrollProgressBar from "../../utilities/ScrollProgressBar";
import ScrollTopButton from "../../utilities/ScrollTopButton";
import Header from "./Header/Header"
import Footer from "./Footer/Footer"

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ScrollProgressBar />
      <main>{children}</main>
      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default Layout