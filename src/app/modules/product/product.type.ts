export interface ProductCreateInput {
  sku?: string; // optional, backend-generated
  status?: "ACTIVE" | "INACTIVE";

  name: string;
  brand?: string;
  description: string;
  benefits: string;

  ageMin?: number;
  ageMax?: number; // corrected from maxAge

  basePrice?: number;
  price?: number;
  discountPrice?: number;
  currency?: string;
  stockQty?: number;
  lowStockThreshold?: number;
  isNew?: boolean;
  isTrending?: boolean;
  deliveryDaysMin?: number;
  deliveryDaysMax?: number;
  specs?: object;
  tags?: string[];
}
