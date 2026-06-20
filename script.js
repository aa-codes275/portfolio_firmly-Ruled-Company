/* === Firmly Ruled Company - Interactions === */
document.addEventListener('DOMContentLoaded',()=>{

  // Loader
  window.addEventListener('load',()=>{
    setTimeout(()=>document.getElementById('loader')?.classList.add('hide'),400);
  });

  // Header scroll
  const header=document.getElementById('header');
  window.addEventListener('scroll',()=>{
    header?.classList.toggle('scrolled',window.scrollY>40);
  },{passive:true});

  // Mobile nav
  const burger=document.getElementById('burger');
  const nav=document.getElementById('nav');
  burger?.addEventListener('click',()=>{
    burger.classList.toggle('open');
    nav.classList.toggle('open');
  });
  document.querySelectorAll('.nav a').forEach(a=>{
    a.addEventListener('click',()=>{burger?.classList.remove('open');nav?.classList.remove('open');});
  });

  // Active nav link on scroll
  const sections=document.querySelectorAll('section[id]');
  const navLinks=document.querySelectorAll('.nav a');
  const setActive=()=>{
    const y=window.scrollY+120;
    sections.forEach(s=>{
      if(s.offsetTop<=y && s.offsetTop+s.offsetHeight>y){
        navLinks.forEach(l=>l.classList.toggle('active',l.getAttribute('href')==='#'+s.id));
      }
    });
  };
  window.addEventListener('scroll',setActive,{passive:true});

  // Counter
  const counters=document.querySelectorAll('[data-count]');
  const runCounter=el=>{
    const target=+el.dataset.count;let cur=0;const step=Math.max(1,target/60);
    const tick=()=>{cur+=step;if(cur>=target){el.textContent=target;return;}el.textContent=Math.floor(cur);requestAnimationFrame(tick);};
    tick();
  };
  const cObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){runCounter(e.target);cObs.unobserve(e.target);}}),{threshold:.4});
  counters.forEach(c=>cObs.observe(c));

  // Reveal on scroll
  const rObs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rObs.unobserve(e.target);}}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>rObs.observe(el));

  // Portfolio filter
  const cards=document.querySelectorAll('#portGrid .pcard');
  document.querySelectorAll('.fbtn').forEach(b=>{
    b.addEventListener('click',()=>{
      document.querySelectorAll('.fbtn').forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      const f=b.dataset.filter;
      cards.forEach(c=>{
        c.classList.toggle('hide',!(f==='all'||c.dataset.cat===f));
      });
    });
  });

  // Hover preview for videos
  document.querySelectorAll('.pcard video').forEach(v=>{
    const card=v.closest('.pcard');
    card.addEventListener('mouseenter',()=>v.play().catch(()=>{}));
    card.addEventListener('mouseleave',()=>{v.pause();v.currentTime=0;});
  });

  // Lightbox
  const lb=document.getElementById('lightbox');
  const lbC=document.getElementById('lbContent');
  document.querySelectorAll('.pcard').forEach(c=>{
    c.addEventListener('click',()=>{
      const v=c.querySelector('video');
      const i=c.querySelector('img');
      lbC.innerHTML='';
      if(v){
        const nv=document.createElement('video');nv.src=v.src;nv.controls=true;nv.autoplay=true;nv.playsInline=true;lbC.appendChild(nv);
      }else if(i){
        const ni=document.createElement('img');ni.src=i.src;lbC.appendChild(ni);
      }
      lb.classList.add('show');
    });
  });
  const closeLb=()=>{lb.classList.remove('show');lbC.innerHTML='';};
  document.querySelector('.lb-close')?.addEventListener('click',closeLb);
  lb?.addEventListener('click',e=>{if(e.target===lb)closeLb();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb();});

  // QR code
  if(window.QRCode && document.getElementById('qrcode')){
    new QRCode(document.getElementById('qrcode'),{
      text:window.location.href.split('#')[0],
      width:180,height:180,
      colorDark:'#1f3a3d',colorLight:'#ffffff',
      correctLevel:QRCode.CorrectLevel.H
    });
  }

  // Form
  const form=document.getElementById('contactForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const msg=document.getElementById('formMsg');
    msg.textContent='جاري الإرسال...';
    setTimeout(()=>{msg.textContent='✓ تم استلام طلبك، سنتواصل معك خلال 24 ساعة';form.reset();},900);
  });

  // Year for footer if any
  document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
});
