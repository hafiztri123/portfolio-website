// Dark mode toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.setAttribute('title', 'Toggle dark/light mode');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    document.body.appendChild(themeToggle);

    // Check for saved theme preference or use default dark mode
    const savedTheme = localStorage.getItem('theme');

    // If no saved preference, default to dark mode (no class needed as default is dark)
    if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    // Toggle between light and dark mode
    themeToggle.addEventListener('click', () => {
        // Add animation class
        themeToggle.classList.add('animate');

        // Toggle theme class
        document.documentElement.classList.toggle('light-mode');

        // Update local storage based on current mode
        const isLightMode = document.documentElement.classList.contains('light-mode');
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

        // Update icon based on new mode
        setTimeout(() => {
            themeToggle.innerHTML = isLightMode
                ? '<i class="fa-solid fa-moon"></i>'
                : '<i class="fa-solid fa-sun"></i>';
            themeToggle.classList.remove('animate');
        }, 250);
    });
});