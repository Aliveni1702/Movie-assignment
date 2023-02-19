const givenList = [
    { title: "The Shawshank Redemption", genre: "Drama" },
    { title: "The Godfather", genre: "Crime" },
    { title: "The Godfather: Part II", genre: "Crime" },
    { title: "The Dark Knight", genre: "Action" },
    { title: "12 Angry Men", genre: "Drama" },
    { title: "Schindler's List", genre: "Drama" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Adventure" },
    { title: "Pulp Fiction", genre: "Crime" },
    { title: "The Good, the Bad and the Ugly", genre: "Western" },
    { title: "Fight Club", genre: "Drama" },
    { title: "Forrest Gump", genre: "Drama" },
    { title: "Inception", genre: "Action" },
    { title: "The Lord of the Rings: The Fellowship of the Ring", genre: "Adventure" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Action" },
    { title: "The Lord of the Rings: The Two Towers", genre: "Adventure" },
    { title: "The Matrix", genre: "Action" },
    { title: "Goodfellas", genre: "Crime" },
    { title: "One Flew Over the Cuckoo's Nest", genre: "Drama" },
    { title: "Seven Samurai", genre: "Adventure" },
    { title: "Se7en", genre: "Crime" },
    { title: "City of God", genre: "Crime" },
    { title: "The Silence of the Lambs", genre: "Thriller" },
    { title: "It's a Wonderful Life", genre: "Drama" },
    { title: "Life is Beautiful", genre: "Comedy" },
    { title: "The Usual Suspects", genre: "Crime" },
    { title: "Léon: The Professional", genre: "Action" },
    { title: "Spirited Away", genre: "Animation" },
    { title: "Saving Private Ryan", genre: "Drama" },
    { title: "Interstellar", genre: "Adventure" },
    { title: "The Green Mile", genre: "Drama" },
    { title: "The Prestige", genre: "Drama" },
    { title: "The Intouchables", genre: "Comedy" },
    { title: "The Lion King", genre: "Animation" },
    { title: "The Pianist", genre: "Drama" },
    { title: "The Departed", genre: "Crime" },
    { title: "Whiplash", genre: "Drama" },
    { title: "Gladiator", genre: "Action" }
  ]
console.log(givenList);

  let movies = [];
  
 
  localStorage.setItem('movieListToSave',JSON.stringify(givenList));
  movies = JSON.parse(localStorage.getItem('movieListToSave'));

  const getOption = document.getElementById("options")
  const getTitle = document.getElementById("title");
  const getGenre = document.getElementById("genre");
  const getRes = document.getElementById("result");
  const getList = document.getElementById("count");
  console.log(movies);

let selectedRes=[];


function search(e){
    if(getTitle.value ) {
        selectedRes = searchByTitle(getTitle.value);
    } else if(getGenre.value) {
        selectedRes = searchByGenre(getGenre.value);
    }
    else if(getTitle.value && getGenre.value){
        selectedRes = searchByBoth(getTitle.value, getGenre.value)
    }
    
    
    displayResults(selectedRes);
    getTitle.value = ""
    getGenre.value = ""

}

//title search
function searchByTitle(val){
    let resTitle = movies.filter(movie => movie.title.toLowerCase().includes(val.toLowerCase()))
    return resTitle;
}

//genre search
function searchByGenre(val){
    let resGenre = movies.filter(movie => movie.title.toLowerCase().includes(val.toLowerCase()))
    return resGenre;
}


//both
function searchByBoth(searchedTitle, searchedGenere) {
    let resBoth= movies.filter(movie =>
        movie.title.toLowerCase().includes(searchedTitle.toLowerCase().trim()) && movie.genre.toLowerCase().trim().includes(searchedGenere.toLowerCase().trim()));
        return resBoth;
}



//searched result
function displayResults(searchedMovie) {
    getRes.innerHTML = "";
    searchedMovie.map(movie => {
        getRes.innerHTML += `<li>${movie.title}:${movie.genre}</li>`
    })
    countByGenre(searchedMovie)
}


//sort by title

function sortByTitle() {
    const sortedTitle = selectedRes.sort((prev, next) => prev.title.localeCompare(next.title));
    displayResults(sortedTitle);
}


//sort by genre

function sortByGenre() {
    const sortedGenre = selectedRes.sort((prev, next) => prev.title.localeCompare(next.title));
    displayResults(sortedGenre);
}

//Count genre Results
function countByGenre(searched) {
    count.innerHTML = "";
    let map = new Map;
    searched.map(movie => {
        if (!map.has(movie.genre)) {
            map.set(movie.genre, 1)
        } else {
            map.set(movie.genre, map.get(movie.genre) + 1)
        }
    })
    console.log(map);
    for (let i of map) {
        count.innerHTML += `<li>${i[0]}: ${i[1]}</li>`
    }
}


//Advance 
getTitle.disabled = true;
getGenre.disabled = true;
getOption.addEventListener("change", function () {
    if (getOption.value === "title") {
        getGenre.disabled = true;
        getTitle.disabled = false;
    } else if (getOption.value === "genre") {
        getTitle.disabled = true;
        getGenre.disabled = false;
    } else if (getOption.value === "both") {
        getTitle.disabled = false;
        getGenre.disabled = false;
    } else if (getOption.value === "SelectOption") {
        getTitle.disabled = true;
        getGenre.disabled = true;
    }
});