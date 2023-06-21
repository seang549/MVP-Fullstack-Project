// Example usage: Add event listener to the Cancel button in the edit form
const cancelEditBtn = document.getElementById('cancelEditBtn');
cancelEditBtn.addEventListener('click', function(event) {
event.preventDefault();
document.getElementById('editForm').style.display = 'none';
});
const cancelAddBtn = document.getElementById('cancelAddBtn');
cancelAddBtn.addEventListener('click', function(event) {
event.preventDefault();
document.getElementById('formToAdd').style.display = 'none';
});



const body = document.getElementsByTagName('body')[0];

////////////////////POST REQUEST/////////////////
document.getElementById('addForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = {
        title: document.getElementById('movieTitle').value,
        director: document.getElementById('director').value,
        release_year: document.getElementById('releaseYear').value,
        genre: document.getElementById('genre').value,
        rating: document.getElementById('rating').value
    };
    postData(formData);
});

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
        addRowToTable(result);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function addRowToTable(data) {
    document.getElementById('formToAdd').style.display = 'block';
    const movieTable = document.getElementById('movieTable');
    const newRow = movieTable.insertRow();
    
    const titleCell = newRow.insertCell();
    titleCell.textContent = data.title;

    const directorCell = newRow.insertCell();
    directorCell.textContent = data.director;

    const releaseYearCell = newRow.insertCell();
    releaseYearCell.textContent = data.release_year;
    
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
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
        getEntity(data.id);
    });
    editCell.appendChild(editButton);
}

////////////////////DELETE ONE/////////////////

// Deletes table row
function deleteRow(entityId) {
    // Make a delete request using fetch
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Row deleted successfully');
        fetchData();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

///////////////////////////////////////////////////

//////////////////Get one & Put//////////////////////////

// Fetches data of a specific entity
function getEntity(entityId) {
    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`)
    .then(response => response.json())
    .then(data => {
        // Populate the edit form with fetched data
        document.getElementById('editMovieTitle').value = data.title;
        document.getElementById('editDirector').value = data.director;
        document.getElementById('editReleaseYear').value = data.release_year;
        document.getElementById('editGenre').value = data.genre;
        document.getElementById('editRating').value = data.rating;
        document.getElementById('entityId').value = data.id
        document.getElementById('editForm').style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Handles the edit form submission
document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const entityId = document.getElementById('entityId').value;
    console.log(entityId.value)
    const editFormData = {
        title: document.getElementById('editMovieTitle').value,
        director: document.getElementById('editDirector').value,
        release_year: document.getElementById('editReleaseYear').value,
        genre: document.getElementById('editGenre').value,
        rating: document.getElementById('editRating').value
    };
    console.log(document.getElementById('entityId'));
    console.log(editFormData);
    updateEntity(entityId, editFormData);
    document.getElementById('editForm').style.display = 'none';
});

// Updates the entity with edited data

function updateEntity(entityId, data) {

    fetch(`https://movies-db-team3.onrender.com/movies_to_watch/${entityId}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Success:', result);
        fetchData();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

///////////////////////////////////////////////////

//////////////////Get all////////////////////////////
function fetchData() {
    fetch('https://movies-db-team3.onrender.com/movies_to_watch')
    .then(response => response.json())
    .then(data => {
        const movieTable = document.getElementById('movieTable');
        movieTable.innerHTML = '';

        data.forEach(entity => {
            const newRow = document.createElement('tr');
            const titleCell = document.createElement('td');
            const directorCell = document.createElement('td');
            const releaseYearCell = document.createElement('td');
            const genreCell = document.createElement('td');
            const ratingCell = document.createElement('td');
            const deleteCell = document.createElement('td');
            const editCell = document.createElement('td')
            const deleteBtn = document.createElement('button');
            const editBtn = document.createElement('button');

            titleCell.textContent = entity.title;
            directorCell.textContent = entity.director;
            releaseYearCell.textContent = entity.release_year;
            genreCell.textContent = entity.genre;
            ratingCell.textContent = entity.rating;
            
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', function() {
                deleteRow(entity.id);
            });

            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', function() {
                getEntity(entity.id);
            });

            deleteCell.appendChild(deleteBtn);
            editCell.appendChild(editBtn);
            newRow.appendChild(titleCell);
            newRow.appendChild(directorCell);
            newRow.appendChild(releaseYearCell);
            newRow.appendChild(genreCell);
            newRow.appendChild(ratingCell);
            newRow.appendChild(deleteCell);
            newRow.appendChild(editCell);
            movieTable.appendChild(newRow);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

fetchData();

let addBtn = document.getElementById('add')
addBtn.addEventListener('click', () => {
    document.getElementById('formToAdd').style.display = "block";
})


// let movieCard = document.getElementById('movieCard')
// setInterval(async() => {
//     console.log('start');
//     const res = await fetch('https://api.lorem.space/image/movie?w=200&h=200&hash=vi7nxo5g');
//     res.appendChild(movieCard)
// }, 5000)
