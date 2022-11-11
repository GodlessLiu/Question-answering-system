import { createApp } from 'vue'
import App from './App.vue'
import { createPinia, PiniaPluginContext } from 'pinia'
import './assets/styles/theme/light.css'
import './assets/styles/index.css'
import 'ant-design-vue/dist/antd.css'



type Options = {
    key?: string
}
//	默认的key
const __piniaKey__: string = 'Ocean'
//	负责存储的函数
const setStorage = (key: string, value: any) => {
    //	将对象转字符串后存入 localStorage
    localStorage.setItem(key, JSON.stringify(value))
}
//	负责取值的函数
const getStorage = (key: string) => {
    //	根据key拿到localStorage中对应的值
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : {}
}
//	Pinia持久化插件
const piniaPlugin = (options: Options) => {
    return (context: PiniaPluginContext) => {
        const { store } = context
        const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`)
        console.log(data);
        
        store.$subscribe(() => {
            // store.$state是一个 proxy 对象 要通过 toRaw() 转换成 原始对象
            setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`,toRaw(store.$state))
        })
        return {
            ...data
        }
    }
}
//	创建一个Pinia实例
const store = createPinia()
//	注册插件
store.use(piniaPlugin({
    key: 'pinia',
}))

createApp(App).use(store).mount('#app')

