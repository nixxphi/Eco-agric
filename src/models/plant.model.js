import plants from './plants.js'
export const plants;

class Plant {
  constructor(name, description, careInstructions) {
    this.name = name;
    this.description = description;
    this.careInstructions = careInstructions;
  }
}

export default Plant;
