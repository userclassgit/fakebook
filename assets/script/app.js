import { select, listen } from './utils.js';
import { User, Subscriber } from './User.js';

'use strict';

const headerPfp = select('.pfp-div');

const modal = select('.modal');
const closeModal = select('.close-modal');
const modalContent = select('.modal-content');

const postComposer = select('.post-composer');
const textarea = select('.post-composer textarea');
const uploadBtn = select('.upload-btn');
const imageUpload = select('.image-upload');
const fileName = select('.file-name');
const postBtn = select('.post-btn');

listen('click', uploadBtn, function(event) {
  event.preventDefault();
  imageUpload.click(); //This opens the file picker dialogue so u can select an image
});

listen('change', imageUpload, function() {
  // A 'change' event occurs when you select a file from the file picker dialog
  if (this.files && this.files[0]) { //checks if at least 1 file has been selected
    // Set its text to the file name
    fileName.textContent = this.files[0].name;// Sets the span next to uploadBtn to the file name
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

// Function to handle image upload
function handleImageUpload() {
  const reader = new FileReader();
  // Starts the process of reading the first selected file and converting it into a data: URL. Once the reading process is complete, you can access the data: URL through reader.result or postImageSrc
  reader.readAsDataURL(imageUpload.files[0]);
  // The function that is assigned to reader.onloadend gets called AFTER the reading is done
  reader.onloadend = function() {
    const postImageSrc = reader.result; //Data url of the uploaded image
    createAndInsertPost(textarea.value, postImageSrc);
    clearInputs();
  }
}

// Function to handle post with text but without image
function handlePostWithoutImage() {
  createAndInsertPost(textarea.value, null);
  clearInputs();
}

// Function to create and insert a new post card
function createAndInsertPost(content, imageSrc) {
  const newPostCard = createPostCard(content, imageSrc);
  // Inserts newPostCard right after postComposer
  postComposer.insertAdjacentElement('afterend', newPostCard);
}

// Function to clear inputs
function clearInputs() {
  // Clear the textarea and image upload input
  textarea.value = '';
  imageUpload.value = '';
  // Clear the file name
  select('.file-name').innerText = '';
}

listen('click', postBtn, function(event) {
  event.preventDefault();

  // If the user doesn't type anything AND doesn't select an image. don't post anything
  if (textarea.value.trim() === '' && !imageUpload.files[0]) {
    return;
  }

  if (imageUpload.files[0]) { // If an image is selected
    handleImageUpload();
  } else { // If an image is NOT selected. i.e., there's only text and no image.
    handlePostWithoutImage();
  }
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

listen('click', headerPfp, function() {
  modalContent.textContent = johnDoe.getInfo();
  modal.showModal();
});

listen('click', closeModal, function() {
  modal.close();
});