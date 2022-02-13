// function past(e){
//     //declare a variable for the event target
//     var listEl = e.target;
//     //if the target click the item, it will execute the current weather function
//     if(e.target.matches("li")){
//         city = listEl.textContent.trim();
//         currentWeather(city);
//     }
// }

// function list(e){
//     var list = $("<li>"+e+"</li>");
//     $(list).attr("class", "list-group-item");
//     $("#list").append(list);
// }
async function newFormHandler(event) {
    event.preventDefault();
  
    const bean = document.querySelector('ul[name=bean]').value;
    const roast = document.querySelector('ul[name=roast]').value;
    const sweetness = document.querySelector('ul[name=sweetness]').value;

  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        bean,
        roast,
        sweetness
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.newCup').addEventListener('submit', newFormHandler);