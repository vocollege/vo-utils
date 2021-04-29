
export const reducer = (state: any, action: any) => {
    const { key, value } = action;
    if (!key) {
        return { ...state, ...value };
    }
    return { ...state, [key]: value };
};
  
export const initialState = {
    search: "",
    limit: 30,
    total: 0,
    page: 0,
    order: "ASC",
    orderBy: "TITLE",
    paginatorInfo: {
        currentPage: 0,
        hasMorePages: false,
    },
    openPortfolioForm: false,
    openFolderForm: false,
    openFileForm: false,   
    editElement: null
}