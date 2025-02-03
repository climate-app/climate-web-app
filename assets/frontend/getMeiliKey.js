/**
 * Get key from endpoint
 * @returns object with key "key"
 */
async function getMeiliKey() {
  try {
    const response = await fetch('/meilikey');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.key; // Return the API key
  } catch (error) {
    console.error('Error fetching API key:', error);
    // Handle the error appropriately, e.g., display a message to the user
    return null; // Or throw the error if you want to stop execution
  }
}