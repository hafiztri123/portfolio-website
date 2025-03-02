// Portfolio-specific functionality

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

function openModal(project) {
    // Set modal content
    document.getElementById('modalCategory').textContent = project.categoryText;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalClient').textContent = project.client;
    document.getElementById('modalDate').textContent = project.date;
    document.getElementById('modalTechnologies').textContent = project.technologies.join(', ');
    document.getElementById('modalLiveLink').href = project.liveLink;
    document.getElementById('modalGithubLink').href = project.githubLink;

    // Open modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});