import Plant from './plant.model';

const plants = {
  sandy: [
    new Plant('Cactus', 'Cacti are well-suited to sandy soil and require minimal water.', 'Water sparingly and provide plenty of sunlight.'),
    new Plant('Lavender', 'Lavender thrives in sandy soil and full sunlight.', 'Water deeply but infrequently and trim after flowering.'),
    new Plant('Rosemary', 'Rosemary prefers well-drained sandy soil and full sun.', 'Water moderately and prune regularly to maintain shape.'),
    new Plant('Succulents', 'Succulents come in many varieties and thrive in sandy soil with good drainage.', 'Water sparingly and provide plenty of sunlight.'),
    new Plant('Pine Trees', 'Many pine varieties grow well in sandy soil with moderate moisture.', 'Water occasionally during droughts and provide full sun.'),
  ],
  clay: [
    new Plant('Azalea', 'Azaleas prefer acidic clay soil and partial shade.', 'Keep soil consistently moist and add mulch to retain moisture.'),
    new Hosta('Hosta', 'Hostas grow well in moist clay soil and shade.', 'Water regularly and provide adequate drainage.'),
    new Plant('Cattails', 'Cattails are wetland plants that thrive in wet clay soil.', 'Keep soil constantly moist and provide full sun.'),
    new Plant('Ferns', 'Many fern varieties prefer moist clay soil and shade.', 'Water regularly and provide protection from harsh winds.'),
    new Plant('Hydrangeas', 'Hydrangeas grow well in moist clay soil with some sun exposure.', 'Water regularly and adjust watering based on flower color preference.'),
  ],
  loamy: [
    new Plant('Tomato', 'Tomatoes thrive in loamy soil with good drainage and full sun.', 'Water consistently and provide support for the vines.'),
    new Plant('Basil', 'Basil grows well in loamy soil and requires full sun.', 'Water regularly and pinch off flower buds to encourage leaf growth.'),
    new Plant('Pepper', 'Peppers prefer well-drained loamy soil and full sun.', 'Water consistently and fertilize regularly during fruiting season.'),
    new Plant('Carrot', 'Carrots grow well in loose, loamy soil and prefer full sun.', 'Water regularly and thin seedlings for proper growth.'),
    new Plant('Lettuce', 'Lettuce thrives in cool-season loamy soil with partial shade.', 'Water regularly and harvest outer leaves for continuous growth.'),
  ],
  silt: [
    new Plant('Corn', 'Corn grows well in fertile silt loam soil with full sun.', 'Water regularly and fertilize during growth stages.'),
    new Plant('Soybean', 'Soybeans thrive in well-drained silt loam soil with full sun.', 'Water regularly and inoculate seeds with nitrogen-fixing bacteria.'),
    new Plant('Wheat', 'Wheat prefers well-drained silt loam soil with cool winters.', 'Water moderately and provide good air circulation.'),
    new Plant('Alfalfa', 'Alfalfa grows well in deep, fertile silt loam soil with good drainage.', 'Water deeply and infrequently during the growing season.'),
    new Plant('Oats', 'Oats are well-suited to well-drained silt loam soil with cool temperatures.', 'Water moderately and provide full sun during early growth.'),
  ],
  peat: [
    new Plant('Blueberry', 'Blueberries require acidic peat moss soil with good drainage and full sun.', 'Keep soil consistently moist and fertilize with acidic fertilizer.'),
    new Plant('Cranberry', 'Cranberries thrive in acidic peat moss bogs with full sun.', 'Water regularly and maintain consistently moist soil.'),
    new Plant('Rhododendron', 'Rhododendrons prefer acidic peat moss soil with partial shade.', 'Keep soil consistently moist and mulch around the base to retain moisture.'),
    new Plant('Ferns', 'Some fern varieties thrive in moist peat moss soil with shade.', 'Water regularly and provide protection from harsh winds.'),
    new Plant('Venus Flytrap', 'Venus Flytraps require acidic peat moss soil with high humidity and full sun.', 'Keep soil consistently moist with distilled water and avoid overwatering.'),
  ],
};

export default plants;
