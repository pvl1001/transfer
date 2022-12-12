import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

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
} )
