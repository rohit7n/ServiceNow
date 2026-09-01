/* =====================================
   SERVICE NOW DOCS - MAIN SCRIPT
===================================== */


/* =====================================
   RESOURCE FILE HANDLER
===================================== */

function openFile(url) {

    if (!url) {
        return;
    }

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================
   RESOURCE CARD ACTIVATION
=====================================

   Cards use:

   data-status="in-progress"
   data-url=""

   When ready:

   data-status="active"
   data-url="resources/index.html"

   The JavaScript automatically makes
   active cards clickable.

===================================== */

document
    .querySelectorAll(".resource-card")
    .forEach(card => {

        const status =
            card.dataset.status;

        const url =
            card.dataset.url;


        /* ---------------------------------
           IN PROGRESS
           --------------------------------- */

        if (
            status !== "active" ||
            !url
        ) {

            card.setAttribute(
                "aria-disabled",
                "true"
            );

            return;

        }


        /* ---------------------------------
           ACTIVE RESOURCE
           --------------------------------- */

        card.removeAttribute(
            "aria-disabled"
        );


        card.setAttribute(
            "role",
            "link"
        );


        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "click",
            function () {

                openFile(url);

            }
        );


        /* ---------------------------------
           KEYBOARD SUPPORT
           --------------------------------- */

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openFile(url);

                }

            }
        );

    });




/* =====================================
   SEARCH FUNCTIONALITY
===================================== */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const cards =
    document.querySelectorAll(
        ".card"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchValue =
                this.value
                    .toLowerCase()
                    .trim();


            cards.forEach(card => {

                const searchableText =
                    (
                        card.dataset.search ||
                        card.textContent ||
                        ""
                    ).toLowerCase();


                const matches =
                    searchValue === "" ||
                    searchableText.includes(
                        searchValue
                    );


                if (matches) {

                    card.hidden = false;

                } else {

                    card.hidden = true;

                }

            });

        }
    );

}


/* =====================================
   CLEAR SEARCH WITH ESCAPE
===================================== */

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                this.value = "";

                this.dispatchEvent(
                    new Event("input")
                );

                this.blur();

            }

        }
    );

}




/* =====================================
   ACTIVE NAVIGATION LINK
===================================== */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav-links a"
    );


function updateActiveNavigation() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 140;


        if (
            window.scrollY >=
            sectionTop
        ) {

            currentSection =
                section.getAttribute(
                    "id"
                );

        }

    });


    navLinks.forEach(link => {

        const target =
            link.getAttribute(
                "href"
            );


        link.classList.remove(
            "active"
        );


        if (
            target ===
            "#" + currentSection
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =====================================
   SCROLL HANDLER
===================================== */

let scrollTicking = false;


window.addEventListener(
    "scroll",
    function () {

        if (!scrollTicking) {

            window.requestAnimationFrame(
                function () {

                    updateActiveNavigation();

                    scrollTicking = false;

                }
            );

            scrollTicking = true;

        }

    },
    {
        passive: true
    }
);


/* =====================================
   INITIAL NAVIGATION STATE
===================================== */

updateActiveNavigation();




/* =====================================
   RESOURCE CARD FUTURE ACTIVATION
=====================================

   Example:

   BEFORE:

   <article
       class="card resource-card in-progress"
       data-resource="all-resources"
       data-status="in-progress"
       data-url=""
   >

   AFTER:

   <article
       class="card resource-card"
       data-resource="all-resources"
       data-status="active"
       data-url="resources/index.html"
   >

   No JavaScript changes are required.

===================================== */
