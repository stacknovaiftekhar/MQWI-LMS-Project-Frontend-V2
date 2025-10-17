import { FaHandHoldingHeart, FaBookReader, FaFirstAid, FaChild, FaPeopleCarry, FaMosque } from 'react-icons/fa';
import { FaBowlFood } from 'react-icons/fa6';
import { sadaqah } from '../../assets/assets';
import './Sadaqah.css';

const SadaqahPage = () => {
  return (
    <section className="sadaqah abf">
      {/* Verses of Quran */}
      <div className="container-fluid" style={{ background: "#F2F8F5" }}>
        <div className="container text-justify py-5">
          <p className='animated zoomIn icon'><i><FaHandHoldingHeart /></i></p>
          <h2 dir="rtl" lang="ar" style={{ fontFamily: "'Scheherazade', serif" }}>
            مَثَلُ ٱلَّذِينَ يُنفِقُونَ أَمْوَٰلَهُمْ فِى سَبِيلِ ٱللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِى كُلِّ سُنبُلَةٍۢ مِّا۟ئَةُ حَبَّةٍۢ ۗ وَٱللَّهُ يُضَٰعِفُ لِمَن يَشَآءُ ۗ وَٱللَّهُ وَٰسِعٌ عَلِيمٌ
          </h2>
          <h3 className="abf lh-base my-2">যারা আল্লাহর পথে নিজেদের ধন-সম্পদ ব্যয় করে, তাদের উদাহরণ একটি শস্যবীজের মতো, যা থেকে সাতটি শীষ উৎপন্ন হয়, প্রত্যেক শীষে থাকে একশত করে দানা। আর আল্লাহ্‌ যার প্রতি ইচ্ছা করেন, অধিক প্রদান করেন। আল্লাহ্‌ মহান, সর্বজ্ঞ।</h3>
          <h5 className="abf text-center"><em>সূরা আল-বাকারা, আয়াত : (২:২৬১)</em></h5>
        </div>
      </div>

      {/* Assistance Sectors */}
      <div className="container-fluid" style={{ background: "#EAFAF1" }}>
        <div className="container text-center py-5">
          <h4 className="abf">আমরা সাদাকাহ ফান্ডের মাধ্যমে সমাজের সামর্থ্যবান ও অসহায় মানুষের মাঝে সহমর্মিতার যোগসূত্র স্থাপন করে থাকি।</h4>
          <h4 className="abf mt-4">আমরা এই সাদাকাহ ফান্ডটি সমাজের বিভিন্ন গুরুত্বপূর্ণ ও প্রয়োজনীয় খাতে ব্যয় করে থাকি -</h4>

          <div className="row mt-4">
            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaBowlFood /></i></p>
              <h5 className="abf">গরিব ও মিসকিনদের জন্য অর্থ সহায়তা</h5>
            </div>
            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaBookReader /></i></p>
              <h5 className="abf">অসচ্ছল শিক্ষার্থীদের জন্য শিক্ষা সহায়তা</h5>
            </div>
            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaFirstAid /></i></p>
              <h5 className="abf">অসহায় ও দুঃস্থদের জন্য চিকিৎসা সহায়তা</h5>
            </div>

            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaChild /></i></p>
              <h5 className="abf">এতিমদের বিভিন্ন গুরুত্বপূর্ণ খাতে সহায়তা</h5>
            </div>
            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaPeopleCarry /></i></p>
              <h5 className="abf">প্রাকৃতিক দুর্যোগকালীন সময়ে ত্রাণ সহায়তা</h5>
            </div>
            <div className="col-sm-6 col-lg-4">
              <p className='animated zoomIn icon icon-sm'><i><FaMosque /></i></p>
              <h5 className="abf">মসজিদ-মাদ্রাসা ও মক্তব উন্নয়নে সহায়তা</h5>
            </div>
          </div>

        </div>
      </div>

      {/* Category */}
      <div className="container-fluid" style={{ background: "#F2F8F5" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 d-lg-none text-center mb-5">
              <img src={sadaqah.SadaqahImage} alt="Image of Sadaqah" className="img-fluid px-2" />
            </div>
            <div className="col-lg-7 category">
              <h4 className="abf mb-3">আপনার সাদাকাহ প্রদান করতে পারেন দুটি নির্দিষ্ট ক্যাটাগরিতে</h4>
              <h6 className='text-success abf mb-3'><span className='me-4'>✨ সাধারণ সাদাকাহ</span><span>✨ ফরজ যাকাত</span></h6>
              <h6 className="abf lh-base mb-3">আপনি কোন ক্যাটাগরির সাদাকাহ প্রদান করছেন, তা নির্দিষ্টভাবে উল্লেখ করা অত্যন্ত গুরুত্বপূর্ণ।</h6>
              <h6 className="abf lh-base mb-3">যদি কেউ উভয় ক্যাটাগরিতেই সাদাকাহ প্রদান করেন, তাহলে প্রতিটি খাতে কতটুকু করে দিচ্ছেন — সেটিও পৃথকভাবে জানানো জরুরি।</h6>
              <h6 className="abf lh-base">আল্লাহ্ তাআলা আমাদের সকলকে সামর্থ্যানুযায়ী নেক আমলে অংশগ্রহণ করার তাওফিক দান করুন। আমীন।</h6>
            </div>
            <div className="col-lg-5 d-lg-block d-none text-center">
              <img src={sadaqah.SadaqahImage} alt="Image of Sadaqah" className="img-fluid px-2" />
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default SadaqahPage;