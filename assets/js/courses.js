(function(){
  const list = document.getElementById('course-list');
  const q = document.getElementById('q');
  const cat = document.getElementById('cat');

  let courses = [];
  function render(items){
    list.innerHTML='';
    if(!items.length){
      list.innerHTML = '<p class="muted">No courses match your search.</p>';
      return;
    }
    items.forEach(c => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <span class="badge">${c.category}</span>
        <h3>${c.title}</h3>
        <p class="muted">${c.summary}</p>
        <p><strong>Format:</strong> ${c.mode} • <strong>Duration:</strong> ${c.duration}</p>
        <div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <a class="btn btn-sm" href="course.html?id=${encodeURIComponent(c.id)}">View details</a>
      `;
      list.appendChild(el);
    });
  }

  function applyFilter(){
    const term = (q.value || '').toLowerCase();
    const category = (cat.value || '').toLowerCase();
    const filtered = courses.filter(c => {
      const matchTerm = !term || (c.title.toLowerCase().includes(term) || c.summary.toLowerCase().includes(term) || c.tags.join(' ').toLowerCase().includes(term));
      const matchCat = !category || c.category.toLowerCase() === category;
      return matchTerm && matchCat;
    });
    render(filtered);
  }

  fetch('assets/data/courses.json').then(r=>r.json()).then(data => {
    courses = data;
    render(courses);
  });

  [q, cat].forEach(el => el && el.addEventListener('input', applyFilter));
})();
