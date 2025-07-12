/**
 * @file index.js
 * @author Lance Dillon
 * @description This file configures the Vue Router for the Disaster Social Media Dashboard application.
 * It defines the routes for the home page, live feed, and analytics page,
 * enabling client-side navigation within the application.
 *
 * @requires vue-router - Vue.js official router.
 * @requires Home.vue - Component for the home page.
 * @requires LiveFeed.vue - Component for displaying the live social media feed.
 * @requires Analytics.vue - Component for displaying social media analytics.
 */
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import LiveFeed from '../views/livefeed.vue';
import Analytics from '../views/analytics.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/livefeed',
    name: 'Live Feed',
    component: LiveFeed
  },
  {
    path: '/analytics',
    name: 'Analytics', 
    component: Analytics
  }
];

const router = createRouter({
  history: createWebHistory(), // Uses HTML5 History API for clean URLs
  routes
});

export default router;