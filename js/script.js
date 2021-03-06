/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Variables defined from index.html and used in functions
const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const header = document.querySelector(".header");
const itemsPerPage = 9;

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  const startIndex = page * itemsPerPage - itemsPerPage;
  const endIndex = page * itemsPerPage;
  studentList.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      let studentInfo = `<li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src= ${list[i].picture.thumbnail} alt="Profile Picture">
           <h3>${list[i].name.first} ${list[i].name.last}</h3>
           <span class="email">${list[i].email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Date joined ${list[i].registered.date}</span>
         </div>
       </li>`;
      studentList.insertAdjacentHTML("beforeend", studentInfo);
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  const numofPag = Math.ceil(list.length / 9);
  linkList.innerHTML = "";
  for (let i = 0; i < numofPag; i++) {
    let addButtons = `<li><button type="button">${i + 1}</button></li>`;
    linkList.insertAdjacentHTML("beforeend", addButtons);
    document.querySelector("BUTTON").classList.add("active");
    linkList.addEventListener("click", (e) => {
      const selected = e.target;
      if (selected.tagName === "BUTTON") {
        document.querySelector(".active").className = "";
        selected.classList.add("active");
        showPage(data, selected.textContent);
      }
    });
  }
}

// Call functions
console.log(showPage(data, 1));
console.log(addPagination(data));

//Code to exceed

/*
Create the `search` variable
This variable will create and insert/append the elements needed to display a "search" bar for students
*/
let searchBar = `<label for="search" class="student-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>`;
header.insertAdjacentHTML("beforeend", searchBar);

//HTML for no students displayed
let noStudents = `<h1>No results found</h1>`;
// variables for search function
let searchInput = document.querySelector("#search");

//search function
function searchName() {
  let userInput = searchInput.value.toUpperCase();
  let searchArray = [];
  if (userInput.value !== "") {
    for (i = 0; i < data.length; i++) {
      let firstName = data[i].name.first.toUpperCase();
      let lastName = data[i].name.last.toUpperCase();
      if (firstName.includes(userInput) || lastName.includes(userInput)) {
        searchArray.push(data[i]);
      }
    }
    showPage(searchArray, 1);
    addPagination(searchArray);
  } else {
    showPage(data, 1);
    addPagination(data);
  }
  if (searchArray.length === 0) {
    studentList.innerHTML = noStudents;
    linkList.innerHTML = "";
  }
}

//A realtime search produces results
searchInput.addEventListener("keyup", (e) => {
  searchName();
});
