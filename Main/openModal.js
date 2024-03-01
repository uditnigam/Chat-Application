let imagesModalPointer;

//Click on image to open modal
const openModal = (e) => {
    let imgModal = document.createElement("div");
    imgModal.setAttribute("class", "modal");
    imgModal.innerHTML = `
            <div class="modal-header">
                <div class="message-info">
                    <i class="fa-solid fa-user"></i>
                    <div class="username">Udit Nigam</div>
                </div>
                <button class="close fa-solid fa-x"></button>
            </div>
            <div class="modal-main">
                <i class="arrow-left fa-solid fa-arrow-left"></i>
                <div class="modalImage"><img class="img-cont" name="${e.target.name}" src="${e.target.src}"/></div>
                <i class="arrow-right fa-solid fa-arrow-right"></i>
            </div>
                `;
    main.appendChild(imgModal);
    let closeModal = document.querySelector(".close");
    closeModal.addEventListener("click", (e) => {
        imgModal.innerHTML = "";
        imgModal.style.display = "none";
    })
    window.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            imgModal.innerHTML = "";
            imgModal.style.display = 'none'
        }
    })
    let imagesArr = document.querySelectorAll(".message-img-cont");
    imagesArr.forEach((ele, i) => {
        if (ele.children[0].name == e.target.name) {
            imagesModalPointer = i;
        }
    })
    let leftArrow = document.querySelector(".arrow-left");
    leftArrow.addEventListener("click", (e) => {
        changeModal("left", imagesArr);
    })
    let rightArrow = document.querySelector(".arrow-right");
    rightArrow.addEventListener("click", (e) => {
        changeModal("right", imagesArr);
    })
};

function changeModal(side, imagesArr) {
    let modalImage = document.querySelector(".modalImage");
    if (side == "left" && (imagesModalPointer > 0)) {
        --imagesModalPointer;
    } else if (side == "right" && (imagesModalPointer < (imagesArr.length - 1))) {
        ++imagesModalPointer;
    }
    modalImage.children[0].src = imagesArr[imagesModalPointer].children[0].src;
    modalImage.children[0].name = imagesArr[imagesModalPointer].children[0].name;
};

