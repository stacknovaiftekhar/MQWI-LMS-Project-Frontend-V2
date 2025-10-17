import { slider } from '../../../assets/assets';

const Slide = ({ image, text, isActive }) => {
  return (
    <div className={`carousel-item ${isActive ? "active" : ""}`}>
      <img src={image} className="d-block w-100" alt={text} />
      <div className="carousel-caption d-md-block">
        {/* <div className="inst-name animated fadeInDown">
          <h1 className='name-bn '>মারকাজুল কুরআন ওয়াসসুন্নাহ ইন্সটিটিউট</h1>
          <h1 className='name-en'>Markazul Quran Wassunnah Institute</h1>
        </div> */}
        <div className="content">
          <img className="animated fadeInDown" src={slider.SliderLogo} alt="MQWI Slider Logo Image" />
          <h2 className="animated fadeInDown">
            <span className="orange1">দেশ-বিদেশের</span> যেকোন প্রান্ত থেকে ঘরে বসে<br /> অনলাইনে
            <span className="green3"> বিশুদ্ধ কুরআন ও পূর্ণাঙ্গ দ্বীন</span><br /> শেখার একটি <span className="orange1">অনন্য মাধ্যম।</span>
          </h2>
          <a href="#banner" className="btn btn-all btn-tp animated fadeInUp"><span className="hsf hss">বিস্তারিত জানুন</span></a>
        </div>
      </div>
    </div>
  )
}

export default Slide