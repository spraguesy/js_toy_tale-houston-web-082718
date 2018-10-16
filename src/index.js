const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    let form = document.querySelector('.add-toy-form')
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      data = {
        name: event.target.name.value,
        image: event.target.image.value,
        likes: 0
      }
      fetch('http://localhost:3000/toys', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      }).then(() => {
        let toyContainer = document.getElementById('toy-collection')
        let newContainer = document.createElement('div');
        newContainer.setAttribute('class', 'card')
        newContainer.innerHTML += `<h2>${event.target.name.value}</h2>`
        newContainer.innerHTML += `<img src=${event.target.image.value} class="toy-avatar"></img>`
        newContainer.innerHTML += `<p>0 likes</p>`
        newContainer.innerHTML += `<button>Like</button>`

        toyContainer.appendChild(newContainer);

      })
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
document.addEventListener('DOMContentLoaded', () => {
  const toyDiv = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys', {
    method: 'GET'
  }).then(resp => {
    resp.json().then(json => renderToys(json));
  });

  document.addEventListener('click', (event) => {
    if (event.target.className === 'like-btn') {
      let numLikes = parseInt(event.target.parentElement.children[2].dataset.likes) + 1
      event.target.parentElement.children[2].innerText = `${numLikes} likes`;
      event.target.parentElement.children[2].dataset.likes = numLikes

      let data = {
        likes: numLikes
      };

      fetch(`http://localhost:3000/toys/${event.target.parentElement.id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      })


    }
  });
})

function renderToys(json) {
  let toyContainer = document.getElementById('toy-collection')
  json.forEach(toy => {
    let newContainer = document.createElement('div')
    newContainer.setAttribute('class', 'card')
    newContainer.setAttribute('id', toy.id)

    newContainer.innerHTML += `<h2>${toy.name}</h2>`
    newContainer.innerHTML += `<img src=${toy.image} class="toy-avatar"></img>`
    newContainer.innerHTML += `<p data-likes=${toy.likes}>${toy.likes} likes</p>`
    newContainer.innerHTML += `<button class="like-btn">Like</button>`

    toyContainer.appendChild(newContainer);
  });
}