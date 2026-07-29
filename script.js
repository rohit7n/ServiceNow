/* =====================================
   SERVICE NOW DOCS - MAIN SCRIPT
===================================== */



// Open Resource Files

function openFile(url) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}







// =====================================
// SEARCH FUNCTIONALITY
// =====================================


const searchInput = document.getElementById("searchInput");

const cards = document.querySelectorAll(".card");



if(searchInput){


    searchInput.addEventListener(
        "input",
        function(){


            const searchValue =
            this.value
            .toLowerCase()
            .trim();



            cards.forEach(card => {


                const searchableText =
                card.dataset.search
                .toLowerCase();



                if(
                    searchableText.includes(searchValue)
                    ||
                    searchValue === ""
                ){


                    card.style.display = "flex";


                    setTimeout(()=>{

                        card.style.opacity="1";
                        card.style.transform="translateY(0)";

                    },50);


                }

                else{


                    card.style.opacity="0";

                    card.style.transform=
                    "translateY(10px)";


                    setTimeout(()=>{

                        card.style.display="none";

                    },200);


                }



            });



        }

    );


}








// =====================================
// CARD HOVER INITIAL STATE
// =====================================


cards.forEach(card=>{


    card.style.transition =
    "opacity .25s ease, transform .25s ease";


});









// =====================================
// ACTIVE NAV LINK
// =====================================


const sections =
document.querySelectorAll("section");


const navLinks =
document.querySelectorAll(".nav-links a");



window.addEventListener(
"scroll",
()=>{


    let current="";



    sections.forEach(section=>{


        const sectionTop =
        section.offsetTop - 120;



        if(
            window.scrollY >= sectionTop
        ){

            current =
            section.getAttribute("id");

        }


    });




    navLinks.forEach(link=>{


        link.style.color =
        "#b8d8d8";



        if(
            link.getAttribute("href")
            ===
            "#"+current
        ){


            link.style.color =
            "#00f5d4";


        }


    });



});
