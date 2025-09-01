# 🛒 E-Commerce + AI Recommendation System  
Built with **Prisma + PostgreSQL**  

This schema powers a modern e-commerce platform with **AI-driven product recommendations**, advanced catalog management, order tracking, coupons, banners, blogging, and notifications.  

---

## 🚀 Features  
- **User Management** → Roles (Admin, Customer, Staff), addresses, auth-ready.  
- **Product Catalog** → Products, translations, media, categories, stock tracking.  
- **Orders & Payments** → Multi-status order lifecycle, payments, discounts, coupons.  
- **AI Recommendation Engine** → Context-aware symptom-to-product recommendations.  
- **Content System** → Blogs with localization, SEO metadata.  
- **Marketing** → Coupons, offer banners, personalized notifications.  
- **Optimized Performance** → Indexes for query speed, soft deletes, relations for cascading updates.  

---

## 📂 Models Overview  

### 👤 User & Address  
- **User** → Core entity (Admin / Customer / Staff).  
- **Address** → Multiple addresses per user, supports default flag.  

### 📦 Product Catalog  
- **Product** → Base entity with price, stock, embedding (for semantic search).  
- **ProductTranslation** → Multi-language content (name, slug, SEO, description).  
- **ProductMedia** → Images, videos, alt-text.  
- **Category** + **CategoryTranslation** → Hierarchical categories with localization.  
- **ProductOnCategory** → Many-to-many join table.  

### 🛒 Cart & Orders  
- **Cart** + **CartItem** → One cart per user, supports multiple items.  
- **Order** + **OrderItem** → Tracks checkout, product quantities, and pricing breakdown.  
- **Payment** → Supports multiple payment methods and statuses.  

### ⭐ Reviews & Stock  
- **Review** → Verified customer reviews, unique per user/product.  
- **StockLog** → History of stock updates with type and note.  

### 🎟 Coupons & Promotions  
- **Coupon** → Percentage or fixed, with validity periods and per-user limits.  
- **CouponProduct** + **CouponCategory** → Restrict coupons to specific products/categories.  
- **OfferBanner** → Targeted promotional banners (page + device type).  

### 🤖 AI Recommendation Engine  
- **AIRecommendation** → Stores user symptom/context queries.  
- **AIRecommendationProduct** → Links products with a relevance score and matched fields.  
- Designed for **AI-driven personalization** and **semantic product search**.  

### ✍️ Content & Notifications  
- **BlogPost** + **BlogPostTranslation** → Multi-lingual blog system with SEO.  
- **Notification** → User-targeted or global, supports order updates, promotions, system alerts.  

---

## 🧠 AI Recommendation Workflow  

1. **User Query**  
   - User enters symptom (e.g., `"autism symptoms"`) → stored in `AIRecommendation`.  
   - Context stored in JSON (age, gender, conditions, preferences).  

2. **Product Matching**  
   - Products matched using embeddings, rules, or AI models.  
   - Matches stored in `AIRecommendationProduct` with `relevanceScore` and `matchedFields`.  

3. **Result Delivery**  
   - API fetches top-ranked recommendations with full product data.  

---

## ⚡ Indexing & Optimization  

- **Products**  
  - Indexed by `status`, `price`, `trending/new`, `ratings`, `stock`.  
  - Embeddings stored in `Json?` field → optimized for vector similarity search (via pgvector or external service).  

- **Orders**  
  - Indexed by `userId`, `status`, `isPaid`, `createdAt`.  

- **AI Recommendation**  
  - Indexed by `symptom` and `relevanceScore`.  

- **Blog & Category**  
  - Indexed by `slug`, `locale`, and `title`.  

- **Offer Banners**  
  - Indexed by `status`, `priority`, `targetPage`, `deviceType`.  

---

## 🔒 Cascade Rules  

- **Products**  
  - Cascade delete for translations, media, categories, recommendations.  
- **Orders**  
  - Cascade delete for items & payments.  
- **User**  
  - Cascade delete for addresses, carts, orders, reviews, notifications.  

---

## 🔑 Enums  

- **Role** → `ADMIN | CUSTOMER | STAFF`  
- **ProductStatus** → `ACTIVE | INACTIVE | DRAFT`  
- **OrderStatus** → Full lifecycle: `PENDING → CONFIRMED → SHIPPED → DELIVERED → RETURNED`  
- **PaymentStatus** → Covers `PENDING, PAID, REFUNDED_PENDING, REFUNDED`  
- **CouponType** → `PERCENTAGE | FIXED`  
- **BlogStatus** → `DRAFT | PUBLISHED | ARCHIVED`  
- **NotificationType** → System + User events  

---

## 🛠 Developer Notes  

- All models mapped to snake_case tables via `@@map()`.  
- Use `onDelete: Cascade` for data integrity.  
- AI models can extend:  
  - `AIRecommendation.source` → `"chatbot" | "manual" | "doctor"`.  
  - `AIRecommendationProduct.matchedFields` → structured JSON (`{ matched: ["benefits", "tags"] }`).  
- Future expansion →  
  - Add `Wishlist` model.  
  - Integrate `pgvector` for faster embedding search.  
  - Event-driven notifications (Kafka, RabbitMQ, etc.).  

---

## 📊 Example Query (Prisma Client)  

```ts
// Create AI Recommendation with linked products
const rec = await prisma.aIRecommendation.create({
  data: {
    userId: user.id,
    symptom: "autism symptoms",
    context: { age: 7, gender: "male" },
    source: "chatbot",
    products: {
      create: [
        {
          product: { connect: { id: "prod123" } },
          relevanceScore: 0.92,
          matchedFields: { matched: ["benefits", "tags"] },
        },
      ],
    },
  },
  include: { products: { include: { product: true } } },
});
