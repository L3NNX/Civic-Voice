import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    unique: true,
    trim: true
  },
  head: {
    type: String,
    required: [true, 'Department head is required'],
    trim: true
  },
  staff: {
    type: Number,
    required: [true, 'Staff count is required'],
    min: [1, 'Staff count must be at least 1']
  },
  description: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Department email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Department phone is required'],
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total issues (will be populated when needed)
departmentSchema.virtual('totalIssues', {
  ref: 'Issue',
  localField: '_id',
  foreignField: 'department',
  count: true
});

// Virtual for average resolution time (calculated field)
departmentSchema.virtual('avgResolutionTime').get(function() {
  return this._avgResolutionTime || '0 days';
});

export default mongoose.model('Department', departmentSchema);