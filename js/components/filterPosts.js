let selectHeading = document.querySelector(".news-and-content");

export function sortPosts(selectedValue) {    

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
