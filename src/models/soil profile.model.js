const mongoose = require('mongoose');

const soilProfileSchema = new mongoose.Schema({
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  soilType:{ type: String},
  waterRetention: { type: String };
});

const SoilProfile = mongoose.model('SoilProfile', soilProfileSchema);

module.exports = SoilProfile;
