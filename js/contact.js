// Contact form functionality
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // Form validation
    if (!validateForm(name, email, subject, message)) {
        return;
    }

    // In a real application, we would send the data to a server here
    // This is just a placeholder for demo purposes

    // Show success message
    showSuccessMessage();

    // Reset form
    contactForm.reset();
});

function validateForm(name, email, subject, message) {
    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Check if name is empty
    if (!name || name.trim() === '') {
        displayError('name', 'Please enter your name.');
        isValid = false;
    }

    // Check if email is empty or invalid
    if (!email || email.trim() === '') {
        displayError('email', 'Please enter your email address.');
        isValid = false;
    } else if (!isValidEmail(email)) {
        displayError('email', 'Please enter a valid email address.');
        isValid = false;
    }

    // Check if subject is empty
    if (!subject || subject.trim() === '') {
        displayError('subject', 'Please enter a subject.');
        isValid = false;
    }

    // Check if message is empty
    if (!message || message.trim() === '') {
        displayError('message', 'Please enter your message.');
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function displayError(fieldName, errorMessage) {
    const field = document.querySelector(`[name="${fieldName}"]`);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = errorMessage;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.5rem';

    field.parentNode.appendChild(errorElement);
    field.style.borderColor = 'red';
}

function clearErrors() {
    // Remove all error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());

    // Reset border colors
    const formFields = document.querySelectorAll('.form-control');
    formFields.forEach(field => field.style.borderColor = '');
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Your message has been sent successfully!';
    successMessage.style.backgroundColor = 'rgba(0, 184, 169, 0.1)';
    successMessage.style.color = 'var(--primary)';
    successMessage.style.padding = '1rem';
    successMessage.style.borderRadius = '8px';
    successMessage.style.marginBottom = '1.5rem';
    successMessage.style.textAlign = 'center';
    successMessage.style.fontWeight = '600';

    // Insert before the form
    contactForm.parentNode.insertBefore(successMessage, contactForm);

    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}