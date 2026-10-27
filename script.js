/*jslint browser*/
(function () {
    "use strict";

    var track;
    var slides;
    var prevButton;
    var nextButton;
    var pagerText;
    var pagerDots;
    var currentPage = 0;

    function getVisibleCount() {
        if (window.matchMedia("(min-width: 768px)").matches) {
            return 3;
        }
        return 1;
    }

    function getPageCount() {
        return Math.ceil(slides.length / getVisibleCount());
    }

    function createPagerDots() {
        var pageCount = getPageCount();
        var i;
        var dot;

        pagerDots.innerHTML = "";

        for (i = 0; i < pageCount; i += 1) {
            dot = document.createElement("span");
            dot.className = "pager-dot";
            dot.setAttribute("aria-hidden", "true");
            pagerDots.appendChild(dot);
        }
    }

    function updateSlider() {
        var visibleCount = getVisibleCount();
        var pageCount = getPageCount();
        var dots;
        var i;
        var offset;

        if (currentPage >= pageCount) {
            currentPage = pageCount - 1;
        }

        offset = currentPage * 100;
        track.style.transform = "translateX(-" + offset + "%)";

        pagerText.textContent =
            "Страница " + (currentPage + 1) + " из " + pageCount;

        prevButton.disabled = currentPage === 0;
        nextButton.disabled = currentPage === pageCount - 1;

        dots = pagerDots.getElementsByClassName("pager-dot");

        for (i = 0; i < dots.length; i += 1) {
            if (i === currentPage) {
                dots[i].classList.add("active");
            } else {
                dots[i].classList.remove("active");
            }
        }

        track.setAttribute("data-visible-count", String(visibleCount));
    }

    function rebuildSlider() {
        currentPage = 0;
        createPagerDots();
        updateSlider();
    }

    function showPreviousPage() {
        if (currentPage > 0) {
            currentPage -= 1;
            updateSlider();
        }
    }

    function showNextPage() {
        if (currentPage < getPageCount() - 1) {
            currentPage += 1;
            updateSlider();
        }
    }

    window.addEventListener("DOMContentLoaded", function () {
        track = document.getElementById("slider-track");
        slides = track.getElementsByClassName("slide");
        prevButton = document.getElementById("prev-button");
        nextButton = document.getElementById("next-button");
        pagerText = document.getElementById("pager-text");
        pagerDots = document.getElementById("pager-dots");

        prevButton.addEventListener("click", showPreviousPage);
        nextButton.addEventListener("click", showNextPage);
        window.addEventListener("resize", rebuildSlider);

        createPagerDots();
        updateSlider();
    });
}());
