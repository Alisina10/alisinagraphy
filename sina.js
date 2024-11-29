

// Existing JavaScript Code

// Mobile Menu Toggle Functionality
function toggleMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.getElementById('mobileOverlay');

    const isMenuOpen = mobileNav.classList.contains('show');

    if (isMenuOpen) {
        mobileNav.classList.remove('show');
        mobileOverlay.classList.remove('show');
        hamburgerMenu.classList.remove('hide');
    } else {
        mobileNav.classList.add('show');
        mobileOverlay.classList.add('show');
        hamburgerMenu.classList.add('hide');
    }
}

// Typing Animation
const typedSpan = document.getElementById("typed");
const cursorSpan = document.createElement("span");
cursorSpan.classList.add("cursor");
cursorSpan.textContent = "|";
typedSpan.parentNode.appendChild(cursorSpan);

const totype = ["Full Stack Developer", "Drone Pilot", "Photographer"];
const delayTyping_char = 90; // Delay between typing each character
const delayErasing_text = 50; // Delay between erasing each character
const delayTyping_text = 1500; // Delay before starting to type the next text
const delayBeforeErase = 1000; // Delay before erasing text
let totypeIndex = 0; // Index of the text in the array
let charIndex = 0; // Index of the character being typed
let isTyping = true; // Flag to track if typing is happening

function typeText() {
    if (charIndex < totype[totypeIndex].length) {
        typedSpan.textContent += totype[totypeIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, delayTyping_char);
    } else {
        isTyping = false;
        cursorSpan.classList.add("blinking");
        setTimeout(eraseText, delayBeforeErase);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typedSpan.textContent = totype[totypeIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, delayErasing_text);
    } else {
        totypeIndex++;
        if (totypeIndex >= totype.length) totypeIndex = 0;
        cursorSpan.classList.remove("blinking");
        setTimeout(typeText, delayTyping_text);
    }
}

// Initialize the typing animation on page load
window.onload = function () {
    setTimeout(typeText, delayTyping_text);
};

// Attach toggleMenu to the relevant elements
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNavLinks = document.querySelectorAll('#mobileNav a');

    hamburgerMenu.addEventListener('click', toggleMenu);
    mobileOverlay.addEventListener('click', toggleMenu);
    closeBtn.addEventListener('click', toggleMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
});




// mute button about secioioin of video 

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const muteButton = document.querySelector('.mute-button');
    const aboutSection = document.getElementById('about');
    let isMuted = false; // Start with sound enabled
    let hasVisitedAbout = false; // Track if "About" section was previously visited

    // Update mute button text based on initial mute state
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';

    // Intersection observer to control video playback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hasVisitedAbout) {
                    // Start video with sound on the first visit
                    video.play();
                    video.muted = false;
                    hasVisitedAbout = true; // Mark "About" as visited
                } else {
                    // Subsequent visits: play video based on the mute state
                    video.play();
                    video.muted = isMuted;
                }
            } else {
                video.pause(); // Pause when leaving the section
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);

    // Toggle mute/unmute functionality
    function toggleMute() {
        isMuted = !isMuted; // Update mute state
        video.muted = isMuted;
        muteButton.textContent = isMuted ? 'Unmute' : 'Mute';
    }
    muteButton.addEventListener('click', toggleMute);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest'
        });
    });
});



// JavaScript to enable touch-triggered animations

document.addEventListener("DOMContentLoaded", function () {
    const aboutSection = document.getElementById("about");
    const words = Array.from(document.querySelectorAll("#about .mobile-about-content p span"));
    let animationRunning = false; // Track if animation is currently running
    let intervalId;

    // Observer to start and stop the animation based on About section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if (!animationRunning) {
                    animationRunning = true;
                    startAnimation();
                }
            } else {
                if (animationRunning) {
                    animationRunning = false;
                    clearInterval(intervalId); // Stop animation when out of view
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    function startAnimation() {
        let currentIndex = 0;

        function animateNextWord() {
            if (!animationRunning) return; // Stop if no longer in view

            // Reset to start if at the end of words array
            if (currentIndex >= words.length) {
                currentIndex = 0;
            }

            const word = words[currentIndex];
            word.classList.add("animate-charcter");

            // Remove the class after animation completes to enable restart
            setTimeout(() => {
                word.classList.remove("animate-charcter");
            }, 700); // Animation duration of 0.7s

            currentIndex++;

            // Start the next word slightly before the previous ends for smooth flow
            setTimeout(animateNextWord, 500); // Delay of 0.5s between words
        }

        animateNextWord();

        // Loop the entire animation every 15 seconds (adjust based on speed)
        intervalId = setInterval(() => {
            currentIndex = 0;
            animateNextWord();
        }, words.length * 1500); // 15-second loop duration
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const mobileImage = document.querySelector("#about .mobile-overlay-image");
    const hoverMessage = document.querySelector("#about .mobile-hover-message");

    // Function to add the 'touched' class on touchstart and remove it after a delay
    function handleTouchStart() {
        mobileImage.classList.add("touched");
        hoverMessage.classList.add("touched");

        // Remove the 'touched' class after a timeout to reset
        setTimeout(() => {
            mobileImage.classList.remove("touched");
            hoverMessage.classList.remove("touched");
        }, 1500); // Duration in ms to keep the class active
    }

    // Add touch event listener for the image
    if (mobileImage) {
        mobileImage.addEventListener("touchstart", handleTouchStart);
    }
});



    // JavaScript for photo gallery navigation

    
    let currentPhotoIndex = 1;
    const totalPhotos = 9;
    let photoTimer;

    // Function to show the current photo
    function showPhoto(index) {
    const photo = document.getElementById("dronePhoto");
    const caption = document.getElementById("photoCaption");

    // Ensure index wraps around from 1 to 9
    currentPhotoIndex = ((index - 1 + totalPhotos) % totalPhotos) + 1;

    // Update photo and caption with the correct folder path
    photo.src = `photo/photo${currentPhotoIndex}.jpg`;
    caption.innerText = `Drone Photo ${currentPhotoIndex}`;
}

// Function to go to the previous photo
function prevPhoto() {
    showPhoto(currentPhotoIndex - 1);
    resetTimer();
}

// Function to go to the next photo
function nextPhoto() {
    showPhoto(currentPhotoIndex + 1);
    resetTimer();
}

// Function to reset and restart the slideshow timer
function resetTimer() {
    clearInterval(photoTimer);
    photoTimer = setInterval(nextPhoto, 5000); // Change photo every 5 seconds
}

// Start the slideshow on page load
document.addEventListener("DOMContentLoaded", () => {
    showPhoto(currentPhotoIndex); // Show the first photo immediately
    photoTimer = setInterval(nextPhoto, 5000); // Auto-advance every 5 seconds
});



// photography section 

document.querySelectorAll('.container .box').forEach((box) => {
    let timeoutId; // Store timeout ID for resetting

    // Handle touchstart (trigger animation)
    box.addEventListener('touchstart', () => {
        // Remove 'touched' class from all other boxes
        document.querySelectorAll('.container .box').forEach((el) => {
            if (el !== box) el.classList.remove('touched');
        });

        // Add 'touched' class to the current box
        box.classList.add('touched');

        // Clear any existing timeout for this box
        clearTimeout(timeoutId);

        // Set a timeout to remove the 'touched' class after 5 seconds
        timeoutId = setTimeout(() => {
            box.classList.remove('touched');
        }, 5000);
    });

    // Handle touchend (reset animation when retouched)
    box.addEventListener('touchend', () => {
        if (box.classList.contains('touched')) {
            box.classList.remove('touched');
        }
    });
});

        // Form submission handler
        const showFormButton = document.getElementById('showFormButton');
        const freeLutForm = document.getElementById('freeLutForm');

        // Add a click event listener to toggle the form's visibility
        showFormButton.addEventListener('click', function () {
        if (freeLutForm.classList.contains('hidden')) {
            freeLutForm.classList.remove('hidden');
            freeLutForm.classList.add('visible');
        } else {
            freeLutForm.classList.remove('visible');
            freeLutForm.classList.add('hidden');
        }
        });


        // Enable touch functionality
document.addEventListener('DOMContentLoaded', function () {
    const shopCards = document.querySelectorAll('.shop-card');
    const buttons = document.querySelectorAll('.btn-action');
    const titles = document.querySelectorAll('.shop-card h3');

    // Add touch listeners to all elements with hover effects
    function addTouchEffect(elements) {
        elements.forEach((element) => {
            element.addEventListener('touchstart', () => {
                element.classList.add('active');
            });

            element.addEventListener('touchend', () => {
                element.classList.remove('active');
            });
        });
    }

    addTouchEffect(shopCards);
    addTouchEffect(buttons);
    addTouchEffect(titles);

    // Ensure compatibility between touch and hover effects
    shopCards.forEach((card) => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hover');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hover');
        });
    });
});





// comment section 

// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, push, set, update, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJAZZsIbm058wRKnp_dZ82-UlqP1X6S_w",
  authDomain: "alisina-35079.firebaseapp.com",
  databaseURL: "https://alisina-35079-default-rtdb.firebaseio.com",
  projectId: "alisina-35079",
  storageBucket: "alisina-35079.firebasestorage.app",
  messagingSenderId: "596533705981",
  appId: "1:596533705981:web:f8ce4bc5eecb986e721294",
  measurementId: "G-4MLC61H6H6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Emoji list for avatars
const emojis = ["😊", "🙃", "😎", "🤩", "🌟", "🫣", "🔥", "😁", "🦋", "🦖", "🐬"];

// Function to save a comment to Firebase
function saveComment(name, commentText) {
  const commentRef = ref(database, "comments");
  const newCommentRef = push(commentRef);
  set(newCommentRef, {
    name: name,
    text: commentText,
    likes: 0, // Start with zero likes
    replies: [], // Start with an empty replies array
    timestamp: new Date().toISOString()
  });
}

// Function to load comments from Firebase
function loadComments() {
  const commentRef = ref(database, "comments");
  onValue(commentRef, (snapshot) => {
    const comments = snapshot.val();
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = ""; // Clear existing comments

    for (const id in comments) {
      const comment = comments[id];
      const commentElement = createCommentElement(
        id,
        comment.name,
        comment.text,
        comment.likes,
        comment.replies || [],
        comment.timestamp
      );
      commentList.appendChild(commentElement);
    }
    updateCommentCount();
  });
}

// Function to create a comment element
function createCommentElement(id, name, text, likes, replies, timestamp) {
  const comment = document.createElement("div");
  comment.className = "comment";

  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  const formattedTimestamp = `${new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })}, ${new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

  comment.innerHTML = `
    <div class="emoji">${randomEmoji}</div>
    <div class="comment-body">
      <div class="comment-header">
        <span class="username">${name}</span>
        <span class="timestamp">${formattedTimestamp}</span>
      </div>
      <div class="comment-text">${text}</div>
      <div class="comment-actions">
        <span class="like-btn" data-id="${id}">Like (<span class="like-count">${likes}</span>)</span>
        <span class="reply-btn" data-id="${id}">Reply</span>
      </div>
      <div class="reply-section hidden">
        <textarea class="reply-input" placeholder="Write your reply here..."></textarea>
        <button class="btn-reply-submit" data-id="${id}">Submit</button>
      </div>
      <div class="replies-container">
        ${replies
          .map((reply) => `<div class="comment-reply"><span>${reply}</span></div>`)
          .join("")}
      </div>
    </div>
  `;

  addCommentListeners(comment, id, replies);
  return comment;
}

// Add listeners for like and reply buttons
function addCommentListeners(comment, id, replies) {
  const likeButton = comment.querySelector(".like-btn");
  const replyButton = comment.querySelector(".reply-btn");

  likeButton.addEventListener("click", () => handleLike(id, likeButton));
  replyButton.addEventListener("click", () => handleReply(replyButton, id, replies));
}

// Handle like button functionality
function handleLike(id, likeButton) {
    const reactionMenu = document.createElement("div");
    reactionMenu.className = "reaction-menu";
    reactionMenu.innerHTML = `
        <button class="reaction-button">👍</button>
        <button class="reaction-button">❤️</button>
        <button class="reaction-button">😂</button>
        <button class="reaction-button">🔥</button>
        <button class="reaction-button">😮</button>
    `;
  
    // Position the reaction menu
    const rect = likeButton.getBoundingClientRect();
    reactionMenu.style.top = `${rect.top + window.scrollY - 50}px`;
    reactionMenu.style.left = `${rect.left + window.scrollX}px`;
    document.body.appendChild(reactionMenu);
  
    // Remove menu after emoji is selected or on outside click
    const removeMenu = () => {
      reactionMenu.remove();
      document.removeEventListener("click", removeMenu);
    };
  
    // Add event listeners for emoji reactions
    reactionMenu.querySelectorAll(".reaction-button").forEach((reactionButton) => {
      reactionButton.addEventListener("click", (e) => {
        const reaction = e.target.textContent; // Selected emoji
        const likeCountElement = likeButton.querySelector(".like-count");
        const newLikes = parseInt(likeCountElement.textContent) + 1;
  
        // Update likes and emoji in Firebase
        const commentRef = ref(database, `comments/${id}`);
        update(commentRef, { likes: newLikes, emoji: reaction });
  
        // Update likes count and emoji in UI
        likeButton.innerHTML = `Like ${reaction} (<span class="like-count">${newLikes}</span>)`;
  
        removeMenu();
      });
    });
  
    // Close the menu on outside click
    setTimeout(() => document.addEventListener("click", removeMenu), 0);
  }
  
  

// Handle reply button functionality
function handleReply(replyButton, commentId, existingReplies) {
  const replySection = replyButton.closest(".comment").querySelector(".reply-section");
  replySection.classList.toggle("hidden");

  const replyInput = replySection.querySelector(".reply-input");
  const replySubmitButton = replySection.querySelector(".btn-reply-submit");

  replySubmitButton.addEventListener("click", () => {
    const replyText = replyInput.value.trim();

    if (replyText) {
      // Save reply in Firebase
      const newReplies = [...existingReplies, replyText];
      const commentRef = ref(database, `comments/${commentId}`);
      update(commentRef, { replies: newReplies });

      // Add reply to the UI
      const replyContainer = document.createElement("div");
      replyContainer.className = "comment-reply";
      replyContainer.innerHTML = `<span>${replyText}</span>`;
      replySection.parentNode.querySelector(".replies-container").appendChild(replyContainer);

      replyInput.value = ""; // Clear the input field
      replySection.classList.add("hidden"); // Hide the reply section
    } else {
      alert("Reply cannot be empty.");
    }
  });
}

// Update comment count
function updateCommentCount() {
  const commentCountElement = document.querySelector("#commentCount");
  const commentList = document.querySelectorAll(".comment");
  commentCountElement.textContent = commentList.length;
}

// Add event listener for comment form submission
document.querySelector(".comment-form").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from refreshing the page
  const nameInput = document.getElementById("nameInput").value.trim();
  const commentInput = document.getElementById("commentInput").value.trim();

  if (nameInput && commentInput) {
    saveComment(nameInput, commentInput); // Save the comment to Firebase
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";
  } else {
    alert("Please enter both name and comment.");
  }
});

// Load comments on page load
document.addEventListener("DOMContentLoaded", loadComments);







// form section 
// Handle form submission
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const formData = {
        name: document.getElementById('fullName').value, // Updated to match HTML ID
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        purpose: document.getElementById('purpose').value,
        message: document.getElementById('message').value,
    };

    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with actual IDs
    const serviceID = 'service_37cczpk'; // Your EmailJS Service ID
    const templateID = 'template_3twukxc'; // Your EmailJS Template ID

    // Send email
    emailjs.send(serviceID, templateID, formData)
        .then(function (response) {
            alert('Your message has been sent successfully! | Thanks, we will contact you soon 😊'); // Success alert
            document.getElementById('contactForm').reset(); // Reset the form
        }, function (error) {
            alert('Failed to send your message. Please try again later.'); // Error alert
            console.error('EmailJS Error:', error); // Debugging error details
        });
});




// Handle form submission for Free LUTs
document.getElementById('freeLutForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

    // Validate fields
    if (!firstName || !lastName || !email) {
        alert('Please fill in all fields.');
        return;
    }

    // Log collected data for debugging
    console.log('Form Data Collected:', { firstName, lastName, email });

    // Prepare email parameters
    const emailParams = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    };

    console.log('Email Parameters:', emailParams); // Debugging

    // Send email using EmailJS
    emailjs.send('service_37cczpk', 'template_ytz04uk', emailParams)
        .then(function (response) {
            console.log('Email Sent Successfully:', response.status, response.text);
            alert('Thanks - Enjoy your free LUTs!');

            // Show success message with Google Drive link
            const successMessage = document.getElementById('successMessage');
            const googleDriveLink = document.getElementById('googleDriveLink');

            // Set the Google Drive link dynamically
            const driveLink = 'https://drive.google.com/drive/folders/1MS-DBZ5gHh2VJp2uMKVYL_nIfsRddeE-?usp=sharing';
            googleDriveLink.href = driveLink; // Set href
            googleDriveLink.target = '_blank'; // Open in a new tab
            googleDriveLink.rel = 'noopener noreferrer'; // Security enhancement

            successMessage.classList.remove('hidden'); // Show success message
            successMessage.classList.add('visible');

            // Hide the form
            const form = document.getElementById('freeLutForm');
            form.classList.add('hidden');
            form.classList.remove('visible');

            // Reset the form
            form.reset();
        })
        .catch(function (error) {
            console.error('Failed to Send Email:', error);
            alert('Failed to send your form. Please try again.');
        });
});


// Loading 
/ Loading 
document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");

    // Simulate loading completion after 3 seconds
    setTimeout(() => {
        preloader.style.opacity = "0"; // Fade out the preloader
        preloader.style.transition = "opacity 0.5s ease";

        // Remove it from the DOM after the transition
        setTimeout(() => {
            preloader.style.display = "none";
        }, 2000); // Match the fade-out duration
    }, 5000); // Adjust timeout as needed
});










