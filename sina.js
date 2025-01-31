


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
const delayTyping_char = 90; 
const delayErasing_text = 50; 
const delayTyping_text = 1500; 
const delayBeforeErase = 1000; 
let totypeIndex = 0; 
let charIndex = 0;
let isTyping = true; 

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
    let isMuted = false; 
    let hasVisitedAbout = false; 

   
    muteButton.textContent = isMuted ? 'Unmute' : 'Mute';

   
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!hasVisitedAbout) {
                    // Start video with sound on the first visit
                    video.play();
                    video.muted = false;
                    hasVisitedAbout = true; 
                } else {
                    
                    video.play();
                    video.muted = isMuted;
                }
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(aboutSection);

    // Toggle mute/unmute functionality
    function toggleMute() {
        isMuted = !isMuted; 
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
    let animationRunning = false; 
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
                    clearInterval(intervalId); 
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(aboutSection);

    function startAnimation() {
        let currentIndex = 0;

        function animateNextWord() {
            if (!animationRunning) return;

            
            if (currentIndex >= words.length) {
                currentIndex = 0;
            }

            const word = words[currentIndex];
            word.classList.add("animate-charcter");

            
            setTimeout(() => {
                word.classList.remove("animate-charcter");
            }, 700); 

            currentIndex++;

            
            setTimeout(animateNextWord, 500); 
        }

        animateNextWord();

       
        intervalId = setInterval(() => {
            currentIndex = 0;
            animateNextWord();
        }, words.length * 1500); 
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const mobileImage = document.querySelector("#about .mobile-overlay-image");
    const hoverMessage = document.querySelector("#about .mobile-hover-message");

   
    function handleTouchStart() {
        mobileImage.classList.add("touched");
        hoverMessage.classList.add("touched");

        
        setTimeout(() => {
            mobileImage.classList.remove("touched");
            hoverMessage.classList.remove("touched");
        }, 1500); 
    }

  
    if (mobileImage) {
        mobileImage.addEventListener("touchstart", handleTouchStart);
    }
});



    

    
    let currentPhotoIndex = 1;
    const totalPhotos = 9;
    let photoTimer;

    
    function showPhoto(index) {
    const photo = document.getElementById("dronePhoto");
    const caption = document.getElementById("photoCaption");

   
    currentPhotoIndex = ((index - 1 + totalPhotos) % totalPhotos) + 1;

    
    photo.src = `photo/photo${currentPhotoIndex}.jpg`;
    caption.innerText = `Drone Photo ${currentPhotoIndex}`;
}


function prevPhoto() {
    showPhoto(currentPhotoIndex - 1);
    resetTimer();
}


function nextPhoto() {
    showPhoto(currentPhotoIndex + 1);
    resetTimer();
}


function resetTimer() {
    clearInterval(photoTimer);
    photoTimer = setInterval(nextPhoto, 5000); 
}


document.addEventListener("DOMContentLoaded", () => {
    showPhoto(currentPhotoIndex); 
    photoTimer = setInterval(nextPhoto, 5000);
});





document.querySelectorAll('.container .box').forEach((box) => {
    let timeoutId; 

    
    box.addEventListener('touchstart', () => {
        
        document.querySelectorAll('.container .box').forEach((el) => {
            if (el !== box) el.classList.remove('touched');
        });

        
        box.classList.add('touched');

       
        clearTimeout(timeoutId);

        
        timeoutId = setTimeout(() => {
            box.classList.remove('touched');
        }, 5000);
    });

   
    box.addEventListener('touchend', () => {
        if (box.classList.contains('touched')) {
            box.classList.remove('touched');
        }
    });
});

        const showFormButton = document.getElementById('showFormButton');
        const freeLutForm = document.getElementById('freeLutForm');

      
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


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


const emojis = ["😊", "🙃", "😎", "🤩", "🌟", "🫣", "🔥", "😁", "🦋", "🦖", "🐬"];

// Function to save a comment to Firebase
function saveComment(name, commentText) {
  const commentRef = ref(database, "comments");
  const newCommentRef = push(commentRef);
  set(newCommentRef, {
    name: name,
    text: commentText,
    likes: 0,
    replies: [], 
    timestamp: new Date().toISOString()
  });
}

// Function to load comments from Firebase
function loadComments() {
  const commentRef = ref(database, "comments");
  onValue(commentRef, (snapshot) => {
    const comments = snapshot.val();
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

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
  
    
    const removeMenu = () => {
      reactionMenu.remove();
      document.removeEventListener("click", removeMenu);
    };
  
    // Add event listeners for emoji reactions
    reactionMenu.querySelectorAll(".reaction-button").forEach((reactionButton) => {
      reactionButton.addEventListener("click", (e) => {
        const reaction = e.target.textContent; 
        const likeCountElement = likeButton.querySelector(".like-count");
        const newLikes = parseInt(likeCountElement.textContent) + 1;
  
      
        const commentRef = ref(database, `comments/${id}`);
        update(commentRef, { likes: newLikes, emoji: reaction });
  
       
        likeButton.innerHTML = `Like ${reaction} (<span class="like-count">${newLikes}</span>)`;
  
        removeMenu();
      });
    });
  
   
    setTimeout(() => document.addEventListener("click", removeMenu), 0);
  }
  
  


function handleReply(replyButton, commentId, existingReplies) {
  const replySection = replyButton.closest(".comment").querySelector(".reply-section");
  replySection.classList.toggle("hidden");

  const replyInput = replySection.querySelector(".reply-input");
  const replySubmitButton = replySection.querySelector(".btn-reply-submit");

  replySubmitButton.addEventListener("click", () => {
    const replyText = replyInput.value.trim();

    if (replyText) {
      
      const newReplies = [...existingReplies, replyText];
      const commentRef = ref(database, `comments/${commentId}`);
      update(commentRef, { replies: newReplies });

  
      const replyContainer = document.createElement("div");
      replyContainer.className = "comment-reply";
      replyContainer.innerHTML = `<span>${replyText}</span>`;
      replySection.parentNode.querySelector(".replies-container").appendChild(replyContainer);

      replyInput.value = "";
      replySection.classList.add("hidden");
    } else {
      alert("Reply cannot be empty.");
    }
  });
}


function updateCommentCount() {
  const commentCountElement = document.querySelector("#commentCount");
  const commentList = document.querySelectorAll(".comment");
  commentCountElement.textContent = commentList.length;
}


document.querySelector(".comment-form").addEventListener("submit", (e) => {
  e.preventDefault(); 
  const nameInput = document.getElementById("nameInput").value.trim();
  const commentInput = document.getElementById("commentInput").value.trim();

  if (nameInput && commentInput) {
    saveComment(nameInput, commentInput); 
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";
  } else {
    alert("Please enter both name and comment.");
  }
});


document.addEventListener("DOMContentLoaded", loadComments);








document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

   
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        purpose: document.getElementById('purpose').value,
        message: document.getElementById('message').value,
    };

   
    const serviceID = 'service_37cczpk'; 
    const templateID = 'template_3twukxc'; 

  
    emailjs.send(serviceID, templateID, formData)
        .then(function (response) {
            alert('Your message has been sent successfully! | Thanks, we will contact you soon 😊'); 
            document.getElementById('contactForm').reset(); 
        }, function (error) {
            alert('Failed to send your message. Please try again later.'); 
            console.error('EmailJS Error:', error); 
        });
});




// Handle form submission for Free LUTs
document.getElementById('freeLutForm').addEventListener('submit', function (event) {
    event.preventDefault(); 

   
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;

  
    if (!firstName || !lastName || !email) {
        alert('Please fill in all fields.');
        return;
    }

    console.log('Form Data Collected:', { firstName, lastName, email });


    const emailParams = {
        firstName: firstName,
        lastName: lastName,
        email: email,
    };

    console.log('Email Parameters:', emailParams); 

    
    emailjs.send('service_37cczpk', 'template_ytz04uk', emailParams)
        .then(function (response) {
            console.log('Email Sent Successfully:', response.status, response.text);
            alert('Thanks - Enjoy your free LUTs!');

           
            const successMessage = document.getElementById('successMessage');
            const googleDriveLink = document.getElementById('googleDriveLink');

         
            const driveLink = 'https://drive.google.com/drive/folders/1MS-DBZ5gHh2VJp2uMKVYL_nIfsRddeE-?usp=sharing';
            googleDriveLink.href = driveLink; 
            googleDriveLink.target = '_blank'; 
            googleDriveLink.rel = 'noopener noreferrer';

            successMessage.classList.remove('hidden'); 
            successMessage.classList.add('visible');

           
            const form = document.getElementById('freeLutForm');
            form.classList.add('hidden');
            form.classList.remove('visible');

            
            form.reset();
        })
        .catch(function (error) {
            console.error('Failed to Send Email:', error);
            alert('Failed to send your form. Please try again.');
        });
});



document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.getElementById("preloader");

    
    setTimeout(() => {
        preloader.style.opacity = "0"; 
        preloader.style.transition = "opacity 0.5s ease";

       
        setTimeout(() => {
            preloader.style.display = "none";
        }, 500); 
    }, 3000); 
});










