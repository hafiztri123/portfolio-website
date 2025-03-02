// Portfolio data
const portfolioData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        categoryText: "Web Development",
        image: "/api/placeholder/600/400",
        description: "A fully responsive e-commerce platform with product management, shopping cart, and payment integration. The platform includes features such as user authentication, product filtering, wishlist, order tracking, and admin dashboard for managing products, orders, and customers. Built with a focus on performance and user experience.",
        client: "RetailCorp Inc.",
        date: "January 2024",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
        liveLink: "#",
        githubLink: "#"
    }
];

// Function to display portfolio items
function displayPortfolio(projects) {
    const portfolioGrid = document.getElementById('portfolioGrid');

    // Clear existing items
    portfolioGrid.innerHTML = '';

    // Add new items
    projects.forEach((project, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.setAttribute('data-category', project.category);
        portfolioItem.style.animationDelay = `${index * 0.1}s`;

        portfolioItem.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="portfolio-img">
            <div class="portfolio-content">
                <div class="portfolio-category">${project.categoryText}</div>
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description.substring(0, 100)}...</p>
                <div class="portfolio-links">
                    <a href="#" class="portfolio-link view-details">View Details</a>
                    <a href="${project.liveLink}" class="portfolio-link" target="_blank">Live Demo</a>
                </div>
            </div>
        `;

        portfolioGrid.appendChild(portfolioItem);

        // Add event listener to "View Details" button
        const viewDetailsBtn = portfolioItem.querySelector('.view-details');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(project);
        });
    });
}

// Load portfolio data when page loads
window.addEventListener('DOMContentLoaded', () => {
    displayPortfolio(portfolioData);
});