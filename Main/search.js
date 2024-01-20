const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const messageInput = document.querySelectorAll

//Search Box
searchIcon.addEventListener("click", (e) => {
    if (input) {
        searchInput.style.display = "none";
        input = !input;
    } else {
        searchInput.style.display = "block";
        input = !input;
    }
});
