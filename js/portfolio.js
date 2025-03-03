// Enhanced Portfolio with Gallery Functionality

// Portfolio filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        // Filter portfolio items
        const filter = btn.getAttribute('data-filter');
        filterPortfolioItems(filter);
    });
});

function filterPortfolioItems(filter) {
    const items = document.querySelectorAll('.portfolio-item');

    items.forEach(item => {
        if (filter === 'all') {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else if (item.getAttribute('data-category') === filter) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

// Portfolio modal functionality
const modal = document.getElementById('portfolioModal');
const modalClose = document.querySelector('.modal-close');
let currentImageIndex = 0;
let currentProject = null;

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <img src="" alt="" class="lightbox-img">
        <div class="lightbox-close">&times;</div>
        <div class="lightbox-nav">
            <button class="lightbox-prev"><i class="fa-solid fa-chevron-left"></i></button>
            <button class="lightbox-next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="lightbox-zoom">
            <button class="lightbox-zoom-out"><i class="fa-solid fa-minus"></i></button>
            <button class="lightbox-zoom-in"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="image-counter">1 / 4</div>
    </div>
`;
document.body.appendChild(lightbox);

// Lightbox functionality
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxPrev = lightbox.querySelector('.lightbox-prev');
const lightboxNext = lightbox.querySelector('.lightbox-next');
const lightboxZoomIn = lightbox.querySelector('.lightbox-zoom-in');
const lightboxZoomOut = lightbox.querySelector('.lightbox-zoom-out');
const imageCounter = lightbox.querySelector('.image-counter');
let currentZoom = 1;

function openLightbox(project, index) {
    currentImageIndex = index;
    updateLightboxImage(project);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentZoom = 1;
    lightboxImg.style.transform = `scale(${currentZoom})`;
}

function updateLightboxImage(project) {
    const image = project.images[currentImageIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    imageCounter.textContent = `${currentImageIndex + 1} / ${project.images.length}`;
    currentZoom = 1;
    lightboxImg.style.transform = `scale(${currentZoom})`;
}

function prevImage() {
    if (currentProject) {
        currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
        updateLightboxImage(currentProject);
    }
}

function nextImage() {
    if (currentProject) {
        currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
        updateLightboxImage(currentProject);
    }
}

function zoomIn() {
    if (currentZoom < 3) {
        currentZoom += 0.2;
        lightboxImg.style.transform = `scale(${currentZoom})`;
    }
}

function zoomOut() {
    if (currentZoom > 0.5) {
        currentZoom -= 0.2;
        lightboxImg.style.transform = `scale(${currentZoom})`;
    }
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
lightboxZoomIn.addEventListener('click', zoomIn);
lightboxZoomOut.addEventListener('click', zoomOut);

// Close lightbox with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        } else if (modal.classList.contains('active')) {
            closeModal();
        }
    } else if (e.key === 'ArrowLeft' && lightbox.classList.contains('active')) {
        prevImage();
    } else if (e.key === 'ArrowRight' && lightbox.classList.contains('active')) {
        nextImage();
    }
});

// Project modal functions
function openModal(project) {
    currentProject = project;
    currentImageIndex = 0;

    // Set modal content
    document.getElementById('modalCategory').textContent = project.categoryText;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalClient').textContent = project.client;
    document.getElementById('modalDate').textContent = project.date;
    document.getElementById('modalTechnologies').textContent = project.technologies.join(', ');
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;

    // Create gallery HTML
    const galleryHTML = createGallery(project);
    document.getElementById('modalGallery').innerHTML = galleryHTML;

    // Add event listeners to gallery thumbnails
    setupGalleryListeners(project);

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function createGallery(project) {
    if (!project.images || project.images.length === 0) {
        return `<div class="gallery-main">
                    <img src="${project.thumbnail}" alt="${project.title}">
                </div>`;
    }

    const mainImage = project.images[0];

    let thumbnailsHTML = '';
    project.images.forEach((image, index) => {
        const activeClass = index === 0 ? 'active' : '';
        thumbnailsHTML += `
            <div class="gallery-thumbnail ${activeClass}" data-index="${index}">
                <img src="${image.src}" alt="${image.alt}">
            </div>
        `;
    });

    return `
        <div class="gallery-main">
            <img src="${mainImage.src}" alt="${mainImage.alt}">
            <div class="resolution-badge">${mainImage.resolution}</div>
            <div class="expand-image"><i class="fa-solid fa-expand"></i></div>
        </div>
        <div class="gallery-thumbnails">
            ${thumbnailsHTML}
        </div>
        <p class="image-caption">${mainImage.caption}</p>
    `;
}

function setupGalleryListeners(project) {
    // Add click events to thumbnails
    const thumbnails = document.querySelectorAll('.gallery-thumbnail');
    const mainImage = document.querySelector('.gallery-main img');
    const resolutionBadge = document.querySelector('.resolution-badge');
    const imageCaption = document.querySelector('.image-caption');
    const expandButton = document.querySelector('.expand-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');

            // Update main image
            const index = parseInt(thumbnail.getAttribute('data-index'));
            const image = project.images[index];
            mainImage.src = image.src;
            mainImage.alt = image.alt;

            // Update resolution badge and caption
            resolutionBadge.textContent = image.resolution;
            imageCaption.textContent = image.caption;

            // Update current image index
            currentImageIndex = index;
        });
    });

    // Add click event to expand button
    expandButton.addEventListener('click', () => {
        openLightbox(project, currentImageIndex);
    });

    // Add click event to main image
    mainImage.addEventListener('click', () => {
        openLightbox(project, currentImageIndex);
    });
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Setup modal close button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    } else if (e.target === lightbox) {
        closeLightbox();
    }
});