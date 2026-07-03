const fullImgBox = document.getElementById("fullImgBox"),
fullImg = document.getElementById("fullImg");

function openImg(reference) {
    fullImgBox.style.display = "flex";
    fullImg.src = reference
}

function closeImg() {
    fullImgBox.style.display = "none";
}