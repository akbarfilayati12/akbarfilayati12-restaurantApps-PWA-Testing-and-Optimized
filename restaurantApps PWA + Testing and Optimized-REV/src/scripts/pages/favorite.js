import FavoriteRestoIdb from '../idb/favorite-restaurant-db';
import createRestaurantItemTemplate from '../views/restaurant-item';

const Favorite = {
  async render() {
    return `
      <section id="favorite-resto">
        <h2 class="section-title">Restoran Favorit Anda</h2>
        <div id="resto-list" class="resto-list"></div>
      </section>
    `;
  },

  async afterRender() {
    // Menggunakan getAllRestaurants() bukan getAllRestos()
    const restos = await FavoriteRestoIdb.getAllRestaurants();
    const restoListContainer = document.querySelector('#resto-list');

    if (restos.length === 0) {
      restoListContainer.innerHTML = `
        <p class="empty-message">Belum ada restoran favorit.</p>
      `;
    } else {
      restos.forEach((resto) => {
        restoListContainer.innerHTML += createRestaurantItemTemplate(resto);
      });
    }
  },
};

export default Favorite;
