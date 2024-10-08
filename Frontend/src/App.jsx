
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Create from './Pages/Create'
import Edit from './Pages/Edit'
import Read from './Pages/Read'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
