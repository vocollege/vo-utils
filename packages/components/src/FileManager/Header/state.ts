
export const reducer = (state: any, action: any) => {
    const { key, value } = action;
    if (!key) {
        return { ...state, ...value };
    }
    return { ...state, [key]: value };
};
  
export const initialState = {
    search: "",
    order: "ASC",
    orderBy: "TITLE",
}