export const estimatePrice = (device) => {
  const { condition, defects, brand, model, storage } = device;

  // Base price based on brand and model (you can customize this)
  let basePrice = getBasePrice(brand, model);

  // Adjust price based on condition
  switch (condition) {
    case "new":
      basePrice *= 1.2; // 20% increase for new condition
      break;
    case "good":
      basePrice *= 1.0; // no change
      break;
    case "fair":
      basePrice *= 0.8; // 20% decrease for fair condition
      break;
    case "poor":
      basePrice *= 0.5; // 50% decrease for poor condition
      break;
    default:
      basePrice *= 0.5; // fallback for unknown condition
      break;
  }

  // Adjust price based on defects
  defects.forEach((defect) => {
    if (defect === "screen crack") {
      basePrice *= 0.7; // reduce price by 30%
    } else if (defect === "water damage") {
      basePrice *= 0.5; // reduce price by 50%
    }
    // Add more defects as necessary
  });

  // Adjust based on storage (higher storage generally increases value)
  if (storage > 128) {
    basePrice *= 1.1; // 10% increase for > 128GB
  } else if (storage < 64) {
    basePrice *= 0.9; // 10% decrease for < 64GB
  }

  return basePrice.toFixed(2); // Return price rounded to 2 decimal places
};

const getBasePrice = (brand, model) => {
  // Example base prices
  const priceList = {
    Apple: {
      "iPhone 13": 999,
      "iPhone 12": 799,
    },
    Samsung: {
      "Galaxy S21": 799,
      "Galaxy A52": 349,
    },
    // Add more brands and models as needed
  };

  return priceList[brand]?.[model] || 0; // Fallback to 0 if not found
};
