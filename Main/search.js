const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const messageBoxes = document.querySelectorAll(".message-box");
const queryModal = document.querySelector(".query-modal");
const noMessageHere = document.querySelector(".noMessage");

let input = false;
//Search Box
searchIcon.addEventListener("click", (e) => {
    if (input) {
        searchInput.style.display = "none";
        queryModal.style.display = "none";
        input = !input;
    }
    else {
        searchInput.style.display = "block";
        queryModal.style.display = "block";
        noMessageHere.style.display = "block";
        input = !input;
        searchInput.focus();
        searchInput.addEventListener("keyup", (e) => {
            // queryMessage.style.display = "block";
            
            const messageInput = document.querySelectorAll(".message-input");
            let query = e.target.value;
            if (query.trim() === "") {
                noMessageHere.style.display = "block";
                // let noMessage = document.createElement("div");
                // noMessage.setAttribute("class", "no-message");
                // noMessage.innerHTML = `
                //         No Message To Display
                // `;
                // queryModal.appendChild(noMessage);
            } else {
                noMessageHere.style.display = "none";
                messageInput.forEach((element, i) => {
                    if (query.trim() && element.innerText.trim().includes(query)) {
                        let queryMessage = document.createElement("div");
                        queryMessage.setAttribute("class", "query-message");
                        queryMessage.innerHTML = `
                            <div>
                                <div>${messageBoxes[i].getAttribute("date")}</div>
                                <div>${messageBoxes[i].children[0].innerText} : ${messageBoxes[i].children[1].innerText}</div>
                            </div>
                            <div>${messageBoxes[i].children[2].innerText}</div>
                        `;
                        queryModal.appendChild(queryMessage);
                    }
                })
            };
        })
    }
});