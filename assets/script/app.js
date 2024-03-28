import * as utils from './utils.js';
import { User, Subscriber } from './User.js';

'use strict';

const headerPfp = document.querySelector('.pfp-div');

const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');
const modalContent = document.querySelector('.modal-content');

const postComposer = document.querySelector('.post-composer');
const textarea = document.querySelector('.post-composer textarea');
const uploadBtn = document.querySelector('.upload-btn');
const imageUpload = document.querySelector('.image-upload');
const fileName = document.querySelector('.file-name');
const postBtn = document.querySelector('.post-btn');

uploadBtn.addEventListener('click', function(event) {
  event.preventDefault();
  imageUpload.click(); //this opens the file picker dialogue so u can select an image
});

imageUpload.addEventListener('change', function() {
  // a 'change' event occurs when you select a file from the file picker dialog
  if (this.files && this.files[0]) { //checks if at least 1 file has been selected
    // set its text to the file name
    fileName.textContent = this.files[0].name;// sets the span next to uploadBtn to the file name
  }
});

function createPostCard(postContent, postImageSrc) {
  // Create new post card
  const newPostCard = document.createElement('div');
  newPostCard.className = 'post-card';
  // The HTML for the content of the new post card
  newPostCard.innerHTML = `
    <div class="post-header">
      <div class="user-info">
        <img class="profile-pic" src="./assets/media/pfp.jpg" alt="User profile picture">
        <h4 class="username">John Doe</h4>
      </div>
      <p class="post-date">${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
    </div>
    <p class="post-content">${postContent}</p>
    ${postImageSrc ? `<img class="post-image" src="${postImageSrc}" alt="Uploaded content">` : ''}
  `;

  return newPostCard;
}

postBtn.addEventListener('click', function(event) {
  event.preventDefault();

  let postImageSrc = null;

  if (imageUpload.files[0]) { // if an image is selected
    const reader = new FileReader();
    // starts the process of reading the first selected file and converting it into a data: URL. Once the reading process is complete, you can access the data: URL through reader.result. in other words, data URL gets assigned to postImageSrc
    reader.readAsDataURL(imageUpload.files[0]);
    // the function that is assigned to reader.onloadend gets called AFTER the reading is done
    reader.onloadend = function() {
      postImageSrc = reader.result; //data url of the uploaded image

      const newPostCard = createPostCard(
        textarea.value,
        postImageSrc
      );  
      // Inserts newPostCard right after postComposer
      postComposer.insertAdjacentElement('afterend', newPostCard); 

      // Clear the textarea and image upload input
      textarea.value = '';
      imageUpload.value = '';
    }
  } else { // if an image is NOT selected
    const newPostCard = createPostCard(
      textarea.value,
      postImageSrc
    );  

    // inserts the new post card into the DOM
    postComposer.insertAdjacentElement('afterend', newPostCard);

    // Clear the textarea
    textarea.value = '';
  }

  // Clear the file name
  document.querySelector('.file-name').innerText = '';
});

const johnDoe = new Subscriber(
  1, // id
  'John Doe', // name
  'johndoe', // userName
  'johndoe@gmail.com', // email
  ['Mr. Bean', 'Netflix'], // pages
  ['Winnipeg Marketplace', 'Alcoholics Anonymous'], // groups
  true // canMonetize
);

headerPfp.addEventListener('click', function() {
  modalContent.textContent = johnDoe.getInfo();
  modal.showModal();
});

closeModal.addEventListener('click', function() {
  modal.close();
});