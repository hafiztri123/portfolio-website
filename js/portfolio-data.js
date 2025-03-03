// Portfolio data with multiple images support
const portfolioData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "web",
        categoryText: "Web Development",
        thumbnail: "/api/placeholder/600/400",
        images: [
            {
                src: "/api/placeholder/1200/800",
                alt: "E-Commerce Homepage",
                resolution: "1200x800",
                caption: "Responsive homepage design with featured products"
            },
            {
                src: "/api/placeholder/1000/700",
                alt: "Product Detail Page",
                resolution: "1000x700",
                caption: "Product detail page with image gallery and reviews"
            },
            {
                src: "/api/placeholder/900/600",
                alt: "Shopping Cart",
                resolution: "900x600",
                caption: "User-friendly shopping cart with quick checkout"
            },
            {
                src: "/api/placeholder/1100/750",
                alt: "Admin Dashboard",
                resolution: "1100x750",
                caption: "Admin dashboard for managing products and orders"
            }
        ],
        description: "A fully responsive e-commerce platform with product management, shopping cart, and payment integration. The platform includes features such as user authentication, product filtering, wishlist, order tracking, and admin dashboard for managing products, orders, and customers. Built with a focus on performance and user experience.",
        client: "RetailCorp Inc.",
        date: "January 2024",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe API"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: 2,
        title: "Portfolio Website Template",
        category: "ui",
        categoryText: "UI/UX Design",
        thumbnail: "/api/placeholder/600/400",
        images: [
            {
                src: "/api/placeholder/1200/800",
                alt: "Portfolio Home",
                resolution: "1200x800",
                caption: "Clean and modern home page design"
            },
            {
                src: "/api/placeholder/1000/700",
                alt: "Project Showcase",
                resolution: "1000x700",
                caption: "Project showcase with filtering options"
            },
            {
                src: "/api/placeholder/900/600",
                alt: "Contact Form",
                resolution: "900x600",
                caption: "Contact form with validation"
            }
        ],
        description: "A customizable portfolio website template designed for creative professionals and developers. Features include a modern responsive design, project filtering, dark/light mode, contact form with validation, and easy customization options.",
        client: "Personal Project",
        date: "February 2024",
        technologies: ["HTML5", "CSS3", "JavaScript", "GSAP Animation"],
        liveLink: "#",
        githubLink: "#"
    },
    {
        id: 3,
        title: "Task Management App",
        category: "mobile",
        categoryText: "Mobile App",
        thumbnail: "/api/placeholder/600/400",
        images: [
            {
                src: "/api/placeholder/800/1600",
                alt: "Task App Login",
                resolution: "800x1600",
                caption: "Mobile app login screen with biometric authentication"
            },
            {
                src: "/api/placeholder/800/1600",
                alt: "Task Dashboard",
                resolution: "800x1600",
                caption: "Task dashboard with priority indicators"
            },
            {
                src: "/api/placeholder/800/1600",
                alt: "Task Creation",
                resolution: "800x1600",
                caption: "Intuitive task creation interface"
            },
            {
                src: "/api/placeholder/800/1600",
                alt: "Calendar View",
                resolution: "800x1600",
                caption: "Calendar view with task distribution"
            }
        ],
        description: "A comprehensive task management mobile application designed to help users organize their daily tasks, set priorities, track progress, and improve productivity. The app features a clean interface, customizable categories, reminder notifications, and synchronization across devices.",
        client: "Productivity Plus",
        date: "March 2024",
        technologies: ["React Native", "Firebase", "Redux", "Push Notifications"],
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
            <img src="${project.thumbnail}" alt="${project.title}" class="portfolio-img">
            <div class="portfolio-content">
                <div class="portfolio-category">${project.categoryText}</div>
                <h3 class="portfolio-title">${project.title}</h3>
                <p class="portfolio-description">${project.description.substring(0, 100)}...</p>
                <div class="portfolio-links">
                    <a href="#" class="portfolio-link view-details" data-id="${project.id}">View Details</a>
                    <a href="${project.liveLink}" class="portfolio-link" target="_blank">Live Demo</a>
                </div>
            </div>
        `;

        portfolioGrid.appendChild(portfolioItem);

        // Add event listener to "View Details" button
        const viewDetailsBtn = portfolioItem.querySelector('.view-details');
        viewDetailsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = parseInt(viewDetailsBtn.getAttribute('data-id'));
            const selectedProject = portfolioData.find(p => p.id === projectId);
            if (selectedProject) {
                openModal(selectedProject);
            }
        });
    });
}

// Load portfolio data when page loads
window.addEventListener('DOMContentLoaded', () => {
    displayPortfolio(portfolioData);
});