import { motive } from '../../../assets/assets';
import { useState } from 'react';
import './Motive.css';

const Motive = () => {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => { setShowModal(true); };
  const handleCloseModal = () => { setShowModal(false); };

  return (
    <section className="motive section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-sm-12">
            <div className="video-thumb">
              <figure>
                <div className="thumbnail">
                  <img src={motive.VideoThumb} alt="Video Thumbnail" />
                  <button className="play-ico animated zoomIn" onClick={handleOpenModal}>&nbsp; <span>▶</span></button>
                </div>
                <div className="watch">
                  <h4>Watch Our Video</h4>
                </div>
              </figure>
            </div>
          </div>
          <div className="col-lg-7 col-sm-12">
            <div className="section-heading goal hsf text-justify">
              <h2 className="hsf hsb">আমাদের লক্ষ্য-উদ্দেশ্য</h2>
              <p><strong>আমাদের উদ্দেশ্য হলো—</strong> আলহামদুলিল্লাহ, বিশুদ্ধ ইসলামী জ্ঞান প্রচার ও প্রসারের মহান উদ্দেশ্যকে সামনে রেখে প্রতিষ্ঠিত হয়েছে <strong>&quot;মারকাজুল কুরআন ওয়াসসুন্নাহ ইন্সটিটিউট&quot;</strong>, যেখানে কুরআন ও সুন্নাহর আলোকে বিশুদ্ধ দ্বীন শেখানো হয়।</p>
              <p><strong>আমাদের লক্ষ্য হলো—</strong> ইসলামী শিক্ষাকে বিশুদ্ধতম উপায়ে, সহজ, আকর্ষণীয় ও কার্যকরভাবে সবার কাছে পৌঁছে দেওয়া, যাতে প্রত্যেকে সহজেই বিশুদ্ধভাবে কুরআন ও হাদিসের জ্ঞান অর্জন করতে পারে এবং তা বাস্তব জীবনে প্রয়োগ করতে পারে।</p>
              <p>আমরা বিশ্বাস করি, প্রযুক্তির সর্বোত্তম ব্যবহার করে ইসলামী শিক্ষাকে আরও সহজ ও বোধগম্য করা সম্ভব। তাই, আমাদের ইন্সটিটিউটে আধুনিক শিক্ষণ পদ্ধতি ও ইন্টারেক্টিভ ভিডিও কনটেন্টের মাধ্যমে শিক্ষার্থীদের শেখার অভিজ্ঞতাকে আরও প্রাণবন্ত করা হয়েছে। তাই আসুন, কুরআন ও সুন্নাহর জ্ঞানের আলোয় আলোকিত হই এবং দ্বীনকে আমাদের জীবনের প্রতিটি ক্ষেত্রে বাস্তবায়ন করি।</p>
            </div>
            <div className="row facilities hsf mt-3">
              <h6 className="hsf hsb">আমাদের ইন্সটিটিউটে আপনি পাবেন—</h6>
              <ul className="col-sm-6">
                <li>বিশুদ্ধ কুরআন শিক্ষা ও হিফজুল কুরআন কোর্স</li>
                <li>কুরআন অনুধাবন ও তাফসীর কোর্স</li>
                <li>ইসলামী ফিকহ, আকিদাহ ও হাদিস শিক্ষা কোর্স</li>
                <li>শিশু ও প্রাপ্তবয়স্কদের জন্য পৃথক কোর্স</li>
              </ul>
              <ul className="col-sm-6">
                <li>অভিজ্ঞ উস্তায-উস্তাযা প্যানেল</li>
                <li>মহিলাদের জন্য আলাদা ব্যবস্থা</li>
                <li>এনিমেটেড ও মোশন ভিডিও ম্যাটেরিয়াল</li>
                <li>অন্যান্য আকর্ষণীয় লার্নিং ম্যাটেরিয়াল</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} onClick={handleCloseModal}
        tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-md" role="document" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title hssb">আমাদের লক্ষ্য-উদ্দেশ্য</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              {/* YouTube Embed */}
              {/* <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/0I8GmbDU7c4"
                  title="YouTube video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div> */}

              {/* Alternatively, for local videos, use this: */}
              <video controls style={{ width: '100%' }}>
                <source src={motive.ObjVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Motive


