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

const enquiryForm=document.querySelector('#event-enquiry');
if(enquiryForm){
  const summary=document.querySelector('#enquiry-summary'),result=document.querySelector('#enquiry-result'),status=document.querySelector('#copy-status');
  enquiryForm.addEventListener('submit',e=>{
    e.preventDefault();
    if(!enquiryForm.reportValidity())return;
    const d=new FormData(enquiryForm);
    summary.textContent=[
      'Fun Event — Event Enquiry',
      'Name: '+d.get('name'),
      'Email: '+d.get('email'),
      'Phone: '+(d.get('phone')||'Not provided'),
      'Occasion: '+d.get('occasion'),
      'Preferred date: '+(d.get('date')||'To be confirmed'),
      'Venue: '+(d.get('venue')||'To be confirmed'),
      '',
      'Event details:',
      d.get('message')
    ].join('\n');
    const waBtn=document.querySelector('#enquiry-whatsapp');
    if(waBtn) waBtn.href='https://wa.me/971567612222?text='+encodeURIComponent(summary.textContent);
    const mailBtn=document.querySelector('#enquiry-email');
    if(mailBtn) mailBtn.href='mailto:info@funevents.ae?subject='+encodeURIComponent('Event enquiry — '+d.get('occasion'))+'&body='+encodeURIComponent(summary.textContent);
    result.hidden=false;
    status.textContent='Summary prepared. Choose WhatsApp or Email below to continue.';
    result.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
  });
  const copyBtn=document.querySelector('#copy-enquiry');
  if(copyBtn){
    copyBtn.addEventListener('click',async()=>{
      try{
        await navigator.clipboard.writeText(summary.textContent);
        status.textContent='Enquiry copied to clipboard.';
      }catch{
        const range=document.createRange();
        range.selectNodeContents(summary);
        const selection=getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent='Select Copy from your browser to copy the highlighted enquiry.';
      }
    });
  }
}