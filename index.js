// function fetchImages() {
//   fetch('https://jsonplaceholder.typicode.com/photos')
//     .then(response => response.json())
//     .then(data => {
//       const gridContainer = document.getElementById('image-grid');

//       for (let i = 0; i < 9; i++) {
//         const image = document.createElement('img');
//         image.src = data[i].thumbnailUrl;
//         const gridItem = document.createElement('div');
//         gridItem.classList.add('grid-item');
//         gridItem.appendChild(image);

//         image.addEventListener('click', () => {
//           displayLargeImage(data[i].url, data[i]);
//         });

//         gridContainer.appendChild(gridItem);
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }

// function displayLargeImage(imageUrl) {
//   const overlay = document.createElement('div');
//   overlay.classList.add('overlay');
//   const largeImage = document.createElement('img');
//   largeImage.src = imageUrl;
//   overlay.appendChild(largeImage);
//   document.body.appendChild(overlay);
//   overlay.addEventListener('click', () => {
//     document.body.removeChild(overlay);
//   });
// }

// function refreshImages() {
//   const gridContainer = document.getElementById('image-grid');
//   gridContainer.innerHTML = '';
//   document.getElementById('refresh-button').style.display = 'none';

//   fetchImages(); 
// }
// fetchImages();




let currentPage = 1;
const imagesPerPage = 9;

function fetchImages() {
  fetch(`https://jsonplaceholder.typicode.com/photos?_page=${currentPage}&_limit=${imagesPerPage}`)
    .then(response => response.json())
    .then(data => {
      const gridContainer = document.getElementById('image-grid');

      for (let i = 0; i < data.length; i++) {
        const image = document.createElement('img');
        image.src = data[i].thumbnailUrl;
        image.alt = data[i].title;

        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gridItem.appendChild(image);

        image.addEventListener('click', () => {
          displayLargeImage(data[i].url, data[i].title);
        });

        gridContainer.appendChild(gridItem);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayLargeImage(imageUrl, imageTitle) {
  const overlay = document.getElementById('overlay');
  overlay.innerHTML = '';

  const largeImage = document.createElement('img');
  largeImage.src = imageUrl;
  largeImage.alt = imageTitle;

  overlay.appendChild(largeImage);
  overlay.style.display = 'flex';

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });
}

function refreshImages() {
  currentPage++;
  fetchImages();
}

// Call the function to fetch and display the initial images
fetchImages();
