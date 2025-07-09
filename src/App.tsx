import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import MainLayout from './Layout/MainLayout'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

function App() {
const queryClient:any = new QueryClient();
const router:any = createBrowserRouter([
  {
    path:'/',
    element:<MainLayout/>
  }
])

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </>
  )
}

export default App
