import Home from './pages/home'
import Playlist from './pages/playlists'
import ResultPage from './pages/resultpage'

import './style.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

export default function App(){
  return(
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/playlist' element={<Playlist/>}/>
        <Route path='/result' element={<ResultPage/>}/>
      </Routes>
    </Router>
  )
}