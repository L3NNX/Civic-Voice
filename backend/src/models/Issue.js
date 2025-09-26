import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: [true, 'Issue title is required'],
    trim: true
  },
  title: {
    type: String,
    required: [true, 'Issue title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Issue description is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Issue category is required'],
    enum: ['Road Maintenance', 'Street Light', 'Waste Management', 'Parks & Recreation', 'Water Supply', 'Drainage','Sanitation', 'Other']
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  location: {
    address: {
      type: String,
      required: [true, 'Address is required']
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department assignment is required']
  },
  reporter: {
    name: {
      type: String,
      required: [true, 'Reporter name is required']
    },
    email: {
      type: String,
      required: [true, 'Reporter email is required']
    },
    phone: {
      type: String,
      required: [true, 'Reporter phone is required']
    }
  },
  images: [{
    type: String // URLs to uploaded images
  }],
  assignedTo: {
    type: String, // Staff member name
    trim: true
  },
  resolvedAt: {
    type: Date
  },
  notes: [{
    message: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
issueSchema.index({ status: 1, priority: 1, department: 1 });
issueSchema.index({ createdAt: -1 });

export default mongoose.model('Issue', issueSchema);