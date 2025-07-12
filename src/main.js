/**
 * @file main.js
 * @author Lance Dillon
 * @description This is the entry point for the Vue.js application.
 * It initializes the Vue application, integrates Vue Router and Vuex store,
 * and establishes a Socket.IO connection to the backend server to receive
 * real-time social media post updates.
 *
 * @requires vue - Vue.js framework for building user interfaces.
 * @requires App.vue - The root component of the Vue application.
 * @requires router - Vue Router instance for client-side navigation.
 * @requires store - Vuex store instance for centralized state management.
 * @requires socket.io-client - Socket.IO client library for real-time, bidirectional communication.
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { io } from 'socket.io-client'; 

console.log('Attempting to create Vue app...');
const app = createApp(App);

app.use(router);
app.use(store);

console.log('Attempting to connect to Socket.IO server at http://localhost:3000...');
const socket = io('http://localhost:3000'); // Connect to backend server

// Add listeners for connection status (useful for debugging)
socket.on('connect', () => {
  console.log('Socket.IO connected successfully!');
  socket.on('social_media_post', (post) => {
    console.log('Received post:', post); // Confirm receipt
    store.dispatch('receiveNewPost', post); // Dispatch to Vuex store
  });
});

socket.on('connect_error', (err) => {
  console.error('Socket.IO connection error:', err);
  // Handle error (e.g., show a message to the user)
});

socket.on('disconnect', (reason) => {
  console.log('Socket.IO disconnected:', reason);
  // Handle disconnect (e.g., try to reconnect, update UI)
});

// Make the 'socket' instance globally available to all components
// This allows access to `this.$socket` inside any component
app.config.globalProperties.$socket = socket;

app.mount('#app');
console.log('Vue app mounted.');