
import { X, Building2, User, Mail, Phone, Users } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CreateDepartmentRequest } from '../types/api';
import { useEffect } from 'react';

const departmentSchema = z.object({
    name: z.string().min(2, 'Department name must be at least 2 characters'),
    head: z.string().min(2, 'Department head name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    staff: z.number().min(1, 'Staff count must be at least 1'),
    description: z.string().optional()
});

type DepartmentFormValues = z.infer<typeof departmentSchema>;

interface DepartmentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateDepartmentRequest) => Promise<void>;
    isLoading?: boolean;
}

interface DepartmentFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateDepartmentRequest) => Promise<void>;
    isLoading?: boolean;
    initialData?: Partial<CreateDepartmentRequest>; // 👈 NEW
}

export function DepartmentForm({ isOpen, onClose, onSubmit, isLoading, initialData = {} }: DepartmentFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<DepartmentFormValues>({
        resolver: zodResolver(departmentSchema),
        defaultValues: initialData || {},

    });

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);
    const handleFormSubmit = async (data: DepartmentFormValues) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleClose = () => {
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                        <Building2 className="w-6 h-6 text-indigo-600 mr-3" />
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Add New Department
                        </h2>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
                    {/* Department Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Department Name *
                        </label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                {...register('name')}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.name
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                placeholder="Enter department name"
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Department Head */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Department Head *
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                {...register('head')}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.head
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                placeholder="Enter department head name"
                            />
                        </div>
                        {errors.head && (
                            <p className="text-sm text-red-600 mt-1">{errors.head.message}</p>
                        )}
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email Address *
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    {...register('email')}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.email
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="department@city.gov"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Phone Number *
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    {...register('phone')}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.phone
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                        } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                    placeholder="(555) 123-4567"
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Staff Count */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Staff Count *
                        </label>
                        <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="number"
                                min="1"
                                {...register('staff', { valueAsNumber: true })}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.staff
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500'
                                    } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                placeholder="Enter number of staff members"
                            />
                        </div>
                        {errors.staff && (
                            <p className="text-sm text-red-600 mt-1">{errors.staff.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            placeholder="Brief description of department responsibilities..."
                        />
                    </div>

                    {/* Form Actions */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    {initialData ? "Saving..." : "Creating..."}
                                </div>
                            ) : (
                                initialData ? "Update Department" : "Create Department"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DepartmentForm;
