// =====================================================
// ✏️ EDIT THIS BEFORE YOU SHARE THE LINK
// =====================================================
const HER_NAME = "";           // e.g. "Ananya" — only used in the message she can send you, leave blank to skip
const WHATSAPP_NUMBER = "918763343695"; // your number with country code, digits only (no +, no spaces)
// =====================================================

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
const page7 = document.getElementById("page7");

const startBtn = document.getElementById("startBtn");
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


// PAGE 2 → PAGE 3 (the actual proposal)
nextBtn.onclick = function () {

    page2.classList.add("hidden");

    page3.classList.remove("hidden");

};


/* =====================================================
   PAGE 3 — the dodging "no" button
   ===================================================== */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const taunt = document.getElementById("taunt");

const TAUNTS = [
    "nope 🙈", "try again", "so close", "not today", "yeah... no",
    "can't catch me", "nice try 😄", "almost!", "keep dreaming 💭",
    "swing and a miss!", "you'll never get me 😝", "this button is shy 🙈",
    "no means no 😌", "too slow 💨", "better luck next time",
    "still a no from me 😌", "aww, so close though", "not happening, cutie"
];
let dodgeCount = 0;
let lastDodgeTime = 0;

function dodge() {
    const now = Date.now();
    if (now - lastDodgeTime < 120) return; // stop double-fires from overlapping events
    lastDodgeTime = now;

    const btnRect = noBtn.getBoundingClientRect();
    const padding = 16;

    if (!noBtn.classList.contains("dodging")) {
        // lock the current on-screen spot first (in real viewport coordinates)
        const startLeft = btnRect.left;
        const startTop = btnRect.top;

        // .container uses backdrop-filter, which (like transform) makes it the
        // positioning boundary for any "fixed" element inside it — so move the
        // button out to <body> first, or "fixed" ends up measured against the
        // small card instead of the actual screen and can land off-page.
        document.body.appendChild(noBtn);

        noBtn.classList.add("dodging");
        noBtn.style.left = startLeft + "px";
        noBtn.style.top = startTop + "px";
        void noBtn.offsetWidth; // force reflow before animating to the new spot
    }

    // roam the whole visible page, not just a small box
    const maxLeft = Math.max(window.innerWidth - btnRect.width - padding * 2, 0);
    const maxTop = Math.max(window.innerHeight - btnRect.height - padding * 2, 0);
    noBtn.style.left = (padding + Math.random() * maxLeft) + "px";
    noBtn.style.top = (padding + Math.random() * maxTop) + "px";

    dodgeCount = Math.min(dodgeCount + 1, 8);
    noBtn.style.transform = `scale(${Math.max(1 - dodgeCount * 0.05, 0.55)})`;

    taunt.textContent = TAUNTS[Math.floor(Math.random() * TAUNTS.length)];
}

noBtn.addEventListener("pointerenter", dodge);
noBtn.addEventListener("pointerdown", (e) => { e.preventDefault(); dodge(); });
noBtn.addEventListener("focus", dodge);
noBtn.addEventListener("click", (e) => { e.preventDefault(); dodge(); });

yesBtn.addEventListener("click", () => {
    noBtn.style.display = "none"; // it now lives in <body>, so hiding page3 alone won't hide it
    page3.classList.add("hidden");
    page4.classList.remove("hidden");
});

/* =====================================================
   PAGE 4 — when are you free
   ===================================================== */
const state = { date: null, time: null, place: null, food: null };

const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const next4Btn = document.getElementById("next4Btn");

const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
dateInput.min = tomorrow.toISOString().split("T")[0];

function checkStep4() {
    state.date = dateInput.value || null;
    state.time = timeInput.value || null;
    next4Btn.disabled = !(state.date && state.time);
}
dateInput.addEventListener("input", checkStep4);
timeInput.addEventListener("change", checkStep4);

next4Btn.addEventListener("click", () => {
    if (next4Btn.disabled) return;
    page4.classList.add("hidden");
    page5.classList.remove("hidden");
});

/* =====================================================
   PAGES 5 & 6 — place + food chip pickers
   ===================================================== */
function setupChipGroup(gridEl, otherInputEl, onChange) {
    let selectedChip = null;

    function currentValue() {
        if (!selectedChip) return "";
        if (selectedChip.dataset.value === "other") return otherInputEl.value.trim();
        return selectedChip.dataset.value;
    }

    gridEl.querySelectorAll(".chip").forEach((chip) => {
        chip.addEventListener("click", () => {
            gridEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("selected"));
            chip.classList.add("selected");
            selectedChip = chip;

            if (chip.dataset.value === "other") {
                otherInputEl.classList.remove("hidden");
                otherInputEl.focus();
            } else {
                otherInputEl.classList.add("hidden");
                otherInputEl.value = "";
            }
            onChange(currentValue());
        });
    });

    otherInputEl.addEventListener("input", () => onChange(currentValue()));
}

const next5Btn = document.getElementById("next5Btn");
setupChipGroup(document.getElementById("placeChips"), document.getElementById("placeOtherInput"), (val) => {
    state.place = val || null;
    next5Btn.disabled = !state.place;
});

next5Btn.addEventListener("click", () => {
    if (next5Btn.disabled) return;
    page5.classList.add("hidden");
    page6.classList.remove("hidden");
});

const submitBtn = document.getElementById("submitBtn");
setupChipGroup(document.getElementById("foodChips"), document.getElementById("foodOtherInput"), (val) => {
    state.food = val || null;
    submitBtn.disabled = !state.food;
});

/* =====================================================
   PAGE 7 — summary + send
   ===================================================== */
function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}

function prettyDate() {
    if (!state.date) return "a date we'll pick soon";
    const d = new Date(state.date + "T00:00:00");
    return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" });
}

function renderSummary() {
    document.getElementById("summaryCard").innerHTML = `
        📅 <b>${escapeHtml(prettyDate())}</b>, ${escapeHtml(state.time)}<br>
        📍 <b>${escapeHtml(state.place || "somewhere lovely")}</b><br>
        🍽️ <b>${escapeHtml(state.food || "something delicious")}</b>
    `;
}

function buildMessage() {
    const namePart = HER_NAME ? `It's ${HER_NAME}! ` : "";
    return `${namePart}Yes to our date 💕\n📅 ${prettyDate()}, ${state.time}\n📍 ${state.place || "somewhere lovely"}\n🍽️ ${state.food || "something delicious"}`;
}

submitBtn.addEventListener("click", () => {
    if (submitBtn.disabled) return;
    renderSummary();
    page6.classList.add("hidden");
    page7.classList.remove("hidden");
});

const copyHint = document.getElementById("copyHint");

function showCopyHint() {
    copyHint.classList.remove("hidden");
    setTimeout(() => copyHint.classList.add("hidden"), 2500);
}

function fallbackCopy(message, cb) {
    const ta = document.createElement("textarea");
    ta.value = message;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* no-op */ }
    document.body.removeChild(ta);
    cb();
}

function copyMessage(message) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(message).then(showCopyHint).catch(() => fallbackCopy(message, showCopyHint));
    } else {
        fallbackCopy(message, showCopyHint);
    }
}

document.getElementById("sendBtn").addEventListener("click", () => {
    const message = buildMessage();
    if (WHATSAPP_NUMBER) {
        window.location.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    } else {
        copyMessage(message); // no number set yet — fall back to copy so nothing is lost
    }
});

document.getElementById("copyBtn").addEventListener("click", () => copyMessage(buildMessage()));
