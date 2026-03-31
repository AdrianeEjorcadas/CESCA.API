export function getDaysInMonth(year: number, month: number): string[] {
  const date = new Date(year, month, 1);
  const days: string[] = [];
  while (date.getMonth() === month) {
    days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    date.setDate(date.getDate() + 1);
  }
  return days;
}
