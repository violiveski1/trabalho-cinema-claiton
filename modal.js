document.addEventListener('DOMContentLoaded', function () {
  // Menu hambúrguer com Bootstrap
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarNav = document.getElementById('navbarNav');

  if (navbarToggler && navbarNav) {
    navbarToggler.addEventListener('click', function () {
      navbarNav.classList.toggle('show');
      const isExpanded = navbarNav.classList.contains('show');
      navbarToggler.setAttribute('aria-expanded', String(isExpanded));
    });

    // Fechar menu ao clicar em um link
    navbarNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navbarNav.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
      });
    });

    // Fechar menu ao redimensionar a tela
    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        navbarNav.classList.remove('show');
        navbarToggler.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Modal do Bootstrap
  const modalElement = document.getElementById('trailerModal');
  if (!modalElement) return;

  const modal = new bootstrap.Modal(modalElement);
  const titleElement = modalElement.querySelector('.modal-title');
  const thumbImage = modalElement.querySelector('#trailerModalImage');
  const playButton = modalElement.querySelector('#btnPlayTrailer');

  const openModal = (button) => {
    const container = button.closest('.trailer_container');
    const title = document.querySelector('.titulo_filme-detalhe')?.textContent?.trim() || 'Trailer';
    const thumbSrc = container?.querySelector('.trailer_thumb img')?.src || '';
    const videoUrl = button.dataset.videoUrl || '';

    titleElement.textContent = title;
    thumbImage.src = thumbSrc;
    playButton.dataset.videoUrl = videoUrl;
    modal.show();
  };

  playButton.addEventListener('click', function () {
    const videoUrl = this.dataset.videoUrl;
    if (!videoUrl) return;
    window.open(videoUrl, '_blank');
  });

  document.querySelectorAll('.btn_trailer').forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      openModal(this);
    });
  });
});
