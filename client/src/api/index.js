import axios from 'axios';

const url = 'http://localhost:500/posts';

export const fetchPosts = () => axios.get(url);