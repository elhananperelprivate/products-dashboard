import { Product } from '../types';

export function getUniqueProductId(products: Product[]) {
  // Handle empty array or invalid input
  if (!products || !Array.isArray(products) || products.length === 0) {
    return -1; // Or any default value indicating an error
  }

  // Use a Set for efficient existence checking of product IDs
  const existingIds = new Set(products.map((product) => product.id));

  // Start with a large enough candidate ID (assuming positive integer IDs)
  let candidateId = products.length + 1;

  // Loop until a unique ID is found
  while (existingIds.has(candidateId)) {
    candidateId++;
  }

  return candidateId;
}
