import { generatePosts } from './data.js';
import { render } from './render.js';
import './uploadForm.js';
import './formValidation.js';

const postsContainer = [];
generatePosts(postsContainer);
render(postsContainer);
