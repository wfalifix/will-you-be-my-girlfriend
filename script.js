
/* =================================
   1. PERSONALIZE YOUR WEBSITE HERE
================================= */

const recipientName = "My Love";

const personalMessage =
    "You make my world brighter in ways you may never fully understand. Every little moment with you means something special to me, and I'd love to make another beautiful memory with you this Valentine's.";

const finalMessage =
    "You make ordinary moments feel special. I'm grateful for you, and I can't wait to make another beautiful memory together.";


/* =================================
   2. SELECT HTML ELEMENTS
================================= */

const proposalScreen = document.getElementById("proposal-screen");
const dateScreen = document.getElementById("date-screen");
const finalScreen = document.getElementById("final-screen");

const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const buttonArena = document.getElementById("button-arena");

const reaction = document.getElementById("reaction");
const quietNo = document.getElementById("quiet-no");

const dateForm = document.getElementById("date-form");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

const backBtn = document.getElementById("back-btn");
const restartBtn = document.getElementById("restart-btn");
const shareBtn = document.getElementById("share-btn");


/* =================================
   3. PERSONALIZE THE PAGE
================================= */

document.querySelectorAll(".recipient-name").forEach(element => {
    element.textContent = recipientName;
});

document.getElementById("love-message").textContent = personalMessage;

document.getElementById("final-love-message").textContent = finalMessage;


/* =================================
   4. SCREEN NAVIGATION
================================= */

function showScreen(screen) {
    const screens = [
        proposalScreen,
        dateScreen,
        finalScreen
    ];

    screens.forEach(item => {
        const isActive = item === screen;

        item.classList.toggle("active", isActive);
        item.hidden = !isActive;
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =================================
   5. THE YES BUTTON
================================= */

yesBtn.addEventListener("click", () => {
    showScreen(dateScreen);
    createHearts(12);
});


/* =================================
   6. MAKE THE NO BUTTON MISCHIEVOUS
================================= */

const noMessages = [
    "Wait... did you really mean that? 🥺",
    "Give my heart another chance! 💗",
    "Not even a tiny little YES? 😭",
    "You're making this difficult, you know! 😂",
    "Okay, now you're just teasing me! 🙈",
    "One YES could make my whole day! 🌹"
];

let noAttempts = 0;
let noButtonMoving = false;
let noButtonStopped = false;

function moveNoButton() {
    if (noButtonStopped) return;

    noAttempts++;

    reaction.textContent =
        noMessages[Math.min(noAttempts - 1, noMessages.length - 1)];

    // Let the first attempt feel normal.
    if (noAttempts >= 2) {
        noButtonMoving = true;
        noBtn.style.position = "absolute";

        const maxX = Math.max(
            0,
            buttonArena.clientWidth - noBtn.offsetWidth
        );

        const maxY = Math.max(
            0,
            buttonArena.clientHeight - noBtn.offsetHeight
        );

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }

    // Make the alternative visible after several attempts.
    if (noAttempts >= 4) {
        quietNo.hidden = false;
    }

    if (noAttempts >= 7) {
        reaction.textContent =
            "Okay, I'll stop teasing you. Your choice matters. 💗";

        noButtonStopped = true;
        noBtn.style.position = "static";
        noBtn.style.left = "";
        noBtn.style.top = "";
        noBtn.textContent = "No, thank you";
        quietNo.hidden = false;
    }
}

// On a computer, dodge as the cursor approaches.
noBtn.addEventListener("pointerenter", event => {
    if (
        event.pointerType === "mouse" &&
        noAttempts >= 1 &&
        !noButtonStopped
    ) {
        moveNoButton();
    }
});

// On a phone or when clicked, react to the attempt.
noBtn.addEventListener("click", () => {
    if (noButtonStopped) {
        showNoThanks();
        return;
    }

    moveNoButton();
});

function showNoThanks() {
    reaction.textContent =
        "That's okay. Thank you for being honest. 💗";

    noBtn.disabled = true;
    yesBtn.disabled = true;

    noBtn.style.cursor = "default";
    yesBtn.style.cursor = "default";

    quietNo.hidden = true;
}

quietNo.addEventListener("click", showNoThanks);


/* =================================
   7. DATE PICKER
================================= */

// Prevent dates in the past.
function getLocalDateString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

dateInput.min = getLocalDateString();

// Set a friendly default date if the visitor hasn't selected one.
dateInput.value = dateInput.min;


/* =================================
   8. FLOATING HEARTS
================================= */

const heartsContainer = document.getElementById("floating-hearts");

const heartSymbols = ["♥", "♡", "❤"];

function createHeart() {
    if (document.hidden) return;

    const heart = document.createElement("span");

    heart.className = "float-heart";
    heart.textContent =
        heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDuration = `${6 + Math.random() * 6}s`;

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {
        heart.remove();
    });
}

function createHearts(amount = 8) {
    for (let i = 0; i < amount; i++) {
        setTimeout(createHeart, i * 120);
    }
}

// Gentle hearts in the background.
const heartInterval = setInterval(createHeart, 1100);


/* =================================
   9. CONFETTI CELEBRATION
================================= */

function launchConfetti() {
    const confettiContainer = document.getElementById("confetti");

    const symbols = ["♥", "✦", "❤", "✧", "♡"];

    for (let i = 0; i < 65; i++) {
        const piece = document.createElement("span");

        piece.className = "confetti-piece";
        piece.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        piece.style.left = `${Math.random() * 100}%`;
        piece.style.color = [
            "#ff6f9f",
            "#ffc1d5",
            "#d9b67c",
            "#fff1e9"
        ][Math.floor(Math.random() * 4)];

        piece.style.fontSize = `${10 + Math.random() * 18}px`;
        piece.style.animationDelay = `${Math.random() * 1.5}s`;

        confettiContainer.appendChild(piece);

        piece.addEventListener("animationend", () => {
            piece.remove();
        });
    }
}


/* =================================
   10. SUBMIT THE DATE PLAN
================================= */

dateForm.addEventListener("submit", event => {
    event.preventDefault();

    if (!dateForm.reportValidity()) return;

    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    const dateType = document.getElementById("date-type").value;
    const extraNote = document.getElementById("extra-note").value.trim();

    // Display a friendly date instead of YYYY-MM-DD.
    const formattedDate = new Date(
        `${selectedDate}T12:00:00`
    ).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    // Format the time for easier reading.
    const formattedTime = new Date(
        `2000-01-01T${selectedTime}`
    ).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit"
    });

    document.getElementById("summary-date").textContent =
        `📅 ${formattedDate}`;

    document.getElementById("summary-time").textContent =
        `🕒 ${formattedTime}`;

    document.getElementById("summary-type").textContent =
        `🌹 ${dateType}`;

    const noteElement = document.getElementById("summary-note");

    if (extraNote) {
        noteElement.textContent = `💌 Special request: ${extraNote}`;
        noteElement.hidden = false;
    } else {
        noteElement.textContent = "";
        noteElement.hidden = true;
    }

    // Store the chosen plan for the share button.
    currentDatePlan = {
        date: formattedDate,
        time: formattedTime,
        type: dateType,
        note: extraNote
    };

    showScreen(finalScreen);
    launchConfetti();
    createHearts(20);
});


/* =================================
   11. SHARE THE DATE ON WHATSAPP
================================= */

let currentDatePlan = null;

shareBtn.addEventListener("click", () => {
    if (!currentDatePlan) return;

    let message =
        `Hey ${recipientName}! ❤️\n\n` +
        `Our Valentine's date is planned!\n\n` +
        `📅 Date: ${currentDatePlan.date}\n` +
        `🕒 Time: ${currentDatePlan.time}\n` +
        `🌹 Plan: ${currentDatePlan.type}\n`;

    if (currentDatePlan.note) {
        message += `💌 Special request: ${currentDatePlan.note}\n`;
    }

    message +=
        `\nCan't wait to make beautiful memories together! 💗`;

    const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");

    document.getElementById("share-message").textContent =
        "Your date plan is ready to share! 💕";
});


/* =================================
   12. BACK & RESTART
================================= */

backBtn.addEventListener("click", () => {
    showScreen(proposalScreen);
});

restartBtn.addEventListener("click", () => {
    // Reset the proposal buttons.
    noAttempts = 0;
    noButtonMoving = false;
    noButtonStopped = false;

    noBtn.disabled = false;
    yesBtn.disabled = false;

    noBtn.textContent = "No 🙈";
    noBtn.style.position = "";
    noBtn.style.left = "";
    noBtn.style.top = "";

    quietNo.hidden = true;

    reaction.textContent =
        "Choose wisely... my heart is watching 👀";

    // Reset the form and confirmation.
    dateForm.reset();
    dateInput.value = getLocalDateString();

    currentDatePlan = null;

    document.getElementById("share-message").textContent = "";

    showScreen(proposalScreen);
});
