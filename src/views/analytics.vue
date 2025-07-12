<template>
  <div class="analytics-container p-4">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Social Media Analytics</h1>

    <div v-if="Object.keys(analyticsData).length === 0 || analyticsData.Total.Total === 0"
         class="text-center text-gray-500 text-lg mt-10">
      <p>No social media posts received yet for analytics. Waiting for data...</p>
    </div>

    <div v-else class="analytics-table-wrapper bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority \ Problem
            </th>
            <th v-for="problem in problemTypes" :key="problem" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {{ problem }}
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-100">
              Total
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="priority in priorityLevels" :key="priority">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50">
              {{ priority }}
            </td>
            <td v-for="problem in problemTypes" :key="problem" class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
              {{ analyticsData[priority][problem] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 bg-gray-100">
              {{ analyticsData[priority].Total }}
            </td>
          </tr>
          <!-- Total Row -->
          <tr class="bg-gray-100 font-bold">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 uppercase">
              Total
            </td>
            <td v-for="problem in problemTypes" :key="problem" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ analyticsData.Total[problem] }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ analyticsData.Total.Total }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AnalyticsPage',
  data() {
    return {
      // These arrays are used for iterating over table headers/rows
      problemTypes: ['Fire', 'Flood', 'Power', 'Medical'],
      priorityLevels: ['Low', 'Medium', 'High', 'Critical']
    };
  },
  computed: {
    // Map the new analyticsData getter from the Vuex store
    ...mapGetters(['analyticsData'])
  }
};
</script>

<style scoped>
/* You can add specific styles for this component here if needed,
   but Tailwind CSS classes are used for most styling directly in the template. */
</style>
