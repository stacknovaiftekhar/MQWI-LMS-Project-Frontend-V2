import { FAIcon } from '../../../assets/faicons';

const FeatCard = ({ icon, title, desc }) => {
  return (
    <div className="col-lg-3 col-sm-6 col-12" >
      <div className="card text-center">
        <p className='animated zoomIn icon'><i><FAIcon icon={icon} /></i></p>
        <div className="card-body hsf">
          <h5 className="card-title hsf hsb">{title}</h5>
          <p className="card-text hsr text-justify">{desc}</p>
        </div>
      </div>
    </div >
  )
}

export default FeatCard