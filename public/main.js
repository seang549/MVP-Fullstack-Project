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
                updateOne(entity.id);
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



function editRow(rowId) {
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${rowId}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('title').value = data.title;
        document.getElementById('genre').value = data.genre;
        document.getElementById('rating').value = data.rating;
    })
    .catch(error => console.error('Error:', error))

    document.getElementById('editForm').style.display = 'block';
}

function updateRow() {
    const movieTitle = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = document.getElementById('rating').value;

    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${rowId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({title, genre, rating})
    })
    .then(response => response.json())
    .then(data => {
        const updatedRow = document.getElementById(`row${rowId}`);
        updatedRow.cells[0].textContent = data.title;
        updatedRow.cells[1].textContent = data.genre;
        updatedRow.cells[2].textContent = data.rating;
    })
    .catch(error => console.error('Error:', error))
    document.getElementById('editForm').style.display = 'none'
}