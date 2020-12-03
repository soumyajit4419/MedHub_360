const mongoose = require("mongoose");

const schema = mongoose.Schema;

const docSugar = schema({
  date: { type: String, required: true },
  bloodGlucoseF: { type: String, required: true },
  bloodGlucosePP: { type: String, required: true },
});

const docBloodCount = new schema({
  date: { type: String, required: true },
  hemoglobin: { type: String, required: true },
  rbcCount: { type: String, required: true },
  platelateCount: { type: String, required: true },
});

const docSchema = new schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true },
  age: { type: String, required: true },
  sex: { type: String, required: true },
  height: { type: String, default: 100 },
  weight: { type: String, default: 30 },
  bloodPressure: { type: String, default: "120/80" },
  sugar: { type: [docSugar], default: [] },
  bloodCount: { type: [docBloodCount], default: [] },
});

module.exports = mongoose.model("DoctorDb", docSchema);
