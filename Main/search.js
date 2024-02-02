const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const queryModal = document.querySelector(".query-modal");


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
        input = !input;
        searchInput.focus();
    }
});

searchInput.addEventListener("keyup", (e) => {
    const messageInput = document.querySelectorAll(".message-input");
    const messageBoxes = document.querySelectorAll(".message-box");
    let query = e.target.value;
    let str = '';
    if (query.trim() === "") {
        str += `<div class="noMessage">No Message</div>`
    } else {
        messageInput.forEach((element, i) => {
            if (query.trim() && element.innerText.trim().includes(query)) {
                let messageId = messageBoxes[i].getAttribute("uid");
                str += `
                        <div class = 'query-message' uid = ${messageId}>
                            <div class="query-message-date">
                                <div>${messageBoxes[i].getAttribute("date")}</div>
                                <div>${messageBoxes[i].children[0].innerText} : ${messageBoxes[i].children[1].innerText}</div>
                            </div>
                            <div>${messageBoxes[i].children[2].innerText}</div>
                        </div>
                    `;
            }
        })
    };
    if (!str) {
        str += `<div class="noMessage">No Message</div>`
    }
    queryModal.innerHTML = str;
    const queryMessageArr = document.querySelectorAll(".query-message");
    queryMessageArr.forEach(queryMsgBox => queryMsgBox.addEventListener('click', () => scrollToMessage(queryMsgBox)))
    // queryMessageArr.forEach((queryMsgBox) => {
    //     queryMsgBox.addEventListener('click', () =>{
    //         scrollToMessage(queryMsgBox);
    //     })
    // })
});

//FUNCTION TO SCROLL TO THE MESSAGE WHEN CLICKED IN THE QUERY MODAL MESSAGE
function scrollToMessage(queryMsgBox) {
    const messageBoxes = document.querySelectorAll(".message-box");
    messageBoxes.forEach((e) => {
        selectedMsgUid = queryMsgBox.getAttribute("uid");
        console.log(selectedMsgUid);
        if (selectedMsgUid == e.getAttribute("uid")) {
            console.log(e.parentElement)
            e.scrollIntoView({ behavior: 'smooth', block: 'end' });
            queryModal.style.display = "none";
            queryModal.innerHTML = "";
            searchInput.style.display = "none";
            searchInput.value = "";
            input = false;
        }
    })
};

//CLOSE THE SEARCH BOX BY CLICKING ON THE ESCAPE BUTTON
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        queryModal.style.display = "none";
        queryModal.innerHTML = "";
        searchInput.style.display = "none";
        searchInput.value = "";
        input = false;
    }
});
