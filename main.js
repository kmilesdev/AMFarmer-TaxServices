document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mobile-toggle');
  var nav = document.querySelector('.nav');

  if (toggle) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  document.addEventListener('click', function (e) {
    if (nav && toggle && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }
  });

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');
      faqItems.forEach(function (i) { i.classList.remove('active'); });
      if (!isActive) item.classList.add('active');
    });
  });

  var form = document.getElementById('contactForm');
  var stepper = document.getElementById('stepper');
  var currentStep = 1;

  if (form && stepper) {
    var nextBtns = form.querySelectorAll('.btn-next');
    var backBtns = form.querySelectorAll('.btn-back');

    nextBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var nextStep = parseInt(btn.getAttribute('data-next'));
        if (validateStep(currentStep)) {
          goToStep(nextStep);
        }
      });
    });

    backBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var prevStep = parseInt(btn.getAttribute('data-back'));
        goToStep(prevStep);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateStep(3)) {
        submitForm();
      }
    });
  }

  function goToStep(step) {
    form.querySelectorAll('.form-step').forEach(function (el) {
      el.classList.remove('active');
    });
    form.querySelector('.form-step[data-step="' + step + '"]').classList.add('active');

    stepper.querySelectorAll('.stepper-step').forEach(function (el) {
      var s = parseInt(el.getAttribute('data-step'));
      el.classList.remove('active', 'completed');
      if (s === step) {
        el.classList.add('active');
      } else if (s < step) {
        el.classList.add('completed');
      }
    });

    var lines = stepper.querySelectorAll('.stepper-line');
    lines.forEach(function (line, i) {
      if (i < step - 1) {
        line.classList.add('completed');
      } else {
        line.classList.remove('completed');
      }
    });

    currentStep = step;
    clearErrors();
  }

  function validateStep(step) {
    var valid = true;
    clearErrors();

    if (step === 1) {
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
    }

    if (step === 2) {
      var clientType = document.getElementById('clientType');
      if (!clientType.value) {
        showError(clientType, 'Please select individual or business.');
        valid = false;
      }
    }

    if (step === 3) {
      var contactMethod = document.getElementById('contactMethod');
      if (!contactMethod.value) {
        showError(contactMethod, 'Please select a contact method.');
        valid = false;
      }

      var bestTime = document.getElementById('bestTime');
      if (!bestTime.value) {
        showError(bestTime, 'Please select the best time to reach you.');
        valid = false;
      }
    }

    return valid;
  }

  function submitForm() {
    var data = {
      name: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value || 'Not provided',
      clientType: getSelectText('clientType'),
      serviceNeeded: getSelectText('serviceNeeded') || 'Not specified',
      message: document.getElementById('message').value || 'None',
      contactMethod: getSelectText('contactMethod'),
      bestTime: getSelectText('bestTime')
    };

    console.log('Appointment request submitted:', data);

    form.style.display = 'none';
    stepper.style.display = 'none';
    document.querySelector('.form-subtitle').style.display = 'none';

    var summary = document.getElementById('confirmationSummary');
    summary.innerHTML =
      '<h4>Your Request Summary</h4>' +
      row('Name', data.name) +
      row('Email', data.email) +
      row('Phone', data.phone) +
      row('Client Type', data.clientType) +
      row('Service', data.serviceNeeded) +
      row('Contact Via', data.contactMethod) +
      row('Best Time', data.bestTime) +
      (data.message !== 'None' ? row('Message', data.message) : '');

    document.getElementById('formSuccess').style.display = 'block';
  }

  function row(label, value) {
    return '<div class="summary-row"><span class="summary-label">' + label + '</span><span class="summary-value">' + escapeHtml(value) + '</span></div>';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function getSelectText(id) {
    var el = document.getElementById(id);
    if (!el || !el.value) return '';
    return el.options[el.selectedIndex].text;
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
