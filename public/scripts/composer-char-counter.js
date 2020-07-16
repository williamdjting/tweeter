$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('keypress', function() {
    const numberOfPresses = $(this).val();
    let num = 0;
    num = 140 - (numberOfPresses.length + 1)
    console.log("numberOfPresses.length", numberOfPresses.length);
    console.log("num", num)
    const counter = $(this).closest('form').find('.counter');
    counter[0].textContent = num;
    if (num < 0) {
      counter[0].style.color = "red";
    } else if (num > 0) {
      counter[0].style.color = "black";
    }
  });
});






// <main class="container newtweetcontainer">
//       <section class="new-tweet">
//         <h2>Compose Tweet</h2>
//         <form method="POST" action="/tweets/">
//           <textarea class="newtweetform" name="text" id="tweet-text">What are you humming about?</textarea>
//           <div>
//               <button class="newtweetsubmitbutton" type="submit">Tweet</button>
//               <output class="counter" name="counter" class="counter" for="tweet-text">140</output>
//           </div>

//         </form>
        
//       </section>
//     </main>