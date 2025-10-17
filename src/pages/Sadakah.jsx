import Layout from "../components/Layout/Layout"
import Heading from "../components/Heading/Heading"
import SadaqahPage from "../components/Sadaqah/SadaqahPage";
import SadaqahForm from "../components/Sadaqah/SadaqahForm";

const Sadakah = () => {
  return (
    <Layout>
      <Heading title="সাদাকাহ" current="সাদাকাহ" />
      <SadaqahPage />
      <SadaqahForm />
    </Layout>
  );
};

export default Sadakah;