<template>
    <div class=" w-60 bg-gray-300">
        <div class="h-10">
            <!-- TODO -->
            缩小按钮 | 计时器
        </div>
        <div class=" flex flex-row flex-wrap">
            <div class="w-10 text-center leading-10 border-2 h-10 box-border bg-green-500" :style="getStyle(i)"
            v-for="i in props.data">
            {{i.id}}
        </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useAnswerStore } from '@/store/index'
import { StyleValue } from 'vue';
import {colorStyle} from '@/configs/color'
import {getLengthWithoutEmpty} from '@/main_ts/index'

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
const ifExists = (i: Question):[boolean,number] => {
    for (let j = 0; j < userAnswer.length; j++) {
        if (userAnswer[j].id === i.id) {
            if (i.type != 'blank') {
               return userAnswer[j].answers.length === 0?[true,0]:[true,1]
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
    data: Question[]
}

const props = defineProps<propsType>()

</script>

<style lang="" scoped>

</style>