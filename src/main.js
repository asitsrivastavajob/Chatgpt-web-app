// src/main.js

import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// Set your ChatGPT 3.5 API key
const apiKey = 'YOUR-KEY';

// Configure Axios with the API key
axios.defaults.headers.common['Authorization'] = `Bearer ${apiKey}`;

// Make Axios accessible within your Vue components
app.config.globalProperties.$axios = axios;

app.mount('#app');
