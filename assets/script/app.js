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
  imageUpload.click(); //this opens the file picker dialogue so u can select an image
});

listen('change', imageUpload, function() {
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

listen('click', postBtn, function(event) {
  event.preventDefault();

  if (textarea.value.trim() === '' && !imageUpload.files[0]) {
    // if the user doesn't type anything and doesn't select an image. don't post anything
    return;
  }

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
  } else { // If an image is NOT selected
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
  select('.file-name').innerText = '';
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