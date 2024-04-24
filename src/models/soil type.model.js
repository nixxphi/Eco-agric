
class SoilType {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}
const soilTypes = [
  new SoilType('Sandy', 'Sandy soil has large particles and drains quickly. This makes it ideal for plants that require minimal water, such as cacti and succulents.'),
  new SoilType('Clay', 'Clay soil has small particles and retains water well. However, it can also become compacted and restrict drainage. Plants like azaleas and hostas thrive in moist clay soil with proper drainage management.'),
  new SoilType('Loamy', 'Loamy soil is a mixture of sand, silt, and clay, providing good drainage and fertility. This makes it suitable for a wide variety of plants, including tomatoes, peppers, and lettuce.'),
  new SoilType('Silt', `Silt loam soil has a fine, smooth texture and good water-holding capacity. It's ideal for crops like corn, soybeans, and wheat that require consistent moisture and nutrients.`),
  new SoilType('Peat', `Peat moss soil is acidic and holds a lot of moisture. It's well-suited for plants that prefer acidic conditions, such as blueberries, cranberries, and rhododendrons. However, it requires careful management to maintain proper moisture levels.`),
];

export default SoilType;
