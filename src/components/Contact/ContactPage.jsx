import { FaMapMarkerAlt, FaMobileAlt, FaEnvelope, FaHandsHelping } from "react-icons/fa";
import { ContactInfoDetail } from "../../api/admin";
import { useEffect, useState } from 'react';
import './Contact.css';

const ContactPage = () => {
  const [contacts, setContacts] = useState(null);

  const fetchContacts = async () => {
    try {
      const response = await ContactInfoDetail();
      setContacts(response.data);
    } catch (error) {
      console.error("Failed to Fetch Contact Info:", error);
    }
  };

  useEffect(() => { fetchContacts(); }, []);

  return (
    <section className="contact-page">
      <div className="container-fluid" style={{ background: "#EAFAF1" }}>
        <div className="container text-center heading py-5">
          <p className='animated zoomIn icon'><i><FaHandsHelping /></i></p>
          <h4 className="abf lh-base my-2">আপনার গুরুত্বপূর্ণ মতামত, পরামর্শ বা অভিমত জানিয়ে আমাদের কার্যক্রমকে আরও সমৃদ্ধ করতে সহায়তা করুন</h4>
          <h4 className="abf lh-base my-2">আপনার যদি কোনো সহযোগিতা বা সহায়তার প্রয়োজন হয়, তাহলে অনুগ্রহ করে আমাদের সঙ্গে যোগাযোগ করুন</h4>
          <h4 className="abf lh-base my-2">আল্লাহ্‌ তাআলা আপনাকে উত্তম প্রতিদান দিন</h4>
        </div>
      </div>
      
      <div className="container-fluid" style={{ background: "#F2F8F5" }}>
        <div className="container py-5">
          {/* Contact Info */}
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="contact-info">
                <span><FaMapMarkerAlt /></span>
                <p>{contacts?.address}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="contact-info">
                <span><FaMobileAlt /></span>
                <p>{contacts?.phone}</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="contact-info">
                <span><FaEnvelope /></span>
                <p>{contacts?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactPage;