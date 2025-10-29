import "../styles/register.css";
import logo from '../img/logo.png'
import { IoArrowBackCircleSharp } from "react-icons/io5";
import {useNavigate} from "react-router-dom";
import {FaFacebookF,FaInstagram,FaTwitter } from "react-icons/fa";

function Register() {

    const navigates = useNavigate();
            const gotohome = () => {
                navigates("/home.jsx")
            };

    const navigate = useNavigate();
            const gotoowerreg = () => {
                navigate("/CustomerRegister.jsx")
            };
    const navigat = useNavigate();
            const gotocatererreg = () => {
                navigat("/EventOrganizerRegister.jsx")
            };        

  return (
    <div className="hero-root">
      <header className="hero-topbar">
        <div className="hero-topbar-inner">
          <h1 className="brand"><img src={logo}></img>
                    Feast&Fete</h1>
        </div>
      </header>

      <main className="hero-main">
        <i onClick={gotohome}><IoArrowBackCircleSharp/></i>
        <div className="hero-content">
          <h2 className="hero-title">
            Book Your
            <br />
            <span className="hero-title-strong">Caterer Easily</span>
          </h2>

          <div className="hero-cta">
            <button className="btns btn-golds" aria-label="Login" onClick={gotocatererreg}>
              register as Event Organizer
            </button>
            <button className="btns btn-browns" aria-label="Sign Up" onClick={gotoowerreg}>
             register as Customer
            </button>
          </div>
        </div>
      </main>

      <footer className="hero-footer">
        <div className="hero-footer-inner">
          <p className="contact-title">Contact us</p>
          <nav className="socials" aria-label="social links">
            <a className="social" href="#" aria-label="facebook"><i className="facebook"><FaFacebookF/></i></a>
            <a className="social" href="#" aria-label="twitter"><i className="instagram"><FaInstagram/></i></a>
            <a className="social" href="#" aria-label="instagram"><i className="twitter"><FaTwitter/></i></a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default Register;