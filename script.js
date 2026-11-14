const body=document.body;
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const themeToggle=document.getElementById("themeToggle");
const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
menuToggle?.addEventListener("click",()=>{const open=navLinks.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close navigation":"Open navigation")});
navLinks?.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{navLinks.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false")}));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&navLinks?.classList.contains("open")){navLinks.classList.remove("open");menuToggle?.setAttribute("aria-expanded","false");menuToggle?.focus()}});
try{if(localStorage.getItem("saim-portfolio-theme")==="light")body.classList.add("light")}catch{}
function updateTheme(){themeToggle?.setAttribute("aria-label",body.classList.contains("light")?"Switch to dark theme":"Switch to light theme")}
updateTheme();
themeToggle?.addEventListener("click",()=>{body.classList.toggle("light");updateTheme();try{localStorage.setItem("saim-portfolio-theme",body.classList.contains("light")?"light":"dark")}catch{}});
const roleText=document.getElementById("roleText");
const roles=["AI Engineering Student","Aspiring AI Entrepreneur","AI Automation Learner"];
if(roleText&&!reducedMotion){let i=0;window.setInterval(()=>{i=(i+1)%roles.length;roleText.textContent=roles[i]},2600)}
const revealItems=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window&&!reducedMotion){const observer=new IntersectionObserver((entries,obs)=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");obs.unobserve(entry.target)}}),{threshold:.12});revealItems.forEach(item=>observer.observe(item))}else revealItems.forEach(item=>item.classList.add("is-visible"));
document.getElementById("year").textContent=new Date().getFullYear();
document.documentElement.classList.add("js-enabled");

// Subtle pointer-driven 3D depth on desktop; automatically disabled for touch/reduced motion.
const canTilt=window.matchMedia("(hover:hover) and (pointer:fine)").matches&&!reducedMotion;
if(canTilt){
  const tiltTargets=document.querySelectorAll(".profile-card,.skill-card,.project-card,.journey-card");
  tiltTargets.forEach(card=>{
    card.addEventListener("pointermove",event=>{
      const rect=card.getBoundingClientRect();
      const x=(event.clientX-rect.left)/rect.width;
      const y=(event.clientY-rect.top)/rect.height;
      const max=card.classList.contains("profile-card")?9:5;
      const rx=(.5-y)*max, ry=(x-.5)*max;
      card.style.transform="perspective(900px) rotateX("+rx+"deg) rotateY("+ry+"deg) translateY(-3px)";
    });
    card.addEventListener("pointerleave",()=>{
      card.style.transform=card.classList.contains("profile-card")?"rotate(2deg)":"";
    });
  });
}
