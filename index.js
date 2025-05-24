console.log("🔥 JS file is running!");

const cards = [
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-6.png",
    text: "Val Thorens",
    name: "image of a Val Thorens",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-1.png",
    text: "Restaurant terrace",
    name: "image of a Restaurant",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-2.png",
    text: "An outdoor cafe",
    name: "love icon",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-3.png",
    text: "A very long bridge, over the forest...",
    name: "image of a bridge",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-4.png",
    text: "Tunnel with morning light",
    name: "image of a Tunnel",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-5.png",
    text: "Mountain house",
    name: "image of a Mountain",
  },
];

// Get DOM elements
const editBtn = document.querySelector("#profile__edit-btn");
const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".modal__close");
const cancelBtn = document.querySelector(".modal__cancel-btn");
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");
const cardsContainer = document.querySelector(".cards");

// Get current profile data
const currentName = document.querySelector(".profile__name").textContent;
const currentBio = document.querySelector(".profile__bio").textContent;
const currentImage = document.querySelector(".profile__avatar-image");

// Open modal (add focus management)
editBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Edit Profile");
  // Populate form with current data
  profileName.focus();
  profileName.value = currentName;
  profileBio.value = currentBio;
});

// Close modal functions (return foucs)
function closeModal() {
  modal.style.display = "none";
  editBtn.focus();
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Handle form submission
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Update profile information
  document.querySelector(".profile__name").textContent = profileName.value;
  document.querySelector(".profile__bio").textContent = profileBio.value;

  // Handle image upload
  const file = profileImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  closeModal();
});
// DisplayCard function: add accessibility to icons
function displayCard(cards) {
  cardsContainer.innerHTML = ``;
  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardsItem = document.createElement("div");
      cardsItem.classList.add("card");
      cardsItem.innerHTML = `
                <img class="card__image" src="${card.image} "alt="${card.name}"/>
                <div class="card__content">
                    <p class="card__text">${card.text}</p>
                    <div class="card__icon-container">
                        <svg class="card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> </div>
                </div>
            `;
      cardsContainer.append(cardsItem);
    });
  }
}
displayCard(cards);


// after rendering cards, add keyboard and ARIA support
function functionalLikeButton () {
    document.querySelectorAll('.card__icon').forEach(icon => {
      icon.addEventListener('click', function (e) {
        e.stopPropagation(); // Prevent card click event from firing
        this.classList.toggle('card__icon--active');
        
        // toggle aria-pressed
        this.setAttribute('aria-pressed', this.classList.contains('card__icon--active'));
        this.classList.add('card__icon--animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          this.classList.remove('card__icon--animate');
        }, 300);
      });
    });
}

functionalLikeButton();



//Cards Modal
// const cardElements = document.querySelectorAll(".card");

const closeImgBtn = document.querySelector(
  ".imgModal .imageModal__content .modal__close"
);

function setupCardPreviewModalListeners() {
    //Cards Modal
    const cardElements = document.querySelectorAll(".card");
    
    // Get card Modal Element
    const modalImg = document.getElementById("modalImg");
    const modalText = document.querySelector(".modal__text p");
    const modalTextImg = document.querySelector(".modal__text img");
    const imageModal = document.getElementById("imageModal");

    
    //mapping through cards
    cardElements.forEach((card) => {
      // Getting each card properties
      const cardImg = card.querySelector("img");
      const cardText = card.querySelector(".card__text").textContent;
      const cardTextImg = card.querySelector(".card__icon");
    
      cardImg.addEventListener("click", () => {
        imageModal.style.display = "block";
        //checking
        if (cardImg && cardText) {
          modalImg.src = cardImg.src;
          modalText.textContent = cardText;
          modalTextImg.src = cardTextImg.src;
          modalTextImg.alt = cardTextImg.alt;
        }
      });
    });
}

setupCardPreviewModalListeners()



// Close cardModal
function closeCardModal() {
  imageModal.style.display = "none";
}
closeImgBtn.addEventListener("click", closeCardModal);
// Close cardModal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeCardModal();
  }
});
// The “New Post” button should have the functionality to post new image, including the title and heart icon using the modal and should be within size fixed for desktop and mobile too.
// New Post functionality
// Modal elements
const newPostBtn = document.getElementById("profile__newpost-btn");
const newPostModal = document.getElementById("newPostModal");
const newPostClose = document.querySelector(".new-post-close");
const uploadClick = document.getElementById("click-upload");
const newPostForm = document.getElementById("newPostForm");
const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("postImage");
const preview = document.getElementById("imagePreview");
const titleInput = document.getElementById("postTitle");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const postBtn = document.getElementById("postBtn");
const postCnclBtn = document.querySelector(".cancel-btn");
const cardContainer = document.getElementById("cardContainer");
const titleHelp = document.getElementById("titleHelp");

let isFavorite = true;

// Open/close modal
newPostBtn.addEventListener("click", () => newPostModal.showModal());
newPostClose.addEventListener("click", () => newPostModal.close());
postCnclBtn.addEventListener("click", () => newPostModal.close());

// File upload
uploadClick.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  fileInput.click();
});

dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("highlight");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("highlight");
});

dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropZone.classList.remove("highlight");
  const file = e.dataTransfer.files[0];
  if (file) {
    fileInput.files = e.dataTransfer.files;
    showPreview(file);
    validateForm();
  }
});

fileInput.addEventListener("change", () => {
  const file = fileInput.files[0];
  if (file && file.type.startsWith("image/")) {
    showPreview(file);
  }
  validateForm();
});

// Show preview image
function showPreview(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.innerHTML = `<img src="${e.target.result}" alt="Preview" />`;
  };
  reader.readAsDataURL(file);
}

// Validate title and image, update button state and help text
function validateForm() {
  const title = titleInput.value.trim();
  const titleLength = title.length;
  const min = 3;
  const max = 50;
  const imageValid = fileInput.files.length > 0;
  let message = "";

  if (titleLength < min) {
    message = `Title is too short (${titleLength}/${min})`;
    titleHelp.classList.remove("valid");
  } else if (titleLength > max) {
    message = `Title is too long (${titleLength}/${max})`;
    titleHelp.classList.remove("valid");
  } else {
    message = `Title length: ${titleLength}/${max}`;
    titleHelp.classList.add("valid");
  }

  titleHelp.textContent = message;
  postBtn.disabled = !(titleLength >= min && titleLength <= max && imageValid);
}

titleInput.addEventListener("input", validateForm);

// Handle post submission
newPostForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Stop form submission

  const title = titleInput.value.trim();
  const min = 3;
  const max = 50;
  const imageValid = fileInput.files.length > 0;

  // Validation check
  if (title.length < min || title.length > max || !imageValid) {
    titleHelp.textContent = `Title must be between ${min} and ${max} characters, and an image must be selected.`;
    titleHelp.classList.remove("valid");
    return; // Stop here, do not continue
  }
  const newCard = {
    image: URL.createObjectURL(fileInput.files[0]),
    text: titleInput.value,
    name: titleInput.value,
  };
    cards.unshift(newCard);
    displayCard(cards);
    setupCardPreviewModalListeners()
    functionalLikeButton();
  newPostModal.close();
  newPostForm.reset();
  preview.innerHTML = "";
  postBtn.disabled = true; // disable post button after reset
  newPostBtn.focus();
});

//keyevent
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    // Close Profile Modal if it's open
    if (modal.style.display === "block") {
      closeModal();
    }

    // Close New Post Modal if it's open
    if (newPostModal.open) {
      newPostModal.close();
    }

    // Close Card Preview Modal if it's open
    if (imageModal.style.display === "block") {
      closeCardModal();
    }
  }
});
