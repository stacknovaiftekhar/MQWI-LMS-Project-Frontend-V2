import { slider } from '../../../assets/assets';
import Slide from "./Slide"
import "./Slider.css"

const Slider = () => {
  const images = [
    { src: slider.SliderImage1, text: "Slider Image 1" },
    { src: slider.SliderImage2, text: "Slider Image 2" },
    { src: slider.SliderImage3, text: "Slider Image 3" },
    { src: slider.SliderImage4, text: "Slider Image 4" }
  ];

  return (
    <section className="slider">
      <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>

        <div className="carousel-inner">
          {images.map((img, index) => (
            <Slide key={index} image={img.src} text={img.text} isActive={index === 0} />
          ))}
        </div>

        <button className="carousel-control-prev carousel-control" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next carousel-control" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  )
}

export default Slider;