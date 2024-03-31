
function Search(){
    const searchQuery = document.getElementById('searchInput').value;
    console.log(searchQuery);
}
document.getElementById("searchButton").addEventListener("click", Search);