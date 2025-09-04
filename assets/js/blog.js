(function(){
  const list = document.getElementById('post-list');
  const post = document.getElementById('post');
  const params = new URLSearchParams(location.search);
  const id = params.get('id');

  function renderList(items){
    list.innerHTML = '';
    items.forEach(p => {
      const el = document.createElement('article');
      el.className = 'card';
      el.innerHTML = `
        <h3>${p.title}</h3>
        <p class="muted">${p.excerpt}</p>
        <a class="btn btn-sm" href="post.html?id=${encodeURIComponent(p.id)}">Read</a>
      `;
      list.appendChild(el);
    });
  }

  function renderPost(p){
    post.innerHTML = `
      <h1>${p.title}</h1>
      <p class="muted">Published ${p.date}</p>
      <div>${p.html}</div>
      <p><a class="link" href="blog.html">← Back to blog</a></p>
    `;
  }

  fetch('assets/data/posts.json').then(r=>r.json()).then(data => {
    if(list) renderList(data);
    if(post){
      const p = data.find(x=> String(x.id) === String(id));
      if(!p){ post.innerHTML = '<p class="muted">Post not found.</p>'; return; }
      renderPost(p);
    }
  });
})();
