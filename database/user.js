import mongoose from 'mongoose';

// Connect database
mongoose.connect("mongodb+srv://nishthadobhaal2005_db_user:UO6WrXx3q1zwM9h1@cluster0.3jtk2j0.mongodb.net/civicdb?retryWrites=true&w=majority&appName=Cluster0");

// User schema
const userSchema = new mongoose.Schema({
  customId: { type: String, unique: true }, // CFU prefixed ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilepic: {
    type: String,
    default: "/images/uploads/default.jpg"
  },
  phone: { type: String },
  address: { type: String },
  latitude: { type: String },
  longitude: { type: String },
  role: { type: String, enum: ['citizen', 'admin', 'authority'], default: "citizen" },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'issue'
  }],
  // 👉 Custom ID for user (CFU + 6 digits)
    customId: {
      type: String,
      unique: true,
      default: function () {
        return "CFU" + Math.floor(100000 + Math.random() * 900000);
      },
    },
}, { timestamps: true });

// Pre-save hook for CFU id
userSchema.pre("save", function (next) {
  if (!this.customId) {
    this.customId = "CFU" + Math.floor(100000 + Math.random() * 900000); // CFU + 6 digit random
  }
  next();
});

// Export as ES module
const userModel = mongoose.model("user", userSchema);
export default userModel;
