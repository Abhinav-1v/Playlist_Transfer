import React from 'react';
import styled from 'styled-components';


const Home = () => {
  function handleclick(e){
    e.preventDefault();
    window.location.href='http://localhost:3000/usesp/login';
    // window.location.href='http://localhost:3000/debug';
  }
  return (
    <div className="homecontainer">
      <StyledWrapper>
        <form action="" className="form">
          <p>
            Welcome
          </p>
          <button onClick={handleclick} className="oauthButton">
            <svg className="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#1DB954" />
            <path d="M16.62 16.14c-.2 0-.41-.06-.6-.18-2.39-1.43-5.38-1.75-8.92-.95a.95.95 0 0 1-.42-1.85c3.87-.87 7.27-.49 10.01 1.14a.95.95 0 0 1-.49 1.84.93.93 0 0 1-.58-.2zm1.01-3.19c-.24 0-.48-.07-.69-.22-2.75-1.69-6.92-2.18-10.14-1.18a1.18 1.18 0 0 1-.7-2.24c3.64-1.15 8.41-.6 11.63 1.38a1.18 1.18 0 0 1-1.1 2.25zm.95-3.47c-.28 0-.55-.08-.8-.24-3.07-1.88-8.2-2.38-11.84-1.29a1.42 1.42 0 1 1-.84-2.7c4.3-1.34 10.05-.76 13.62 1.5a1.42 1.42 0 0 1-.75 2.7.95.95 0 0 1-.39-.03z" fill="#FFF"/>
            </svg>
            Continue with Spotify
          </button>
          
          <div className="separator">
            <div />
            <span>OR</span>
            <div />
          </div>
          <button className="oauthButton">
            <svg className="icon" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </button>
        </form>
      </StyledWrapper>
    </div>
  );
}

const StyledWrapper = styled.div`
  .form {
    width: 25vw;
    --background: #d3d3d3;
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --main-color: #323232;
    padding: 20px;
    background: var(--background);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .form > p {
    font-family: var(--font-DelaGothicOne);
    color: var(--font-color);
    font-weight: 700;
    font-size: 200%;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }

  .separator {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .separator > div {
    width: 100px;
    height: 3px;
    border-radius: 5px;
    background-color: var(--font-color-sub);
  }

  .separator > span {
    color: var(--font-color);
    font-family: var(--font-SpaceMono);
    font-weight: 600;
  }

  .oauthButton {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 16px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
    transition: all 250ms;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .oauthButton::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0;
    background-color: #212121;
    z-index: -1;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);
    transition: all 250ms;
  }

  .oauthButton:hover {
    color: #e8e8e8;
  }

  .oauthButton:hover::before {
    width: 100%;
  }

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }`;

export default Home;
