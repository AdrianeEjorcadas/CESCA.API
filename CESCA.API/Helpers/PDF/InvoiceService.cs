using CESCA.API.Models;
using CESCA.API.Models.Dtos.Invoice;
using CESCA.API.Models.Dtos.Order;
using MigraDoc.DocumentObjectModel;
using MigraDoc.DocumentObjectModel.Visitors;
using MigraDoc.Rendering;
using PdfSharp.Pdf;
using System.IO;

namespace CESCA.API.Helpers.PDF
{
    public static class InvoiceService
    {
        public static byte[] CreateInvoicePDF(IEnumerable<InvoiceOrderDTO> order, string invoiceNumber, decimal totalAmount)
        {
            // Create new MigraDoc document
            var document = new Document();
            var section = document.AddSection();

            //Header
            var header = section.AddParagraph("Cesca Pharmacy");
            header.Format.Font.Size = 20;
            header.Format.SpaceAfter = "0.5cm";

            section.AddParagraph($"Invoice #: {invoiceNumber}");
            section.AddParagraph("Customer: ");
            section.AddParagraph("Address: ");
            section.AddParagraph($"Cashier: {order.Select(o => o.Cashier).FirstOrDefault()}");
            section.AddParagraph($"Date: {DateTime.Now:MMMM dd yyyy hh:mm}");
            
            for (int i = 0; i < 3; i++)
            {
                section.AddParagraph().AddLineBreak();
            }

            //table
            var table = section.AddTable();
            table.Borders.Width = 0.75;

            table.AddColumn("7cm"); //product name
            table.AddColumn("2cm"); //price
            table.AddColumn("7cm"); //quantity

            //table header
            var row = table.AddRow();
            row.Shading.Color = Colors.LightGray;
            row.Cells[0].AddParagraph("Product Name").Format.Font.Bold = true;
            row.Cells[0].Format.Alignment = ParagraphAlignment.Center;
            row.Cells[1].AddParagraph("Price").Format.Font.Bold = true;
            row.Cells[1].Format.Alignment = ParagraphAlignment.Center;
            row.Cells[2].AddParagraph("Quantity").Format.Font.Bold = true;
            row.Cells[2].Format.Alignment = ParagraphAlignment.Center;

            //table data
            foreach (var item in order)
            {
                row = table.AddRow();
                row.Cells[0].AddParagraph(item.ProductName);
                row.Cells[0].Format.Alignment = ParagraphAlignment.Left;
                row.Cells[1].AddParagraph($"₱{item.Price:F2}");
                row.Cells[1].Format.Alignment = ParagraphAlignment.Center;
                row.Cells[2].AddParagraph(item.Quantity.ToString());
                row.Cells[2].Format.Alignment = ParagraphAlignment.Center;
            }

            section.AddParagraph().AddLineBreak();
            section.AddParagraph($"Total: ₱{totalAmount:F2}")
                .Format.Alignment = ParagraphAlignment.Right;

            //footer
            var footer = section.Footers.Primary;
            var paragraph = footer.AddParagraph();
            paragraph.AddText("CESCA Pharmacy POS");
            paragraph.Format.Alignment = ParagraphAlignment.Center;
            paragraph.Format.Font.Size = 9;
            paragraph.Format.Font.Color = Colors.Gray;


            //render pdf
            var renderer = new PdfDocumentRenderer
            {
                Document = document
            };
            
            renderer.RenderDocument();
            
            using var stream = new MemoryStream();
            renderer.PdfDocument.Save(stream, false);
            return stream.ToArray();
        }
    }
}