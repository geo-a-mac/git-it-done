var getUserRepos = function(user) {
    //format the github url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // make a request to the url
   var response = fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });     
   });
   
};

getUserRepos("geo-a-mac");