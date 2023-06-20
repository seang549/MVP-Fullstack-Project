// const myNodeList = document.getElementsByTagName('tr')
// for (let i = 0; i < myNodeList.length; i++) {
//     let span = document.createElement('span');
//     let txt = document.createTextNode('\u00D7')
//     span.className = "close";
//     span.appendChild(txt);
//     myNodeList[i].appendChild(span);
// }

// const close = document.getElementsByClassName('close');
// for(let i = 0; i < close.length; i++) {
//     close[i].onclick = () => {
//         let div = this.parentElement;
//         div.style.display = "none";
//     }
// }
const body = document.getElementsByTagName('body')

// async function getAll () {
//     try {
//         const response = await fetch("https://movies-db-team3.onrender.com/movies_to_watch");
//         console.log(response)
//         const data = await response.json();
//         console.log(data);
//         let temp = "";
//         for (i = 0; i < data.length; i++) {
//             temp+="<tr>";
//             temp+=`<td>${data[i].title}</td>`
//             temp+=`<td>${data[i].genre}</td>`
//             temp+=`<td>${data[i].rating}</td>`
//         }
//         document.getElementById('data').innerHTML=temp;
//     }
//     catch(err) {
//         console.error(err.message)
//     }

// }
// getAll();

////////////////////POST REQUEST/////////////////
document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        title: document.getElementById('movieTitle').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value
    }
    postData(formData)
})

function postData(data) {
    fetch('https://movies-db-team3.onrender.com/movies_to_watch', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);

        addRowToTable(result)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

function addRowToTable(data) {
    const movieTable = document.getElementById('movieTable');
    const newRow = movieTable.insertRow();
    
    const titleCell = newRow.insertCell();
    titleCell.textContent = data.title;
    
    const genreCell = newRow.insertCell();
    genreCell.textContent = data.genre;
    
    const ratingCell = newRow.insertCell();
    ratingCell.textContent = data.rating;
    
    const deleteCell = newRow.insertCell();
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        movieTable.deleteRow(newRow.rowIndex);
    });
    deleteCell.appendChild(deleteButton);
}

//////////////////////////////////////////

////////////////////DELETE ONE////////////


//deletes table row
function deleteRow(entityId) {
    // Make a delete request using fetch
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log("Row deleted successfully");
        fetchData();
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }


///////////////////////////////////////////////////

//////////////Get all/////////////////////////////
function fetchData() {
    fetch('https://movies-db-team3.onrender.com/movies_to_watch')
    .then(response => response.json())
    .then(data => {
        const movieTable = document.getElementById('movieTable')
        movieTable.innerHTML = '';

        data.forEach(entity => {
            const newRow = document.createElement('tr')
            const titleCell = document.createElement('td');
            const genreCell = document.createElement('td');
            const ratingCell = document.createElement('td');
            const actionCell = document.createElement('td')
            const deleteBtn = document.createElement('button')
            const editBtn = document.createElement('button')

            titleCell.textContent = entity.title;
            genreCell.textContent = entity.genre;
            ratingCell.textContent = entity.rating;
            
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                deleteRow(entity.id);
            })

            editBtn.textContent = "Edit";
            editBtn.classList.add("edit-btn")
            editBtn.addEventListener("click", function() {
                editRow(entity.id);
            })

            actionCell.appendChild(deleteBtn);
            actionCell.appendChild(editBtn);
            newRow.appendChild(titleCell);
            newRow.appendChild(genreCell)
            newRow.appendChild(ratingCell)
            newRow.appendChild(actionCell)
            movieTable.appendChild(newRow)
        
        });
    })
    .catch(error => {
        console.error('Error:', error)
    })

}
fetchData();

///////////////////////////////////////////

///////////////Update one/////////////////
// let editingRowId = null;
// function updateOne() {
//     const movieTable = document.getElementById("movieTable")
//     movieTable.addEventListener("click", function(event) {
//         if(event.target.classList.contains('edit-btn')) {
//             const row = event.target.closest('tr')
//             const id = row.dataset.id

//             fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById('editMovieTitle').value = data.title
//                 document.getElementById('editGenre').value = data.genre
//                 document.getElementById('editRating').value = data.rating

//                 document.getElementById('editForm').style.display = "block";

//                 editingRowId = id;
//             })
//             .catch(error => {
//                 console.error("Error:", error)
//             })
//         }
//     })

//     let editFormInputs = document.getElementById('editFormInputs')
//     editFormInputs.addEventListener("submit", function(event) {
//         event.preventDefault()

//         const editedMovieTitle = document.getElementById("editMovieTitle").value
//         const editedGenre = document.getElementById("editGenre").value
//         const editedRating = document.getElementById("editRating").value

//         const updatedRow = {
//             title: editedMovieTitle,
//             genre: editedGenre,
//             rating: editedRating
//         }
//         fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${editingRowId}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(updatedRow)
//         })
//         .then((response) => response.json())
//         .then((data) => {
//             console.log("Row updated successfully")
//             hideEditForm();
//             fetchData()
//         })
//         .catch(error => {
//             console.error("Error:", error)
//         })
//     })
// }

// updateOne()

// let cancelEditBtn = document.getElementById("cancelEditBtn")
// cancelEditBtn.addEventListener("click", () => {
//     hideEditForm()
// })

// function hideEditForm() {
//     document.getElementById("editMovieTitle").value = ""
//     document.getElementById("editGenre").value = ""
//     document.getElementById("editRating").value = ""

//     document.getElementById("editForm").style.display = "none"

//     editingRowId = null;
// }



// function editRow(rowId) {
//     fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${rowId}`)
//     .then(response => response.json())
//     .then(data => {
//         document.getElementById('title').value = data.title;
//         document.getElementById('genre').value = data.genre;
//         document.getElementById('rating').value = data.rating;
//     })
//     .catch(error => console.error('Error:', error))

//     document.getElementById('editForm').style.display = 'block';
// }

// function updateRow() {
//     const title = document.getElementById('title').value;
//     const genre = document.getElementById('genre').value;
//     const rating = document.getElementById('rating').value;

//     fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${rowId}`, {
//         method: 'PUT',
//         headers: {
//             'Content-type': 'application/json'
//         },
//         body: JSON.stringify({title, genre, rating})
//     })
//     .then(response => response.json())
//     .then(data => {
//         const updatedRow = document.getElementById(`row${rowId}`);
//         updatedRow.cells[0].textContent = data.title;
//         updatedRow.cells[1].textContent = data.genre;
//         updatedRow.cells[2].textContent = data.rating;
//     })
//     .catch(error => console.error('Error:', error))
//     document.getElementById('editForm').style.display = 'none'
// }


// Global variable to store the current editing row index
let editingRowIndex = -1;

// Function to fetch the entity data
async function getEntity() {
  try {
    const response = await fetch('/api/entity'); // Replace '/api/entity' with your actual API endpoint
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch entity');
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to update the entity data
async function updateEntity(updatedData) {
  try {
    const response = await fetch('/api/entity', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    });
    if (response.ok) {
      console.log('Entity updated successfully');
    } else {
      throw new Error('Failed to update entity');
    }
  } catch (error) {
    console.error(error);
  }
}

// Function to populate the table with data
async function populateTable() {
  const data = await getEntity();
  const tableBody = document.getElementById('data');
  tableBody.innerHTML = '';

  data.forEach((entity, index) => {
    const row = tableBody.insertRow();

    // Create and populate the cells
    const titleCell = row.insertCell();
    titleCell.textContent = entity.title;

    const genreCell = row.insertCell();
    genreCell.textContent = entity.genre;

    const ratingCell = row.insertCell();
    ratingCell.textContent = entity.rating;

    const actionsCell = row.insertCell();
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      openEditForm(index, entity);
    });
    actionsCell.appendChild(editButton);
  });
}

// Function to open the edit form and populate it with data
function openEditForm(rowIndex, entity) {
  const editForm = document.getElementById('editForm');
  const titleInput = document.getElementById('title');
  const genreInput = document.getElementById('genre');
  const ratingInput = document.getElementById('rating');

  // Set the values of the inputs to the entity data
  titleInput.value = entity.title;
  genreInput.value = entity.genre;
  ratingInput.value = entity.rating;

  // Set the editingRowIndex to the current row index
  editingRowIndex = rowIndex;

  // Show the edit form
  editForm.style.display = 'block';
}

// Function to handle the form submission and update the row
function updateRow() {
  const titleInput = document.getElementById('title');
  const genreInput = document.getElementById('genre');
  const ratingInput = document.getElementById('rating');

  // Get the updated values from the inputs
  const updatedEntity = {
    title: titleInput.value,
    genre: genreInput.value,
    rating: ratingInput.value
  };

  // Update the entity in the table
  const tableBody = document.getElementById('data');
  const row = tableBody.rows[editingRowIndex];
  const cells = row.cells;

  cells[0].textContent = updatedEntity.title;
  cells[1].textContent = updatedEntity.genre;
  cells[2].textContent = updatedEntity.rating;

  // Hide the edit form
  const editForm = document.getElementById('editForm');
  editForm.style.display = 'none';

  // Send the updated entity to the server
  updateEntity(updatedEntity);
}

// Function to cancel the editing and hide the edit form
function cancelEdit() {
  const editForm = document.getElementById('editForm');
  editForm.style.display = 'none';
}

// Event listener for the cancel button in the edit form
const cancelEditBtn = document.getElementById('cancelEditBtn');
cancelEditBtn.addEventListener('click', cancelEdit);

// Populate the table on page load
populateTable();
