var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var displayRepos = function(repos, searchTerm) {
    // check that there are repos to display
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found";
        return;
    }
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (i=0; i<repos.length; i++ ) {
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        //create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //append container to dom
        repoContainerEl.appendChild(repoEl);
    }
};

var getUserRepos = function(user) {
    //format the github url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
   var response = fetch(apiUrl)
    .then(function(response){
       if(response.ok) {
        response.json().then(function(data){
            displayRepos(data, user);
            });    
        } else {
            alert("Error: GitHub User Not Found");
        }
   })
   .catch(function(error) {
       alert("Unable to connect to GitHub");
   });
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
    //get value from input element
    var username = nameInputEl.value.trim();
    if (username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);