import { FAIcon, social, fooicon } from '../../../assets/faicons';
import { footer } from '../../../assets/assets';
import useFetch from '../../../hooks/useFetch';
import { Link } from 'react-router';
import './Footer.css'

const Footer = () => {
  const { contactInfo, socialLinks } = useFetch();

  return (
    <footer>
      <div className="footer-top hsf">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              <div className="footer-widget pe-2">
                <h5>About Us</h5>
                <img src={footer.Divider3} alt="Heading Divider" />
                <div className="row about-foo">
                  <div className="col-sm-3 col-4">
                    <img src={footer.FooterLogo} alt="Footer Logo" />
                  </div>
                  <div className="col-sm-9 col-8 text-justify">
                    <div dangerouslySetInnerHTML={{ __html: contactInfo?.about }} />                    
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-7">
              <div className="footer-widget ms-sm-0 ms-5">
                <h5>Contact Us</h5>
                <img src={footer.Divider3} alt="Heading Divider" />
                <div className="contact-foo">
                  <ul>
                    <li><i className="ico"><FAIcon icon={fooicon.faPhone} /></i>
                      <span><strong>{contactInfo?.phone}</strong></span>
                    </li>
                    <li><i className="ico"><FAIcon icon={fooicon.faEnvelope} /></i>
                      <span className='email'>{contactInfo?.email}</span>
                    </li>
                    <li><i className="ico"><FAIcon icon={fooicon.faMapMarkerAlt} /></i>
                      <span>{contactInfo?.address}</span>
                    </li>
                  </ul>
                </div>
                <div className="social-foo">
                  <ul className="list-inline">
                    <i className="ico"><FAIcon icon={fooicon.faUsers} /></i>
                    <li className="list-inline-item" title='Facebook Page'>
                      <a href={socialLinks?.facebook_page} target='_blank'>
                        <FAIcon icon={social.faFacebookSquare} />
                      </a>
                    </li>
                    <li className="list-inline-item" title='Facebook Group'>
                      <a href={socialLinks?.facebook_group} target='_blank'>
                        <FAIcon icon={social.faFacebookSquare} />
                      </a>
                    </li>
                    <li className="list-inline-item" title='Whatsapp Group'>
                      <a href={socialLinks?.whatsapp} target='_blank'>
                        <FAIcon icon={social.faWhatsappSquare} />
                      </a>
                    </li>
                    <li className="list-inline-item" title='Youtube Channel'>
                      <a href={socialLinks?.youtube} target='_blank'>
                        <FAIcon icon={social.faYoutubeSquare} />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-5">
              <div className="footer-widget ms-5">
                <h5>Useful Links</h5>
                {/* <img src={footer.Divider3} alt="" style={{ transform: 'scaleX(-1)' }} /> */}
                <img src={footer.Divider3} alt="Heading Divider" />
                <div className="link-foo">
                  <ul>
                    <li><Link to="/about"><i><FAIcon icon={fooicon.faAnglesRight} /></i>পরিচিতি</Link></li>
                    <li><Link to="/notice"><i><FAIcon icon={fooicon.faAnglesRight} /></i>নোটিশ</Link></li>
                    <li><Link to="/fatwa"><i><FAIcon icon={fooicon.faAnglesRight} /></i>ফতোয়া</Link></li>
                    <li><Link to="/sadaqah"><i><FAIcon icon={fooicon.faAnglesRight} /></i>সাদাকাহ</Link></li>
                    <li><Link to="/contact"><i><FAIcon icon={fooicon.faAnglesRight} /></i>যোগাযোগ</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <div className="copyright text-lg-start text-sm-center text-center">
                <p>Copyright © 2025 by <span>{contactInfo?.name}.</span> All Rights Reserved.</p>
              </div>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="developer text-lg-end text-sm-center text-center">
                <p>Designed & Developed By <span>Iftekhar Hasan</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer