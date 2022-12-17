import { generatePosts } from './data.js';
import { render } from './render.js';
import './uploadForm.js';
import './formValidation.js';
import './render.js';

const postsContainer = [];
generatePosts(postsContainer);
render();
