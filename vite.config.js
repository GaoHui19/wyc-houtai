import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from "postcss-pxtorem"

import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css:{
    postcss: {
      plugins: [
          postCssPxToRem({
              rootValue: 45.5,
              propList: ['*'],
          })
      ]
    },
    preprocessorOptions: {
      less: {
          javascriptEnabled: true,
      // additionalData: `@injectedColor: orange;` // 全局变量
          additionalData: `@import "/src/assets/common.less";`,
      },
  },
  },
  server:{
    proxy:{
      "/sugrec":"http://www.baidu.com"
    }
  }
 
})
