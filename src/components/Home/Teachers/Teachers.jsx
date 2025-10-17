import { divider } from '../../../assets/assets';
import Teacher from './Teacher'
import './Teachers.css'

const Teachers = () => {
  return (
    <section className="teachers section-padding">
      <div className="container">
        <div className="section-heading text-center">
          <h2 className="hsf hsb text-white">শিক্ষক-শিক্ষিকা বৃন্দ</h2>
          <img src={divider.Divider1} alt="Divider" />
        </div>
        <Teacher />
      </div>
    </section>
  )
}

export default Teachers