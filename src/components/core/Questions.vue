<template>
    <div class="m-auto md:w-3/4 w-full min-h-screen p-2 shadow-lg">
        <itemVue v-for="question,index in props.questions" :key="question.id" :ques="question" :index="index+1">
        </itemVue>
    </div>
</template>

<script setup lang='ts'>
import itemVue from './QuestionItem.vue'
type propsType = {
    questions: Question[]
}
const props = defineProps<propsType>()
</script>

<style lang="" scoped>

</style>