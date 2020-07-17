$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
    const numberOfPresses = $(this).val();
    let num = 1;
    num = 140 - (numberOfPresses.length)
    console.log("numberOfPresses.length", numberOfPresses.length);
    console.log("num", num)
    const counter = $(this).closest('form').find('.counter');
    counter[0].textContent = num;
    if (num < 0) {
      counter[0].style.color = "red";
    } else if (num >= 0) {
      counter[0].style.color = "black";
    }
  });
});
