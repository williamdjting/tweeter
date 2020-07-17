/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  //$('.newtweetformmethod').text($tweet);
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
      console.log($tweet);
      $('.section-tweetcontainer').prepend($tweet);
    }
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container

  }

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (tweet) {
    const $tweet = `
      <article class="article-article">
        <header class="article-tweet-container">
          <div class="article-div-header">
            <img class="article-image" src=${tweet.user.avatars}> 
            <p class="article-name">${tweet.user.name}</p>  
          </div>
          <p class="article-username">${tweet.user.handle}</p> 
        </header>
          <p class="article-body">
            ${escape(tweet.content.text)}
          </p>        
          <footer class="article-footer">
            <div class="article-div-footer">
              <p>${(new Date(tweet.created_at).toLocaleString())}</p>
            </div>
            <div class="article-div-footer-icons">
              <p class ="article-flag"></p> 
              <p class ="article-retweet"></p> 
              <p class="article-heart"></p>
            </div> 
          </footer>
        </article>
    `
    return $tweet;
  }

  $('.validationerror').hide();
  $('.newtweetformmethod').submit(function (event) {
    event.preventDefault();
    var textarea = $("#tweet-text").val();
    
    if (textarea === "" || textarea === null) {
      $('.validationerror').slideDown(400);
      
    } else if (textarea.length > 140) {
      $('.validationerror').slideDown(400);
    } else {
      $('.validationerror').hide();
      $.ajax({
      url: '/tweets',
      method: "POST",
      data: $(this).serialize()
    });
    }
    $(this).find("#tweet-text").val('');
    $(this).find(".counter").text("140");
    loadTweets();
  });

  const loadTweets = function () {
    $.ajax("/tweets", { method: 'GET' }).done(function (data) {
      console.log(data);
      renderTweets(data);
    });
  }
 
  loadTweets();
});