const searchInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".searchIcon");
const messageBoxes = document.querySelectorAll(".message-box");
const queryModal = document.querySelector(".query-modal");
const messageInput = document.querySelectorAll(".message-input");
// const noMessageHere = document.querySelector(".noMessage");


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
        // noMessageHere.style.display = "flex";
        input = !input;
        searchInput.focus();
        // showMessagesFromQuery();
    }
});

searchInput.addEventListener("keyup", (e) => {
    // queryMessage.style.display = "block";
    let query = e.target.value;
    let str = '';
    if (query.trim() === "") {
        // noMessageHere.style.display = "block";
        str += `<div class="noMessage">No Message</div>`
        // queryModal.innerHTML = '';
    } else {
        // noMessageHere.style.display = "none";
        messageInput.forEach((element, i) => {
            if (query.trim() && element.innerText.trim().includes(query)) {
                let messageId = messageBoxes[i].getAttribute("uid");
                str += `
                        <div class = 'query-message' uid = ${messageId}>
                            <div>
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
    // console.log("queryMessageArr: ", queryMessageArr)
    queryMessageArr.forEach(ele => ele.addEventListener('click', scrollToMessage))
})

//FUNCTION TO SCROLL TO THE MESSAGE WHEN CLICKED IN THE QUERY MODAL MESSAGE
function scrollToMessage(ele) {
    // queryMessage.addEventListener("click", (e) => {
    // let messageUid = messageBoxes.getAttribute("uid");
    messageBoxes.forEach((e) => {
        // console.log(e.getAttribute("uid"));
        // console.log(messageBoxes.children.getAttribute("uid"))
        selectedMsgUid = ele.target.getAttribute("uid");
        // console.log(selectedMsgUid)
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
})