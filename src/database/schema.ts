export const migrations = [
`PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS schema_migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL, parent_id TEXT REFERENCES categories(id), created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS suppliers (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT, phone TEXT, metadata TEXT);
CREATE TABLE IF NOT EXISTS products (id TEXT PRIMARY KEY, name TEXT NOT NULL, brand TEXT, sku TEXT UNIQUE, barcode TEXT, category_id TEXT REFERENCES categories(id), supplier_id TEXT REFERENCES suppliers(id), quantity INTEGER NOT NULL DEFAULT 0, min_stock INTEGER NOT NULL DEFAULT 0, price REAL NOT NULL DEFAULT 0, location TEXT, color TEXT, material TEXT, metadata TEXT NOT NULL DEFAULT '{}', ocr_text TEXT, archived_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS product_images (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE, uri TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'primary', width INTEGER, height INTEGER, hash TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS embeddings (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE, image_id TEXT REFERENCES product_images(id) ON DELETE CASCADE, model TEXT NOT NULL, dimensions INTEGER NOT NULL, vector BLOB NOT NULL, normalized INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS stock_movements (id TEXT PRIMARY KEY, product_id TEXT NOT NULL REFERENCES products(id), type TEXT NOT NULL, quantity INTEGER NOT NULL, from_location TEXT, to_location TEXT, note TEXT, created_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS tags (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE); CREATE TABLE IF NOT EXISTS product_tags (product_id TEXT REFERENCES products(id) ON DELETE CASCADE, tag_id TEXT REFERENCES tags(id) ON DELETE CASCADE, PRIMARY KEY(product_id, tag_id));
CREATE VIRTUAL TABLE IF NOT EXISTS search_index USING fts5(product_id UNINDEXED, name, brand, sku, barcode, ocr_text, tags);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id); CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(barcode); CREATE INDEX IF NOT EXISTS idx_products_stock ON products(quantity, min_stock); CREATE INDEX IF NOT EXISTS idx_movements_product_date ON stock_movements(product_id, created_at DESC); CREATE INDEX IF NOT EXISTS idx_images_product ON product_images(product_id); CREATE INDEX IF NOT EXISTS idx_embeddings_product_model ON embeddings(product_id, model);`
];
