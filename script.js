const light = document.querySelector(".light");
const alert = document.querySelector(".alert");
const ghost = document.querySelector(".ghost");
const wind = document.getElementById("windSound");
const ghostSound = document.getElementById("ghostSound");
const bgMusic = document.getElementById("bgMusic");
const enterBtn = document.getElementById("enterBtn");

document.body.style.overflow = "hidden";

let lampOff = false;
let audioUnlocked = false;

enterBtn.addEventListener("click", () => {
    wind.play()
        .then(() => {
            wind.pause();
            wind.currentTime = 0;
            audioUnlocked = true;
            bgMusic.play()
        })
        .catch(error => {
            console.log("Audio error:", error);
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

window.addEventListener("scroll", () => {

    if (window.scrollY > 200 && !lampOff) {

        if (audioUnlocked) {
            wind.play();
        }

        light.classList.add("flicker");


        setTimeout(() => {
            light.classList.remove("flicker");
            light.classList.add("off");
        }, 1200);


        lampOff = true;
    }

});

let ghostLooking = false;

window.addEventListener("scroll", () => {
    if (window.scrollY > 1200 && !ghostLooking) {

        ghost.classList.add("ghostLook");

        if (audioUnlocked) {
            ghostSound.currentTime = 1;
            ghostSound.play();
        }

        ghostLooking = true;
    }
});

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("hide");
    }, 1500);

});