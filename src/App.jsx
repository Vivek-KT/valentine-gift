import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import videoFile from './assets/vid.mp4'
import './App.css'

function App() {
  const [noPressed, setNoPressed] = useState(false);
  const [continuepressed, setcontinuePressed] = useState(false);
  const [yesBtnPosition, setYesBtnPosition] = useState({});
  const [selectedMessage, setSelectedMessage] = useState(null);

  // Floating hearts generation
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Generate initial hearts
    const newHearts = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100 + '%',
      animationDuration: Math.random() * 10 + 10 + 's',
      delay: Math.random() * 10 + 's',
      size: Math.random() * 20 + 10 + 'px'
    }));
    setHearts(newHearts);
  }, []);

  const moveYesButton = () => {
    const x = Math.random() * 200 - 100; // Increased range: -100 to 100
    const y = Math.random() * 200 - 100; // Increased range: -100 to 100

    setYesBtnPosition({
      transform: `translate(${x}px, ${y}px)`,
      transition: 'all 0.2s ease'
    });
  };



  const [yesHoverCount, setYesHoverCount] = useState(0);

  const getYesButtonText = () => {
    if (yesHoverCount === 0) return "YES";
    if (yesHoverCount === 1) return "Please No 🥰";
    return "think again 😃";
  };

  const handleYesHover = () => {
    moveYesButton();
    setYesHoverCount(prev => prev + 1);
  };

  const handleNoClick = () => {
    setNoPressed(true);
  };
  const handleImageClick = () => {
    // Open the image in a new tab when clicked
    setcontinuePressed(true);
  };

  const messages = [
    { id: 1, text: "Every moment with you is precious 💕", emoji: "✨", image: "./src/assets/momentwithyou.jpg" },
    { id: 2, text: "You make my heart skip a beat 💓", emoji: "💓", image: "./src/assets/heartbeats.JPG" },
    { id: 3, text: "Falling for you more each day 🌹", emoji: "🌹", image: "./src/assets/fallforyou.JPG" },
    { id: 4, text: "You're my favorite adventure 🗺️", emoji: "🗺️", image: "./src/assets/favourite.JPG" },
    { id: 5, text: "Life is beautiful with you 🌟", emoji: "🌟", image: "./src/assets/lifehappy.JPG" },
    { id: 6, text: "You're my happy place 🏠", emoji: "🏠", image: "./src/assets/house.JPG" }
  ];

  useEffect(() => {
    if (noPressed) {
      const colors = ['#ff69b4', '#ffd700', '#00bfff', '#32cd32']; // Vibrant paper colors

      const interval = setInterval(function () {
        // Continuous Poppers/Paper effect
        const particleCount = 2; // Low density for constant background

        confetti({
          particleCount: 5, // Spawn a few at a time
          startVelocity: 30,
          spread: 360,
          origin: { x: Math.random(), y: Math.random() - 0.2 },
          colors: colors,
          shapes: ['square'], // Paper look
          scalar: 1.2,
          gravity: 0.6,
          ticks: 600, // Stay on screen longer
          zIndex: 0,
          disableForReducedMotion: true
        });
      }, 200);

      // We still need to clear interval on unmount to avoid leaks if component unmounts
      return () => clearInterval(interval);
    }
  }, [noPressed]);

  return (
    <div className="container">
      {/* Background Hearts */}
      <div className="hearts-container">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              left: heart.left,
              animationDuration: heart.animationDuration,
              animationDelay: heart.delay,
              fontSize: heart.size
            }}
          >
            ❤️
          </div>
        ))}
        {/* We can also just use CSS shapes if we prefer, but emojis are vibrant */}
      </div>

      {noPressed ? (
        continuepressed ? (
          <div className="card listing-container">
            <h1 className="title">💝 Reasons Why I Love You 💝</h1>
            <p className="subtext">Here are some of my favorite things about you...</p>
            <div className="messages-grid">
              {messages.map((msg) => (
                <div key={msg.id} className="message-card">
                  <div 
                    className="message-emoji"
                    onClick={() => setSelectedMessage(msg)}
                  >
                    {msg.emoji}
                  </div>
                  <p className="message-text">{msg.text}</p>
                </div>
              ))}
            </div>
            <button 
              className="btn yes-btn"
              onClick={() => window.location.reload()}
            >
              Start Over
            </button>
          </div>
        ) : (
          <div className="card success-container">
            <h1 className="success-title">Adiye Venna mavale !!! 😂🤣</h1>
            <h3 className="subtext">Indha twist epadi iruku 🤣</h3>
            <div className="message-card"><span  className="highlight-new">Do you want to continue with our memory ! </span><button
                className="btn yes-btn"              
                onClick={handleImageClick}
              >Yes</button></div>
            <video
              className="success-video"
              controls
              autoPlay
              playsInline
              src={videoFile}
              style={{ width: '800px', maxWidth: '100%', borderRadius: '16px', marginTop: '20px' }}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )
      ) : (
        <div className="card">
          <h1 className="title">
            <span className="highlight">Saranya <del>Ilango</del> Vivek,</span>
            Will you be my Valentine? 💖💞
          </h1>

          <p className="subtext">Choose wisely. (The "No" button is... playing hard to get.)</p>

          <div className="btn-group">
            <button
              className="btn yes-btn"
              
              onClick={handleNoClick}
            >
              YES
            </button>

            <button
              className="btn no-btn"
              style={yesBtnPosition}
               onMouseEnter={handleYesHover}
              onClick={handleYesHover}
            >
              NO
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setSelectedMessage(null)}
            >
              ✕
            </button>
            <img src={selectedMessage.image} alt={selectedMessage.text} className="modal-image" />
            <h2 className="modal-text">{selectedMessage.text}</h2>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
