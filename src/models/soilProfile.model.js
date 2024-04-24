class SoilProfile {
  constructor(location, soilType, pHLevel, organicMatter, texture, drainage, nutrients, compaction, salinity, cec) {
    this.location = location;
    this.soilType = soilType;
    this.pHLevel = pHLevel;
    this.organicMatter = organicMatter;
    this.texture = texture;
    this.drainage = drainage;
    this.nutrients = nutrients;
    this.compaction = compaction;
    this.salinity = salinity;
    this.cec = cec;
  }
}

export default SoilProfile;
