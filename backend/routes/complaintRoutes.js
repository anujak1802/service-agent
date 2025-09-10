import express from "express";
import {
  addComplaint,
  fetchComplaints,
  toggleComplaintStatus,
  removeComplaint,
} from "../controllers/complaintControllers.js";

const router = express.Router();

router.post("/", addComplaint);        // POST /complaints
router.get("/", fetchComplaints);      // GET /complaints
router.patch("/:id", toggleComplaintStatus); // PATCH /complaints/:id
router.delete("/:id", removeComplaint); // DELETE /complaints/:id

export default router;
 