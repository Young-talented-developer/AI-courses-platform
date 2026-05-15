-- Seed data for AI Courses Platform
-- This script initializes the database with categories, subcategories, and users

-- Insert Categories and SubCategories
-- Category 1: פיתוח תוכנה
INSERT INTO "Category" (id, name) VALUES (1, 'פיתוח תוכנה');
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (1, 'C', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (2, 'C++', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (3, 'JAVA', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (4, 'python', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (5, 'c#', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (6, 'rust', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (7, 'javascript', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (8, 'frontend frameworks', 1);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (9, 'db', 1);

-- Category 2: מדעים מדויקים
INSERT INTO "Category" (id, name) VALUES (2, 'מדעים מדויקים');
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (10, 'ביולוגיה', 2);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (11, 'כימיה', 2);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (12, 'פיזיקה', 2);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (13, 'בוטניקה', 2);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (14, 'מדעי החלל', 2);

-- Category 3: תרבות
INSERT INTO "Category" (id, name) VALUES (3, 'תרבות');
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (15, 'מוזיקה', 3);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (16, 'ספרות', 3);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (17, 'הסטוריה', 3);
INSERT INTO "SubCategory" (id, name, "categoryId") VALUES (18, 'אזרחות', 3);

-- Reset sequences to continue from the last inserted ID
SELECT setval('"Category_id_seq"', (SELECT MAX(id) FROM "Category"));
SELECT setval('"SubCategory_id_seq"', (SELECT MAX(id) FROM "SubCategory"));

-- Note: Users will be inserted by the seed.js script because we need to hash passwords