import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './assets/styles/main.scss'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store/index.js"


ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
   <BrowserRouter>
      <Provider store={ store }>
         <App />
      </Provider>
   </BrowserRouter>
)