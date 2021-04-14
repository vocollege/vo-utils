export const reducer = (state: any, action: any) => {
    if (!action.field) {
        return action.item;
    }
    const { field, value } = action;
    return { ...state, [field]: value };
};