import { banner } from '../../../assets/assets';
import useFetch from '../../../hooks/useFetch';
import { Link } from 'react-router';
import './Banner.css'

const Banner = () => {
  const { contactInfo } = useFetch();

  return (
    <section className="banner" id='banner'>
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-7 col-xl-8">
            <div className="content hsf text-justify">
              <h2 className="hsf hsb">&quot;ঘরে বসেই শিখুন বিশুদ্ধ কুরআন ও পূর্ণাঙ্গ দ্বীন&quot;</h2>
              <p>আসসালামু আলাইকুম। <strong>মারকাজুল কুরআন ওয়াসসুন্নাহ ইন্সটিটিউটের</strong> ভার্চুয়াল ক্যাম্পাসে আপনাকে স্বাগতম।</p>
              <p><strong>মারকাজুল কুরআন ওয়াসসুন্নাহ ইন্সটিটিউট</strong> দেশ-বিদেশের যেকোন প্রান্ত থেকে ঘরে বসে অনলাইনে বিশুদ্ধ কুরআন শিক্ষাসহ পূর্ণাঙ্গ দ্বীন শেখার একটি অনন্য মাধ্যম।</p>
              <p>এখানে থাকছে সুদক্ষ ও অভিজ্ঞ আলেম-আলেমাগণের তত্ত্বাবধানে বিশুদ্ধভাবে কুরআন শিক্ষাসহ পূর্ণাঙ্গ দ্বীন শেখার বিশেষ ব্যবস্থা। এখানে আরও রয়েছে তাফসির, হাদিস, ফিকহ, আক্বায়েদ সহ বিষয়ভিত্তিক বিভিন্ন অনলাইন লাইভ ক্লাস ও রেকর্ডেড কোর্সসমূহ।</p>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 col-xl-4">
            <div className="contact">
              <figure>
                <img src={banner.BannerBg} alt="Banner Background Image" />
                <div className="details">
                  <h5>contact us for a joining</h5>
                  <img src={banner.Divider1} alt="Divider" />
                  <h2>{contactInfo?.phone}</h2>
                  <span className="email">{contactInfo?.email}</span>
                  <Link to="/contact" className="btn btn-all btn-wh"><span>Contact</span></Link>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner;