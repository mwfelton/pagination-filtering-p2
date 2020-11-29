/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

console.log(data);


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
   
      const startIndex = (page * 9) - 9
      const endIndex = page * 9
   
      const studentList = document.querySelector('.student-list');
      
      studentList.innerHTML = " ";

      for (let i = 0; i < list.length; i++){
         if ( i >= startIndex && i < endIndex){
            
            console.log(list[i]);

               let studentItem = '';
               studentItem  += `
               <li class="student-item cf">
                 <div class="student-details">
                    <img class="avatar" src="${list[i].picture.thumbnail}"></img>
                   <h3>${list[i].name.first} ${list[i].name.last}</h3>
                   <span class="email">${list[i].email}</span>
                 </div>
                 <div class="joined-details">
                   <span class="date">Joined ${list[i].registered.date}</span>
                  </div>
               </li>
            `;
            studentList.insertAdjacentHTML('beforeend',studentItem);
         }
     }
 };     
 
function addPagination(list){

   const numOfPages = Math.ceil(list.length / 9)

   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for (i = 1; i <= numOfPages; i++) {

      const pageButton = `
         <li>
         <button type="button">${i}</button>
         </li>
      `;

      linkList.insertAdjacentHTML('beforeend',pageButton);
      document.querySelector('button').className = "active";

      linkList.addEventListener('click', (e) => {
         if (e.target.tagName === 'BUTTON'){
            document.querySelector('.active').className = ""
            e.target.className = "active"
            showPage(list,e.target.textContent)
         }
      });
   };
};

let searchQuery = ''
let filteredData = runDataFilter()

showPage(filteredData, 1);
addPagination(filteredData);

const submitButton = document.querySelector('button');


const header = document.querySelector('.header');
         let searchBar = '';
            searchBar  += `
               <label for="search" class="student-search">
                  <input id="search" placeholder="Search by name...">
                  <button type="button" class="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>
             `; 
      header.insertAdjacentHTML('beforeend',searchBar);


const inputSearch = document.querySelector('#search');


// These are my functions to make the search bar work. searchQuery is an empty string variable to contain the user input
// runDataFilter is a function to take the necessary values from the Data Object Array. It took a lot of searching to figure this out
// as I kept finding the methods I was more familiar with from the course kept breaking the code somehow.
// I tried Object.value and made some confused attempts with object literals.

// I found the starts with method on MDN and that in combination with the keyup listener finally got it working.

function searchFilter(){
   searchQuery = inputSearch.value.toLowerCase()
   filteredData = runDataFilter()
   showPage(filteredData, 1);
   addPagination(filteredData);
};
 
function runDataFilter() {
   return data.filter(item => `${item.name.first} ${item.name.last}`.toLowerCase().startsWith(searchQuery))
};

inputSearch.addEventListener('keyup', () => {
   searchFilter()
  });


