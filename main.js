import { router } from './navigation/router.js';

// eventos das rotas

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
