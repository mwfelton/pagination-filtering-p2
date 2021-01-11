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
         if( i >= startIndex && i < endIndex){

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
   if (filteredData.length === 0){
      noResults()
   }
 };     

//  Create the Pagination Buttons
 
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


//  Processes for creating the search filter

let searchQuery = ''
let filteredData = runDataFilter()

showPage(filteredData, 1);
addPagination(filteredData);

// creating the HTML elements for the search bar

const header = document.querySelector('.header');
         let searchBar = '';
            searchBar  += `
               <label for="search" class="student-search">
                  <input id="search" placeholder="Search by name...">
                  <button type="button" class="search-button"><img src="img/icn-search.svg" alt="Search icon"></button>
               </label>
             `; 
      header.insertAdjacentHTML('beforeend',searchBar);


// Adding functionality to the search bar

const inputSearch = document.querySelector('#search');

function searchFilter(){
   searchQuery = inputSearch.value.toLowerCase()
   filteredData = runDataFilter()
   showPage(filteredData, 1);
   addPagination(filteredData);
   }
 
// filter the data for the search bar to look through

function runDataFilter() {
   const result = data.filter(item => `${item.name.first} ${item.name.last}`.toLowerCase().includes(searchQuery))
   return result;
};

inputSearch.addEventListener('keyup', () => {
      searchFilter()
  });



// function for displaying the no results message, called in the showpage function

function noResults(){
   const studentList = document.querySelector('.student-list');
   const noResultsMessage =`
            <li class="student-item cf">
               <div>
               <h3>Sorry No Results Found</h3>
               </div>
            </li>
           `
   studentList.insertAdjacentHTML('beforeend', noResultsMessage)
}
