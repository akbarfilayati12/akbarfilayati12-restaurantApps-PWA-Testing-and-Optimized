import FavoriteRestaurantDB from '../idb/favorite-restaurant-db';

import {
  createLikeButtonTemplate,
  createUnLikeButtonTemplate,
} from '../views/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, resto }) {
    this._likeButtonContainer = likeButtonContainer;
    this._resto = resto;
    console.log(resto, likeButtonContainer);
    this._favoriteMovies = FavoriteRestaurantDB;

    await this._renderButton();
  },

  async _renderButton() {
    // console.log();
    const { id } = this._resto;

    if (await this._isRestoExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isRestoExist(id) {
    const movie = await FavoriteRestaurantDB.getRestaurant(id);
    return !!movie;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantDB.putRestaurant(this._resto);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantDB.deleteRestaurant(this._resto.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
