(() => {
  const cards = [...document.querySelectorAll('.work-card')];
  const filters = [...document.querySelectorAll('[data-filter]')];
  const dialog = document.querySelector('.lightbox');
  const content = dialog.querySelector('.lightbox-content');
  let current = 0;
  let opener;
  const visibleLinks = () => cards.filter(card => !card.hidden).map(card => card.querySelector('.media-link'));
  function filter(category) {
    const selected = filters.some(button => button.dataset.filter === category) ? category : 'todos';
    filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selected)));
    cards.forEach(card => card.hidden = selected !== 'todos' && card.dataset.category !== selected);
    const visible = cards.filter(card => !card.hidden);
    const videos = visible.filter(card => card.dataset.category === 'videos').length;
    const photos = visible.length - videos;
    document.querySelector('.gallery-count').textContent = [photos ? `${photos} fotos` : '', videos ? `${videos} vídeos` : ''].filter(Boolean).join(' · ');
  }
  document.querySelector('.filters').hidden = false;
  filters.forEach(button => button.addEventListener('click', () => {
    const category = button.dataset.filter;
    history.replaceState(null, '', category === 'todos' ? location.pathname + location.search : '#' + category);
    filter(category);
  }));
  window.addEventListener('hashchange', () => filter(location.hash.slice(1)));
  filter(location.hash.slice(1));
  function clearMedia() {
    const video = content.querySelector('video');
    if (video) { video.pause(); video.removeAttribute('src'); video.load(); }
    content.replaceChildren();
  }
  function show(index) {
    const links = visibleLinks();
    current = (index + links.length) % links.length;
    const link = links[current];
    clearMedia();
    const isVideo = link.hasAttribute('data-video');
    const media = document.createElement(isVideo ? 'video' : 'img');
    if (isVideo) {
      media.controls = true;
      media.playsInline = true;
      media.preload = 'metadata';
      media.poster = link.querySelector('img').src;
      media.setAttribute('aria-label', link.dataset.title);
      media.textContent = 'Seu navegador não reproduz este vídeo.';
    } else { media.alt = link.dataset.title; }
    media.src = link.href;
    content.append(media);
    document.querySelector('#lightbox-title').textContent = link.dataset.title;
    dialog.querySelector('.lightbox-counter').textContent = `${current + 1} / ${links.length}`;
    if (isVideo) media.play().catch(() => {});
  }
  if (typeof dialog.showModal !== 'function') return;
  cards.forEach(card => card.querySelector('.media-link').addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = event.currentTarget;
    show(visibleLinks().indexOf(opener));
    dialog.showModal();
    document.body.classList.add('modal-open');
  }));
  dialog.querySelector('.close-lightbox').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { clearMedia(); document.body.classList.remove('modal-open'); opener?.focus(); });
  dialog.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('click', () => show(current + Number(button.dataset.direction))));
  dialog.addEventListener('keydown', event => {
    if (event.target.tagName === 'VIDEO') return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); show(current + (event.key === 'ArrowLeft' ? -1 : 1)); }
  });
})();
