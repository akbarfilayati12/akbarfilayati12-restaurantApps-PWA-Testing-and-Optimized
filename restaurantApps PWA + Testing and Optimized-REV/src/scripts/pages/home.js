import RestaurantApi from '../api/restaurant-api';
import createRestaurantItemTemplate from '../views/restaurant-item';

const HomePage = {
  async render() {
    return `
      <section class="hero">
      <picture>
        <source media="(max-width: 600px)" srcset="images/heros/hero-image_3-small.jpg">
        <img src='images/heros/hero-image_3-large.jpg' class="lazyload hero-image"
             alt="Delicious food in a restaurant" />
      </picture>
        <div class="hero__overlay">
          <h1>Find the Best Restaurants Here</h1>
          <p>Your culinary journey starts here</p>
        </div>
      </section>
      <section class="restaurant-list">
        <h2>Featured Restaurants</h2>
        <div id="restaurant-container" class="restaurant-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantApi.listRestaurants();
    const restaurantContainer = document.querySelector('#restaurant-container');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default HomePage;
