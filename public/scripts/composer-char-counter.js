// vanilla js 
// document.getElementById("tweet-text").addEventListener("click", () => {
  //   console.log("You just clicked somewhere on this page.");
  // });
  
  
  // jquery 
  //   $( "#tweet-text").keydown(function() {
    //     alert( "Handler for .click() called." );
    //   });
    // });
    
    const numberCounter = 140;
    function newCount() {
      const counter = $("#tweet-text").val().trim().length;
      $('.counter').text(numberCounter - counter);
      if ($('.counter').text() < 0) {
        $('.counter').addClass('newclass');
      } else {
        return $('.counter').removeClass('newclass');
      }
      
      
    }
    $(document).ready(function () {
      $("#tweet-text").on('input', newCount);
    });
      


    