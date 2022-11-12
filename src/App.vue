<template>
    <div class="h-screen">
        <!-- <cardVue></cardVue> -->
        <submitVue @time-over="over" :time="10" :data="questions" class="fixed right-2 top-2 z-50"></submitVue>
        <QuestionVue :questions="questions"></QuestionVue> 
    </div>
</template>

<script setup lang='ts'>
import {questions} from './mock'
import QuestionVue from './components/core/Questions.vue'
import submitVue from './components/core/submit.vue'


const over = ()=>{
    console.log('over');
}
</script>

<style scoped>

</style>