document.addEventListener('DOMContentLoaded', function () {
  const modal = document.createElement('div');
  modal.className = 'trailer-modal trailer-modal--hidden';
  modal.innerHTML = `
    <div class="trailer-modal__backdrop"></div>
    <div class="trailer-modal__box" role="dialog" aria-modal="true" aria-labelledby="trailer-modal-title">
      <div class="trailer-modal__top">
        <div class="trailer-modal__headline">
          <span class="trailer-modal__label">Trailer</span>
          <h2 class="trailer-modal__title" id="trailer-modal-title">Traile</h2>
        </div>
        <button type="button" class="trailer-modal__close" aria-label="Fechar trailer">×</button>
      </div>
      <div class="trailer-modal__content">
        <div class="trailer-modal__image-wrap">
          <img src="" alt="Trailer" class="trailer-modal__image" />
          <button type="button" class="trailer-modal__play-overlay" aria-label="Reproduzir trailer"></button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const backdrop = modal.querySelector('.trailer-modal__backdrop');
  const closeButton = modal.querySelector('.trailer-modal__close');
  const titleElement = modal.querySelector('.trailer-modal__title');
  const thumbImage = modal.querySelector('.trailer-modal__image');
  const playOverlay = modal.querySelector('.trailer-modal__play-overlay');

  const closeModal = () => {
    modal.classList.add('trailer-modal--hidden');
    document.body.classList.remove('trailer-modal-open');
  };

  const menuToggle = document.querySelector('.cabecalho_toggle');
  const menuNav = document.querySelector('.cabecalho_nav');

  if (menuToggle && menuNav) {
    const closeMenu = () => {
      menuNav.classList.remove('cabecalho_nav--open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const open = menuNav.classList.toggle('cabecalho_nav--open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    menuNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 700) {
        closeMenu();
      }
    });
  }

  const openModal = (button) => {
    const container = button.closest('.trailer_container');
    const title = document.querySelector('.titulo_filme-detalhe')?.textContent?.trim() || 'Trailer';
    const thumbSrc = container?.querySelector('.trailer_thumb img')?.src || '';
    const thumbAlt = container?.querySelector('.trailer_thumb img')?.alt || 'Trailer';
    const videoUrl = button.dataset.videoUrl || '';

    titleElement.textContent = title;
    thumbImage.src = thumbSrc;
    thumbImage.alt = thumbAlt;
    playOverlay.dataset.videoUrl = videoUrl;

    modal.classList.remove('trailer-modal--hidden');
    document.body.classList.add('trailer-modal-open');
  };

  playOverlay.addEventListener('click', function () {
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

  closeButton.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('trailer-modal--hidden')) {
      closeModal();
    }
  });
});
