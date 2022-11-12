<template>
    <div class="w-60 bg-gray-100">
        <div class="h-10 relative">
            <!-- TODO -->
            <span class="font float-right mr-1 mt-2">{{formatTime(time)}}</span>
        </div>
        <div class=" flex flex-row flex-wrap">
            <div class="w-10 text-center leading-10 border-2 h-10 box-border bg-green-500 hover:scale-110 duration-500"
                :style="getStyle(i)" v-for="i,index in props.data">
                <a :href="`#question-${index+1}`" class="text-black h-full w-full block">{{index+1}}</a>
            </div>

        </div>
        <div class="flex flex-row justify-center pt-2">
            <a-button type="primary" @click="submit">提交</a-button>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useAnswerStore } from '@/store/index'
import { StyleValue } from 'vue';
import { colorStyle } from '@/configs/color'
import { getLengthWithoutEmpty } from '@/main_ts/index'
import { formatTime } from '@/main_ts/index'


const answerStore = useAnswerStore()
const userAnswer = answerStore.userAnswer

function computeAnswerLength(question: Question) {
    let index = -1
    for (let j = 0; j < userAnswer.length; j++) {
        if (userAnswer[j].id === question.id) {
            index = j
        }
    }
    const l = getLengthWithoutEmpty(userAnswer[index].answers as string[])
    return l


}

// 这里的i是问题
const ifExists = (i: Question): [boolean, number] => {
    for (let j = 0; j < userAnswer.length; j++) {
        if (userAnswer[j].id === i.id) {
            if (i.type != 'blank') {
                return userAnswer[j].answers.length === 0 ? [true, 0] : [true, 1]
            } else {
                const userAnswerLength = computeAnswerLength(i)
                if (i.answers.length > userAnswerLength) {
                    return userAnswerLength === 0 ? [true, 0] : [true, .5]
                }
                return [true, 1]
            }
        }
    }
    return [false, 0]
}

function getColorStyleByLevel(level: number) {
    switch (level) {
        case 1:
            return colorStyle.full
        case 0.5:
            return colorStyle.half
        case 0:
            return colorStyle.empty
        default:
            return colorStyle.empty
    }
}

const getStyle = (i: Question): StyleValue => {
    const [flag, level] = ifExists(i)
    if (flag) {
        return getColorStyleByLevel(level)
    }
    return {
        backgroundColor: 'white',
    }
}

type propsType = {
    data: Question[],
    time: number
}

const props = defineProps<propsType>()
const time = ref<number>(props.time)


const emits = defineEmits(["timeOver"])
// 计时器
let timeStart:any;

onMounted(() => {
    timeStart = setInterval(() => {
        if(time.value>0){
            time.value--
        }else{
            clearInterval(timeStart)
            emits('timeOver')

        }
}, 1000)
})

onBeforeUnmount(()=>{
    clearInterval(timeStart)
})

const submit = ()=>{
    emits('timeOver')
}

</script>

<style lang="css" scoped>
.font{
    background-image: linear-gradient(to right, orange, purple);
    -webkit-background-clip: text;
    color: transparent;
    font-size: 18px;
}
</style>