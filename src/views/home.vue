<template>
  <div class="home-container p-6 md:p-10 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50">
    <div class="max-w-3xl w-full bg-white rounded-lg shadow-xl p-8 md:p-10 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
        Welcome to the <span class="text-blue-600">Disaster Social Media Dashboard</span>
      </h1>

      <p class="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
        In a real-world scenario, this application would serve as a critical tool for emergency responders and organizations, providing immediate situational awareness during natural disasters or crises. By continuously monitoring and analyzing social media posts in real-time, the system automatically categorizes incoming information by problem type—such as fire, flood, power outages, or medical emergencies—and assigns a priority level from low to critical.
      </p>

      <p class="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
        This allows users to quickly identify urgent situations via the "Live Feed," which displays a dynamic stream of filtered posts, or gain a comprehensive overview of evolving events through the "Analytics" page, offering summarized statistics to inform rapid and effective disaster response efforts.
      </p>

      <div class="navigation-guidance mt-8 pt-6 border-t-2 border-gray-100">
        <p class="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
          Ready to explore?
        </p>
        <div class="flex flex-col md:flex-row justify-center gap-4">
          <router-link to="/livefeed" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            View Live Feed
          </router-link>
          <router-link to="/analytics" class="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            See Analytics
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
/* No specific scoped styles needed as Tailwind handles the layout and aesthetics */
</style>