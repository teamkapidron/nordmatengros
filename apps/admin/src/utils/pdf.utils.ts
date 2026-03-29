import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function downloadImageFromHtmlString(
  htmlString: string,
  fileName = 'download.png',
  imageType: 'png' | 'jpeg' = 'png',
) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '-9999px';
  wrapper.style.left = '-9999px';
  document.body.appendChild(wrapper);

  const shadowRoot = wrapper.attachShadow({ mode: 'open' });

  const content = document.createElement('div');
  content.innerHTML = htmlString;
  content.style.background = '#fff';
  shadowRoot.appendChild(content);

  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(content, {
    backgroundColor: '#ffffff',
    useCORS: true,
  });

  const mimeType = imageType === 'jpeg' ? 'image/jpeg' : 'image/png';
  const image = canvas.toDataURL(mimeType);

  const link = document.createElement('a');
  link.href = image;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  document.body.removeChild(wrapper);
}

export async function downloadPdfFromHtmlString(
  htmlString: string,
  fileName = 'download.pdf',
  pageFormat: 'a4' | 'letter' = 'a4',
) {
  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '-9999px';
  wrapper.style.left = '-9999px';
  wrapper.style.width = '800px';
  document.body.appendChild(wrapper);

  const shadowRoot = wrapper.attachShadow({ mode: 'open' });

  const content = document.createElement('div');
  content.innerHTML = htmlString;
  content.style.background = '#fff';
  shadowRoot.appendChild(content);

  await new Promise((r) => requestAnimationFrame(r));

  const canvas = await html2canvas(content, {
    backgroundColor: '#ffffff',
    scale: 2,
    useCORS: true,
  });

  const imgData = canvas.toDataURL('image/png');

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: pageFormat,
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth;
  const imgHeight = (canvas.height * pdfWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  while (heightLeft > 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(fileName);

  document.body.removeChild(wrapper);
}
