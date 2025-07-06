const thumbnails = document.querySelectorAll(".img-gallery img");
const modal = document.getElementById("wrapper");
const fullImage = document.getElementById("fullImg");
const closeBtn = document.getElementById("closeBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
let currentImageIndex = 0;

thumbnails.forEach((image, index) => {
  image.addEventListener("click", () => {
    currentImageIndex = index;
    showImage(image.src);
  });
});

function showImage(imageSource) {
  modal.style.display = "flex";
  fullImage.src = imageSource;
}

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

nextBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
  showImage(thumbnails[currentImageIndex].src);
});

prevBtn.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
  showImage(thumbnails[currentImageIndex].src);
});

document.addEventListener("keydown", (event) => {
  if (modal.style.display === "flex") {
    if (event.key === "Escape") {
      modal.style.display = "none";
    } else if (event.key === "ArrowRight") {
      nextBtn.click();
    } else if (event.key === "ArrowLeft") {
      prevBtn.click();
    }
  }
});

// Search filter
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const imageContainers = document.querySelectorAll(".image-container");

searchBtn.addEventListener("click", () => {
  const filter = searchInput.value.toLowerCase().trim();
  imageContainers.forEach(container => {
    const caption = container.querySelector("p").textContent.toLowerCase();
    if (caption.includes(filter)) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
});
