//create new post function
async function newPostHandler(event) {
  event.preventDefault();

  const bean = document.querySelector('.bean').value.trim();
  
  const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
      bean
      }),
      headers: {
      'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      document.location.replace('/dashboard/');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.newPostForm').addEventListener('submit', newPostHandler);