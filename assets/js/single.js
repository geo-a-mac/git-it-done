var issuesContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl)
    .then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                // pass response data to dom function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
    console.log(repo);
}

var displayIssues = function(issues) {
    if(issues.length === 0) {
        issuesContainerEl.textContent = "This repo has no open issues";
    }
    // loop through the issues and display
    for(var i=0; i<issues.length; i++) {
       // create a link to the issue URL
        var issuesEl = document.createElement("a");
        issuesEl.classList = "list-item flex-row justify-space-between align-center";
        issuesEl.setAttribute("href", issues[i].html_url);
        issuesEl.setAttribute("target", "_blank");
       
        // span to hold issue title, append to issuesEl <a>
        var titleEl =  document.createElement("span");
        titleEl.textContent = issues[i].title;
        issuesEl.appendChild(titleEl);
       
        // span to hold pull request or issue, append to titleEl <span>
        var typeEl = document.createElement("span");
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        issuesEl.appendChild(typeEl);
        issuesContainerEl.appendChild(issuesEl);
    }
}

getRepoIssues("geo-a-mac/hello-world");