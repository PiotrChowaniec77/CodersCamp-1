const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");

const handleClick = () => {
    hamburger.classList.toggle("hamburger--active");
    nav.classList.toggle("nav--active");
};

hamburger.addEventListener("click", handleClick);

const scrollElems = document.querySelectorAll(".scroll");
scrollElems.forEach(element => {
    element.addEventListener("click", e => {
        e.preventDefault();
        const scrollElemId = e.target.href.split("#");
        const scrollEndElem = document.getElementById(scrollElemId[1]);
        const anim = requestAnimationFrame(timestamp => {
            const stamp = timestamp || new Date().getTime();
            const duration = 1200;
            const start = stamp;

            const startScrollOffset = window.pageYOffset;
            const scrollEndElemTop = scrollEndElem.getBoundingClientRect().top - 50;
            scrollToElem(start, stamp, duration, scrollEndElemTop, startScrollOffset);
        });
    });
});
const easeInCubic = function (t) {
    return t * t * t;
};
const scrollToElem = (startTime, currentTime, duration, scrollEndElemTop, startScrollOffset) => {
    const runtime = currentTime - startTime;
    let progress = runtime / duration;

    progress = Math.min(progress, 1);

    const ease = easeInCubic(progress);

    window.scroll(0, startScrollOffset + scrollEndElemTop * ease);
    if (runtime < duration) {
        requestAnimationFrame(timestamp => {
            const currentTime = timestamp || new Date().getTime();
            scrollToElem(startTime, currentTime, duration, scrollEndElemTop, startScrollOffset);
        });
    }
};
