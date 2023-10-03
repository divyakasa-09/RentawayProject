import React from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
// eslint-disable-next-line
import result from "./result.ico";
import logo from "./logo.png";
import pic1 from "../assests/picture1.webp";
import pic2 from "../assests/picture2.jpg";
import pic3 from "../assests/picture3.jpg";
// eslint-disable-next-line
import user1 from "../assests/user1.jpg";
import user2 from "../assests/user2.jpg";
import user3 from "../assests/user3.jpg";
// eslint-disable-next-line
import { faStar } from '@fortawesome/free-solid-svg-icons'
import anchitha from "./anchitha.ico";
import jared from "./jared_pic.ico";
import image1 from "../assests/image1.jpg";
import ankith from "./Ankith.ico";
// eslint-disable-next-line
import img1 from "./RentAway discription1.ico";
// eslint-disable-next-line
import img2 from "./RentAway discription2.ico";
// eslint-disable-next-line
import img3 from "./RentAway discription3.ico";
// eslint-disable-next-line
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FaInstagram, FaFacebookF,FaTwitter,FaWhatsapp ,FaPhoneAlt,FaDropbox,FaMapMarkedAlt, FaStar,FaStarHalf} from "react-icons/fa";

function Home() {
  // Function to handle chat
  const handleChat = () => {
    const message = "Hi RentAway, I have a question about my booking.";
    const phoneNumber = "+16178344778";
    // Open a new window with the WhatsApp API link
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };
  return (
       <div>
      <section className= "header1">
      <nav>
      <img src={logo} className="logo" alt="RentAway Logo"/>
      <div className="nav-links">
        <ul>
          <li> <Link to="/signup">SIGNUP</Link> </li>
          <li> <Link to="/signin">LOGIN</Link></li>
         
          <li><a href="#cta" >ABOUT</a></li>
          <li><a href="#apartments" >APARTMENTS</a></li>
          <li><a href="#reviews" >REVIEWS</a></li>
        </ul>
      </div>
      </nav>
       <div className="text-box">
        <h1>RentAway</h1>
        <p>Home away from Home</p>
        <a href="/" className="hmbutton">Visit Our Website</a>
       </div>
      </section>

      <section className="course">
        <h1>Properties</h1>
        <p>Luxury living made affordable</p>
         

         <div className="row">
          <div className="propertycol">
            <h3>Rent any place at your Convinience</h3>
            <p>
            Renting a place can be an exciting and daunting experience at the same time. Whether you're renting an apartment, a house, or a room, there are certain things you should keep in mind to make the process<br></br> as smooth as possible.
            </p>

          </div>
          <div className="propertycol">
            <h3>Creating a Listing That Stands Out</h3>
            <p>
            By creating a listing for your house, you'll be able to reach a wider audience of potential renters. This can help you find a tenant more quickly and easily.
            </p>

          </div>
          

         </div>
      </section>
      <section class="places" id="apartments">
        <h1 >Our Properties</h1>
          <p>Visit our places</p>
          <div class="row">
            <div className="propertycol-1"> 
            <img src ={pic1}  alt="RentAway"/>
            <div className="layer">
              <h3>APARTMENT</h3>
            </div>
            </div>
            <div className="propertycol-1"> 
            <img src ={pic2}  alt="RentAway"/>
            <div className="layer">
              <h3>SEAFACED</h3>
            </div>
            </div>
            <div className="propertycol-1"> 
            <img src ={pic3} alt="RentAway"/>
            <div className="layer">
              <h3>SUITE</h3>
            </div>
            </div>
            

          </div>
      </section>
      <section class="testimonials" id="reviews">
                <h1>REVIEWS</h1>
                <p>Our loyal Customers</p>
                <div className="row">
                  
                  <div className="testimonials-col">
                    <img src={user2} alt="RentAway"/>
                    <div>
                      <p>I recently stayed in an Rentaway and I was blown away by the experience. The host was incredibly friendly and accommoting 
                        
                         I would definitely recommend this Rentaway to anyone looking for a comfortable and luxurious stay.</p>
                      <h3>AAMIR</h3>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                     
                    </div>
                  </div>
                  <div className="testimonials-col">
                    <img src={user3} alt="RentAway"/>
                    <div>
                      <p>I've stayed in a few Rentaways before, but this one was by far the best. The host was incredibly responsive and helpful throughout the entire process, from booking to check-out. The space itself was beautifully decorated and impeccably clean, </p>
                      <h3>RAM</h3>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaStar/>
                      <FaStarHalf/>
                    </div>
                  </div>
                </div>
      </section>
      <section class ="cta" id="cta">

      <h1>Stay at our Property for less price than market</h1>
      <a  href="/"className="hmbutton" onClick={handleChat} >CONTACT US</a>
        </section>


        <footer className="footer">
         <div className="contact-info">
           <h2>Contact Us</h2>
           <FaMapMarkedAlt/>
           <p>75 St Alphonsus St  </p>
           <p>Boston, MA 02120,United States</p>
           <p><a href="tel:+16178344778"><FaPhoneAlt /></a> / <FaWhatsapp onClick={handleChat}/> <br/>  +1 (617) 834-4778
          </p>
           <p >
           <a href="mailto:info.rentaway@gmail.com"><FaDropbox /></a> <br/> info.rentaway@gmail.com</p>
         </div>
         <div className="social-media">
          <h2 class="followus">Follow Us</h2>
         <ul>
            <li>
               <a href="https://www.facebook.com/profile.php?id=100092141282773">
              <FaFacebookF />
              </a>
           </li>
             <li>
               <a href="https://twitter.com/RentAway_">
                 <FaTwitter />
               </a>
             </li>
            <li>
               <a href="https://www.instagram.com/rentawaybelongsanywhere/">
                 <FaInstagram />
               </a>
             </li>
           </ul>
        </div>
         <div className="team-members">
           <h2>Meet the Team</h2>
           <ul>
             <li>
               <img
                src={anchitha}
                alt="Lakshmi Anchitha"
                height="150"
                width="110"
              />
              <a href="https://www.linkedin.com/in/lakshmi-anchitha-panchaparvala-52296a16b/">
                Anchitha
              </a>
            </li>
            <li>
              <img src={jared} alt="Jared" height="150" width="110" />
              <a href="https://www.linkedin.com/in/jaredgirouarduml/">
                Jared
              </a>
            </li>
            <li>
              <img src={image1} alt="Divya" height="150" width="110" />
              <a href="https://www.linkedin.com/in/divya-kasa-8731211a3/">
                Divya
              </a>
            </li>
            <li>
              <img src={ankith} alt="Ankith" height="150" width="110" />
              <a href="https://www.linkedin.com/in/ankithreddypati/">
                Ankith
              </a>
            </li>
          </ul>
        </div>
        
      </footer>


      {/* <section class="footer">
        <h4>About us</h4>
         <p>asdfghsaASDFGHNBVCXdfgbvdsdfghgbvcx</p>
         <div className ="icons">
         <FaFacebookF className="facebook"/>
         <FaInstagram className="facebook"/>
         <FaTwitter className="facebook"/>
         <FaLinkedinIn className="facebook"/>



         </div>
      </section> */}
       
      </div> 

   
  )
};




    // <div className="home-container">
    //   <nav className="nav-bar">
    //     <img src={result} alt="RentAway Logo" />
    //     <ul>
    //       <li>
    //         <Link to="/signup">Sign up</Link>
    //       </li>
    //       <li>
    //         <Link to="/signin">Sign in</Link>
    //       </li>
    //     </ul>
    //   </nav>
    //   <section className="center-section">
    //     <h1>Welcome to RentAway!</h1>
    //     <p>
    //       Find your perfect vacation rental on RentAway. Whether you're looking
    //       for a cozy cabin in the mountains, a beach house with stunning ocean
    //       views, or a stylish apartment in the city, we have the perfect rental
    //       for you.
    //     </p>
    //     <div className="image-grid">
    //       <img src={img1} alt="Vacation Rental 1" />
    //       <img src={img2} alt="Vacation Rental 2" />
    //       <img src={img3} alt="Vacation Rental 3" />
    //     </div>
    //   </section>
    //   <footer className="footer">
    //     <div className="contact-info">
    //       <h2>Contact Us</h2>
    //       <FaMapMarkedAlt/>
    //       <p>75 St Alphonsus St  </p>
    //       <p>Boston, MA 02120,United States</p>
    //       <p><a href="tel:+16178344778"><FaPhoneAlt /></a> / <FaWhatsapp onClick={handleChat}/> <br/>  +1 (617) 834-4778
    //       </p>
    //       <p >
    //       <a href="mailto:info.rentaway@gmail.com"><FaDropbox /></a> <br/> info.rentaway@gmail.com</p>
    //     </div>
    //     <div className="social-media">
    //       <h2>Follow Us</h2>
    //       <ul>
    //         <li>
    //           <a href="https://www.facebook.com/profile.php?id=100092141282773">
    //           <FaFacebookF />
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://twitter.com/RentAway_">
    //             <FaTwitter />
    //           </a>
    //         </li>
    //         <li>
    //           <a href="https://www.instagram.com/rentawaybelongsanywhere/">
    //             <FaInstagram />
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="team-members">
    //       <h2>Meet the Team</h2>
    //       <ul>
    //         <li>
    //           <img
    //             src={anchitha}
    //             alt="Lakshmi Anchitha"
    //             height="150"
    //             width="110"
    //           />
    //           <a href="https://www.linkedin.com/in/lakshmi-anchitha-panchaparvala-52296a16b/">
    //             Anchitha
    //           </a>
    //         </li>
    //         <li>
    //           <img src={anchitha} alt="Jared" height="150" width="110" />
    //           <a href="https://www.linkedin.com/in/lakshmi-anchitha-panchaparvala-52296a16b/">
    //             Jared
    //           </a>
    //         </li>
    //         <li>
    //           <img src={anchitha} alt="Divya" height="150" width="110" />
    //           <a href="https://www.linkedin.com/in/divya-kasa-8731211a3/">
    //             Divya
    //           </a>
    //         </li>
    //         <li>
    //           <img src={anchitha} alt="Ankith" height="150" width="110" />
    //           <a href="https://www.linkedin.com/in/lakshmi-anchitha-panchaparvala-52296a16b/">
    //             Ankith
    //           </a>
    //         </li>
    //       </ul>
    //     </div>
    //   </footer>
    // </div>
 //);
//}

export default Home;
