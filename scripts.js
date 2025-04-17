const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const invManModal = document.getElementById("invManModal");
const closeSpan = document.getElementsByClassName("close")[0];

// modal functions:
invManModal.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<video src="projects/InventoryManagement/showcase.mp4" id="modalVid" controls>`;
}

closeSpan.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}