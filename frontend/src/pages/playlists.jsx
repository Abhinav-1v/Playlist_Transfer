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
import {ClimbingBoxLoader , BeatLoader} from 'react-spinners';

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


    // try{
    //   await fetch('http://localhost:3000/useyt/transferplaylist',{
    //     method:"POST",
    //     headers:{
    //       'Content-Type':'application/json'
    //     },
    //     body:JSON.stringify({"access_token":spotifytoken,'playlists':selectedplaylists})
    //   });
    // window.location.href='http://localhost:3000/useyt/login';
    // }
    // catch(e){
    //   console.log('error aagya bhai->>',e);
    // }
  }

  return (
    <div>
      {loading ? (
        <div className='loader'>
          <BeatLoader size={50} />
        </div>
      ) : (
        <div>
          <h1>Playlists</h1>
          {playlists ? (
            <div>
              <button onClick={handleclick} className="oauthButton">
                Transfer to 
                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                  <path d="M44.8 13.2c-.5-2-2-3.6-4-4.1C37.5 8 24 8 24 8s-13.5 0-16.8 1.1c-2 .5-3.5 2.1-4 4.1C2 16.7 2 24 2 24s0 7.3 1.2 10.8c.5 2 2 3.6 4 4.1C10.5 40 24 40 24 40s13.5 0 16.8-1.1c2-.5 3.5-2.1 4-4.1 1.2-3.5 1.2-10.8 1.2-10.8s0-7.3-1.2-10.8z" fill="#FF0000"/>
                  <path d="M20 30V18l12 6-12 6z" fill="#FFFFFF" />
                </svg>
                Youtube
              </button>
              
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
            </div>
          ) : (
            <p>No playlists found.</p>
          )}
        </div>
      )}
    </div>
  );
  
}