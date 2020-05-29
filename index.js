function displayError() {
  $("#errors").html("<strong>I'm sorry, there's been an error. Please try again.</strong>");
}

function searchRepositories() {
  const searchTerms = $('#searchTerms').get(0).value.split(' ').join('+');
  $.get('https://api.github.com/search/repositories?q=' + searchTerms, function(response) {
    let htmlString = '<ul>';
    $.each(response.items, function(idx, item) {
      htmlString = htmlString + '<li><a href="' + item.html_url + '">' + item.name + '</a> - Description: ' + item.description + ' - Owner: <a href="https://github.com/' + item.owner.login + '">' + item.owner.login + '<img height="32" width="32" src="' + item.owner.avatar_url + '"></a> - <a href="#" onclick="showCommits(this)" data-repository="' + item.name + '" data-owner="' + item.owner.login + '">Show Commits</a></li>';
    });
    htmlString += '</ul>';
    $("#results").html(htmlString);
  }).fail(displayError);
}

function showCommits(el) {
  const name = el.dataset.repository;
  const username = el.dataset.owner;
  $.get('https://api.github.com/repos/' + username + '/' + name + '/commits', function(commits) {
    let htmlString = '<ul>';
    $.each(commits, function(idx, commit) {
      htmlString = htmlString + '<li>SHA: ' + commit.sha + '- Author: ' + commit.author.login + ' - Avatar: <img height="32" width="32" src="' + commit.author.avatar_url + '"></li>';
    });
    htmlString += '</ul>';
    $("#details").html(htmlString);
  }).fail(displayError);
}