import { divider } from '../../../assets/assets';
import Course from './Course'
import './Courses.css'

const Courses = () => {
  return (
    <section className="courses section-padding">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="hsf hsb">আমাদের কোর্সসমূহ</h2>
          <img src={divider.Divider2} alt="Heading Divider" />
        </div>
        <Course />
      </div>
    </section>
  )
}

export default Courses