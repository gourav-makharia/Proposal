const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

const startBtn = document.getElementById("startBtn");
const continueBtn = document.getElementById("continueBtn");
const nextBtn = document.getElementById("nextBtn");

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


// PAGE 2 → PAGE 3
continueBtn.onclick = function () {

    page2.classList.add("hidden");

    page3.classList.remove("hidden");

    const message =
`Sometimes...

there are things...

that are easier to write...

than to say...`;

    let i = 0;

    storyText.innerHTML = "";

    nextBtn.classList.add("hidden");

    function typeWriter() {

        if (i < message.length) {

            if (message.charAt(i) === "\n") {

                storyText.innerHTML += "<br>";

            } else {

                storyText.innerHTML += message.charAt(i);

            }

            i++;

            setTimeout(typeWriter, 60);

        } else {

            nextBtn.classList.remove("hidden");

        }

    }

    typeWriter();

};


// Temporary
nextBtn.onclick = function () {

    alert("Lesson 9 will start from here 😊");

};
