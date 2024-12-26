const createLikeButtonTemplate = () => `
    <button id="likeButton" aria-label="like this resto" class="favorite-button">
          🤍 Add to Favorites
        </button>`;

const createUnLikeButtonTemplate = () => `
    <button id="likeButton" aria-label="unlike this resto" class="favorite-button">
          ❤️ Remove from Favorites
        </button>`;

export { createLikeButtonTemplate, createUnLikeButtonTemplate };