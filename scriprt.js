// Сохранение введённых данных в localStorage
document.querySelectorAll('[contenteditable]').forEach(el => {
    const saved = localStorage.getItem(el.id);
    if (saved) el.innerText = saved;
  
    el.addEventListener('input', () => {
      localStorage.setItem(el.id, el.innerText);
    });
  });
  
  // Скачать как PDF (в виде печати)
  document.getElementById('downloadBtn').addEventListener('click', () => {
    window.print();
  });
  
  // Ripple-эффект
  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('ripple-target')) {
      const ripple = document.createElement('span');
      const rect = e.target.getBoundingClientRect();
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
      ripple.style.left = (e.clientX - rect.left - rect.width / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - rect.height / 2) + 'px';
      e.target.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    }
  });
  
