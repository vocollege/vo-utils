export const reducer = (state: any, action: any) => {
    const { key, values } = action;
    if (!key) {
        return { ...state, ...values };
    }
    return { ...state, [key]: values };
};
  
export const initialState = {
    roles: [],
    permissions: [],
    categoryRoles: "roles",
    categoryPermissions: "permissions",
}