export const reducer = (state: any, action: any) => {
  const { key, values } = action;
  if (!key) {
    return { ...state, ...values };
  }
  return { ...state, [key]: values };
};

export const initialState = {
  data: [],
  search: "",
  limit: 100,
  total: 0,
  page: 0,
  order: "DESC",
  orderBy: "ID",
  paginatorInfo: {
    currentPage: 0,
    hasMorePages: false,
  },
};
