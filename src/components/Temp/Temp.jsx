import { Link } from "react-router"
import "./Temp.css"

const Temp = () => {
  return (
      <div className="temp">
        <div className="container">
          <div className="align-items-center my-auto">
            <h1>আমরা একটি<span className="text-warning"> চমৎকার</span>
              <span className="text-info"> নতুন ওয়েবসাইটের </span>উপর কাজ করছি
            </h1>
            <h2 className="text-primary">চোখ রাখুন আমাদের সাথে</h2>
            <Link to="/" className="btn btn-success hsr w-25">মূলপাতায় ফিরে যান</Link>
          </div>
        </div>
      </div>
  )
}

export default Temp