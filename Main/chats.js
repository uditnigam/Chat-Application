const clearChat = document.querySelector(".clear-chat");

function messageRemove(messageList, id) {

    messageList.addEventListener("dblclick", (e) => {
        let messageUid = messageList.getAttribute("uid");
        main.removeChild(messageList)
        let userData = JSON.parse(localStorage.getItem("messageDetails")) ?? [];
        userData.forEach((element, i) => {
            if (messageUid === element.uuid) {
                userData.splice(i, 1);
            }
            localStorage.setItem("messageDetails", JSON.stringify(userData));
        })
    })
}

clearChat.addEventListener("click", (e) => {
    main.innerHTML = "";
    localStorage.removeItem("messageDetails");
})

