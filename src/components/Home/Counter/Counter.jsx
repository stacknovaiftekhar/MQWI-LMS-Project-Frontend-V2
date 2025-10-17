import { FAIcon, counter } from '../../../assets/faicons';
import CountUp from "react-countup";

const Counter = () => {

  const counters = [
    { title: "শিক্ষক/স্টাফ", count: 12, icon: counter.faChalkboardTeacher },
    { title: "চলমান কোর্স", count: 15, icon: counter.faBookOpen },
    { title: "সমাপ্ত কোর্স", count: 10, icon: counter.faCheckCircle },
    { title: "ছাত্রসংখ্যা", count: 500, icon: counter.faUsers },
  ];

  return (
    <div className="row">
      {counters.map((counter, index) => (
        <div className="col-lg-3 col-sm-6 col-6 p-0" key={index}>
          <div className={`counter counter${index + 1} text-center text-white`}>
            <div className="ico"><FAIcon icon={counter.icon} /></div>
            <h1 className="hsf hsb">{counter.title}</h1>
            <div className="count h1">
              <span className="count">
                <CountUp start={0} end={counter.count} duration={1.5} delay={0} enableScrollSpy />
              </span>
              <span className="plus">+</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Counter;