export const categoryKeys = {
  all: ["category"] as const,
  getAllCategories: () => [...categoryKeys.all, "getAllCategories"] as const,
  addCategory: () => [...categoryKeys.all, "addCategory"] as const,
  deleteCategory: () => [...categoryKeys.all, "deleteCategory"] as const,
};
