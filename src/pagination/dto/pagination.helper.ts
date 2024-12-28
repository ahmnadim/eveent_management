export function paginateResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
) {
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    meta: {
      totalItems: total,
      itemCount: data.length,
      totalPages,
      currentPage: page,
    },
  };
}
