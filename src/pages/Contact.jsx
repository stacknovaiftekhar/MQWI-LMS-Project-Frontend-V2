import Layout from "../components/Layout/Layout";
import Heading from "../components/Heading/Heading";
import ContactPage from "../components/Contact/ContactPage";
import ContactForm from "../components/Contact/ContactForm";

const Contact = () => {
  return (
    <Layout>
      <Heading title="যোগাযোগ" current="যোগাযোগ" />
      <ContactPage />
      <ContactForm />
    </Layout>
  )
}

export default Contact;