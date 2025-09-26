import { useState, useEffect } from 'react';
import { Users, Edit, Trash2, Plus } from 'lucide-react';
import DepartmentForm from './DepartmentForm';
import { DepartmentDetailsModal } from './DepartmentDetailsModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { apiService } from '../services/api';
import type { Department, CreateDepartmentRequest } from '../types/api';

export function Departments() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiService.getDepartments();
      if (response.success) {
        setDepartments(response.data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      setError('Failed to load departments. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDepartment = async (data: CreateDepartmentRequest) => {
    setIsSubmitting(true);
    try {
      if (editingDepartment) {
        // update API
        const response = await apiService.updateDepartment(editingDepartment._id, data);
        if (response.success) {
          await fetchDepartments();
        }
      } else {
        // create API
        const response = await apiService.createDepartment(data);
        if (response.success) {
          await fetchDepartments();
        }
      }
      setIsFormOpen(false);
      setEditingDepartment(null);
    } catch (error) {
      console.error("Error saving department:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    setIsDeleting(true);
    try {
      const response = await apiService.deleteDepartment(id);
      if (response.success) {
        await fetchDepartments();
        setIsDeleteModalOpen(false);
        setDepartmentToDelete(null);
      }
    } catch (error) {
      console.error('Error deleting department:', error);
      alert('Failed to delete department. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditDepartment = (dept: Department) => {
    setEditingDepartment(dept);
    setIsFormOpen(true);
  };

  const handleAssignStaff = (dept: Department) => {
    console.log("Assign staff to:", dept);
    alert(`Assign staff modal for ${dept.name} not implemented yet`);
  };

  const handleViewDetails = async (id: string) => {
    try {
      const response = await apiService.getDepartment(id);
      if (response.success) {
        setSelectedDepartment(response.data);
        setIsDetailsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching department details:", error);
      alert('Failed to load department details. Please try again.');
    }
  };

  const handleDeleteClick = (dept: Department) => {
    setDepartmentToDelete(dept);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (departmentToDelete) {
      handleDeleteDepartment(departmentToDelete._id);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Departments
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage department information and staff assignments
          </p>
        </div>

        <button onClick={() => setIsFormOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Add Department</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
          <button
            onClick={fetchDepartments}
            className="mt-2 text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 font-medium"
          >
            Try Again
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading departments...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div key={dept._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-300" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {dept.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Head: {dept.head}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditDepartment(dept)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(dept)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Total Issues</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {dept.totalIssues || 0}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Avg Resolution Time</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {dept.avgResolutionTime || 'N/A'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Staff Count</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {dept.staff}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleAssignStaff(dept)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Assign Staff
                </button>
                <button
                  onClick={() => handleViewDetails(dept._id)}
                  className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  View Details
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      <DepartmentForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingDepartment(null);
        }}
        onSubmit={handleCreateDepartment}
        isLoading={isSubmitting}
        initialData={editingDepartment || undefined} // 👈 NEW
      />

      <DepartmentDetailsModal
        department={selectedDepartment}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedDepartment(null);
        }}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDepartmentToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action will permanently remove all department data."
        itemName={departmentToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
}