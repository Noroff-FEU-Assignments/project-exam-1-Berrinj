/* Following code from https://blog.hubspot.com/website/accessible-drop-down-menus and chat chatgpt*/
document.addEventListener("DOMContentLoaded", function () {
const menuItems = document.querySelectorAll("li.sub-menu-start");
Array.prototype.forEach.call(menuItems, function (el, i) {
    const link = el.querySelector("a");
    const subMenu = el.querySelector(".sub-menu");
    const subMenuLinks = subMenu.querySelectorAll("a");

    link.addEventListener("click", function (event) {
        if (el.classList.contains("open")) {
            closeSubMenu(el, link, subMenu);
        } else {
            openSubMenu(el, link, subMenu);
        }

        event.preventDefault();
    });

    link.addEventListener("keydown", function (event) {
        if (event.key === "Tab" && !event.shiftKey) {
            openSubMenu(el, link, subMenu);
            event.preventDefault();
        } else if (event.key === "Enter" || event.key === " ") {
            if (el.classList.contains("open")) {
                closeSubMenu(el, link, subMenu);
            } else {
                openSubMenu(el, link, subMenu);
            }

            event.preventDefault();
        }
    });

    subMenuLinks.forEach(function (subLink) {
        subLink.addEventListener("keydown", function (event) {
            if (event.key === "Tab" && !event.shiftKey) {
                if (subLink === subMenuLinks[subMenuLinks.length - 1]) {
                    closeSubMenu(el, link, subMenu);
                }
            } else if (event.key === "Tab" && event.shiftKey) {
                if (subLink === subMenuLinks[0]) {
                    closeSubMenu(el, link, subMenu);
                }
            }
        });
    });

    function openSubMenu(item, itemLink, submenu) {
        item.classList.add("open");
        itemLink.setAttribute("aria-expanded", "true");
        submenu.setAttribute("aria-hidden", "false");
        subMenuLinks[0].focus();
    }

    function closeSubMenu(item, itemLink, submenu) {
        item.classList.remove("open");
        itemLink.setAttribute("aria-expanded", "false");
        submenu.setAttribute("aria-hidden", "true");
    }
});
});