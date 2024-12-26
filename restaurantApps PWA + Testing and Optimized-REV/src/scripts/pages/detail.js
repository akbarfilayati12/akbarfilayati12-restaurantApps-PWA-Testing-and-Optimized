import RestaurantAPI from '../api/restaurant-api';
import RenderHelper from '../utils/render-helper';
import LikeButtonPresenter from '../utils/like-button-presenter';

const DetailPage = {
  async render() {
    return `
      <section id="restaurant-detail" class="restaurant-detail"></section>
    `;
  },

  async afterRender() {
    const url = window.location.hash.slice(1).toLowerCase().split('/')[2];
    const restaurantDetail = document.querySelector('#restaurant-detail');

    try {
      const restaurant = await RestaurantAPI.detailRestaurant(url);
      // console.log(restaurant);
      // const isFavorited = await FavoriteRestaurantDB.getRestaurant(
      // 	restaurant.id,
      // );

      // Render detail restoran
      restaurantDetail.innerHTML =
				RenderHelper.createRestaurantDetailTemplate(restaurant);
      // restaurantDetail.innerHTML += RenderHelper.createFavoriteButtonTemplate(
      // 	!!isFavorited,
      // );

      // const favoriteButton = document.querySelector('#favoriteButton');
      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: restaurant?.id,
          name: restaurant?.name,
          rating: restaurant?.rating,
          city: restaurant?.city,
          description: restaurant?.description,
          pictureId: restaurant?.pictureId,
        },
      });
      // favoriteButton.addEventListener('click', async () => {
      //   const isFavorited = await FavoriteRestaurantDB.getRestaurant(restaurant.id);
      //   if (isFavorited) {
      //     await FavoriteRestaurantDB.deleteRestaurant(restaurant.id);
      //     alert('Removed from favorites');
      //   } else {
      //     await FavoriteRestaurantDB.putRestaurant(restaurant);
      //     alert('Added to favorites');
      //   }
      //   favoriteButton.innerHTML = RenderHelper.createFavoriteButtonTemplate(!isFavorited);
      // });
    } catch (error) {
      console.error('Error fetching restaurant details:', error);

      // Fallback untuk mode offline
      restaurantDetail.innerHTML = `
        <p class="offline-message">Tidak dapat menampilkan detail restoran. Pastikan koneksi internet Anda stabil.</p>
      `;
    }
  },
};

export default DetailPage;
