import pool from "./db.js";

export const createTableIfNotExists = async () => {
  try {
    // 1️⃣ Ensure pgcrypto extension exists
    try {
      await pool.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
      console.log("✅ pgcrypto extension ready");
    } catch (err) {
      console.warn("⚠️ pgcrypto extension could not be created:", err.message);
    }

    // 2️⃣ Create ENUM type for status if it doesn't exist
    const enumCheck = await pool.query(
      `SELECT 1 FROM pg_type WHERE typname = 'complaint_status';`
    );

    if (enumCheck.rows.length === 0) {
      await pool.query(
        `CREATE TYPE complaint_status AS ENUM ('Pending', 'Resolved');`
      );
      console.log("✅ complaint_status ENUM created");
    } else {
      console.log("✅ complaint_status ENUM already exists");
    }

    // 3️⃣ Create table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS complaints (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        email text NOT NULL,
        complaint text NOT NULL,
        status complaint_status NOT NULL DEFAULT 'Pending',
        created_at timestamp with time zone DEFAULT now()
      );
    `);

    console.log("✅ complaints table is ready with ENUM status");
  } catch (err) {
    console.error("Error creating complaints table:", err);
  }
};
