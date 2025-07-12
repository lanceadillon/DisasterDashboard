/**
 * @file index.js
 * @author Lance Dillon
 * @description This file sets up the Vuex store for the Disaster Social Media Dashboard.
 * It manages the application's state, including incoming social media posts,
 * and handles filtering logic for problem types and priority levels.
 * It also computes aggregated analytics data from the posts for display.
 *
 * @requires vuex - Vuex library for state management.
 */
import { createStore } from 'vuex';

const store = createStore({
  // This is where social media posts will be stored.
  state() {
    return {
      socialMediaPosts: [],
      // Store which problem types are currently selected (initially all true)
      selectedProblemTypes: {
        Fire: true,
        Flood: true,
        Power: true,
        Medical: true
      },
      // Store which priority levels are currently selected (initially all true)
      selectedPriorityLevels: {
        Low: true,
        Medium: true,
        High: true,
        Critical: true
      } // An array to hold all the incoming social media posts
    };
  },
  mutations: {
    /**
     * Adds a new social media post to the socialMediaPosts array.
     * @param {Object} state - The current state of the store.
     * @param {Object} post - The new social media post object to add.
     */
    addPost(state, post) {
      // Add the new post to the beginning of the array so the latest posts appear first
      state.socialMediaPosts.unshift(post);

      // Keep only the latest 500 posts:
      if (state.socialMediaPosts.length > 500) {
        state.socialMediaPosts.pop(); // Remove the oldest post from the end
      }
    },
    /**
     * Toggles the selection state of a problem type filter.
     * @param {Object} state - The current state of the store.
     * @param {Object} payload - { type: string, isChecked: boolean }
     */
    setProblemTypeFilter(state, { type, isChecked }) {
      if (state.selectedProblemTypes.hasOwnProperty(type)) {
        state.selectedProblemTypes[type] = isChecked;
      }
    },
    /**
     * Toggles the selection state of a priority level filter.
     * @param {Object} state - The current state of the store.
     * @param {Object} payload - { level: string, isChecked: boolean }
     */
    setPriorityLevelFilter(state, { level, isChecked }) {
      if (state.selectedPriorityLevels.hasOwnProperty(level)) {
        state.selectedPriorityLevels[level] = isChecked;
      }
    }
    // Any other features added here
  },
  actions: {
    /**
     * Receives a new social media post and commits it to the state.
     * This action is called from src/main.js when a new post arrives via WebSocket.
     * @param {Object} context - An object containing commit, dispatch, state, etc.
     * @param {Object} post - The new social media post object.
     */
    receiveNewPost({ commit }, post) {
      // Log the post to confirm it reached the action
      console.log('Action: receiveNewPost - committing post:', post);
      commit('addPost', post); // Commit the 'addPost' mutation to update the state
    },
    toggleProblemTypeFilter({ commit }, payload) {
      commit('setProblemTypeFilter', payload);
    },
    togglePriorityLevelFilter({ commit }, payload) {
      commit('setPriorityLevelFilter', payload);
    }
    //add actions for any other filtering here
  },

  getters: {
    /**
     * Returns all social media posts currently in the store.
     * @param {Object} state - The current state of the store.
     * @returns {Array} An array of all social media post objects.
     */
    allPosts: (state) => state.socialMediaPosts,
    /**
     * Returns the currently selected problem types.
     * @param {Object} state - The current state of the store.
     * @returns {Object} An object mapping problem types to their boolean selection status.
     */
    selectedProblemTypes: (state) => state.selectedProblemTypes,
    /**
     * Returns the currently selected priority levels.
     * @param {Object} state - The current state of the store.
     * @returns {Object} An object mapping priority levels to their boolean selection status.
     */
    selectedPriorityLevels: (state) => state.selectedPriorityLevels,

    /**
     * Returns a filtered list of social media posts based on selected problem types and priority levels.
     * This is a "getter" that depends on other getters/state, making it reactive.
     * @param {Object} state - The current state of the store.
     * @param {Object} getters - Other getters available in the store.
     * @returns {Array} An array of filtered social media post objects.
     */
    filteredPosts: (state, getters) => {
      const activeProblemTypes = Object.keys(getters.selectedProblemTypes)
        .filter(type => getters.selectedProblemTypes[type]);

      const activePriorityLevels = Object.keys(getters.selectedPriorityLevels)
        .filter(level => getters.selectedPriorityLevels[level]);

      // If no filters are active for a category, it means all should be shown for that category.
      // This handles cases where all checkboxes are unchecked, effectively showing nothing.
      // If a user unchecks all, it should show none for that category.

      return state.socialMediaPosts.filter(post => {
        const matchesProblemType = activeProblemTypes.includes(post.problem);
        const matchesPriorityLevel = activePriorityLevels.includes(post.priority);
        return matchesProblemType && matchesPriorityLevel;
      });
    },
    /**
     * Calculates and returns the analytics data in a structured format suitable for the table.
     * The structure will be:
     * {
     * Low: { Fire: count, Flood: count, Power: count, Medical: count, Total: count },
     * Medium: { ... },
     * High: { ... },
     * Critical: { ... },
     * Total: { Fire: count, Flood: count, Power: count, Medical: count, Total: count }
     * }
     * This getter will reactively update whenever `allPosts` changes.
     * @param {Object} state - The current state of the store.
     * @returns {Object} An object containing the aggregated analytics data.
     */
    analyticsData: (state) => {
      const problemTypes = ['Fire', 'Flood', 'Power', 'Medical'];
      const priorityLevels = ['Low', 'Medium', 'High', 'Critical'];

      // Initialize the analytics table structure
      const data = {};
      priorityLevels.forEach(level => {
        data[level] = {};
        problemTypes.forEach(type => {
          data[level][type] = 0;
        });
        data[level].Total = 0; // Initialize row total
      });

      // Initialize column totals and grand total
      data.Total = {};
      problemTypes.forEach(type => {
        data.Total[type] = 0;
      });
      data.Total.Total = 0; // Grand total

      // Populate the data object by iterating through all social media posts
      state.socialMediaPosts.forEach(post => {
        const { problem, priority } = post;

        // Increment specific cell
        if (data[priority] && data[priority][problem] !== undefined) {
          data[priority][problem]++;
        }

        // Increment row total
        if (data[priority] && data[priority].Total !== undefined) {
          data[priority].Total++;
        }

        // Increment column total
        if (data.Total[problem] !== undefined) {
          data.Total[problem]++;
        }

        // Increment grand total
        data.Total.Total++;
      });

      return data;
    }
    //add more getters here for any new features
  }
});

export default store;