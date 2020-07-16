/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const data = [
    {}
  ]

  const renderTweets = function (tweets) {
    // loops through tweets
    let $tweet;
    for (let tweet in tweets) {
      tweets[tweet]
      console.log(tweets[tweet]);
      console.log(tweet);
      $tweet = createTweetElement(tweets[tweet])
      $('.section-tweetcontainer').append($tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

  }

  const createTweetElement = function (tweet) {
    let $tweet = `<article class="article-article">
  <header class="article-header">
    <div class="article-div-header">
      <img class="article-image" src=${tweet.user.avatars}> 
      <p class="article-name">${tweet.user.name}</p>  
    </div>
    <p class="article-username">${tweet.user.handle}</p> 
  
  </header>
    <p class="article-body">
      ${tweet.content.text}
    </p>        
  <footer class="article-footer">
    <div class="article-div-footer">
      <p>${tweet.created_at}</p>
      <div class="article-div-footer-icons">
        <p class ="article-flag"> Flag </p> 
        <p class ="article-retweet"> Retweet </p> 
        <p class="article-heart"> Heart </p>
      </div>
    </div>  
  </footer>
  </article>`
    return $tweet;
  }

  //renderTweets(data);

  //console.log( "ready!" ); 

  $('.newtweetformmethod').submit(function (event) {
    event.preventDefault();
    var textarea = $("#tweet-text").val();

    if (textarea === "") {
      alert("This field cannot be empty.");
    }

    if (textarea === null) {
      alert("This field cannot be empty.");
    }

    if (textarea.length > 140) {
      alert("This field must be less than 140 characters");
    }
    
    $.ajax({
      url: '/tweets',
      method: "POST",
      data: $(this).serialize()
    });
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: 'GET' }).done(function (data) {
      console.log(data);
      renderTweets(data);
    });
  }


  loadTweets();
});


// var textarea = $("#tweet-text").val();

// if (textarea === "") {
//   alert("This field cannot be empty.");
// }

// if (textarea === null) {
//   alert("This field cannot be empty.");
// }

// if (textarea.length > 140) {
//   alert("This field must be less than 140 characters");
// }