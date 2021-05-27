export const reducer = (state: any, action: any) => {
  if (!action.field) {
    return { ...state, ...action.item };
  }
  const { field, value } = action;
  return { ...state, [field]: value };
};
