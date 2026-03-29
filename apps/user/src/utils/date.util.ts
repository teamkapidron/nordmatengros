export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('nb-NO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
