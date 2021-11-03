const input = document.getElementById('searchInput');
const searchArea = document.querySelector('.search-column');
const button = searchArea.querySelector('button');

const searchAutocomplete = new google.maps.places.Autocomplete(input, {
  types: ['(cities)'],
});

// Only allows the search button to be clicked once it has at least one comma, and there is a city/state/country
document.body.addEventListener('mouseover', () => {
  if (
    !input.value ||
    !input.value.includes(',') ||
    input.value.split(' ').length < 2
  ) {
    button.disabled = true;
  } else {
    button.disabled = false;
  }
});

const renderPosts = (posts) => {
  posts.forEach((post) => {
    const aTag = document.createElement('a');
    aTag.setAttribute('href', `/posts/${post.id}`);
    aTag.classList.add('post-card');
    aTag.classList.add('mb-2');
    aTag.style.height = '175px';
    aTag.style.textDecoration = 'none';
    aTag.innerHTML = `<div class="card w-100" style="height: 160px; overflow: hidden;">
    <div class="card-body">
      <div>
        <img class="float-left" src="${post.image_link}" style="max-width:60px">
      </div>
      <div>
        <h5 class="card-title">${post.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Username will go here</h6>
        <p class="card-text">${post.body}</p>
        <p>Also need to include the username and date posted</p>
      </div>
    </div>
  </div>`;
    document.querySelector('#contentDiv').appendChild(aTag);
  });
};

const handleSearch = async (e) => {
  e.preventDefault();
  document.querySelector('#contentDiv').innerHTML = '';
  // Display the results div and the arrow
  document.querySelector('.results-column').style.display = 'flex';
  document.querySelector('.arrow-container').style.opacity = '100%';

  const response = await fetch(`/api/posts?location=${input.value}`);
  const posts = await response.json();
  if (!response.ok) {
    const error = document.createElement('h1');
    error.innerText = 'There are currently no posts under this location!';
    document.querySelector('#contentDiv').appendChild(error);
  } else {
    renderPosts(posts);
  }
};

button.addEventListener('click', handleSearch);

//HIDE the .results-column and the .arrow-container UNTIL the search button is clicked!


