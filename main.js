document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.nav');

  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  document.addEventListener('click', function (e) {
    if (nav && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      const isActive = item.classList.contains('active');
      faqItems.forEach(function (i) { i.classList.remove('active'); });
      if (!isActive) item.classList.add('active');
    });
  });

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm()) {
        var data = {
          name: form.querySelector('#fullName').value,
          email: form.querySelector('#email').value,
          phone: form.querySelector('#phone').value,
          contactMethod: form.querySelector('#contactMethod').value,
          clientType: form.querySelector('#clientType').value,
          message: form.querySelector('#message').value
        };
        console.log('Form submitted:', data);
        form.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }
    });
  }

  function validateForm() {
    var valid = true;
    clearErrors();

    var name = document.getElementById('fullName');
    if (!name.value.trim()) {
      showError(name, 'Please enter your full name.');
      valid = false;
    }

    var email = document.getElementById('email');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    var phone = document.getElementById('phone');
    var phoneVal = phone.value.replace(/\D/g, '');
    if (phone.value.trim() && phoneVal.length < 10) {
      showError(phone, 'Please enter a valid phone number.');
      valid = false;
    }

    var contactMethod = document.getElementById('contactMethod');
    if (!contactMethod.value) {
      showError(contactMethod, 'Please select a preferred contact method.');
      valid = false;
    }

    var clientType = document.getElementById('clientType');
    if (!clientType.value) {
      showError(clientType, 'Please select individual or business.');
      valid = false;
    }

    return valid;
  }

  function showError(input, msg) {
    input.classList.add('error');
    var errorEl = input.parentElement.querySelector('.form-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.style.display = 'block';
    }
  }

  function clearErrors() {
    document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
      el.classList.remove('error');
    });
    document.querySelectorAll('.form-error').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});
