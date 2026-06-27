const light = document.querySelector(".light");
const alert = document.querySelector(".alert");
const wind = document.getElementById("windSound");
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

    if (window.scrollY > 500 && !lampOff) {

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