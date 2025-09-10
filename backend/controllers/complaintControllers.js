import {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../models/complaintModel.js";

// POST /complaints
export const addComplaint = async (req, res) => {
  try {
    const { name, email, complaint } = req.body;
    if (!name || !email || !complaint) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newComplaint = await createComplaint(name, email, complaint);
    res.status(201).json(newComplaint);
  } catch (err) {
    console.error("Error adding complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /complaints
export const fetchComplaints = async (req, res) => {
  try {
    const complaints = await getAllComplaints();
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching complaints:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// PATCH /complaints/:id
export const toggleComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await updateComplaintStatus(id, status);

    if (!updated) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("Error updating complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE /complaints/:id
export const removeComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteComplaint(id);

    if (!deleted) {
      return res.status(404).json({ error: "Complaint not found" });
    }
    res.json({ message: "Complaint deleted successfully" });
  } catch (err) {
    console.error("Error deleting complaint:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
