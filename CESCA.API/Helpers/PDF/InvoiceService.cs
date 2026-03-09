using CESCA.API.Models;
using MigraDoc.DocumentObjectModel;
using MigraDoc.Rendering;
using PdfSharp.Pdf;

namespace CESCA.API.Helpers.PDF
{
    public class InvoiceService
    {
        public PdfDocument GetInvoice(Order order)
        {
            // Create new MigraDoc document
            var document = new Document();
            var section = document.AddSection();

            // Example content
            section.AddParagraph($"Invoice: {order.InvoiceNumber}");
            section.AddParagraph($"Date: {order.OrderDate:MMMM dd, yyyy}");
            section.AddParagraph($"Processed By: {order.ProcessBy}");
            section.AddParagraph($"Status: {order.Status}");
            section.AddParagraph($"Final Amount: {order.FinalAmount:C}");

            // Render to PDF
            var pdfRenderer = new PdfDocumentRenderer(true)
            {
                Document = document
            };
            pdfRenderer.RenderDocument();

            // Return the PDFsharp PdfDocument
            return pdfRenderer.PdfDocument;
        }
    }
}