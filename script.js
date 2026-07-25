const hearts=document.getElementById("hearts");

setInterval(()=>{

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(20+Math.random()*20)+"px";

hearts.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},350);

document.getElementById("startBtn").onclick=function(){

alert("Welcome ❤️\n\nOur story is about to begin...");

};
