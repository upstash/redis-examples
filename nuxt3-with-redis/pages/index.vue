<script setup>
let { data: count } = await useFetch("/api/count");


const increment = async () => {
    let { data: res } = await useFetch("/api/count")
    count.value = res;
}


</script>

<template>
    <div class="bg-black h-screen w-screen text-white">
        <div class="z-0 absolute h-full w-full bg-gradient-to-br from-green-500 via-black to-transparent opacity-20"></div>
        <div class="z-10 relative h-full w-full flex flex-col items-center justify-center gap-5">
            <div class="h-1/4 flex flex-row items-center justify-center gap-20">
                <img class="h-64 w-64" src="/nuxt.png" />
                <div class="text-9xl">+</div>
                <img class="h-64 w-64" src="/upstash.svg" />
            </div>
            <div class="text-2xl font-mono">
                Nuxt3 & Upstash
            </div>
            <div class="text-lg font-mono mt-2 flex flex-row justify-center items-center gap-3">
                <p>
                    Get started by editing
                <div class="p-1 rounded-xl bg-gradient-to-tr from-green-500 to-black bg-opacity-30">
                    <p class="bg-black rounded-lg p-1">pages/index.js
                    </p>
                </div>

                and
                <div class="p-1 rounded-xl bg-gradient-to-tr from-green-500 to-black bg-opacity-30">
                    <p class="bg-black rounded-lg p-1">api/count.js
                    </p>
                </div>
                </p>
            </div>
            <div class="flex flex-row items-center gap-6 mt-10">
                <button @click="increment()"
                    class="h-10 w-32 bg-green-500 rounded-lg active:bg-green-300 hover:bg-green-600 text-black">Increment
                    (+1)</button>
                <div class="text-xl">Count: {{ count }}</div>
            </div>
        </div>
    </div>
</template>