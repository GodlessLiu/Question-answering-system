<template>
    <div class=" w-60 flex flex-row flex-wrap">
        <div class="w-10 text-center leading-10 border-2 h-10 box-border bg-green-500" :style="getStyle(i)"
            v-for="i in props.data">
            {{i.id}}
        </div>
    </div>
</template>

<script setup lang='ts'>
import { useAnswerStore } from '@/store/index'
import { StyleValue } from 'vue';

const answerStore = useAnswerStore()
const userAnswer = answerStore.userAnswer

function computeAnswerLength(question:Question){
    let l=0;
    let index = -1
    for(let j = 0; j < userAnswer.length;j++){
        if(userAnswer[j].id === question.id){
            l = userAnswer[j].answers.length
            index = j
        }
    }
    for(const i of userAnswer[index].answers){
        if(i==='') l--
    }
    return l


}

// 这里的i是问题
const ifExists = (i:Question) => {
    for (let j = 0; j < userAnswer.length; j++) {
        if (userAnswer[j].id === i.id) {
            if(i.type != 'blank'){
                return [true,1]
            }else{
                const userAnswerLength =computeAnswerLength(i)  
                if(i.answers.length > userAnswerLength){
                    return userAnswerLength === 0? [true,0] : [true,.5]
                }
                return [true,1]
            }
        }
    }
    return [false,0]
}

const getStyle = (i: Question): StyleValue => {
    const [flag,level] = ifExists(i)
    if (flag) {
        switch(level){
            case 1:
                return {
                    backgroundColor:'rgba(0,125,0,1)'
                }
            case 0.5:
                return {
                    backgroundColor:'rgba(0,125,0,.5)'
                }
            case 0:
                return {
                    backgroundColor:'white'
                }
        }
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