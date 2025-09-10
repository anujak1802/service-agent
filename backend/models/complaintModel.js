import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const id = uuidv4();

export const createComplaint = async (name, email, complaint) => {
  const result = await pool.query(
    `INSERT INTO complaints (name, email, complaint)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, complaint]
  );
  return result.rows[0];
};

export const getAllComplaints = async () => {
  const result = await pool.query(
    "SELECT * FROM complaints ORDER BY created_at DESC"
  );
  return result.rows;
};

export const updateComplaintStatus = async (id, currentStatus) => {
  // Determine the new status
  const newStatus = currentStatus === "Pending" ? "Resolved" : "Pending";

  const result = await pool.query(
    `
    UPDATE complaints
    SET status = $1::complaint_status
    WHERE id = $2
    RETURNING *;
    `,
    [newStatus, id] // newStatus is text, cast to ENUM in SQL
  );

  return result.rows[0];
};

// export const updateComplaintStatus = async (id, status) => {
//   const result = await pool.query(
//     `UPDATE complaints
//      SET status = COALESCE($1,
//        CASE WHEN status = 'Pending' THEN 'Resolved' ELSE 'Pending' END
//      )
//      WHERE id = $2
//      RETURNING *`,
//     [status || null, id]
//   );
//   return result.rows[0];
// };

export const deleteComplaint = async (id) => {
  const result = await pool.query(
    "DELETE FROM complaints WHERE id = $1 RETURNING *",
    [id]
  ); 
  return result.rows[0];
};
