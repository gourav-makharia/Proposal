const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const startBtn = document.getElementById("startBtn");

const storyText = document.getElementById("storyText");

const hearts = document.getElementById("hearts");

// Floating Hearts
setInterval(() => {

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize = (20 + Math.random() * 20) + "px";

    hearts.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);

}, 350);


// PAGE 1 → PAGE 2
startBtn.onclick = function () {

    page1.classList.add("hidden");

    page2.classList.remove("hidden");

};


// Temporary
nextBtn.onclick = function () {

    page2.classList.add("hidden");

    // We'll show the proposal page here in the next step.

};
