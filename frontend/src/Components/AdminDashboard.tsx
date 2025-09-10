import type { Complaint } from '../services/api';
import { useState, useEffect } from 'react';
import { fetchComplaints, toggleComplaintStatus, removeComplaint } from '../services/api';

function AdminDashboard() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Resolved'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchComplaints();
      setComplaints(data);

    } catch (err) {
      console.error('Error loading complaints:', err);
      setError('Failed to load complaints. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      setError(null);
      
      // Find the current complaint to get its status
      const complaintToUpdate = complaints.find(complaint => complaint.id === id);
      
      if (!complaintToUpdate) {
        throw new Error('Complaint not found');
      }
      
      // Call backend to toggle status
      const updatedComplaint = await toggleComplaintStatus(id, complaintToUpdate.status);

      // Update local state
      setComplaints(prevComplaints =>
        prevComplaints.map(complaint =>
          complaint.id === id ? updatedComplaint : complaint
        )
      );
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Failed to update complaint status. Please try again.');
    }
  };

  const handleDeleteComplaint = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this complaint?')) {
      try {
        setError(null);
        await removeComplaint(id);
        
        // Remove the complaint from the local state
        setComplaints(prevComplaints => 
          prevComplaints.filter(complaint => complaint.id !== id)
        );
      } catch (err) {
        console.error('Error deleting complaint:', err);
        setError('Failed to delete complaint. Please try again.');
      }
    }
  };

  const filteredComplaints = filterStatus === 'All' 
    ? complaints  // Show all complaints regardless of status
    : complaints.filter(complaint => complaint.status === filterStatus); // Filter by specific status

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 text-white">
            <h2 className="text-2xl font-bold">Complaint Dashboard</h2>
            <p className="mt-1 opacity-90">Manage and review customer complaints</p>
          </div>
          
          <div className="p-6">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {error}
                <button
                  onClick={() => setError(null)}
                  className="ml-auto text-red-700 hover:text-red-900"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            )}
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                All Complaints ({filteredComplaints.length})
              </h3>
              
              <div className="flex space-x-2">
                <button
                  onClick={loadComplaints}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Refresh
                </button>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : filteredComplaints.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No complaints found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {filterStatus === 'All' 
                    ? 'Get started by submitting a new complaint.' 
                    : `No ${filterStatus.toLowerCase()} complaints found.`}
                </p>
              </div>
            ) : (
              <div className="overflow-hidden border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name & Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaint
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{complaint.name}</div>
                          <div className="text-sm text-gray-500">{complaint.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{complaint.complaint}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(complaint.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleToggleStatus(complaint.id)}
                            className={`mr-3 ${complaint.status === 'Pending' ? 'text-blue-600 hover:text-blue-900' : 'text-yellow-600 hover:text-yellow-900'}`}
                          >
                            {complaint.status === 'Pending' ? 'Mark Resolved' : 'Mark Pending'}
                          </button>
                          <button
                            onClick={() => handleDeleteComplaint(complaint.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;