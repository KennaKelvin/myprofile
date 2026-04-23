// ── Typed animation ──
const words = ['Secure Cloud Systems','REST APIs in Python','Responsive Websites','Mobile-First Apps','Data-Driven Solutions'];
let wi=0,ci=0,del=false;
const tel=document.getElementById('typed');
function type(){
  const w=words[wi];
  if(!del){
    tel.textContent=w.slice(0,++ci);
    if(ci===w.length){setTimeout(()=>{del=true;type();},2000);return;}
  }else{
    tel.textContent=w.slice(0,--ci);
    if(ci===0){del=false;wi=(wi+1)%words.length;}
  }
  setTimeout(type,del?55:100);
}
type();

// ── Rotating quotes (from your study app) ──
const quotes=[
  {q:"Pathway of success can never be easy",a:"Ikenna Iroegbu"},
  {q:"As you start to walk on the way, the way appears",a:"Rumi"},
  {q:"Keep calm when things don't go according to your expectations! Beautiful things always meet friction",a:"Ernest Agyemang Yeboah"},
  {q:"Straight roads do not make skillful drivers",a:"Paula Coelho"},
  {q:"So you had a bad day. Kick it aside and be grateful for one less bad day to pass through",a:"Richelle E. Goodrich"},
  {q:"The way to get started is to quit talking and begin doing.",a:"Walt Disney"},
  {q:"Never think of pain or danger or enemies a moment longer than is necessary to fight them",a:"Ayn Rand"}
];
let qi=0;
function rotQ(){
  const rq=document.getElementById('rotate-quote');
  const ra=document.getElementById('rotate-author');
  rq.style.opacity=0;
  setTimeout(()=>{
    qi=(qi+1)%quotes.length;
    rq.textContent=`"${quotes[qi].q}"`;
    ra.textContent=`— ${quotes[qi].a}`;
    rq.style.opacity=1;
  },500);
}
setInterval(rotQ,8000);

// ── Scroll observers ──
const obs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('v');
    // skill bars
    e.target.querySelectorAll('.sk-fill').forEach(b=>b.style.width=b.dataset.w+'%');
    // counters
    e.target.querySelectorAll('[data-target]').forEach(c=>{
      const t=+c.dataset.target;let n=0;
      const s=Math.max(1,Math.ceil(t/40));
      const iv=setInterval(()=>{
        n=Math.min(n+s,t);
        c.textContent=n+(t===300?'L':'+');
        if(n>=t)clearInterval(iv);
      },35);
    });
    obs.unobserve(e.target);
  });
},{threshold:.15});
document.querySelectorAll('.fi').forEach(el=>obs.observe(el));

// ── Navbar active ──
const secs=document.querySelectorAll('section[id]');
const nas=document.querySelectorAll('.nav-links a');
window.addEventListener('scroll',()=>{
  document.getElementById('btt').classList.toggle('show',scrollY>400);
  let cur='';
  secs.forEach(s=>{if(scrollY>=s.offsetTop-100)cur=s.id;});
  nas.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
});

// ── Mobile nav ──
document.getElementById('nav-tog').addEventListener('click',()=>
  document.getElementById('nav-links').classList.toggle('open'));
nas.forEach(a=>a.addEventListener('click',()=>
  document.getElementById('nav-links').classList.remove('open')));

// ── Portfolio filter ──
document.querySelectorAll('.fb').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.fb').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.p-item').forEach(i=>{
      i.style.display=(f==='all'||i.dataset.c===f)?'block':'none';
    });
  });
});

// ── Contact form ──
function sendMsg(){
  const n=document.getElementById('fn').value.trim();
  const e=document.getElementById('fe').value.trim();
  const m=document.getElementById('fm').value.trim();
  if(!n||!e||!m){alert('Please fill in name, email and message.');return;}
  document.getElementById('msg-ok').style.display='block';
  ['fn','fe','fs','fm'].forEach(id=>document.getElementById(id).value='');
  setTimeout(()=>document.getElementById('msg-ok').style.display='none',5000);
}

