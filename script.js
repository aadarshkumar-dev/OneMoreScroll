const light = document.querySelector(".light");
const alert = document.querySelector(".alert");
const ghost = document.querySelector(".ghost");

const wind = document.getElementById("windSound");
const ghostSound = document.getElementById("ghostSound");
const bgMusic = document.getElementById("bgMusic");

const enterBtn = document.getElementById("enterBtn");
const loader = document.querySelector(".loader");

document.body.style.overflow = "hidden";

let audioUnlocked = false;

let lampOff = false;
let bodyFlick = false;
let ghostLooking = false;
let lampAnimating = false;

enterBtn.addEventListener("click", () => {
    bgMusic.volume = 0.5;
    wind.play()
        .then(() => {
            wind.pause();
            wind.currentTime = 0;
            audioUnlocked = true;
            bgMusic.play();
        })
        .catch(error => {
            console.log("Audio Error:", error);
        });

    document.body.style.overflow = "auto";
    alert.style.display = "none";
});

wind.addEventListener("timeupdate", () => {
    if (wind.currentTime >= 1) {
        wind.pause();
        wind.currentTime = 0;
    }
});

function lampFlicker() {
    if (lampAnimating) return;
    lampAnimating = true;

    if (audioUnlocked) {
        wind.currentTime = 0;
        wind.play();
    }

    light.classList.remove("off");
    light.classList.add("flicker");

    setTimeout(() => {
        light.classList.remove("flicker");
        light.classList.add("off");
        lampAnimating = false;
    }, 1200);
}

window.addEventListener("scroll", () => {
    let scrollPos = window.scrollY;

    if (!lampOff) {
        lampFlicker();
        lampOff = true;
    }

    if (!bodyFlick && scrollPos > 600) {
        if (audioUnlocked) {
            bgMusic.pause();
        }

        document.body.classList.add("body-flicker");

        setTimeout(() => {
            document.body.classList.remove("body-flicker");
            if (audioUnlocked) {
                bgMusic.play();
            }
        }, 2000);

        bodyFlick = true;
    }

    if (!ghostLooking && ghost) {
        let ghostPosition = ghost.getBoundingClientRect();

        if (ghostPosition.top <= window.innerHeight) {
            ghostLooking = true;

            ghost.classList.add("ghostLook");
            document.body.style.overflow = "hidden";

            if (audioUnlocked) {
                ghostSound.currentTime = 1.8;
                ghostSound.play().catch(e => console.log("Audio Playback Blocked:", e));
            }

            setTimeout(() => {
                document.body.style.overflow = "auto";
            }, 1500);
        }
    }

    if (scrollPos > 2000) {
        lampFlicker();
    }
});

window.addEventListener("load", () => {
    setTimeout(() => {
        loader.classList.add("hide");
    }, 1500);
});