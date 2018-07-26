// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search_container').html("<a href='https://www.youtube.com/watch?v=" + response.result.items[0].id.videoId + "'>" + "Click here to play the first result" + '</pre>');
    console.log(response.result.items[0].id.videoId);
  });
}
