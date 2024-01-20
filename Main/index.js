const main = document.querySelector(".main");
const sendButton = document.querySelector(".send-button");
const inputBox = document.querySelector(".input-box");
const imageFile = document.querySelector("#file-input");
const displayImg = document.querySelector(".display-image");
const imagesBox = document.querySelector(".images-box");
const closeButton = document.querySelector(".close-button");
const logOut = document.querySelector(".log-out");
const emojisButton = document.querySelector(".emoji-button");
let input = false;
sendButton.disabled = true;
inputBox.focus();

//Local Storage to get Data
let displayData = () => {
    let userData = JSON.parse(localStorage.getItem("messageDetails")) ?? [];
    userData.forEach((element, i) => {
        let isImagePresent = element.image ? true : false;
        messageBox(element.message, isImagePresent, element.timestamp, element.date, element.image, element.uuid);
    })
}
displayData();

//Emoji Button
const picker = new EmojiButton();

emojisButton.addEventListener('click', () => {
    inputBox.focus();
    picker.togglePicker(emojisButton);
    stateHandle(true);
})

picker.on('emoji', (emoji) => {
    inputBox.value += emoji;
    // inputBox.click();
});

// To show the dropdown
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.three-dots')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
const stateHandle = (isImagePresent) => {

    if (inputBox.value.trim() || isImagePresent) {
        sendButton.disabled = false; //button remains disabled
    } else {
        sendButton.disabled = true; //button is enabled
    }
}

inputBox.addEventListener("change", stateHandle);

//Image File Add
imageFile.addEventListener("change", (e) => {
    for (let i = 0; i < imageFile.files.length; i++) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(imageFile.files[i]);
        // console.log("imageFile.files[i]:", imageFile.files[i].name)
        fileReader.addEventListener("load", function (e) {
            // console.log("e", e)
            let images = document.createElement("div");
            images.setAttribute("class", "images");
            images.innerHTML = `<img width="80px" name="${imageFile.files[i].name}" src="${e.target.result}" />
            <i class="image-cross fa-solid fa-xmark"></i>`;
            displayImg.appendChild(images);
            imagesBox.style.display = "flex";
            images.addEventListener("click", (e) => {
                if (e.target.classList.contains('image-cross')) {
                    images.remove();
                }
                if (displayImg.innerHTML === "") {
                    imagesBox.style.display = "none";
                }
            })
        })
    }
    stateHandle(true);
    inputBox.focus();
});

// Function creating message box
const createMessageBox = (imageIndex) => {
    const getTime = () => {
        let currentDate = new Date();
        let getHours = currentDate.getHours();
        let hours = getHours < 10 ? "0" + getHours : getHours;
        let getMinutes = currentDate.getMinutes();
        let minutes = getMinutes < 10 ? "0" + getMinutes : getMinutes;
        let time = hours + ":" + minutes;
        return time;
    };
    const getDate = () => {
        let currentDate = new Date();
        let getDate = currentDate.getDate();
        let getMonth = currentDate.getMonth() + 1;
        let getYear = currentDate.getFullYear();
        let date = getDate + "/" + getMonth + "/" + getYear;
        return date;
    };
    const currentTime = getTime();
    const date = getDate();
    const uid = generateUID();
    let isImagePresent = displayImg.children[imageIndex]?.classList.contains("images") ? true : false;
    let image;
    if (inputBox.value.trim() !== " ") {
        inputBox.addEventListener("change", stateHandle);
        if (isImagePresent) {
            image = {
                name: displayImg.children[imageIndex].children[0].name,
                src: displayImg.children[imageIndex].children[0].src,
            }
        }
        messageBox(inputBox.value, isImagePresent, currentTime, date, image, uid);
        // console.log()
        //Local Storage Data Save
        let userData = JSON.parse(localStorage.getItem("messageDetails")) ?? [];
        userData.push(
            {
                "uuid": uid,
                "message": inputBox.value,
                "image": isImagePresent ? {
                    name: displayImg.children[imageIndex].children[0].name,
                    src: displayImg.children[imageIndex].children[0].src,
                } : '',
                "timestamp": currentTime,
                "date": date,
            }
        );
        localStorage.setItem("messageDetails", JSON.stringify(userData));
        inputBox.value = "";
        imagesBox.style.display = 'none';
        sendButton.disabled = true;
    }
};
inputBox.value = "";


//function for messageBox
function messageBox(messageValue, isImagePresent, time, date, image, uid) {
    id = uid;
    let messageList = document.createElement("div");
    messageList.setAttribute("class", "message-box");
    messageList.setAttribute("uid", `${id}`)
    isImagePresent ? messageList.classList.add("message-input-image") : "";
    messageList.innerHTML = `
            <div class="message-info">
                <i class="fa-solid fa-user"></i>
                <div class="username">user_name</div>
            </div>
            ${isImagePresent ?
                `<div class="message-img-cont">
                <img class="message-img" name="${image.name}" src="${image.src}">
                </div>` : ""}
        ${messageValue ? `
            <div class="message-input">
                ${messageValue}
            </div>` : ""}
            <div class="current-time">${time}</div>`;
    main.appendChild(messageList);
    messageList.scrollIntoView({ behavior: 'smooth', block: 'end' });
    messageRemove(messageList);
    if (isImagePresent) {
        let imgModal = messageList.querySelector(".message-img-cont");
        imgModal.addEventListener("click", (e) => {
            openModal(e);
        })
    }
};

function generateUID() {
    // I generate the UID from two parts here 
    // to ensure the random number provide enough bits.
    var firstPart = (Math.random() * 46656) | 0;
    var secondPart = (Math.random() * 46656) | 0;
    firstPart = ("000" + firstPart.toString(36)).slice(-3);
    secondPart = ("000" + secondPart.toString(36)).slice(-3);
    return firstPart + secondPart;
};

// Functions for sending messages
inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (inputBox.value.trim() && displayImg.innerHTML)) {
        for (let i = 0; i < displayImg.children.length; i++) {
            createMessageBox(i);
        }
        displayImg.innerHTML = "";
    }
    else if (e.key === "Enter" && (displayImg.innerHTML)) {
        for (let i = 0; i < displayImg.children.length; i++) {
            createMessageBox(i);
        }
        displayImg.innerHTML = "";
    }
    else if (e.key === "Enter" && (inputBox.value.trim())) {
        createMessageBox();
    }
});

//Send Button
sendButton.addEventListener("click", (e) => {
    if ((inputBox.value.trim() && displayImg.innerHTML)) {
        for (let i = 0; i < displayImg.children.length; i++) {
            createMessageBox(i);
            stateHandle(false);
        }
        displayImg.innerHTML = "";
    } else if (displayImg.innerHTML) {
        for (let i = 0; i < displayImg.children.length; i++) {
            createMessageBox(i);
            stateHandle(false);
        }
        displayImg.innerHTML = "";
    } else if (inputBox.value.trim()) {
        createMessageBox();
        stateHandle(false);
    }
    inputBox.focus();
});

//Close the Selected Image Box
closeButton.addEventListener("click", (e) => {
    displayImg.innerHTML = "";
    imagesBox.style.display = "none";
});

//Logout from the Chat Window
logOut.addEventListener("click", (e) => {
    localStorage.setItem("loginStatus", "Logged Out")
    window.location.href = "/Login/login.html";
})

// if (localStorage.loginStatus === "Logged In") {
//     window.location.href = "/Main/index.html";
// } else if(localStorage.loginStatus === "Logged Out"){
//     window.location.href = "/login.html";
// }