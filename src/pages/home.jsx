import logo from '../img/logo.png'
import "../styles/home.css";
import {useNavigate} from "react-router-dom";
import { FaSearch,FaCalendarAlt,FaTag,FaFacebookF,FaInstagram,FaTwitter } from "react-icons/fa";
function Home() {

  const nav = useNavigate();
        const gotoregister = () => {
            nav("/Registerpage.jsx")
        };

  const navi = useNavigate();
        const gotoownerlogin = () => {
            navi("/CustomerLogin.jsx")
        };
  const navig = useNavigate();
        const gotocatererlogin = () => {
            navig("/EventOrganizerLogin.jsx")
        };  
        const gotoadmin = () => nav("/AdminLogin.jsx");          

  return (
    <div className="page-root">
      <header className="topbar">
        <div className="brand">
            <img src={logo}></img>
            Feast&Fete</div>
        <nav className="nav">
          <a href="/about">About</a>
          <a onClick={gotoregister}>Register</a>
          <a href="/contact">Contact</a>
          <button className="admin-btn" onClick={gotoadmin}>Admin</button>
        </nav>
      </header>
      <section
        className="hero"
        aria-label="Hero - Book caterer"
      >
        <div className="hero-inner">
          <h1 className="hero-titlle">
            Book your
            <br />
            Service Easily
          </h1>

          <div className="cta-row">
            <button className="btns" onClick={gotocatererlogin}>Login as Event Organizer</button>
            <button className="btns" onClick={gotoownerlogin}>Login as Customer</button>
          </div>
        </div>
      </section>

      <section className="features-wrapper">
        <div className="container">
          <h2 className="section-titlle">Find Best Caterer</h2>
          <div className="features">
            <div className="feature">
              <div className="icon"><i><FaSearch/></i></div>
              <h3>Find Best Caterer</h3>
              <p>Search restaurants and caterers by cuisine, ratings and location.</p>
            </div>

            <div className="feature">
              <div className="icon"><i><FaCalendarAlt/></i></div>
              <h3>Easy Booking</h3>
              <p>Pick a date, choose a package and confirm in a few clicks.</p>
            </div>

            <div className="feature">
              <div className="icon"><i><FaTag/></i></div>
              <h3>Affordable Packages</h3>
              <p>Compare packages and prices to get the best value for your event.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="contact">Contact us</div>
        <div className="socials">
          <span className="social"><i className="facebook"><FaFacebookF/></i></span>
          <span className="social"><i className="instagram"><FaInstagram/></i></span>
          <span className="social"><i className="twitter"><FaTwitter/></i></span>
        </div>
      </footer>
    </div>
  );
}

export default Home;