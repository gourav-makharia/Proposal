const startBtn = document.getElementById("startBtn");
const welcome = document.getElementById("welcomeMessage");

const continueBtn = document.getElementById("continueBtn");

const storyPage = document.getElementById("storyPage");
const storyText = document.getElementById("storyText");
const nextBtn = document.getElementById("nextBtn");

const hearts = document.getElementById("hearts");

// Floating hearts
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

// Start button
startBtn.onclick = function () {

    startBtn.style.display = "none";

    welcome.classList.remove("hidden");

};

// Continue button
continueBtn.onclick = function () {

    welcome.classList.add("hidden");

    storyPage.classList.remove("hidden");

    const message =
        "There is something I've been wanting to tell you...\n\nI wasn't sure how to say it...\n\nSo I thought I'd build a little website instead. 😊";

    let i = 0;

    storyText.innerHTML = "";

    function typeWriter() {

        if (i < message.length) {

            if (message.charAt(i) === "\n") {

                storyText.innerHTML += "<br>";

            } else {

                storyText.innerHTML += message.charAt(i);

            }

            i++;

            setTimeout(typeWriter, 45);

        } else {

            nextBtn.classList.remove("hidden");

        }

    }

    typeWriter();

};

// Next button
nextBtn.onclick = function () {

    alert("🎉 Great! In the next lesson, we'll build the fun questions screen.");

};
