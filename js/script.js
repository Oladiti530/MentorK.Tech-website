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
