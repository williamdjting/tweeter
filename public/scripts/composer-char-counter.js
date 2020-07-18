$(document).ready(function () {
  // when user has an input inside the #tweet-text area of form, minus the number of presses by the 140 character limit
  $("#tweet-text").on('input', function () {
    const numberOfPresses = $(this).val();
    let num = 1;
    //minuses the number of presses by the 140 character limit
    num = 140 - (numberOfPresses.length)
    //counter variable finds the counter class within the form in the html
    const counter = $(this).closest('form').find('.counter');
    counter[0].textContent = num;
    //when the num drops below 0, the counter button will turn red, otherwise if num is above 0, the counter button will be black
    if (num < 0) {
      counter[0].style.color = "red";
    } else if (num >= 0) {
      counter[0].style.color = "black";
    }
  });
});
