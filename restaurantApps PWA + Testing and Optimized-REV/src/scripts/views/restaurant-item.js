const createRestaurantItemTemplate = (restaurant) => `
  <div class="lazyload restaurant-item" tabindex="0">
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" 
         alt="Restaurant image of ${restaurant.name}" />
    <h3>${restaurant.name}</h3>
    <p>City: ${restaurant.city}</p>
    <p>Rating: ${restaurant.rating}</p>
    <a href="#/detail/${restaurant.id}" class="cta">View Details</a>
  </div>
`;

export default createRestaurantItemTemplate;
