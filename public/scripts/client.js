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
      // calls createTweetElement for each tweet
      $tweet = createTweetElement(tweets[tweet])
      // takes return value and prepends it to the tweets container
      $('.section-tweetcontainer').prepend($tweet);
    }
  }

  //escape is called in createTweetElement function
  const escape = function (str) {
    //creates div element
    let div = document.createElement('div');
    //takes any non string query and puts it into a div and pulls out the innerHTML string to escape any string injection
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  const createTweetElement = function (tweet) {
    //$tweet becomes the html with template literals that parse through the tweet database/json to pull the relevant object key/value and displays it within the prepended section of the html
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
              <p>${(moment(new Date(tweet.created_at)).fromNow())}</p>
            </div>
            <div class="article-div-footer-icons">
              <p class ="article-flag"></p> 
              <p class ="article-retweet"></p> 
              <p class="article-heart"></p>
            </div> 
          </footer>
        </article>
    `
    //returns $tweet variable to renderTweets function
    return $tweet;
  }

  //hides the error message
  $('.validationerror').hide();

  //when the tweet form is submitted, the value of the tweet form is given to the text area variable
  $('.newtweetformmethod').submit(function (event) {
    event.preventDefault();
    var textarea = $("#tweet-text").val();

    //if text area variable is empty or null, show error message
    if (textarea === "" || textarea === null) {
      $('.validationerror').slideDown(400);
      //otherwise if text area is above 140 inputs, show error message
    } else if (textarea.length > 140) {
      $('.validationerror').slideDown(400);
      //otherwise keep hidden
    } else {
      $('.validationerror').hide();
      
      //sends the submission to the /tweets url as a POST
      $.ajax({
        url: '/tweets',
        method: "POST",
        data: $(this).serialize()
      })
      .done ( () => (loadTweets()))
    }
    //finds the #tweet-text area and resets the counter to 140 once a tweet is submitted
    $(this).find("#tweet-text").val('');
    $(this).find(".counter").text("140");

    
  });

  //performs a GET to /tweets url in order to render the tweet from renderTweets function
  
  
  const loadTweets = function () {
    $('.section-tweetcontainer').empty()
    $.ajax("/tweets", { method: 'GET' }).done(function (data) {
      renderTweets(data);
    });
  }

  //calls the loadTweets
  loadTweets();

  
});