import HomePage from '../pages/home';
import DetailPage from '../pages/detail';
import Favorite from '../pages/favorite';

const routes = {
  '/': HomePage,
  '/detail/:id': DetailPage,
  '/favorite' : Favorite
};

export default routes;
