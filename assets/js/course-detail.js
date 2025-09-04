(function(){
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const root = document.getElementById('course-detail');
  if(!id){ root.innerHTML = '<p class="muted">Course not found.</p>'; return; }

  fetch('assets/data/courses.json').then(r=>r.json()).then(data => {
    const c = data.find(x=> String(x.id) === String(id));
    if(!c){ root.innerHTML = '<p class="muted">Course not found.</p>'; return; }
    root.innerHTML = `
      <article class="card">
        <span class="badge">${c.category}</span>
        <h1>${c.title}</h1>
        <p class="muted">${c.summary}</p>
        <p><strong>Mode:</strong> ${c.mode} • <strong>Duration:</strong> ${c.duration} • <strong>Schedule:</strong> ${c.schedule}</p>
        <div class="tags">${c.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <h2>What you'll learn</h2>
        <ul class="checklist">
          ${c.outcomes.map(o=>`<li>${o}</li>`).join('')}
        </ul>
        <h2>Syllabus</h2>
        <ul>
          ${c.syllabus.map(w=>`<li>${w}</li>`).join('')}
        </ul>
        <h2>Who is this for?</h2>
        <p>${c.audience}</p>
        <div class="cta-inner" style="margin-top:1rem">
          <p><strong>Next batch:</strong> ${c.nextBatch}</p>
          <p><strong>Fees:</strong> ₹${c.fees.toLocaleString('en-IN')}</p>
          <a class="btn btn-lg" href="contact.html">Enroll Now</a>
        </div>
      </article>
    `;
  });
})();
