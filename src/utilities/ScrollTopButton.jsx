import { useEffect, useState } from "react";
import "./ScrollTopButton.css";

const ScrollTopButton = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scrollTop / winHeight) * 100;

      setScrollPercent(scrolled);
      setShowButton(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showButton && (
      <button className="scroll-top-btn" onClick={scrollToTop} title={`Scrolled: ${Math.floor(scrollPercent)}%`}>
        <div className="progress-circle" style={{ background: `conic-gradient(#DE9125 ${scrollPercent}%, #E1A95B ${scrollPercent}%)` }}>
          <span className="arrow">↑</span>
        </div>
      </button>
    )
  );
};

export default ScrollTopButton;