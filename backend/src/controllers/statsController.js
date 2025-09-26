import Issue from "../models/Issue.js";

// Get dashboard stats
export const getStats = async (req, res) => {
  try {
    const totalIssues = await Issue.countDocuments();
    const resolvedIssues = await Issue.countDocuments({ status: "Resolved" });
    const pendingIssues = await Issue.countDocuments({ status: { $in: ["Open", "In Progress"] } });

    // Group by department
    const issuesByDepartment = await Issue.aggregate([
      { $group: { _id: "$department", count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        totalIssues,
        resolvedIssues,
        pendingIssues,
        issuesByDepartment
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
