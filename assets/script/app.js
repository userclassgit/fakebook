import * as utils from './utils.js';
import { User, Subscriber } from './User.js';

'use strict';

const headerPfp = document.querySelector('.pfp-div');
const modal = document.querySelector('#modal');
const closeModal = document.querySelector('#close-modal');
const modalContent = document.querySelector('#modal-content');


const postComposer = document.querySelector('.post-composer');
const textarea = document.querySelector('.post-composer textarea');
const composerActions = document.querySelector('.composer-actions');
const uploadBtn = document.querySelector('.upload-btn');
const imageUpload = document.querySelector('.image-upload');

const postBtn = document.querySelector('.post-btn');
const postCard = document.querySelector('.post-card');
const postHeader = document.querySelector('.post-header');
const userInfo = document.querySelector('.user-info');
const profilePic = document.querySelector('.profile-pic');
const username = document.querySelector('.username');
const postDate = document.querySelector('.post-date');
const postContent = document.querySelector('.post-content');
const postImage = document.querySelector('.post-image');

uploadBtn.addEventListener('click', function(event) {
  event.preventDefault();
  imageUpload.click();
});

function createPostCard(userName, postDate, postContent, postImageSrc) {
  // Create new post card
  const newPostCard = document.createElement('div');
  newPostCard.className = 'post-card';
  newPostCard.innerHTML = `
    <div class="post-header">
      <div class="user-info">
        <img class="profile-pic" src="./assets/media/pfp.jpg" alt="User profile picture">
        <h4 class="username">${userName}</h4>
      </div>
      <p class="post-date">${postDate}</p>
    </div>
    <p class="post-content">${postContent}</p>
    ${postImageSrc ? `<img class="post-image" src="${postImageSrc}" alt="Uploaded content">` : ''}
  `;

  return newPostCard;
}

postBtn.addEventListener('click', function(event) {
  event.preventDefault();

  let postImageSrc = null;

  if (imageUpload.files[0]) {
    const reader = new FileReader();
    reader.onloadend = function() {
      postImageSrc = reader.result;

      const newPostCard = createPostCard(
        'John Doe',
        new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        textarea.value,
        postImageSrc
      );  

      // Insert the new post card into the DOM
      postComposer.insertAdjacentElement('afterend', newPostCard);

      // Clear the textarea and image upload input
      textarea.value = '';
      imageUpload.value = '';
    }
    reader.readAsDataURL(imageUpload.files[0]);
  } else {
    const newPostCard = createPostCard(
      'John Doe',
      new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      textarea.value,
      postImageSrc
    );  

    // Insert the new post card into the DOM
    postComposer.insertAdjacentElement('afterend', newPostCard);

    // Clear the textarea
    textarea.value = '';
  }
});

const johnDoe = new Subscriber(
  1, // id
  'John Doe', // name
  'johndoe', // userName
  'johndoe@gmail.com', // email
  ['Mr. Bean', 'Netflix'], // pages
  ['Winnipeg Market', 'Alcoholics Anonymous'], // groups
  true // canMonetize
);

headerPfp.addEventListener('click', function() {
  modalContent.textContent = johnDoe.getInfo();
  modal.showModal();
});

closeModal.addEventListener('click', function() {
  modal.close();
});