import { X, Building2, User, Mail, Phone, Users, Calendar, BarChart3, Clock, CheckCircle } from 'lucide-react';
import type { Department } from '../types/api';

interface DepartmentDetailsModalProps {
  department: Department | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DepartmentDetailsModal({ department, isOpen, onClose }: DepartmentDetailsModalProps) {
  if (!isOpen || !department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl mr-4">
                <Building2 className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{department.name}</h2>
                <p className="text-indigo-100">Department Details</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Basic Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-indigo-600" />
                Basic Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">Head:</div>
                  <div className="text-gray-900 dark:text-white font-medium">{department.head}</div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">Staff:</div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="text-gray-900 dark:text-white font-medium">{department.staff} members</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-600 dark:text-gray-400">Status:</div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    department.isActive 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {department.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-indigo-600" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</div>
                    <a href={`mailto:${department.email}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                      {department.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-gray-500" />
                  <div>
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Phone</div>
                    <a href={`tel:${department.phone}`} className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400">
                      {department.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-indigo-600" />
              Performance Metrics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-indigo-600 mb-1">{department.totalIssues || 0}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Issues</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-green-600 mb-1">{department.resolvedIssues || 0}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Resolved Issues</div>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="text-2xl font-bold text-orange-600 mb-1">{department.avgResolutionTime || 'N/A'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Avg Resolution Time</div>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          {department.description && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{department.description}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-3 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</div>
                  <div className="text-gray-900 dark:text-white">
                    {new Date(department.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-3 text-gray-500" />
                <div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</div>
                  <div className="text-gray-900 dark:text-white">
                    {new Date(department.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              Close
            </button>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors">
              Edit Department
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}