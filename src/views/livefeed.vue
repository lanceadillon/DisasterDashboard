<template>
  <div class="live-feed-container p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Live Social Media Feed</h1>

    <!-- Filtering checkboxes -->
    <div class="filter-controls bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 class="text-xl font-semibold mb-4 text-gray-700">Filter Posts</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Problem Type Filters -->
        <div>
          <h3 class="font-medium text-gray-800 mb-2">Problem Type:</h3>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <label v-for="(isChecked, type) in problemTypes" :key="type" class="inline-flex items-center">
              <input type="checkbox"
                     class="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                     :checked="isChecked"
                     @change="toggleProblemType(type, $event.target.checked)">
              <span class="ml-2 text-gray-700">{{ type }}</span>
            </label>
          </div>
        </div>

        <!-- Priority Level Filters -->
        <div>
          <h3 class="font-medium text-gray-800 mb-2">Priority Level:</h3>
          <div class="flex flex-wrap gap-x-6 gap-y-2">
            <label v-for="(isChecked, level) in priorityLevels" :key="level" class="inline-flex items-center">
              <input type="checkbox"
                     class="form-checkbox h-4 w-4 text-purple-600 rounded focus:ring-purple-500"
                     :checked="isChecked"
                     @change="togglePriorityLevel(level, $event.target.checked)">
              <span class="ml-2 text-gray-700">{{ level }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Display the live feed of social media posts -->
    <div v-if="filteredPosts.length === 0" class="text-center text-gray-500 text-lg mt-10">
      <p>No posts match the current filters or no posts received yet. Waiting for data...</p>
    </div>

    <div v-else class="post-list grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="post in filteredPosts" :key="post.id" class="post-card relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 p-4 pb-12">
        <!-- Top section: Image, Name, and Date -->
        <div class="flex items-center mb-3">
          <!-- Smaller Image (w-10 = 40px, h-10 = 40px) -->
          <img :src="post.image" :alt="post.name" class="w-10 h-10 rounded-full mr-3 object-cover border-2 border-blue-400 flex-shrink-0"
               onerror="this.onerror=null;this.src='https://placehold.co/40x40/60A5FA/FFFFFF?text='+this.alt.charAt(0)">
          <div class="flex flex-col min-w-0">
            <h2 class="text-lg font-semibold text-gray-900 truncate">{{ post.name }}</h2>
            <p class="text-xs text-gray-500">{{ new Date(post.timestamp).toLocaleString() }}</p>
          </div>
        </div>

        <!-- Content of the Post - Now indented to align with Name/Date -->
        <p class="text-gray-700 mb-4 text-sm leading-relaxed ml-[3.25rem] text-left">
          {{ post.content }}
        </p>

        <!-- Disaster Type and Severity in the Lower Right -->
        <div class="absolute bottom-4 right-4 flex flex-wrap gap-2 text-xs">
          <span :class="getProblemBadgeClass(post.problem)">{{ post.problem }}</span>
          <span :class="getPriorityBadgeClass(post.priority)">{{ post.priority }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'; // Import mapActions helper

export default {
  name: 'LiveFeedPage',

  computed: {
    // Map the new getters from the Vuex store
    ...mapGetters([
      'allPosts', // Still available if you need it, but we'll use filteredPosts
      'selectedProblemTypes',
      'selectedPriorityLevels',
      'filteredPosts' // This is the new reactive list we'll display
    ]),
    // Create computed properties to easily access the filter objects in the template
    problemTypes() {
      return this.selectedProblemTypes;
    },
    priorityLevels() {
      return this.selectedPriorityLevels;
    }
  },
  methods: {
    // Map the new actions from the Vuex store
    ...mapActions([
      'toggleProblemTypeFilter',
      'togglePriorityLevelFilter'
    ]),
    // Methods to handle checkbox changes
    toggleProblemType(type, isChecked) {
      this.toggleProblemTypeFilter({ type, isChecked });
    },
    togglePriorityLevel(level, isChecked) {
      this.togglePriorityLevelFilter({ level, isChecked });
    },
    // Helper methods for badge styling (unchanged)
    getProblemBadgeClass(problem) {
      switch (problem) {
        case 'Fire': return 'bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium';
        case 'Flood': return 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium';
        case 'Power': return 'bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium';
        case 'Medical': return 'bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium';
        default: return 'bg-gray-100 text-gray-800 px-3 py-1 rounded-full font-medium';
      }
    },
    getPriorityBadgeClass(priority) {
      switch (priority) {
        case 'Low': return 'bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium';
        case 'Medium': return 'bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full font-medium';
        case 'High': return 'bg-orange-200 text-orange-800 px-3 py-1 rounded-full font-medium';
        case 'Critical': return 'bg-red-200 text-red-800 px-3 py-1 rounded-full font-medium';
        default: return 'bg-gray-200 text-gray-800 px-3 py-1 rounded-full font-medium';
      }
    }
  }
};
</script>
