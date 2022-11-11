<template>
    <div class="h-screen">
        <!-- <cardVue></cardVue> -->
        <submitVue :data="questions" class="fixed right-2 top-2"></submitVue>
        <div class="m-auto w-3/4 min-h-screen p-2 shadow-lg">
            <itemVue v-for="question,index in questions" :key="question.id" :ques="question" :index="index+1"></itemVue>
        </div>
    </div>
</template>

<script setup lang='ts'>
import {questions} from './mock'
import itemVue from './components/core/item.vue'
import submitVue from './components/core/submit.vue'

</script>

<style scoped>

</style>