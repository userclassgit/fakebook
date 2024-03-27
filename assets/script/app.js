import * as utils from './utils.js';
'use strict';

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

// postBtn.addEventListener('click', function() {
//   event.preventDefault();
//   postCard.style.display = 'block';
// });

uploadBtn.addEventListener('click', function(event) {
  event.preventDefault();
  imageUpload.click();
});

postBtn.addEventListener('click', function(event) {
  event.preventDefault();

  const reader = new FileReader();
  reader.onloadend = function() {
    newPostImage.src = reader.result;
  }
  if (imageUpload.files[0]) {
    reader.readAsDataURL(imageUpload.files[0]);
  }

  // Create new post card elements
  const newPostCard = document.createElement('div');
  const newPostHeader = document.createElement('div');
  const newUserInfo = document.createElement('div');
  const newProfilePic = document.createElement('img');
  const newUsername = document.createElement('h4');
  const newPostDate = document.createElement('p');
  const newPostContent = document.createElement('p');
  const newPostImage = document.createElement('img');

  // Set attributes and content
  newPostCard.className = 'post-card';
  newPostHeader.className = 'post-header';
  newUserInfo.className = 'user-info';
  newProfilePic.className = 'profile-pic';
  newProfilePic.src = 'profile.jpg';
  newProfilePic.alt = 'User profile picture';
  newUsername.className = 'username';
  newUsername.textContent = 'User Name';
  newPostDate.className = 'post-date';
  newPostDate.textContent = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  newPostContent.className = 'post-content';
  newPostContent.textContent = textarea.value;
  newPostImage.className = 'post-image';
  newPostImage.src = 'uploaded-image.jpg';
  newPostImage.alt = 'Uploaded content';

  // Build the post card
  newUserInfo.append(newProfilePic, newUsername);
  newPostHeader.append(newUserInfo, newPostDate);
  newPostCard.append(newPostHeader, newPostContent, newPostImage);

  // Insert the new post card into the DOM
  postComposer.insertAdjacentElement('afterend', newPostCard);

  // Clear the textarea and image upload input
  textarea.value = '';
  imageUpload.value = '';
});