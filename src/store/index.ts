import { defineStore } from 'pinia'

export const useAnswerStore = defineStore('userAnswer', {
  state: (): {
    userAnswer: myAnswersType[]
  } => {
    return {
      userAnswer: [
      ]
    }
  },
  actions: {
    judgeIfExists(answer: myAnswersType): [boolean, number] {
      let flag: boolean = false;
      let index: number = -1;
      for (let i = 0; i < this.userAnswer.length; i++) {
        if (this.userAnswer[i].id === answer.id) {
          flag = true;
          index = i;
          break;
        }
      }

      return [flag, index];
    },
    addUserAnswer(answer: myAnswersType) {
      const [flag, index] = this.judgeIfExists(answer)
      
      if (flag) {
        this.userAnswer[index] = answer;
      } else {
        this.userAnswer.push(answer);
      }
    }
  }
})