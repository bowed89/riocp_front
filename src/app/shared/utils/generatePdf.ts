import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = () => {
    const data = document.getElementById('pdfContent');

    if (data) {
        html2canvas(data, { scale: 1.5 }).then(canvas => {
            const imgWidth = 140; // Reducir el ancho de la imagen para que no esté tan ancha
            const pageHeight = 295;
            const pageWidth = 210;
            const margin = 10;

            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            const scaledHeight = imgHeight > (pageHeight - margin * 2) ? (pageHeight - margin * 2) : imgHeight;

            // Ajustar la posición para centrar el contenido
            const positionX = (pageWidth - imgWidth) / 2;
            const positionY = margin;

            const pdf = new jsPDF('p', 'mm', 'a4');

            // Convertir a JPEG con calidad ajustada
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.7), 'JPEG', positionX, positionY, imgWidth, scaledHeight);
            pdf.save(`${generarNumeroAleatorio()}.pdf`);
        });
    }
}

function generarNumeroAleatorio() {
    const numeroAleatorio = Math.floor(Math.random() * 10000000);
    return String(numeroAleatorio).padStart(10, '0');
}
