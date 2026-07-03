const fullImgBox = document.getElementById("fullImgBox"),
fullImg = document.getElementById("fullImg");

function openImg(reference) {
    fullImgBox.style.display = "flex";
    fullImg.src = reference
    document.body.style.overflow = "hidden";
}

function closeImg() {
    fullImgBox.style.display = "none";
    document.body.style.overflow = "auto";
}