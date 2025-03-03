// Contact form functionality using EmailJS
const contactForm = document.getElementById('contactForm');
const submitButton = document.querySelector('#contactForm button[type="submit"]');

// Initialize EmailJS
// Replace YOUR_PUBLIC_KEY with your actual EmailJS public key after setting up your account
(function () {
    emailjs.init("GSQzy_TP6mJEIcv8X");
})();

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    // Form validation
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    if (!validateForm(name, email, subject, message)) {
        // Reset button if validation fails
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        return;
    }

    // Prepare template parameters
    const templateParams = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        to_email: 'hafiz.triwahyu@gmail.com'
    };

    // Send email using EmailJS
    // Replace YOUR_SERVICE_ID and YOUR_TEMPLATE_ID with your actual EmailJS credentials
    emailjs.send('service_n1v2jih', 'template_ywckyoa', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            showSuccessMessage();
            contactForm.reset();
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, function (error) {
            console.log('FAILED...', error);
            showErrorMessage();
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        });
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
    errorElement.style.color = 'var(--accent)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '0.5rem';

    field.parentNode.appendChild(errorElement);
    field.style.borderColor = 'var(--accent)';
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

function showErrorMessage() {
    // Create error message element
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message-global';
    errorMessage.textContent = 'There was an error sending your message. Please try again later.';
    errorMessage.style.backgroundColor = 'rgba(255, 110, 108, 0.1)';
    errorMessage.style.color = 'var(--accent)';
    errorMessage.style.padding = '1rem';
    errorMessage.style.borderRadius = '8px';
    errorMessage.style.marginBottom = '1.5rem';
    errorMessage.style.textAlign = 'center';
    errorMessage.style.fontWeight = '600';

    // Insert before the form
    contactForm.parentNode.insertBefore(errorMessage, contactForm);

    // Remove error message after 5 seconds
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}