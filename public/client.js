const socket=io();
let name;
// name=prompt("Enter your name to join...")

let text=document.querySelector("#text");
msgArea=document.querySelector(".msg");

do{
   name= prompt('Enter your name to join...')

}while(!name);

text.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
    sendMsg(e.target.value);
    text.value=='';
    }
})


function sendMsg(message){
    let msg={
        user:name,
        message:message.trim()
    }

    //APPENDING MESSAGE...
    appendMsg(msg,'out');


    //SENDING TO SERVER
    socket.emit('message',msg)
}


function appendMsg(msg,type){
    var div=document.createElement("div");
    var className=type;
    div.classList.add(className,'in-out-msg')

    let content=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    
    `

    div.innerHTML=content;
    // text.appendChild(div);
    msgArea.appendChild(div);

}


//RECEIVING MSG FROM DIFFERNT USERS
socket.on('message',(msg)=>{
    // console.log(msg);
    appendMsg(msg,"in");
})