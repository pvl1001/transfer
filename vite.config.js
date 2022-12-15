import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import autoprefixer from "autoprefixer"
import purgecss from "@fullhuman/postcss-purgecss"


export default defineConfig( {
   plugins: [ react() ],
   resolve: {
      alias: {
         '@': path.resolve( __dirname, './src' ),
         '@icons': path.resolve( __dirname, './src/assets/icons' ),
         '@styles': path.resolve( __dirname, './src/assets/styles' ),
         '@var': path.resolve( __dirname, './src/assets/styles/variable.scss' ),
      },
   },
   css: {
      postcss: {
         plugins: [
            autoprefixer( {
               "flexbox": "no-2009"
            } ),
            purgecss( { // убирает неиспользуемые css
               content: [
                  './src/pages/**/*.{js,jsx,ts,tsx}',
                  './src/components/**/*.{js,jsx,ts,tsx}'
               ],
               defaultExtractor: content => content.match( /[\w-/:]+(?<!:)/g ) || [],
               safelist: {
                  standard: [
                     "html",
                     "body",
                  ],
                  deep: [ // вложенные селекторы (.tippy .modal)
                     /_/,
                  ],
                  greedy: [ // зависимые селекторы (.tippy.modal)
                     /_/,
                  ]
               }
            } ),
         ]
      }
   }
} )
