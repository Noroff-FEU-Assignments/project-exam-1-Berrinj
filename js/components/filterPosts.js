let selectHeading = document.querySelector(".news-and-content");
let container = document.querySelector(".blog-content");
let selectSortBy = document.querySelector("#filter-posts-by");

export function sortPosts() {    
    let selectedValue = selectSortBy.value;
    console.log("Selected Value:", selectedValue);
    switch (selectedValue) {
        case "All":
            selectHeading.textContent = "Alle innlegg";
            break;
        case "4":
            selectHeading.textContent = "Fenty Beauty innlegg";
            break;
        case "3":
            selectHeading.textContent = "Fenty Skin innlegg";
            break;
        case "5":
            selectHeading.textContent = "Savage x innlegg";
            break;
        case "6":
            selectHeading.textContent = "Musikk innlegg";
            break;
        case "9":
            selectHeading.textContent = "Samarbeid innlegg";
            break;
        case "11":
            selectHeading.textContent = "Prisutdelinger";
            break;
        case "1":
            selectHeading.textContent = "Ukategorisert";
            break;
        default:
            selectHeading.textContent = "Alle innlegg";
    }
}
