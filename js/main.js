'use strict';

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Mobile menu
const burger = $('.burger'), menu = $('#menu');
const setMenu = o => { menu.classList.toggle('open', o); burger.setAttribute('aria-expanded', o) };

burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
$$('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Gallery filter
$$('.tab').forEach(t => t.addEventListener('click', () => {
  $$('.tab').forEach(x => x.classList.toggle('on', x === t));
  $$('.tile').forEach(c => c.hidden = !(t.dataset.f === 'all' || c.dataset.c === t.dataset.f));
}));

// Gallery modal (only opens for tiles that have a real photo)
const modal = $('#modal');

$$('.tile').forEach(t => t.addEventListener('click', () => {
  const img = $('img', t); if (!img) return;
  $('#mimg').src = img.src; $('#mimg').alt = t.dataset.t; $('#mcap').textContent = t.dataset.t; modal.hidden = false; $('#mx').focus();
}));

const closeM = () => modal.hidden = true;

$('#mx').addEventListener('click', closeM);
modal.addEventListener('click', e => { if (e.target === modal) closeM() });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeM() });
