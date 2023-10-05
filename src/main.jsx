import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ListaProdutos from './routes/ListaProdutos/index.jsx'
import FormProdutos from './routes/FormProdutos/index.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children:[
      {path:'/', element: <ListaProdutos/>},
      {path:'/incluir', element: <FormProdutos/>},
      {path:'/editar/:id', element: <FormProdutos/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)


