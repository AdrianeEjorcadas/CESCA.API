SELECT TOP 10 OrderId FROM Orders;
SELECT TOP 10* FROM OrderDetails od WHERE od.InvoiceNumber = 'CESCA-2026-00025';
SELECT ProductId FROM OrderDetails
WHERE ProductId NOT IN (
    SELECT ProductId FROM Products WHERE IsDeleted = 0
);


SELECT * FROM Products a
WHERE a.ProductId = '1D3632E5-D585-41A4-B371-22767507429F';

SELECT od.OrderItemId, od.ProductId
FROM OrderDetails od
LEFT JOIN Products p ON od.ProductId = p.ProductId
WHERE p.ProductId IS NULL;