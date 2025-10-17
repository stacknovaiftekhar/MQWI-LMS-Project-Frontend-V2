import { CourseInfo, FeatureInfo } from "../../../api/course";
import { convertDigits } from '../../../utilities/bnDigits';
import { SocialLinksDetail } from "../../../api/admin";
import { useParams, Link } from 'react-router';
import { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [features, setFeatures] = useState(null);
  const [featureID, setFeatureID] = useState(null);
  const [socialLinks, setSocialLinks] = useState(null);
  const { id } = useParams();

  const fetchCourse = async () => {
    try {
      const response = await CourseInfo(id);
      setFeatureID(response.data.feature_id);
      setCourse(response.data);
    } catch (error) {
      console.error("Failed to Fetch Course Details:", error);
    }
  };

  const fetchFeatures = async () => {
    try {
      const response = await FeatureInfo(featureID);
      setFeatures(response.data);
    } catch (error) {
      console.error("Failed to Fetch Features:", error);
    }
  };

  const fetchSocialLinks = async () => {
    try {
      const response = await SocialLinksDetail();
      setSocialLinks(response.data);
    } catch (error) {
      console.error("Failed to Fetch Social Links:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchSocialLinks();
  }, [id]);

  useEffect(() => {
    if (featureID) fetchFeatures();
  }, [featureID]);

  if (!course) return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  return (
    <Layout>
      <div className="course-detail">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pe-lg-4 text-center">
              <img src={course.thumbnail} alt={course.title} />
              <h2 className="abf abb text-success mt-4">{course.title_en}</h2>
              <div className="text-center mt-4 mb-2">                
                <Link to={`/courses/${id}/enroll`} state={{ course: course }} className="btn btn-gen w-50">
                  <span className="hsf hss">কোর্স শুরু করুন</span>
                </Link>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-4">
              <div className="course-content abf abr text-justify">
                <h1 className="abf abb text-success mb-3">{course.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: course.description }} className="abf" />

                <h3 className="abf abb mt-4 mb-2">কোর্সের বিশেষত্ব</h3>
                <div dangerouslySetInnerHTML={{ __html: course.specialty }} className="abf" />
              </div>
            </div>
          </div>
          <hr />
          {/* Features */}
          <div className="mt-5 info abf abr">
            <div className="row">
              <div className="col-lg-6">
                <h5 className="abf abb mb-3">কোর্সের সুবিধা ও প্রয়োজনীয় তথ্য</h5>
                <ul>
                  <li><small>🌟&nbsp;</small> কোর্সের মেয়াদকাল: {convertDigits(features?.duration)} মাস।</li>
                  <li><small>🌟&nbsp;</small> ক্লাস: সপ্তাহে {convertDigits(features?.session)} দিন।</li>
                  <li><small>🌟&nbsp;</small> {features?.gender}</li>
                  <li><small>🌟&nbsp;</small> ক্লাস মাধ্যম: {features?.format}</li>
                  <li><small>🌟&nbsp;</small> প্রশ্নোত্তর: {features?.opportunity}</li>
                  {features?.guidance ? <li><small>🌟&nbsp;</small> {features?.guidance}</li> : ""}
                  {features?.revision ? <li><small>🌟&nbsp;</small> পুনরাবৃত্তি: {features?.revision}</li> : ""}
                  <li><small>🌟&nbsp;</small> সাপোর্ট: {features?.support}</li>
                  <li><small>🌟&nbsp;</small> {features?.resources}</li>
                  <li><small>🌟&nbsp;</small> {features?.certificate}</li>
                  <li><small>💸&nbsp;</small> ভর্তি-ফি: {convertDigits(features?.enrollment)} টাকা।
                    <small>&nbsp;&nbsp;&nbsp;💸&nbsp;</small> মাসিক-ফি: {convertDigits(features?.tuition)} টাকা।</li>
                </ul>
              </div>
              {/* DONE */}
              {/* Contact */}
              <div className="col-lg-6 ps-lg-4 links abf abr">
                <h5 className="abf abb mb-3">ভর্তি প্রক্রিয়া ও যোগাযোগের তথ্য</h5>
                <h6 className="abf hsm">বর্তমানে আমাদের নতুন ব্যাচের ভর্তি চলছে...</h6>
                <p>আপনি যদি এই কোর্সে আগ্রহী হন, তাহলে এখনই
                  <Link to={`/courses/${id}/enroll`} state={{ course: course }}> রেজিস্ট্রেশন ফরম</Link> পূরণ করুন।
                </p>
                <h6 className="abf hsm mt-3">আরও বিস্তারিত জানতে এবং নিয়মিত আপডেট পাওয়ার জন্য:</h6>
                <ul>
                  <li><span>➤</span>আমাদের ফেসবুক পেইজটি ফলো করতে ক্লিক করুন -
                    <a href={socialLinks.facebook_page} target='_blank'> এখানে</a>
                  </li>
                  <li><span>➤</span>আমাদের ফেসবুক গ্রুপে জয়েন করতে ক্লিক করুন -
                    <a href={socialLinks.facebook_group} target='_blank'> এখানে</a>
                  </li>
                  <li><span>➤</span>আমাদের ইউটিউব চ্যানেলে চোখ রাখতে ক্লিক করুন -
                    <a href={socialLinks.youtube} target='_blank'> এখানে</a>
                  </li>
                  <li><span>➤</span>আমদের টেলিগ্রাম চ্যানেলে জয়েন করতে ক্লিক করুন -
                    <a href={socialLinks.telegram} target='_blank'> এখানে</a>
                  </li>
                  <li><span>➤</span>আমদের হোয়াটসঅ্যাপে সরাসরি যোগাযোগ করতে ক্লিক করুন -
                    <a href={socialLinks.whatsapp} target='_blank'> এখানে</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to={`/courses/${id}/enroll`} state={{ course: course }} className="btn btn-gen w-50">
              <span className="hsf hss">কোর্স শুরু করুন</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CourseDetail;

