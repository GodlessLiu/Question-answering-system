import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import AutoImport from 'unplugin-auto-import/vite'
import path from 'path'



// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":path.resolve(__dirname,'src')
    }
  },
  server:{
    open:true,
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    AutoImport({
      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],
    
      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
      ],
    
      // Auto import for module exports under directories
      // by default it only scan one level of modules under the directory
      dts: './auto-imports.d.ts',
    
      // Auto import inside Vue template
      // see https://github.com/unjs/unimport/pull/15 and https://github.com/unjs/unimport/pull/72
      vueTemplate: false
    })
  
  ]
})
