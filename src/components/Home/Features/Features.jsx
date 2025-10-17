import { feature } from '../../../assets/faicons';
import { divider } from '../../../assets/assets';
import Feature from './Feature';
import './Features.css'

const Features = () => {

  const features = [
    {
      icon: feature.faChalkboardTeacher, title: "সুযোগ্য ইন্সট্রাক্টর প্যানেল",
      desc: "আমাদের রয়েছে দক্ষ ও অভিজ্ঞ আলেম-আলেমা, যাদের নিবিড় তত্ত্বাবধানে আপনি দ্বীনের যে কোনো বিষয়ের উপর পূর্ণাঙ্গ জ্ঞান অর্জন করতে পারবেন।"
    },
    {
      icon: feature.faVideo, title: "অনলাইন লাইভ ক্লাস",
      desc: "প্রতিটি ক্লাস অনলাইনে লাইভ নেওয়া হয়, ফলে আপনি পৃথিবীর যে কোনো প্রান্ত থেকে ঘরে বসে ক্লাস করতে পারবেন এবং তাৎক্ষণিকভাবে প্রশ্ন করে বুঝে নেওয়ার সুযোগ পাবেন।"
    },
    {
      icon: feature.faLayerGroup, title: "বিষয়ভিত্তিক কোর্সের সমাহার",
      desc: "দ্বীনের মৌলিক সকল বিষয়ের ওপর সাধারণ ক্লাসের পাশাপাশি বিষয়ভিত্তিক বিভিন্ন বিশেষ কোর্সের ব্যবস্থাও রয়েছে, যা শিক্ষার্থীদের জন্য অত্যন্ত উপকারী হবে, ইনশাআল্লাহ।"
    },
    {
      icon: feature.faClock, title: "নিজের সুবিধামতো সময়ে শেখা",
      desc: "সবগুলো ক্লাসের রেকর্ড সংরক্ষণ করা হয়, ফলে আপনি কোনো কারণে ক্লাস মিস করলেও পরবর্তীতে নিজের সুবিধামতো সময়ে ক্লাসের পড়া শিখে নিতে পারবেন।"
    },
    {
      icon: feature.faTasks, title: "নিজেকে যাচাই করার সুযোগ",
      desc: "প্রাতিষ্ঠানিকভাবে মূল্যায়ন পরীক্ষার ব্যবস্থা রয়েছে, পাশাপাশি কুইজ প্রশ্নের মাধ্যমে স্ব-মূল্যায়নের সুযোগও রয়েছে, যার মাধ্যমে আপনি সহজেই নিজেকে যাচাই করতে পারবেন।"
    },
    {
      icon: feature.faUsers, title: "একক ও গ্রুপভিত্তিক পড়ার সুযোগ",
      desc: "গ্রুপভিত্তিকভাবে পড়ার সুযোগ রয়েছে, পাশাপাশি দুর্বল শিক্ষার্থীদের জন্য নির্দিষ্ট একজন উস্তায বা উস্তাযার তত্ত্বাবধানে ব্যক্তিগতভাবে পড়ার বিশেষ সুবিধাও রয়েছে।"
    },
    {
      icon: feature.faUserFriends, title: "আলাদা উস্তায-উস্তাযা প্যানেল",
      desc: "আমাদের রয়েছে আলাদা উস্তায ও উস্তাযা প্যানেল, নারীদের জন্য নারী শিক্ষিকা, যাতে নারীরা পর্দার সহিত স্বাচ্ছন্দ্যে পড়তে পারে এবং সকলের জন্য দ্বীনি শিক্ষা সহজ হয়।"
    },
    {
      icon: feature.faCertificate, title: "কোর্স সার্টিফিকেট প্রদান",
      desc: "কোর্স শেষে বিশেষ পরীক্ষার মাধ্যমে শিক্ষার্থীদের সার্টিফিকেট প্রদান করা হয়, যা তাদের অর্জিত জ্ঞান ও দক্ষতা প্রমাণের জন্য অত্যন্ত গুরুত্বপূর্ণ এবং উপকারী।"
    }
  ];

  return (
    <section className="feature section-padding">
      <div className="container">
        <div className="section-heading text-center hsf">
          <h2 className="hsf hsb">আমাদের বৈশিষ্ট্যসমূহ</h2>
          <img src={divider.Divider2} alt="Heading Divider" />
          <p className="slogan"><strong>মারকাজুল কুরআন ওয়াসসুন্নাহ ইন্সটিটিউট</strong> — ঘরে বসেই শিখুন পূর্ণাঙ্গ দ্বীন</p>           
        </div>
        <div className="row">
          {features.map((feature, index) => (
            <Feature key={index} icon={feature.icon} title={feature.title} desc={feature.desc} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features