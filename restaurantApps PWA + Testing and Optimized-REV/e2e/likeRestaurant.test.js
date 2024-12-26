const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
    I.amOnPage('/#/Favorite');
});

Scenario('showing empty favorited restaurant',  ({ I }) => {
    I.seeElement('#resto-list');
    I.see('Belum ada restoran favorit.', '.empty-message');
});

Scenario('liking one restaurant', async({ I }) => {
    I.see('Belum ada restoran favorit.', '.empty-message');

    I.amOnPage('/');

    I.seeElement('.cta');
    const firstRestaurant = locate('.cta').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
  
    I.seeElement('.favorite-button');
    I.click('.favorite-button');
  
    I.amOnPage('/#/Favorite');
    I.seeElement('#resto-list');
    const likedRestaurantTitle = await I.grabTextFrom('.cta');
  
    assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unLiking one restaurant', async({ I }) => {
    
    I.amOnPage('/');

    I.seeElement('.cta');
    const firstRestaurant = locate('.cta').first();
    const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);
  
    I.seeElement('.favorite-button');
    I.click('.favorite-button');

    I.seeElement('.favorite-button');
    I.click('.favorite-button');
  
    I.amOnPage('/#/Favorite');
    I.seeElement('#resto-list');
    I.see('Belum ada restoran favorit.', '.empty-message');
});





