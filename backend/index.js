const express=require('express');
const cors=require('cors');
const app=express();
const PORT=3000;


const spotifyrouter=require('./routes/spotifyapi');
const youtuberouter=require('./routes/ytapi');
app.use(cors());
app.use(express.static('./public'))
app.set('view engine','ejs');
app.use(express.json());

app.get('/',(req,res)=>{
    return res.render('home');
});

app.use('/usesp',spotifyrouter);
app.use('/useyt',youtuberouter);

app.get('/debug',(req,res)=>{
    return res.redirect('http://localhost:5173/playlist?name=abhinav');
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });