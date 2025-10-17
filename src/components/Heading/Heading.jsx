import { FAIcon, heading } from '../../assets/faicons';
import { useEffect, useRef } from "react";
import { Link } from 'react-router';
import { jarallax } from "jarallax";
// import "jarallax/dist/jarallax.css"; // Optional: Include CSS if needed
import "./Heading.css"

const Heading = ({ title, current }) => {

  const parallaxRef = useRef(null);

  useEffect(() => {
    jarallax(parallaxRef.current, { speed: 0.5, });
  }, []);

  return (
    <div className="jarallax page-heading" ref={parallaxRef}>
      <div className="container">
        <div className="heading-content">
          <h1 className="hsf hsb">{title}</h1>
          <ul className="list-inline breadcrumb hsf">
            <li><Link to="/">মূলপাতা</Link></li>
            <li><i><FAIcon icon={heading.faAngleRight} /></i></li>
            <li><a href="#">{current}</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Heading