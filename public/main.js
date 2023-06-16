const myNodeList = document.getElementsByTagName('tr')
for (let i = 0; i < myNodeList.length; i++) {
    let span = document.createElement('span');
    let txt = document.createTextNode('\u00D7')
    span.className = "close";
    span.appendChild(txt);
    myNodeList[i].appendChild(span);
}

const close = document.getElementsByClassName('close');
for(let i = 0; i < close.length; i++) {
    close[i].onclick = () => {
        let div = this.parentElement;
        div.style.display = "none";
    }
}
const body = document.getElementsByTagName('body')

async function getAll () {
    try {
        const response = await fetch("https://movies-db-team3.onrender.com/movies_to_watch");
        console.log(response)
        const data = await response.json();
        console.log(data);
        let temp = "";
        for (i = 0; i < data.length; i++) {
            temp+="<tr>";
            temp+=`<td>${data[i].title}</td>`
            temp+=`<td>${data[i].genre}</td>`
            temp+=`<td>${data[i].rating}</td>`
        }
        document.getElementById('data').innerHTML=temp;
    }
    catch(err) {
        console.error(err.message)
    }

}
getAll();


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
    const movieTable = document.getElementById('movieTable')
    const newRow = movieTable.insertRow()
    const titleCell = newRow.insertCell()
    titleCell.textContent = data.title;
    const genreCell = newRow.insertCell()
   genreCell.textContent = data.genre;
    const ratingCell = newRow.insertCell()
    ratingCell.textContent = data.rating;

}


//async function creatOne() {
// let form = document.getElementById('form')
// form.addEventListener('submit', function(e) {
//     e.preventDefault()

//     let movieTitle = document.getElementById('movieTitle').value;
//     let genre = document.getElementById('genre').value;
//     let rating = document.getElementById('rating').value;

//     fetch("https://movies-db-team3.onrender.com/movies_to_watch", {
//         method: 'POST',
//         body: JSON.stringify({
//             title: movieTitle,
//             genre: genre,
//             rating: rating, 
//         }),
//         headers: {
//             'Content-type': 'application/json',
//         }
//     })
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(data){
//         console.log(data)
//         title=document.getElementById('title')
//         genre= document.getElementById('genre')
//         rating= document.getElementById('rating')
//         title.innerHTML = data.title
//         genre.innerHTMl = data.genre
//         rating.innerHTML = data.rating
//     })
//     .catch(error => console.error('Error:', error))
// })
// }
//createOne()