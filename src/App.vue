<template>
  <div id="app">
    <nav>
      <router-link to="/" active-class="active-link" exact-active-class="active-link">Home</router-link> |
      <router-link to="/livefeed" active-class="active-link">Live Feed</router-link> |
      <router-link to="/analytics" active-class="active-link">Analytics</router-link>
    </nav>
    <router-view></router-view> </div>
</template>

<script>
export default {
  name: 'Disaster Social Media Tracking'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none; /* Remove underline */
  padding: 0 10px; /* Add some spacing */
}

/* Style for the active link */
nav a.active-link {
  color: #42b983; /* Example color for active link */
  /* You can add more styles like border-bottom, background, etc. */
}
</style>