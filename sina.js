// Existing JavaScript Code

function toggleMenu() {
    var mobileNav = document.getElementById('mobileNav');
    var hamburgerMenu = document.querySelector('.hamburger-menu');
    var mobileOverlay = document.getElementById('mobileOverlay');

    // Toggle the 'show' class for mobile navigation and overlay
    mobileNav.classList.toggle('show');
    mobileOverlay.classList.toggle('show');

    // Toggle the 'hide' class for the hamburger menu
    hamburgerMenu.classList.toggle('hide');
}

const typedSpan = document.getElementById("typed");
const cursorSpan = document.createElement("span");
cursorSpan.classList.add("cursor");
cursorSpan.textContent = "|";
typedSpan.parentNode.appendChild(cursorSpan);

const totype = ["Full Stack Developer", "Drone pilot", "Photographer"];
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

window.onload = function () {
    setTimeout(typeText, delayTyping_text);
};



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

const emojis = ["😊", "🙃", "😎", "🤩", "🌟", "🫣", "🔥", "😁", "🦋", "🦖", "🐬"]; // Random emojis for user avatars

let isAdmin = false; // Variable to track admin mode

// Function to update the comment count
function updateCommentCount() {
    const commentCountElement = document.querySelector('.comments-header span');
    const commentList = document.querySelectorAll('.comment');
    const count = commentList.length;
    commentCountElement.textContent = count; // Update the count display
}

// Function to add a comment
function addComment(name, commentText) {
    if (!name.trim() || !commentText.trim()) {
        alert('Name and comment cannot be empty.');
        return;
    }

    const commentList = document.querySelector('.comment-list');
    const comment = document.createElement('div');
    comment.className = 'comment';

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    comment.innerHTML = `
        <div class="emoji">${randomEmoji}</div>
        <div class="comment-body">
            <div class="comment-header">
                <span class="username">${name}</span>
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                <button class="delete-btn hidden">Delete</button>
            </div>
            <div class="comment-text">${commentText}</div>
            <div class="comment-actions">
                <span class="like-btn">Like <span class="reaction"></span></span>
                <span class="reply-btn">Reply</span>
            </div>
            <div class="reply-section hidden">
                <textarea class="reply-input" placeholder="Write your reply here..."></textarea>
                <button class="btn-reply-submit">Submit</button>
            </div>
        </div>
    `;

    // Append the new comment to the list
    commentList.appendChild(comment);

    // Clear the form inputs
    document.getElementById('nameInput').value = '';
    document.getElementById('commentInput').value = '';

    // Update the comment count
    updateCommentCount();

    // Add event listeners for like, reply, and delete functionality
    addCommentListeners(comment);
}

// Function to handle "Like" functionality
function handleLike(button) {
    const reactionMenu = document.createElement('div');
    reactionMenu.className = 'reaction-menu';
    reactionMenu.innerHTML = `
        <button class="reaction-button">👍</button>
        <button class="reaction-button">❤️</button>
        <button class="reaction-button">😂</button>
        <button class="reaction-button">🔥</button>
        <button class="reaction-button">😮</button>
    `;

    // Position the reaction menu near the button
    const rect = button.getBoundingClientRect();
    reactionMenu.style.top = `${rect.top + window.scrollY - 50}px`;
    reactionMenu.style.left = `${rect.left + window.scrollX}px`;

    // Append the reaction menu to the document
    document.body.appendChild(reactionMenu);

    // Remove the menu when a reaction is clicked or on outside click
    const removeMenu = () => {
        reactionMenu.remove();
        document.removeEventListener('click', removeMenu);
    };

    // Add event listeners for reactions
    reactionMenu.querySelectorAll('.reaction-button').forEach((reactionButton) => {
        reactionButton.addEventListener('click', (e) => {
            const reaction = e.target.textContent;
            button.querySelector('.reaction').textContent = reaction;
            removeMenu();
        });
    });

    // Close menu on outside click
    setTimeout(() => document.addEventListener('click', removeMenu), 0);
}

// Function to handle "Reply" functionality
function handleReply(button) {
    const replySection = button.closest('.comment').querySelector('.reply-section');
    replySection.classList.toggle('hidden'); // Toggle visibility of the reply section

    const replyButton = replySection.querySelector('.btn-reply-submit');

    replyButton.addEventListener('click', () => {
        const replyInput = replySection.querySelector('.reply-input');
        const replyText = replyInput.value.trim();

        if (replyText) {
            const replyContainer = document.createElement('div');
            replyContainer.className = 'comment-reply';
            replyContainer.innerHTML = `
                <span>${replyText}</span>
                <button class="delete-reply-btn hidden">Delete</button>
            `;
            replySection.parentNode.appendChild(replyContainer);
            replyInput.value = ''; // Clear the input field

            // Add delete functionality for replies
            const deleteReplyBtn = replyContainer.querySelector('.delete-reply-btn');
            deleteReplyBtn.addEventListener('click', () => {
                replyContainer.remove();
            });

            toggleAdminMode(); // Ensure "Delete" buttons are updated for admin
            replySection.classList.add('hidden'); // Hide the reply section after submitting
        } else {
            alert('Reply cannot be empty.');
        }
    });
}

// Function to handle "Delete" functionality
function handleDelete(button) {
    const comment = button.closest('.comment');
    comment.remove();
    updateCommentCount();
}

// Add event listeners for Like, Reply, and Delete on new comments
function addCommentListeners(comment) {
    const likeButton = comment.querySelector('.like-btn');
    const replyButton = comment.querySelector('.reply-btn');
    const deleteButton = comment.querySelector('.delete-btn');

    likeButton.addEventListener('click', () => handleLike(likeButton));
    replyButton.addEventListener('click', () => handleReply(replyButton));
    deleteButton.addEventListener('click', () => handleDelete(deleteButton));
}

// Function to toggle admin mode
function toggleAdminMode() {
    isAdmin = !isAdmin;

    const deleteButtons = document.querySelectorAll('.delete-btn, .delete-reply-btn');
    deleteButtons.forEach((button) => {
        if (isAdmin) {
            button.classList.remove('hidden');
        } else {
            button.classList.add('hidden');
        }
    });

    const adminModeButton = document.querySelector('.admin-mode-btn');
    adminModeButton.textContent = isAdmin ? 'Disable Admin Mode' : 'Enable Admin Mode';
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    updateCommentCount();

    // Add an event listener to handle adding comments
    document.querySelector('.comment-form').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form submission and page reload
        const nameInput = document.getElementById('nameInput').value;
        const commentInput = document.getElementById('commentInput').value;
        addComment(nameInput, commentInput);
    });

    // Add an event listener to toggle admin mode
    document.querySelector('.admin-mode-btn').addEventListener('click', toggleAdminMode);
});
