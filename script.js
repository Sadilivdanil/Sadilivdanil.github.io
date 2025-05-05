document.getElementById('downloadBtn').addEventListener('click', function() {
  const btn = this;
  btn.disabled = true;
  btn.textContent = 'Генерация PDF...';
  
  const element = document.querySelector('.resume');
  
  const options = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    logging: true,
    backgroundColor: '#FFFFFF',
    scrollX: 0,
    scrollY: 0,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight
  };
  
  html2canvas(element, options).then(canvas => {
    const pdf = new jspdf.jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgWidth = pdf.internal.pageSize.getWidth() - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Добавляем страницу, если контент не помещается
    let heightLeft = imgHeight;
    let position = 10; // начальная позиция Y
    const pageHeight = pdf.internal.pageSize.getHeight() - 20;
    
    if (heightLeft < pageHeight) {
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
    } else {
      while (heightLeft > 0) {
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        
        // Добавляем новую страницу, если остался контент
        if (heightLeft > 0) {
          pdf.addPage();
          position = 10; // сбрасываем позицию для новой страницы
        }
      }
    }
    
    // Форсируем скачивание (а не просмотр)
    pdf.save('resume.pdf');
    
    // Альтернативный вариант для гарантированного скачивания
    // const pdfBlob = pdf.output('blob');
    // const url = URL.createObjectURL(pdfBlob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'resume.pdf';
    // document.body.appendChild(a);
    // a.click();
    // setTimeout(() => {
    //   document.body.removeChild(a);
    //   URL.revokeObjectURL(url);
    // }, 100);
    
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
  }).catch(error => {
    console.error('Ошибка при генерации PDF:', error);
    alert('Произошла ошибка при создании PDF. Пожалуйста, попробуйте снова.');
    btn.disabled = false;
    btn.textContent = 'Скачать PDF';
  });
});
