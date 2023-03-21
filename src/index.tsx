import ReactDOM from 'react-dom/client'
import App from './components/App'
import './assets/styles/main.scss'
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"


ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement ).render(
   <BrowserRouter>
      <Provider store={ store }>
         <App />
      </Provider>
   </BrowserRouter>
)
