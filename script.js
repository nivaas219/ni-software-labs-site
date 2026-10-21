'use strict';

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');

if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobileNav.hidden = isOpen;
  });
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const ideaForm = document.querySelector('#idea-form');
const formStatus = document.querySelector('#form-status');
if (ideaForm && formStatus) {
  ideaForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(ideaForm);
    const name = String(formData.get('name') || '').trim();
    const type = String(formData.get('type') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!message) {
      formStatus.textContent = 'Please add a short description of your idea.';
      document.querySelector('#idea-message')?.focus();
      return;
    }

    const subject = encodeURIComponent(`Product idea — ${type}`);
    const body = encodeURIComponent(`Hello NI Software Labs,\n\nIdea category: ${type}\nName: ${name || 'Not provided'}\n\nMy idea:\n${message}\n\nSent from the NI Software Labs website.`);
    formStatus.textContent = 'Opening your email app. Your message is not sent until you choose to send it there.';
    window.location.href = `mailto:nivaas9293@gmail.com?subject=${subject}&body=${body}`;
  });
}
