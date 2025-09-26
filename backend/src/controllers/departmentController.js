import Department from "../models/Department.js";
import Issue from "../models/Issue.js";

// Get all departments
export const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ isActive: true });
    
    // Get issue counts for each department
    const departmentsWithStats = await Promise.all(
      departments.map(async (dept) => {
        const totalIssues = await Issue.countDocuments({ department: dept._id });
        const resolvedIssues = await Issue.countDocuments({ 
          department: dept._id, 
          status: 'Resolved' 
        });
        
        return {
          ...dept.toObject(),
          totalIssues,
          resolvedIssues,
          avgResolutionTime: '2.5 days' // This would be calculated based on actual data
        };
      })
    );
    
    res.json({ success: true, data: departmentsWithStats });
  } catch (error) {
    console.error('Error fetching departments:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single department
export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    res.json({ success: true, data: department });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create department
export const createDepartment = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json({ success: true, data: department });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Department name already exists" 
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    res.json({ success: true, data: department });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: "Department name already exists" 
      });
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete department (soft delete)
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!department) {
      return res.status(404).json({ success: false, message: "Department not found" });
    }
    res.json({ success: true, message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};