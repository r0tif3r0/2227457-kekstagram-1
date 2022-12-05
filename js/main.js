import { generatePosts } from './data.js';
import { render } from './render.js';

const postsContainer = [];
generatePosts(postsContainer);
render(postsContainer);
