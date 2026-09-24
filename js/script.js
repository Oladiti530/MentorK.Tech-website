const menuToggle=document.querySelector('.menu-toggle'),navMenu=document.querySelector('.nav-menu');
if(menuToggle&&navMenu){menuToggle.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',open);});navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false')}));}

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const topButton=document.querySelector('.top-button');
window.addEventListener('scroll',()=>{if(topButton)topButton.classList.toggle('show',scrollY>500)});
topButton?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

document.querySelectorAll('.filter').forEach(btn=>btn.addEventListener('click',()=>{
 document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
 const filter=btn.dataset.filter;
 document.querySelectorAll('.portfolio-card').forEach(card=>card.classList.toggle('hide',filter!=='all'&&card.dataset.category!==filter));
 // A group whose cards are all filtered out should take its heading with it.
 let shown=0;
 document.querySelectorAll('.pgroup').forEach(group=>{
  const visible=group.querySelectorAll('.portfolio-card:not(.hide)').length;
  group.hidden=visible===0; shown+=visible;
 });
 const empty=document.querySelector('.filter-empty');
 if(empty)empty.hidden=shown>0;
}));

document.querySelectorAll('.faq button').forEach(btn=>btn.addEventListener('click',()=>{
 const panel=btn.nextElementSibling, open=btn.classList.toggle('open');
 document.querySelectorAll('.faq button').forEach(other=>{if(other!==btn)other.classList.remove('open')});
 document.querySelectorAll('.faq button+div').forEach(other=>{if(other!==panel)other.style.maxHeight=null});
 panel.style.maxHeight=open?panel.scrollHeight+'px':null;
}));

const form=document.querySelector('#contactForm');
form?.addEventListener('submit',e=>{
 e.preventDefault();
 const name=form.elements.name,email=form.elements.email,message=form.elements.message,status=form.querySelector('.form-status');
 let ok=true;
 form.querySelectorAll('.error').forEach(x=>x.textContent='');
 if(!name.value.trim()){name.nextElementSibling.textContent='Please enter your name.';ok=false}
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){email.nextElementSibling.textContent='Please enter a valid email.';ok=false}
 if(!message.value.trim()){message.nextElementSibling.textContent='Please tell me about your project.';ok=false}
 if(!ok){status.textContent='Please complete the highlighted fields.';return}
 const service=form.elements.service.value;
 const text=`Hello MentorK.Tech,%0A%0AMy name is ${encodeURIComponent(name.value)}.%0AEmail: ${encodeURIComponent(email.value)}%0AService: ${encodeURIComponent(service)}%0A%0A${encodeURIComponent(message.value)}`;
 status.textContent='Opening WhatsApp with your project message...';
 window.open(`https://wa.me/2347057779214?text=${text}`,'_blank','noopener');
});

// Theme: remembers the visitor's choice, otherwise follows the system setting.
(function(){
 const root=document.documentElement;
 const stored=(()=>{try{return localStorage.getItem('mk-theme')}catch(e){return null}})();
 if(stored==='dark'||stored==='light')root.setAttribute('data-theme',stored);
 const isDark=()=>root.getAttribute('data-theme')==='dark'||(!root.getAttribute('data-theme')&&matchMedia('(prefers-color-scheme:dark)').matches);
 document.querySelectorAll('.theme-toggle').forEach(btn=>{
  btn.setAttribute('aria-pressed',isDark());
  btn.addEventListener('click',()=>{
   const next=isDark()?'light':'dark';
   root.setAttribute('data-theme',next);
   try{localStorage.setItem('mk-theme',next)}catch(e){}
   document.querySelectorAll('.theme-toggle').forEach(b=>b.setAttribute('aria-pressed',next==='dark'));
  });
 });
})();
