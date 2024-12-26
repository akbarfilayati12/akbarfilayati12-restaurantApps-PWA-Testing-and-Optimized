const RenderHelper = {
  /**
	 * Fungsi untuk membuat daftar item restoran
	 * @param {Object} restaurant - Data restoran yang akan dirender
	 * @returns {string} - Template HTML untuk satu restoran
	 */
  createRestaurantItemTemplate(restaurant) {
    return `
        <article class="restaurant-item">
          <img class="lazyload restaurant-item__thumbnail"
               src="https://restaurant-api.dicoding.dev/images/medium/${
  restaurant.pictureId
}"
               alt="Image of ${restaurant.name}" />
          <div class="restaurant-item__content">
            <h3 class="restaurant-item__name"><a href="#/detail/${
  restaurant.id
}">${restaurant.name}</a></h3>
            <p class="restaurant-item__city">📍 ${restaurant.city}</p>
            <p class="restaurant-item__rating">⭐ ${restaurant.rating}</p>
            <p class="restaurant-item__description">${restaurant.description.slice(
    0,
    100,
  )}...</p>
          </div>
        </article>
      `;
  },

  /**
	 * Fungsi untuk membuat template detail restoran
	 * @param {Object} restaurant - Data detail restoran
	 * @returns {string} - Template HTML untuk detail restoran
	 */
  createRestaurantDetailTemplate(restaurant) {
    return `
        <div class="restaurant-detail__info">
          <h2>${restaurant.name}</h2>
          <img class="lazyload restaurant-detail__image" 
               src="https://restaurant-api.dicoding.dev/images/large/${
  restaurant.pictureId
}" 
               alt="Image of ${restaurant.name}" />
          <p>📍 Address: ${restaurant.address}, ${restaurant.city}</p>
          <p>⭐ Rating: ${restaurant.rating}</p>
          <p>${restaurant.description}</p>
        </div>
  
        <div class="restaurant-detail__menu">
          <h3>Menu</h3>
          <div class="restaurant-menu">
            <h4>Foods</h4>
            <ul>${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}</ul>
            <h4>Drinks</h4>
            <ul>${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}</ul>
          </div>
        </div>
  
        <div class="restaurant-detail__reviews">
          <h3>Customer Reviews</h3>
          <ul>
            ${restaurant.customerReviews
    .map(
      (review) => `
              <li>
                <p><strong>${review.name}</strong> (${review.date})</p>
                <p>${review.review}</p>
              </li>
            `,
    )
    .join('')}
          </ul>
        </div>

        <div id="likeButtonContainer"></div>
      `;
  },

  /**
	 * Fungsi untuk membuat tombol favorite
	 * @param {boolean} isFavorited - Status apakah restoran sudah difavoritkan
	 * @returns {string} - Template HTML untuk tombol favorite
	 */
  createFavoriteButtonTemplate(isFavorited) {
    return `
        <button id="favoriteButton" class="favorite-button">
          ${isFavorited ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      `;
  },
};

export default RenderHelper;
