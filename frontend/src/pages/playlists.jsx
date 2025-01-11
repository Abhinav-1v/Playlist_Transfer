import { useLocation, useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { updateplaylist } from '../redux/slices/playlistslice';
import PlaylistCard from '../components/playlistcard';
import { addSelectedPlaylist, removeSelectedPlaylist } from '../redux/slices/selectedslice';
import { newspotifytoken } from '../redux/slices/spotifytokenslice';
import { newyttoken } from '../redux/slices/yttokenslice';
import { persistor } from '../redux/store';
import { updatetransferdata } from '../redux/slices/transferslice';
import { BeatLoader} from 'react-spinners';
import styled from 'styled-components';
import SplashCursor from '../components/splashcursor';


export default function Playlist(){
  const playlists = useSelector((state) => state.playlists);
  const selectedplaylists = useSelector((state) => state.selectedplaylists);
  const spotifytoken= useSelector((state)=>state.spotifytoken);
  const youtubetoken =useSelector((state)=>state.youtubetoken);

  const [loading,setloading]=useState(false);
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  async function fetchplaylistsfromspotify(accesstoken) {
    try {
      const response = await fetch("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accesstoken}`,
        },
      });
      const playlistsdata = await response.json();
      if (playlistsdata && playlistsdata.items) {
        dispatch(updateplaylist(playlistsdata.items));
      }
    } catch (e) {
      console.log("erooorrrr aagya bhaii->>>", e);
    }
  }
  const handlePlaylistClick = (playlist) => {
    const isSelected = selectedplaylists.some((p) => p.id === playlist.id);
    if (isSelected) {
      dispatch(removeSelectedPlaylist(playlist));
    } else {
      dispatch(addSelectedPlaylist(playlist));
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const spotifyaccesstoken = queryParams.get("spotifyaccess_token");
    const youtubeaccessstoken= queryParams.get("youtubeaccess_token");

    if (spotifyaccesstoken) {
      dispatch(newspotifytoken(spotifyaccesstoken));
      fetchplaylistsfromspotify(spotifyaccesstoken);
    } 
    else if(youtubeaccessstoken){
      dispatch(newyttoken(youtubeaccessstoken));
    }
    else{
      console.log('no token');
    }
  }, [location]);

  function handlecl1ick() {
    persistor.purge().then(() => {
        console.log("Persisted data cleared!");
        dispatch({ type: 'RESET_APP' }); 
    });
  }  
  
  async function handleclick(){
    if(!youtubetoken){
      window.location.href='https://playlist-transfer.onrender.com/useyt/login';
    }
    else{
      setloading(true);

      const response= await fetch("https://playlist-transfer.onrender.com/useyt/transferplaylist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubetoken,
          spotifytoken,
          playlists: selectedplaylists,
        }),
      });
      const data=await response.json();

      persistor.purge().then(() => {
        dispatch({ type: 'RESET_APP' }); 
        dispatch(updatetransferdata(data.data));
        setloading(false);
        navigate('/result');
      });
    }
  }

  return (
    <StyledWrapper>
      <SplashCursor/>
      <header>
        <div className="logo">Syncify</div>
      </header>
      <main>
        {loading ? (
          <div className="loader">
            <BeatLoader size={50} color="#1DB954" />
          </div>
        ) : (
          <div className="content">
            <h2>Your Playlists</h2>
            {playlists ? (
              <>
                <div className="container">
                  {playlists.map((playlist) => {
                    const isSelected = selectedplaylists.some((p) => p.id === playlist.id);
                    return (
                      <PlaylistCard
                        key={playlist.id}
                        playlist={playlist}
                        isSelected={isSelected}
                        handlePlaylistClick={handlePlaylistClick}
                      />
                    );
                  })}
                </div>
                <button onClick={handleclick} className="oauthButton">
                  Transfer to
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="24"
                    height="24"
                  >
                    <path
                      d="M44.8 13.2c-.5-2-2-3.6-4-4.1C37.5 8 24 8 24 8s-13.5 0-16.8 1.1c-2 .5-3.5 2.1-4 4.1C2 16.7 2 24 2 24s0 7.3 1.2 10.8c.5 2 2 3.6 4 4.1C10.5 40 24 40 24 40s13.5 0 16.8-1.1c2-.5 3.5-2.1 4-4.1 1.2-3.5 1.2-10.8 1.2-10.8s0-7.3-1.2-10.8z"
                      fill="#FF0000"
                    />
                    <path d="M20 30V18l12 6-12 6z" fill="#FFFFFF" />
                  </svg>
                  YouTube
                </button>
              </>
            ) : (
              <p>No playlists found.</p>
            )}
          </div>
        )}
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
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin-top: 100px; /* Add margin to separate it from the header */

    .content {
      text-align: center;

      h2 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        background: linear-gradient(90deg, #1db954, #00aaff);
        -webkit-background-clip: text;
        color: transparent;
      }

      .oauthButton {
        display: inline-flex;
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
          width: 24px;
          height: 24px;
        }
      }

      .container {
        margin-bottom:30px;
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
      }
    }
  }

  .loader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
  }

  @media (max-width: 768px) {
    header {
      .logo {
        font-size: 2.5rem;
      }
    }

    main {
      .content {
        h2 {
          font-size: 2rem;
        }

        .oauthButton {
          font-size: 1rem;
          padding: 10px 20px;
        }
      }
    }
  }
`;
