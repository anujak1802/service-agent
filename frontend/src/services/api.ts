const API_BASE_URL = 'http://localhost:4000'; // Update with your backend URL

// Complaint interface
export interface Complaint {
  created_at: string;
  _id?: string;
  id: string;
  name: string;
  email: string;
  complaint: string;
  status: 'Pending' | 'Resolved';
}

// Add a new complaint
export const addComplaint = async (complaintData: Omit<Complaint, 'id' | 'submissionDate' | 'status'>): Promise<Complaint> => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(complaintData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding complaint:', error);
    throw error;
  }
};

// Fetch all complaints
export const fetchComplaints = async (): Promise<Complaint[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw error;
  }
};
export const toggleComplaintStatus = async (id: string, currentStatus: "Pending" | "Resolved") => {
  const res = await fetch(`${API_BASE_URL}/complaints/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: currentStatus }), // send current status
  });

  if (!res.ok) {
    throw new Error("Failed to toggle status");
  }

  return res.json(); // returns updated complaint
};

// Delete a complaint
export const removeComplaint = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/complaints/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error deleting complaint:', error);
    throw error;
  }
};