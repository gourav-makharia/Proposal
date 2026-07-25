const startBtn=document.getElementById("startBtn");

const welcome=document.getElementById("welcomeMessage");

startBtn.onclick=function(){

startBtn.style.display="none";

welcome.classList.remove("hidden");

}
