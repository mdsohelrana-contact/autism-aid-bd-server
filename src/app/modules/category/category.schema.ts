import { z } from "zod";

// --- Create Category ---
export const createCategorySchema = z.object({
  body: z.object({
    parentId: z.string().cuid().nullable().optional(),
    // Translation create করার জন্য nested array
    translations: z
      .array(
        z.object({
          locale: z.string().min(2).max(10),
          name: z.string().min(2),
          slug: z.string().min(2),
          description: z.string().optional(),
        })
      )
      .min(1, "At least one translation is required"),
  }),
});

// --- Update Category ---
export const updateCategorySchema = z.object({
  body: z.object({
    parentId: z.string().cuid().nullable().optional(),
    // Update translations optional
    translations: z
      .array(
        z.object({
          id: z.string().cuid().optional(), // যদি update করতে হয়
          locale: z.string().min(2).max(10),
          name: z.string().min(2),
          slug: z.string().min(2),
          description: z.string().optional(),
        })
      )
      .optional(),
  }),
});
