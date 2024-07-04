import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import "semantic-ui-css/semantic.min.css"
import { QueryClient, QueryClientProvider } from 'react-query'
import {ToastContainer} from "react-toastify"
const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  }

})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client} >
    <RouterProvider router={router}/>
    <ToastContainer/>
  </QueryClientProvider>
)
