const BASE_URL = 'https://restaurant-api.dicoding.dev';

const RestaurantAPI = {
  async listRestaurants() {
    const response = await fetch(`${BASE_URL}/list`);
    const jsonResponse = await response.json();
    return jsonResponse.restaurants;
  },

  async detailRestaurant(id) {
    const response = await fetch(`${BASE_URL}/detail/${id}`);
    const jsonResponse = await response.json();
    return jsonResponse.restaurant;
  },
};

export default RestaurantAPI;
