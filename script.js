document.getElementById('downloadBtn').addEventListener('click', function() {
  const btn = this;
  btn.disabled = true;
  btn.textContent = 'Генерация PDF...';
  
  // Выбираем элемент резюме
  const element = document.querySelector('.resume');
  
  // Настройки для html2canvas
  const options = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
    backgroundColor: '#FFFFFF'
  };
  
  // Создаем изображение из HTML
  html2canvas(element, options).then(canvas => {
    // Создаем PDF документ
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');
    
    // Рассчитываем размеры для PDF
    const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // -20 для отступов
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    // Добавляем изображение в PDF
    pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth, pdfHeight);
    
    // Скачиваем PDF
    pdf.save('resume.pdf');
    
    // Возвращаем кнопку в исходное состояние
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
  }).catch(error => {
    console.error('Ошибка при генерации PDF:', error);
    alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте снова.');
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
  });
});
