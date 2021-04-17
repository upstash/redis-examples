<template>
  <div class="text-lg min-h-screen flex flex-col justify-center text-center">
    <main
      class="flex-grow flex flex-col justify-center items-center space-y-6 py-10"
    >
      <h1 class="text-4xl font-bold">Welcome to my website</h1>

      <p class="">
        Get started by editing
        <code class="bg-gray-100">pages/index.js</code> and
        <code class="bg-gray-100">api/count.js</code>
      </p>

      <p class="">
        View Count: <b>{{ this.count }}</b>
      </p>

      <button
        class="bg-blue-600 text-white px-3 py-2 rounded"
        type="button"
        @click="getCount"
      >
        Manual Increment (+1)
      </button>
    </main>

    <footer class="py-6 border-t border-gray-200">
      <a
        href="https://vercel.com/integrations/upstash"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by <b>Vercel</b> and <b>Upstash</b>
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  head: {
    title: "Nuxt with Upstash"
  },
  data() {
    return {
      count: 0
    }
  },
  async asyncData() {
    const response = await fetch(process.env.baseUrl + "/api/count")
    return await response.json() // { count: 123 }
  },
  methods: {
    async getCount() {
      const response = await fetch(process.env.baseUrl + "/api/count")
      const data = await response.json()
      this.count = data.count
    }
  }
}
</script>
