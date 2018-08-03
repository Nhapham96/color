const express = require('express');
const app = express();
app.use(express.static(__dirname + "/public"));
const PORT = 8000;
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
}) 
const io = require('socket.io')(server);   
let color='green'
io.on('connection', function (socket) {
    io.emit('show',{color:color});
    console.log(color)
    socket.on('color',function(data){
        color=data.color;
        console.log(color)
        socket.emit('show',{color:color})
    })

});
require("./server/config/routes")(app);