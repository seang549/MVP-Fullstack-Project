
const body = document.getElementsByTagName('body')

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
        deleteRow(data.id);
    });
    deleteCell.appendChild(deleteButton);

    const editCell = newRow.insertCell();
    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.addEventListener('click', () => {
        showEditForm(data.id)
    })
    editCell.appendChild(editBtn)
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
                getEntity(entity.id);
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

///////////////Get one/////////////////
// Function to retrieve an entity by ID
function getEntity(entityId) {
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`)
      .then(response => response.json())
      .then(data => {
        // Populate the edit form with the retrieved data
        document.getElementById('editMovieTitle').value = data.title;
        document.getElementById('editGenre').value = data.genre;
        document.getElementById('editRating').value = data.rating;
        
  
        // Show the edit form
        document.getElementById('editForm').style.display = 'block';
      })
      .catch(error => {
        console.log('Error:', error);
      });
}
  
document.getElementById('editForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const entityId = document.getElementById('entityId').value;
    const formData = {
        title: document.getElementById('editMovieTitle').value,
        genre: document.getElementById('editGenre').value,
        rating: document.getElementById('editRating').value
    }
    updateEntity(entityId, formData);
    document.getElementById('editForm').style.display = 'none'
})
  // Function to update an entity
function updateEntity(entityId, data) {
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Hide the edit form
        document.getElementById('editForm').style.display = 'none';
  
        // Update the corresponding row in the table with the updated data
        console.log('Succes:', result)
        fetchData();
    })
    .catch(error => {
        console.error('Error:', error)
    })
}
  
  // Example usage: Add event listener to the Cancel button in the edit form
  const cancelEditBtn = document.getElementById('cancelEditBtn');
  cancelEditBtn.addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('editForm').style.display = 'none';
  });
  