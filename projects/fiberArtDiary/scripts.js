const greeting = document.getElementById("greeting");
const userForm = document.getElementById("userForm");
const userFormBtn = document.getElementById("userFormBtn");
// modal variables
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const openModal1 = document.getElementById("openModal1");
const openModal2 = document.getElementById("openModal2");
const openModal3 = document.getElementById("openModal3");
const openModal4 = document.getElementById("openModal4");
const openModal5 = document.getElementById("openModal5");
const openModal6 = document.getElementById("openModal6");

const closeSpan = document.getElementsByClassName("close")[0];

userFormBtn.addEventListener("click", setName);

// sets cookie based on fiber art preference
function setCookie() {
    var knitIsChecked = document.getElementById("knitPreference").checked;
    var crochetIsChecked = document.getElementById("crochetPreference").checked;
    if (knitIsChecked) {
        document.cookie = "fiberArtPreference=knitting; path=/; expires=Wed, 31 Dec 2025 12:00:00 UTC";
    } else if (crochetIsChecked) {
        document.cookie = "fiberArtPreference=crochet; path=/; expires=Wed, 31 Dec 2025 12:00:00 UTC";
    } else { // delete any previous cookies if no preference selected
        document.cookie = "fiberArtPreference=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}

// gets cookie and displays it via PHP
function getCookie() {
    var url = new URL("https://cisweb.bristolcc.edu/~sareias13/CIS250/howto/get-preference.php", "https://cisweb.bristolcc.edu/~sareias13");
    // gets info from fortune.php to output to fortuneCookie.html:
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("fiberPreference").innerHTML= data;
        })
        .catch(err => console.log('error: ' + err));
}

// stores username into localstorage + reloads page to update
function setName() {
    setCookie();
    let name = document.getElementById("nameInput").value;
    localStorage.setItem("username",name);
    location.reload();
}

if (typeof(Storage) !== "undefined") {
    var saved = localStorage.getItem("username");
    greeting.innerHTML = "Welcome, " + saved + `!`;
    getCookie();
} 

// modal functions:
openModal1.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}
openModal2.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}
openModal3.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}
openModal4.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}
openModal5.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}
openModal6.onclick = function() {
    modal.style.display = "block";
    modalContent.innerHTML = `<img src="${this.src}" id="modalImg">`;
}

closeSpan.onclick = function() {
    modal.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}

// shows responsive nav when menu bars clicked on
function showNav() {
    let nav = document.getElementById("nav");
    if (nav.className === "nav") {
        nav.className += " responsive";
    } else {
        nav.className = "nav";
    }
}

function knitSearch() {
    let search = document.getElementById("knitSearch");
    let filter = search.value.toUpperCase();
    let tbl = document.getElementById("knittingTable");
    let tr = tbl.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++) {
        // [3] selects the 4th column (type) to search by pattern type:
        let td = tr[i].getElementsByTagName("td")[3];
        if(td) {
            let txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function crochetSearch() {
    let search = document.getElementById("crochetSearch");
    let filter = search.value.toUpperCase();
    let tbl = document.getElementById("crochetTable");
    let tr = tbl.getElementsByTagName("tr");

    for(let i = 0; i < tr.length; i++) {
        // [3] selects the 4th column (type) to search by pattern type:
        let td = tr[i].getElementsByTagName("td")[3];
        if(td) {
            let txtValue = td.textContent || td.innerText;
            if(txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
