<template>
    <div class="item mb-2">
        <!-- 单选 -->
        <div class="radio" :id="`question-${props.index}`" v-if="props.ques.type === 'radio'">
            <p class="questions break-words">{{`${props.index}、`}}<a-tag color="blue">单选</a-tag><span
                    class="text-xs">{{`(${props.ques.score}分)`}}</span> ​{{props.ques.question}}</p>
            <div class="choices ml-5">
                <a-radio-group v-model:value="radioValue" @change="radioChange">
                    <a-radio :style="radioStyle" v-for="i in props.ques.answers" :key="i" :value="i">{{i}}</a-radio>
                </a-radio-group>
            </div>
        </div>
        <!-- 多选 -->
        <div class="checkbox" :id="`question-${props.index}`" v-if="props.ques.type === 'checkbox'">
            <p class="questions break-words">{{`${props.index}、`}}<a-tag color="blue">多选</a-tag><span
                    class="text-xs">{{`(${props.ques.score}分)`}}</span> ​{{props.ques.question}}</p>
            <div class="choices ml-5">
                <a-checkbox-group v-model:value="checkboxValue" @change="checkboxChange" name="checkboxgroup">
                    <a-row>
                        <a-col v-for="i in props.ques.answers" :key="i" :span="24">
                            <p class="h-4">
                                <a-checkbox :value="i">{{i}}</a-checkbox>
                            </p>
                        </a-col>
                    </a-row>
                </a-checkbox-group>
            </div>
        </div>
        <!-- 填空 -->
        <div class="blank" :id="`question-${props.index}`" v-if="props.ques.type === 'blank'">
            <p class="questions break-words">{{`${props.index}、`}}<a-tag color="blue">填空</a-tag>
                <span class="text-xs">{{`(${props.ques.score}分)`}}</span> {{props.ques.question}}
            </p>
            <div class="answers ml-5">
                <div class="flex flex-row justify-start h-full h-8 mb-2" v-for=" j,index in props.ques.answers">
                    <div class="break-normal align-middle leading-8">第{{numberConversion(index)}}空 </div>
                    <div class="flex-grow border-b-2">
                        <a-input v-model:value="blankValue[index]" @change="blankChange" :bordered="false"
                            :placeholder="`请填写答案`" />
                    </div>
                </div>
            </div>
        </div>
        <!-- 判断 -->
        <div class="judge" :id="`question-${props.index}`" v-if="props.ques.type === 'judge'">
            <p class="questions break-words">{{`${props.index}、`}}<a-tag color="blue">判断</a-tag>
                <span class="text-xs">{{`(${props.ques.score}分)`}}</span> {{props.ques.question}}
            </p>
            <div class="choices ml-5">
                <a-radio-group v-model:value="judgeValue">
                    <a-radio @change="judgeChange" :style="radioStyle" v-for="i in props.ques.answers" :key="i"
                        :value="i">{{i}}</a-radio>
                </a-radio-group>

            </div>
        </div>
        <!-- 讨论 -->
    </div>
</template>

<script setup lang='ts'>
import { numberConversion } from '@/main_ts/index';
import { CheckboxValueType } from 'ant-design-vue/es/checkbox/interface';
import { RadioChangeEvent } from 'ant-design-vue/es/radio';
import { useAnswerStore } from '@/store/index'

const AnswerStore = useAnswerStore()

const radioStyle = reactive({
    display: 'flex',
    height: '30px',
    lineHeight: '30px'
});

type QuestionType = {
    ques: Question
    index: number
}
const radioValue = ref<string>('')
const checkboxValue = ref<string[]>([])
const judgeValue = ref<string>('')
const blankValue = ref<string[]>([])
const props = defineProps<QuestionType>()


function handlerAnswer(answers: string[] | string) {
    return {
        type: props.ques.type,
        id: props.ques.id,
        answers: answers
    }
}

// 多选框
const checkboxChange = (e: CheckboxValueType[]) => {
    AnswerStore.addUserAnswer(handlerAnswer(e as any[]))
}

// 单选框
const radioChange = (e: RadioChangeEvent) => {
    AnswerStore.addUserAnswer(handlerAnswer(e.target.value))
}

// 填空
const blankChange = () => {      
    AnswerStore.addUserAnswer(handlerAnswer(toRaw(blankValue.value)))
}

// 判断
const judgeChange = (e: RadioChangeEvent) => {
    AnswerStore.addUserAnswer(handlerAnswer(e.target.value))

}


function judgeIfExists(id: string, usedAnswer: myAnswersType[]): [boolean, number] {
    let flag = false
    let index = -1
    usedAnswer.forEach((i, ind) => {
        if (i.id === id) {
            flag = true
            index = ind
        }
    })
    return [flag, index]

}


function initData(flag:boolean,usedAnswer:myAnswersType[],index: number) {
    if (flag && usedAnswer) {
        switch (props.ques.type) {
            case 'judge':
                judgeValue.value = usedAnswer[index].answers as string
                break;
            case 'radio':
                radioValue.value = usedAnswer[index].answers as string
                break;
            case 'checkbox':
                checkboxValue.value = usedAnswer[index].answers as string[]
                break;
            case 'blank':
                blankValue.value = usedAnswer[index].answers as string[]
                break;
        }
    }
}


onMounted(() => {
    const usedAnswer = AnswerStore.userAnswer
    let [flag, index] = judgeIfExists(props.ques.id, usedAnswer)
    initData(flag, usedAnswer, index)

})

</script>