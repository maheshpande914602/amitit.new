(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if(navToggle && nav){
    navToggle.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // testimonial slider
  const items = document.querySelectorAll('.t-item');
  const prev = document.querySelector('.t-prev');
  const next = document.querySelector('.t-next');
  let idx = 0;
  function update(){
    items.forEach((el,i)=> el.classList.toggle('active', i===idx));
  }
  if(items.length){
    update();
    prev.addEventListener('click', ()=>{ idx = (idx - 1 + items.length) % items.length; update(); });
    next.addEventListener('click', ()=>{ idx = (idx + 1) % items.length; update(); });
    setInterval(()=>{ idx = (idx + 1) % items.length; update(); }, 6000);
  }

  // hydrate a few popular courses on home
  const list = document.getElementById('course-list');
  if(list){
    const limit = parseInt(list.dataset.limit || "999", 10);
    fetch('assets/data/courses.json')
      .then(r=>r.json())
      .then(data => {
        data.slice(0, limit).forEach(c => {
          const el = document.createElement('article');
          el.className = 'card';
          el.innerHTML = `
            <span class="badge">${c.category}</span>
            <h3>${c.title}</h3>
            <p class="muted">${c.summary}</p>
            <div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
            <a class="btn btn-sm" href="course.html?id=${encodeURIComponent(c.id)}">View details</a>
          `;
          list.appendChild(el);
        });
      });
  }
})();
