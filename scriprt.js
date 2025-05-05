// Ripple effect (фиксированная позиция и центрирование)
document.querySelectorAll('.ripple').forEach(elem => {
  elem.style.position = 'relative'; // Важно для позиционирования ripple внутри
  elem.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    circle.classList.add('ripple-effect');
    circle.style.left = ${e.offsetX}px;
    circle.style.top = ${e.offsetY}px;
    this.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});

//Удаляем ripple-элементы перед скачиванием PDF
const downloadBtn = document.getElementById('download-btn');
if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    //Удаляем ripple-эффекты перед экспортом
    document.querySelectorAll('.ripple-effect').forEach(el => el.remove());

    const element = document.querySelector('.resume-container');
    const opt = {
      margin:       0.5,
      filename:     'resume.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  });
}

const editableFields = document.querySelectorAll('.editable');
editableFields.forEach((el, i) => {
  const fieldKey = editableField-${i};
  const saved = localStorage.getItem(fieldKey);
  if (saved) el.innerText = saved;

  el.addEventListener('input', () => {
    localStorage.setItem(fieldKey, el.innerText);
  });
});
