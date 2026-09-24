export const CATEGORIES = [
  { id: "all", name: "All Medicines" },
  { id: "tablets", name: "Tablets & Capsules" },
  { id: "syrups", name: "Syrups" },
  { id: "injections", name: "Injections" },
  { id: "antibiotics", name: "Antibiotics" },
  { id: "vitamins", name: "Vitamins" },
];

export const PRODUCTS = [
  {
    id: "MED001",
    slug: "paracetamol-500mg",
    name: "Paracetamol 500mg",
    category: "tablets",
    sku: "PCM-500",
    description:
      "Paracetamol tablets for common healthcare requirements.",
    price: 1.2,
    moq: 100,
    unit: "strips",
    stock: 2500,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "MED002",
    slug: "amoxicillin-500mg",
    name: "Amoxicillin 500mg",
    category: "antibiotics",
    sku: "AMX-500",
    description:
      "Amoxicillin capsules for authorized healthcare procurement.",
    price: 4.5,
    moq: 100,
    unit: "strips",
    stock: 1200,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "MED003",
    slug: "vitamin-c-tablets",
    name: "Vitamin C Tablets",
    category: "vitamins",
    sku: "VTC-100",
    description:
      "Vitamin C tablets for pharmacy and healthcare requirements.",
    price: 2.8,
    moq: 100,
    unit: "boxes",
    stock: 1800,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1000&q=80",
  },

  {
    id: "MED004",
    slug: "cough-syrup",
    name: "Cough Relief Syrup",
    category: "syrups",
    sku: "CRS-100",
    description:
      "Liquid cough medicine for eligible pharmacy procurement.",
    price: 32,
    moq: 50,
    unit: "bottles",
    stock: 850,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "MED005",
    slug: "multivitamin-capsules",
    name: "Multivitamin Capsules",
    category: "vitamins",
    sku: "MVC-30",
    description:
      "Multivitamin capsules for regular healthcare supply.",
    price: 65,
    moq: 50,
    unit: "boxes",
    stock: 950,
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=80",
  },

  {
    id: "MED006",
    slug: "azithromycin-500mg",
    name: "Azithromycin 500mg",
    category: "antibiotics",
    sku: "AZM-500",
    description:
      "Azithromycin tablets for authorized medical procurement.",
    price: 7.5,
    moq: 100,
    unit: "strips",
    stock: 0,
    image:
      "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=900&q=80",
  },
];

export function getProductBySlug(slug) {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductById(id) {
  return PRODUCTS.find((product) => product.id === id);
}

export function getCategoryName(categoryId) {
  const category = CATEGORIES.find(
    (category) => category.id === categoryId
  );

  return category?.name || categoryId;
}