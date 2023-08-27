const { Socket } = require("dgram");
const express=require("express");
const app=express();

const http=require("http").createServer(app);

const PORT = process.env.PORT || 5000;

http.listen(PORT, ()=>{
    console.log(`server created.... nd listend at : ${PORT}`);
})

//CREATING ROUTE


//using middlewear for style

app.use(express.static(__dirname+'/public'));

app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html');
})



//SOCKET -- inbuilt library jo 2 end pr work krti hai
// server bolta hai mere pass information hogi to m tumo de dunga nd client bolta hai agr mere pass info hogi to m tumko de dunga....

const io=require("socket.io")(http);

io.on('connection',(socket)=>{
    console.log("connected....")
    socket.on('message',(msg)=>{
  //console.log(msg);
  socket.broadcast.emit('message',msg);
    })
})