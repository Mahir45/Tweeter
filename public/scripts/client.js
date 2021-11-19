/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  const loadTweets = function () {
    $.ajax("/tweets").then(function (res) {
      renderTweets(res);
      $(".counter").text(140);
    });
  };
  loadTweets();
  $("#errormessage").hide();

  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    for (let key of tweets) {
      $tweet = createTweetElement(key);
      $("#tweets-container").prepend($tweet);
    }
  };
  function createTweetElement(tweetData) {
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $newTweet = `
    <section id="tweet-container">
    <article class="tweetbox">
      <header class="newheader">
        <div class="divved">
        <img src="${tweetData.user["avatars"]}">
          <div>${tweetData.user["name"]}</div>
        </div>
          <span id="span1">${tweetData.user["handle"]}</span>
      </header>
      <main id="main2">
        <span>${escape(tweetData.content["text"])}</span>
        <hr>
      </main>
      <footer class="newfooter">
        <div class="div2">
          <span class="span2">${timeago.format(tweetData.created_at)}</span>
          <div class="div3">
            <span><i id="flag"class="fas fa-flag flagged"></i></span>
            <span><i id="retweet" class="fas fa-retweet flagged"></i></span>
            <span><i id="heart"class="fas fa-heartbeat flagged"></i></span>
          </div>
        </div>
      </footer>
    </article>
  </section>`;
    return $newTweet;
  }

  $("#form").on("submit", function (event) {
    event.preventDefault();
    const characterCount = $("#tweet-text").val().trim().length;
    if (characterCount === 0) {
      $("#errormessage").text(
        "🛑Cannot tweet nothing, don't be those other guys won't hurt you🛑"
      );
      $("#errormessage").slideDown("slow");
      $("#errormessage").delay(4000).slideUp("slow");
      return;
    }
    if (characterCount > 140) {
      $("#errormessage").text(
        "🔺Tweet is way toooo long, the tweet can only be 140 characters🔻"
      );
      $("#errormessage").slideDown("slow");
      $("#errormessage").delay(4000).slideUp("slow");
      return;
    }
    const formData = $(this).serialize();
    $.ajax("/tweets", { method: "POST", data: formData }).then(() => {
      loadTweets();
      $("#tweet-text").val("");
    });
  });
});
