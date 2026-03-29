export function getPagination(page?: string, limit?: string) {
  const pageNumber = parseInt(page ?? '1', 10);
  const limitNumber = parseInt(limit ?? '10', 10);
  const skip = (pageNumber - 1) * limitNumber;

  return { page: pageNumber, limit: limitNumber, skip };
}
