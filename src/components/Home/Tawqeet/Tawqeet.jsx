import './Tawqeet.css'


const Tawqeet = () => {
  return (
    <section className="timings bg-img jarallax aff">
      <div className="container">
        <div className="section-heading text-center">
          <h2>Prayer Timings</h2>
        </div>
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Dawn Prayer</h4>
              <strong>Fajr</strong>
              <button>4:01 am</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Sunrise Time</h4>
              <strong>Zohar</strong>
              <button>1:30 AM</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Afternoon</h4>
              <strong>Asar</strong>
              <button>5:30 PM</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Sunset Prayer</h4>
              <strong>Magrib</strong>
              <button>7:15 PM</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Evening Prayer</h4>
              <strong>Isha</strong>
              <button>9:00 PM</button>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-6">
            <div className="prayer-list text-center">
              <h4>Sunrise Time</h4>
              <strong>Kudba</strong>
              <button>2:00 PM</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tawqeet