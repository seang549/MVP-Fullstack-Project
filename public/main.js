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
function getAll () {
    const requestURL = "https://movies-db-team3.onrender.com/movies_to_watch";

    fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
        body.append(data)
        return data;
    })
}
getAll();

