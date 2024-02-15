let selectHeading = document.querySelector(".news-and-content");
let container = document.querySelector(".blog-content");
let selectSortBy = document.querySelector("#filter-posts-by");
let selectSortByMobile = document.querySelector("#filter-posts-by-mobile");

export function sortPosts(selectedValue) {    
    // let selectedValue = selectSortBy.value;
    // let selectedValueMobile = selectSortByMobile.value;
    switch (selectedValue) {
        case "All":
            selectHeading.textContent = "ALLE INNLEGG";
            break;
        case "4":
            selectHeading.textContent = "FENTY BEAUTY";
            break;
        case "3":
            selectHeading.textContent = "FENTY SKIN";
            break;
        case "5":
            selectHeading.textContent = "SAVAGE X";
            break;
        case "6":
            selectHeading.textContent = "MUSIKK";
            break;
        case "9":
            selectHeading.textContent = "SAMARBEID";
            break;
        case "11":
            selectHeading.textContent = "PRISUTDELINGER";
            break;
        case "1":
            selectHeading.textContent = "UKATEGORISERT";
            break;
        default:
            selectHeading.textContent = "Alle innlegg";
    }
}
