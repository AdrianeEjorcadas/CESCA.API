SELECT 
    CAST(DATEADD(DAY, DATEDIFF(DAY, 0, OrderDate), 0) AS DATE) AS TransactionDate,
    COUNT(*) AS Sales,
    SUM(FinalAmount) AS Revenue
FROM Orders
WHERE OrderDate >= '03/01/2026' 
  AND OrderDate <= '03/31/2026'
GROUP BY CAST(DATEADD(DAY, DATEDIFF(DAY, 0, OrderDate), 0) AS DATE)
ORDER BY TransactionDate;