import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import '../styles/Home.css';

// --- ASSETS ---
import Logo from '../assets/Logo.svg';
import WashingLine from '../assets/Washing Line.svg';
import WaveDivider from '../assets/HeaderBorder.svg'; 
import HandHeart from '../assets/Hand and heart.svg';
import FrameBorder from '../assets/FrameBorder.svg';
import FooterDoodles from '../assets/Footer Doodles.svg';
import HandSVG from '../assets/Hand.svg'; 
import PuzzlePiece1 from '../assets/Puzzle1.svg';
import PuzzlePiece2 from '../assets/Puzzle2.svg';
import PuzzlePiece3 from '../assets/Puzzle3.svg';
import DoodleBG from '../assets/Doodle animations.svg';

const Home = () => {
  const [activeStory, setActiveStory] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stories = [
    { id: 1, title: "Our History", color: "var(--col-blue)", text: "Founded with love, Huis Talje began as a safe haven..." },
    { id: 2, title: "How We Care", color: "var(--col-green)", text: "We provide 24/7 specialized care tailored to..." },
    { id: 3, title: "Our Mission", color: "var(--col-purple)", text: "To empower every child to reach their full potential..." },
    { id: 4, title: "Community", color: "var(--col-pink)", text: "Support from people like you makes this possible..." },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="home-container">
      
      {/* --- NAVBAR --- */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-logo">
           <img src={Logo} alt="Huis Talje" className="logo-img" />
        </div>
        <ul className="nav-links">
          {['Home', 'Projects', 'Get Involved', 'Inside Huis Talje', 'Profile', 'Contact Us'].map((item) => (
            <li key={item}><a href={`#${item.replace(/\s+/g, '')}`}>{item}</a></li>
          ))}
        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="hero" id="Home">
        <motion.div 
          className="washing-line-container"
          initial={{ y: -100, rotate: -1 }}
          animate={{ y: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 50, damping: 10 }}
        >
          <img src={WashingLine} alt="Clothesline" />
        </motion.div>

        <motion.div 
          className="hero-text"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="handwritten-title">
            For severely intellectually and <br /> physically handicapped children.
          </h1>
          <p className="small-subtitle">Even the smallest donation is a big deal.</p>
          
          <motion.button 
            className="btn btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </motion.div>
        
        <div className="wavy-divider">
           <img src={WaveDivider} alt="wave" />
        </div>
      </header>

      {/* --- OUR STORY (Expandable Section) --- */}
      <section className="our-story" id="OurStory" style={{ backgroundImage: `url(${DoodleBG})` }}>
        <h2 className="section-title">Our Story</h2>
        
        <div className="story-cards-container">
          <AnimatePresence>
            {stories.map((story) => (
              <motion.div
                key={story.id}
                layout
                onClick={() => setActiveStory(activeStory === story.id ? null : story.id)}
                className={`story-card ${activeStory === story.id ? 'expanded' : ''}`}
                style={{ backgroundColor: story.color }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ layout: { duration: 0.4, type: "spring", stiffness: 80 } }}
                whileHover={{ y: activeStory === story.id ? 0 : -10 }}
              >
                <motion.h3 layout="position" className="vertical-text">
                  {activeStory !== story.id && story.title}
                </motion.h3>
                
                {activeStory === story.id && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 0.2 }}
                    className="card-content"
                  >
                    <h3>{story.title}</h3>
                    <p>{story.text}</p>
                    <div className="scroll-hint">(Scroll for more)</div>
                  </motion.div>
                )}
                
                <div className="card-icon-bottom">
                   {!activeStory === story.id ? '+' : ''}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* --- WHAT WE DO (Puzzle Section) --- */}
      <section className="what-we-do" id="Projects">
        <h2 className="section-title text-blue">This Is What We Do</h2>
        
        <motion.div 
          className="puzzle-layout"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Puzzle Piece 1 */}
          <motion.div variants={itemVariants} className="puzzle-piece" whileHover={{ rotate: 3, scale: 1.05 }}>
            <img src={PuzzlePiece1} alt="Current Projects" />
            <span className="puzzle-label">Current Projects</span>
          </motion.div>
          
          {/* Puzzle Piece 2 */}
          <motion.div variants={itemVariants} className="puzzle-piece" whileHover={{ rotate: -3, scale: 1.05 }}>
            <img src={PuzzlePiece2} alt="Past Projects" />
            <span className="puzzle-label">Past Projects</span>
          </motion.div>
          
          {/* Puzzle Piece 3 */}
          <motion.div variants={itemVariants} className="puzzle-piece" whileHover={{ rotate: 3, scale: 1.05 }}>
            <img src={PuzzlePiece3} alt="Success Stories" />
            <span className="puzzle-label">Success Stories</span>
          </motion.div>
        </motion.div>
        
        <div className="hand-overlay">
           <motion.img 
             src={HandSVG} 
             alt="Hand" 
             className="hand-img"
             initial={{ x: -50, opacity: 0 }}
             whileInView={{ x: 0, opacity: 1 }}
           /> 
           <div className="text-blurb">
              <p>Every child at Huis Talje has a unique journey, and our success stories celebrate their growth...</p>
              <button className="btn btn-green">Learn More</button>
           </div>
        </div>
      </section>

      {/* --- INSIDE THE HEART --- */}
      <section className="inside-heart" id="InsideHuisTalje">
        <motion.div 
          className="blue-container"
          whileHover={{ scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <img src={FrameBorder} className="border-frame" alt="border" />
          
          <div className="heart-content">
            <div className="heart-illustration">
              <motion.img 
                src={HandHeart} 
                alt="Heart"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
              />
            </div>
            <div className="heart-text">
              <h3>Inside The Heart Of Huis Talje</h3>
              <h4>Beyond Walls: A World of Care Within.</h4>
              <p>Step inside Huis Talje, where every room, routine, and quiet moment reflects a deeper story of love.</p>
              <button className="btn btn-orange-small">Step Inside</button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="footer" id="ContactUs">
        <div className="footer-content">
          <div className="footer-brand">
            <img src={Logo} alt="Logo" className="footer-logo" />
            <p>Subscribe to our newsletter</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Email address" />
              <button>→</button>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="link-col">
               <a href="#OurStory">Our Story</a>
               <a href="#Projects">What we do</a>
               <a href="#InsideHuisTalje">Heart of Huis Talje</a>
            </div>
            <div className="link-col">
               <a href="#Home">Home</a>
               <a href="#GetInvolved">Get Involved</a>
               <a href="#Profile">Profile</a>
            </div>
          </div>

          <div className="social-icons">
             <FaInstagram />
             <FaFacebookF />
             <FaTiktok />
          </div>
        </div>
        
        <img src={FooterDoodles} className="footer-doodles" alt="doodles" />
      </footer>
    </div>
  );
};

export default Home;