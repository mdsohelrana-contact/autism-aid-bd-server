import slugify from "slugify";

export const generateSKU = (name: string) => {
  const base = slugify(name, { lower: true, strict: true });
  const random = Math.floor(1000 + Math.random() * 9000);
  return `${base}-${random}`;
};
