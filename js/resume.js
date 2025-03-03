// Enhanced Resume page functionality
document.addEventListener('DOMContentLoaded', function () {
    // Create scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);

    // Update scroll progress indicator
    window.addEventListener('scroll', function () {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Initialize AOS (Animate On Scroll) library with enhanced options
    AOS.init({
        duration: 1000,
        easing: 'ease-out-cubic',
        once: false,
        mirror: true,
        anchorPlacement: 'top-bottom',
        offset: 120
    });

    // Set section titles with data-text attribute for stylized background text
    document.querySelectorAll('.section-title').forEach(title => {
        title.setAttribute('data-text', title.textContent);
    });

    // Enhanced tab functionality with smooth transitions
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Add click ripple effect
            addClickEffect(btn);

            // Remove active class from all buttons
            tabBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Get the target tab id
            const tabId = btn.getAttribute('data-tab');

            // Fade out all tab contents
            tabContents.forEach(content => {
                if (content.classList.contains('active')) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(20px)';

                    setTimeout(() => {
                        content.classList.remove('active');

                        // Show selected tab content with delay
                        const targetContent = document.getElementById(`${tabId}-content`);
                        if (targetContent) {
                            targetContent.classList.add('active');
                            setTimeout(() => {
                                targetContent.style.opacity = '1';
                                targetContent.style.transform = 'translateY(0)';

                                // Trigger animations for the newly visible content
                                revealElements();

                                // Scroll to top of content with smooth animation
                                const headerHeight = document.querySelector('#header').offsetHeight;
                                const contentTop = targetContent.getBoundingClientRect().top + window.pageYOffset - headerHeight - 50;

                                window.scrollTo({
                                    top: contentTop,
                                    behavior: 'smooth'
                                });
                            }, 50);
                        }
                    }, 300);
                }
            });
        });
    });

    // Click ripple effect for buttons
    function addClickEffect(element) {
        // Remove any existing ripple
        const ripples = element.querySelectorAll('.ripple');
        ripples.forEach(ripple => {
            ripple.remove();
        });

        // Create ripple element
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        element.appendChild(ripple);

        // Position the ripple
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        ripple.classList.add('active');

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple style to head
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Education Timeline with enhanced animations
    function loadEducationTimeline() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        // Clear existing items
        timeline.innerHTML = '';

        // Load and add education items with staggered animations
        educationData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            // Set different animation based on position
            if (index % 2 === 0) {
                timelineItem.setAttribute('data-aos', 'fade-right');
            } else {
                timelineItem.setAttribute('data-aos', 'fade-left');
            }

            timelineItem.setAttribute('data-aos-delay', `${index * 150}`);
            timelineItem.setAttribute('data-aos-duration', '800');
            timelineItem.setAttribute('data-aos-easing', 'ease-out-cubic');

            timelineItem.innerHTML = `
                <div class="timeline-content">
                    <div class="timeline-date">${item.date}</div>
                    <h3 class="timeline-title">${item.title}</h3>
                    <div class="timeline-subtitle">${item.institution}</div>
                    <p class="timeline-description">${item.description}</p>
                </div>
            `;

            timeline.appendChild(timelineItem);
        });
    }

    // CV Experience Items with advanced animations
    function loadCVExperience() {
        const cvExperienceSection = document.querySelector('.cv-section h3 i.fa-briefcase').parentNode.parentNode;
        if (!cvExperienceSection) return;

        // Clear existing items (except the heading)
        const heading = cvExperienceSection.querySelector('h3');
        cvExperienceSection.innerHTML = '';
        cvExperienceSection.appendChild(heading);

        // Load and add experience items with staggered animations
        experienceData.forEach((item, index) => {
            const cvItem = document.createElement('div');
            cvItem.className = 'cv-item';
            cvItem.setAttribute('data-aos', 'fade-up');
            cvItem.setAttribute('data-aos-delay', `${index * 150}`);
            cvItem.setAttribute('data-aos-duration', '700');
            cvItem.setAttribute('data-aos-anchor-placement', 'top-bottom');

            cvItem.innerHTML = `
                <div class="cv-item-title">${item.title}</div>
                <div class="cv-item-subtitle">${item.company}</div>
                <div class="cv-item-date">${item.date}</div>
                <div class="cv-item-description">${item.description}</div>
            `;

            cvExperienceSection.appendChild(cvItem);
        });
    }

    // Load organizations with enhanced visuals
    function loadOrganizations() {
        const organizationsGrid = document.querySelector('.organizations-grid');
        if (!organizationsGrid) return;

        // Clear existing items
        organizationsGrid.innerHTML = '';

        // Load and add organization items with grid animations
        organizationData.forEach((item, index) => {
            const orgCard = document.createElement('div');
            orgCard.className = 'organization-card';
            orgCard.setAttribute('data-aos', 'fade-up');
            orgCard.setAttribute('data-aos-delay', `${index * 100}`);
            orgCard.setAttribute('data-aos-duration', '800');

            // Add 3D tilt effect
            orgCard.setAttribute('data-tilt', '');
            orgCard.setAttribute('data-tilt-max', '5');
            orgCard.setAttribute('data-tilt-speed', '400');
            orgCard.setAttribute('data-tilt-perspective', '1000');

            // Create responsibilities HTML
            let responsibilitiesHTML = '';
            if (item.responsibilities && item.responsibilities.length > 0) {
                responsibilitiesHTML = `
                    <div class="organization-responsibilities">
                        <h4><i class="fa-solid fa-list-check"></i> Key Responsibilities</h4>
                        ${item.responsibilities.map(responsibility =>
                    `<div class="responsibility-item">${responsibility}</div>`
                ).join('')}
                    </div>
                `;
            }

            orgCard.innerHTML = `
                <div class="organization-logo">
                    <img src="${item.logo}" alt="${item.name} Logo">
                </div>
                <div class="organization-content">
                    <h3 class="organization-title">${item.name}</h3>
                    <div class="organization-role">${item.role}</div>
                    <div class="organization-date">
                        <i class="fa-regular fa-calendar"></i> ${item.date}
                    </div>
                    <p class="organization-description">${item.description}</p>
                    ${responsibilitiesHTML}
                </div>
            `;

            organizationsGrid.appendChild(orgCard);
        });

        // Initialize tilt effect if vanilla-tilt.js is available
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                maxTilt: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.1
            });
        }
    }

    // Load certificates with enhanced visuals and filtering
    function loadCertificates() {
        const certificatesGrid = document.querySelector('.certificates-grid');
        if (!certificatesGrid) return;

        // Clear existing items
        certificatesGrid.innerHTML = '';

        // Load and add certificate items with staggered animations
        certificateData.forEach((item, index) => {
            const certCard = document.createElement('div');
            certCard.className = 'certificate-card';
            certCard.setAttribute('data-category', item.category);
            certCard.setAttribute('data-aos', 'fade-up');
            certCard.setAttribute('data-aos-delay', `${index * 100}`);
            certCard.setAttribute('data-aos-duration', '800');

            // Add 3D tilt effect
            certCard.setAttribute('data-tilt', '');
            certCard.setAttribute('data-tilt-max', '5');
            certCard.setAttribute('data-tilt-speed', '400');
            certCard.setAttribute('data-tilt-perspective', '1000');

            certCard.innerHTML = `
                <div class="certificate-badge">${item.categoryText}</div>
                <div class="certificate-img">
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class="certificate-content">
                    <div class="certificate-issuer">${item.issuer}</div>
                    <h3 class="certificate-title">${item.title}</h3>
                    <div class="certificate-date">
                        <i class="fa-regular fa-calendar"></i> ${item.date}
                    </div>
                    <p class="certificate-description">${item.description}</p>
                    ${item.link ? `<a href="${item.link}" class="certificate-link" target="_blank">
                        <i class="fa-solid fa-arrow-up-right-from-square"></i> View Certificate
                    </a>` : ''}
                </div>
            `;

            certificatesGrid.appendChild(certCard);
        });

        // Initialize tilt effect if vanilla-tilt.js is available
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll(".certificate-card[data-tilt]"), {
                maxTilt: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.1
            });
        }
    }

    // Certificate filter functionality with smooth animations
    function setupCertificateFilter() {
        const filterBtns = document.querySelectorAll('.certificate-filter .filter-btn');
        if (!filterBtns.length) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Add click ripple effect
                addClickEffect(btn);

                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                // Filter certificates with animation
                const filter = btn.getAttribute('data-filter');
                filterCertificates(filter);
            });
        });
    }

    function filterCertificates(filter) {
        const items = document.querySelectorAll('.certificate-card');
        const containerHeight = document.querySelector('.certificates-grid').offsetHeight;
        document.querySelector('.certificates-grid').style.minHeight = `${containerHeight}px`;

        // Count for staggered animations
        let visibleCount = 0;

        items.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                // First set opacity to 0 and hide
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';

                // Then after a staggered delay, show with animation
                setTimeout(() => {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1) translateY(0)';
                    }, 50);
                }, visibleCount * 100);

                visibleCount++;
            } else {
                // Fade out
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8) translateY(20px)';

                // Hide after animation completes
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        // Reset min-height after all animations complete
        setTimeout(() => {
            document.querySelector('.certificates-grid').style.minHeight = 'auto';
        }, visibleCount * 100 + 500);
    }

    // CV Download functionality with enhanced UX
    function setupCVDownload() {
        const downloadButton = document.getElementById('downloadCV');
        if (!downloadButton) return;

        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Add click effect
            addClickEffect(downloadButton);

            // Show loading state
            const originalButtonText = downloadButton.innerHTML;
            downloadButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing PDF...';
            downloadButton.disabled = true;

            // Get the CV container
            const cvContainer = document.querySelector('.cv-container');

            // Create a clone to modify for PDF
            const cvClone = cvContainer.cloneNode(true);

            // Remove the action buttons from the clone
            const actionsDiv = cvClone.querySelector('.cv-actions');
            if (actionsDiv) {
                actionsDiv.remove();
            }

            // Set options for PDF generation
            const options = {
                margin: [10, 10, 10, 10],
                filename: 'Hafizh_Tri_Wahyudi_CV.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            // Small delay to allow UI update
            setTimeout(() => {
                // Generate PDF with progress tracking
                html2pdf().from(cvClone).set(options).toPdf().get('pdf').then((pdf) => {
                    // PDF has been created
                    // Reset button
                    downloadButton.innerHTML = originalButtonText;
                    downloadButton.disabled = false;

                    // Show success message
                    showNotification('CV downloaded successfully!', 'success');
                }).save();
            }, 500);
        });
    }

    // Show notification message
    function showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="notification-content">${message}</div>
        `;

        // Add notification to body
        document.body.appendChild(notification);

        // Add notification styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: white;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                display: flex;
                padding: 15px 20px;
                align-items: center;
                gap: 15px;
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 10000;
                max-width: 350px;
            }
            .notification.success {
                border-left: 4px solid var(--primary);
            }
            .notification.info {
                border-left: 4px solid #3498db;
            }
            .notification.error {
                border-left: 4px solid #e74c3c;
            }
            .notification-icon {
                font-size: 24px;
                color: var(--primary);
            }
            .notification.info .notification-icon {
                color: #3498db;
            }
            .notification.error .notification-icon {
                color: #e74c3c;
            }
            .notification-content {
                font-size: 14px;
                font-weight: 500;
            }
        `;
        document.head.appendChild(notificationStyle);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 5000);
    }

    // Add interactive typing effect to subtitle
    function addTypingEffect() {
        const subtitle = document.querySelector('.resume-subtitle');
        if (!subtitle) return;

        const originalText = subtitle.textContent;
        subtitle.textContent = '';

        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < originalText.length) {
                subtitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                // Add blinking cursor at the end
                subtitle.insertAdjacentHTML('beforeend', '<span class="typing-cursor">|</span>');

                // Add blinking cursor style
                const cursorStyle = document.createElement('style');
                cursorStyle.textContent = `
                    .typing-cursor {
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0; }
                    }
                `;
                document.head.appendChild(cursorStyle);

                // Remove cursor after 3 seconds
                setTimeout(() => {
                    const cursor = subtitle.querySelector('.typing-cursor');
                    if (cursor) cursor.remove();
                }, 3000);
            }
        }, 100);
    }

    // Enhance section titles with counter animations
    function enhanceSectionTitles() {
        const style = document.createElement('style');
        style.textContent = `
            .count-animation {
                display: inline-block;
                min-width: 30px;
                opacity: 0;
                transform: translateY(10px);
                animation: countIn 0.5s forwards;
            }
            @keyframes countIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);

        // Count up animation
        function animateCounter(element, targetCount) {
            let count = 0;
            const duration = 1500; // ms
            const frameDuration = 1000 / 60; // 60fps
            const totalFrames = Math.round(duration / frameDuration);
            const countIncrement = targetCount / totalFrames;

            element.textContent = '0';
            element.classList.add('count-animation');

            const counter = setInterval(() => {
                count += countIncrement;
                const progress = Math.min(Math.round(count), targetCount);
                element.textContent = progress;

                if (progress === targetCount) {
                    clearInterval(counter);
                }
            }, frameDuration);
        }

        // Add dynamic counters to section titles
        window.addEventListener('scroll', () => {
            const educationSection = document.getElementById('education-content');
            if (educationSection && educationSection.classList.contains('active') && !educationSection.hasAttribute('data-counted')) {
                const rect = educationSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const countElement = document.createElement('span');
                    countElement.className = 'education-counter';
                    countElement.style.cssText = 'position: absolute; top: 10px; right: 10px; background: var(--gradient); color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; box-shadow: 0 5px 15px rgba(0, 184, 169, 0.2);';
                    educationSection.querySelector('.section-title').appendChild(countElement);

                    animateCounter(countElement, educationData.length);
                    educationSection.setAttribute('data-counted', 'true');
                }
            }

            const certificatesSection = document.getElementById('certificates-content');
            if (certificatesSection && certificatesSection.classList.contains('active') && !certificatesSection.hasAttribute('data-counted')) {
                const rect = certificatesSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const countElement = document.createElement('span');
                    countElement.className = 'certificates-counter';
                    countElement.style.cssText = 'position: absolute; top: 10px; right: 10px; background: var(--gradient); color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; box-shadow: 0 5px 15px rgba(0, 184, 169, 0.2);';
                    certificatesSection.querySelector('.section-title').appendChild(countElement);

                    animateCounter(countElement, certificateData.length);
                    certificatesSection.setAttribute('data-counted', 'true');
                }
            }
        });
    }

    // Add scroll indicator to the timeline
    function addTimelineScrollIndicator() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        const indicator = document.createElement('div');
        indicator.className = 'timeline-scroll-indicator';
        indicator.innerHTML = '<i class="fa-solid fa-arrow-down"></i>';
        indicator.style.cssText = 'position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: var(--gradient); color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 5px 15px rgba(0, 184, 169, 0.2); cursor: pointer; animation: bounce 2s infinite;';
        timeline.appendChild(indicator);

        // Add bounce animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                    transform: translateX(-50%) translateY(0);
                }
                40% {
                    transform: translateX(-50%) translateY(-10px);
                }
                60% {
                    transform: translateX(-50%) translateY(-5px);
                }
            }
        `;
        document.head.appendChild(style);

        // Handle click on indicator
        indicator.addEventListener('click', () => {
            const timelineRect = timeline.getBoundingClientRect();
            const scrollTo = window.pageYOffset + timelineRect.top + timelineRect.height - window.innerHeight;
            window.scrollTo({
                top: scrollTo,
                behavior: 'smooth'
            });
        });

        // Hide indicator when scrolled to bottom of timeline
        window.addEventListener('scroll', () => {
            const timelineRect = timeline.getBoundingClientRect();
            if (timelineRect.bottom < window.innerHeight + 100) {
                indicator.style.opacity = '0';
                indicator.style.pointerEvents = 'none';
            } else {
                indicator.style.opacity = '1';
                indicator.style.pointerEvents = 'auto';
            }
        });
    }

    // Enhanced reveal elements animation
    function revealElements() {
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const position = item.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                // Add staggered delay for smoother reveal
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });

        // CV items
        const cvItems = document.querySelectorAll('.cv-item');
        cvItems.forEach((item, index) => {
            const position = item.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });

        // Organization cards
        const orgCards = document.querySelectorAll('.organization-card');
        orgCards.forEach((card, index) => {
            const position = card.getBoundingClientRect().top;
            if (position < window.innerHeight - 100) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            }
        });
    }

    // Add dynamic background particles
    function addBackgroundParticles() {
        const heroSection = document.querySelector('.resume-hero');
        if (!heroSection) return;

        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; z-index: 0;';
        heroSection.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Randomize properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.1;
            const animDuration = Math.random() * 20 + 10;
            const animDelay = Math.random() * 10;

            particle.style.cssText = `
                position: absolute;
                top: ${posY}%;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: var(--primary);
                opacity: ${opacity};
                border-radius: 50%;
                pointer-events: none;
                animation: float ${animDuration}s linear ${animDelay}s infinite;
            `;

            particlesContainer.appendChild(particle);
        }
    }

    // Call all setup functions
    function init() {
        loadEducationTimeline();
        loadCVExperience();
        loadOrganizations();
        loadCertificates();
        setupCertificateFilter();
        setupCVDownload();
        addTypingEffect();
        enhanceSectionTitles();
        addTimelineScrollIndicator();
        addBackgroundParticles();

        // Call reveal on initial load
        setTimeout(revealElements, 500);

        // Listen for scroll to reveal elements
        window.addEventListener('scroll', revealElements);
    }

    // Initialize everything
    init();

    // Add external script for tilt effect if not already loaded
    if (typeof VanillaTilt === 'undefined') {
        const tiltScript = document.createElement('script');
        tiltScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js';
        tiltScript.onload = function () {
            // Initialize tilt on cards once script is loaded
            VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
                maxTilt: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.1
            });
        };
        document.body.appendChild(tiltScript);
    }
});