const toggle=document.querySelector('.site-menu-toggle'),menu=document.querySelector('#main-menu');
const close=()=>{menu.classList.remove('is-open');toggle.setAttribute('aria-expanded','false')};
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');toggle.setAttribute('aria-expanded',String(open))});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('is-open')){close();toggle.focus()}});
menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('entered');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('[data-enter]').forEach(el=>{el.classList.add('entry-pending');observer.observe(el)})}
document.querySelectorAll('.gallery-filters button').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.gallery-filters button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('.gallery-card').forEach(card=>card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter)}));
const lightbox=document.getElementById('gallery-lightbox');
if(lightbox){
  const lbImg=lightbox.querySelector('.lightbox-img'),lbCap=lightbox.querySelector('.lightbox-caption'),lbClose=lightbox.querySelector('.lightbox-close'),lbBg=lightbox.querySelector('.lightbox-backdrop');
  const openLb=(src,cap)=>{lbImg.src=src;lbCap.textContent=cap;lightbox.hidden=false;lightbox.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'};
  const closeLb=()=>{lightbox.hidden=true;lightbox.setAttribute('aria-hidden','true');lbImg.src='';document.body.style.overflow=''};
  document.querySelectorAll('.gallery-card').forEach(c=>c.addEventListener('click',()=>{openLb(c.dataset.src||c.querySelector('img')?.src,c.dataset.caption||'')}));
  lbClose?.addEventListener('click',closeLb);
  lbBg?.addEventListener('click',closeLb);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lightbox.hidden)closeLb()});
}