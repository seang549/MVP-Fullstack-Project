const myNodeList = document.getElementsByTagName('li')
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
    const response = await fetch("https://movies-db-team3.onrender.com/movies_to_watch");
    console.log(response)
    const data = await response.json();
    console.log(data);
    let temp = "";
    for (i = 0; i < data.title.length; i++) {
        temp+="<tr>";
        temp+=`<td>${data[i].title}</td>`
    }
    document.getElementById('data').innerHTML=temp;
}
getAll();

