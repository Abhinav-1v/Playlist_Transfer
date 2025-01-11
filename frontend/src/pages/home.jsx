import React from 'react';
import styled from 'styled-components';
import SplashCursor from '../components/splashcursor';

const LandingPage = () => {
  function handleSpotifyLogin(e) {
    e.preventDefault();
    window.location.href = 'https://playlist-transfer.onrender.com/usesp/login';
  }

  return (
    <StyledWrapper>
      <SplashCursor />
      <header>
        <div className="logo">Syncify</div>
      </header>
      <main>
        <div className="hero">
          <div className="textContent">
            <h2>Your Playlists, Seamlessly Connected</h2>
            <p>
              Syncify makes it effortless to transfer playlists between your favorite music platforms. Switch services or 
              sync multiple accounts with ease.
            </p>
            <button onClick={handleSpotifyLogin} className="oauthButton">
              <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#1DB954" />
                <path d="M16.62 16.14c-.2 0-.41-.06-.6-.18-2.39-1.43-5.38-1.75-8.92-.95a.95.95 0 0 1-.42-1.85c3.87-.87 7.27-.49 10.01 1.14a.95.95 0 0 1-.49 1.84.93.93 0 0 1-.58-.2zm1.01-3.19c-.24 0-.48-.07-.69-.22-2.75-1.69-6.92-2.18-10.14-1.18a1.18 1.18 0 0 1-.7-2.24c3.64-1.15 8.41-.6 11.63 1.38a1.18 1.18 0 0 1-1.1 2.25zm.95-3.47c-.28 0-.55-.08-.8-.24-3.07-1.88-8.2-2.38-11.84-1.29a1.42 1.42 0 1 1-.84-2.7c4.3-1.34 10.05-.76 13.62 1.5a1.42 1.42 0 0 1-.75 2.7.95.95 0 0 1-.39-.03z" fill="#FFF" />
              </svg>
              Continue with Spotify
            </button>
          </div>
          
        </div>
      </main>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle, #0f2027, #203a43, #2c5364);
  color: white;
  font-family: 'Poppins', sans-serif;

  header {
    position: absolute;
    top: 20px;
    left: 30px;

    .logo {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #1db954, #00aaff);
      -webkit-background-clip: text;
      color: transparent;
    }
  }

  main {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .hero {
      display: flex;
      align-items: center;
      gap: 40px;
      padding: 20px;

      .textContent {
        max-width: 500px;

        h1 {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 10px;
          background: linear-gradient(90deg, #1db954, #00aaff);
          -webkit-background-clip: text;
          color: transparent;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          color: #dcdcdc;
          background: linear-gradient(90deg, #1db954, #00aaff);
         -webkit-background-clip: text;
          color: transparent;

        }

        p {
          font-size: 1.2rem;
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .oauthButton {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 25px;
          background: #1db954;
          color: white;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-size: 1.1rem;
          font-weight: bold;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
          }

          .icon {
            width: 20px;
            height: 20px;
          }
        }
      }

      .imageContent {
        position: relative;

        .circleGlow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: rgba(29, 185, 84, 0.5);
          border-radius: 50%;
          filter: blur(80px);
          z-index: 1;
        }

        .heroImage {
          position: relative;
          z-index: 2;
          border-radius: 15px;
          box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
          width: 400px;
        }
      }
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    main {
      .hero {
        flex-direction: column;

        .textContent {
          text-align: center;

          h1 {
            font-size: 3rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          p {
            font-size: 1rem;
          }
        }

        .imageContent {
          .heroImage {
            width: 300px;
          }
        }
      }
    }
  }
`;

export default LandingPage;
