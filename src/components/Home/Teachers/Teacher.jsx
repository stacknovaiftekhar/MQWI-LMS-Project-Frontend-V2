import { teacher } from '../../../assets/assets';

const Teacher = () => {

  const teachers = [
    {
      image: teacher.Avatar1, name: "মাওলানা, হাফেজ মুফতি হাবিবুল মুরসালিন",
      creds: "দাওরায়ে হাদীস (তাকমিল), তাখাসসুস ফিল ফিক্‌হিল ইসলামী, স্নাতক (ইংরেজি বিভাগ), স্নাতক (অ্যারাবিক অ্যান্ড ইসলামিক স্টাডিজ বিভাগ), ইন্সট্রাক্টর: উচ্চতর আরবী ভাষা, সাহিত্য ও ফরজে আইন কোর্স"
    },
    {
      image: teacher.Avatar1, name: "হাফেজ, মাওলানা, ক্বারী নিয়ামাতুল্লাহ শেখ",
      creds: "দাওরায়ে হাদিস, (আল জামিয়াতুল ইসলামিয়া মদিনাতুল উলুম ব্যাংক কলোনী)"
    },
    {
      image: teacher.Avatar1, name: "মাওলানা, হাফেজ, মুফতি রুহুল্লাহ",
      creds: "দাওরায়ে হাদিস (জামিউল উলুম মিরপুর-১৪), তাখাসসুস (মারকাযুদ দাওয়াহ আল ইসলামিয়া, ঢাকা)"
    },
    {
      image: teacher.Avatar1, name: "হাফেজ, মাওলানা আবু বকর",
      creds: "দাওরায়ে হাদিস (জামিয়া ইসলামিয়া দারুল উলুম মাদানিয়া, যাত্রাবাড়ি, ঢাকা)"
    },
    {
      image: teacher.Avatar2, name: "আলেমা, বিনতে আব্দুল মান্নান",
      creds: "দাওরায়ে হাদিস, (ফাতেমাতুয যোহরা মহিলা মাদ্রাসা, লাধুরচর, নারায়নগঞ্জ)"
    },
    {
      image: teacher.Avatar2, name: "আলেমা, বিনতে মুফিজুল ইসলাম",
      creds: "দাওরায়ে হাদিস, (ফাতেমাতুয যোহরা মহিলা মাদ্রাসা, লাধুরচর, নারায়নগঞ্জ)"
    },
    {
      image: teacher.Avatar2, name: "আলেমা, ক্বারিয়া, বিনতে রুহুল আমিন",
      creds: "দাওরায়ে হাদিস, (আবিদাতুন নিসা মহিলা মাদ্রাসা, ভাটারা, ঢাকা)"
    }
  ];

  return (
    <div className="row d-flex">
      {teachers.map((teacher, index) => (
        <div className="col-lg-3 col-sm-6 mx-auto d-flex" key={index}>
          <div className="card text-center flex-grow-1">
            <div className="card-img">
              <img src={teacher.image} alt="Teacher Avatar" className="img-fluid" />
            </div>
            <div className="card-body hsf d-flex flex-column">
              <h4 className="card-title hsf hss">{teacher.name}</h4>
              <p className="card-text flex-grow-1">{teacher.creds}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Teacher