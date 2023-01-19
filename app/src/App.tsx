
import {BrowserRouter, Routes, Route,Link} from 'react-router-dom'
import Student from './Form/Student';
import ViewPage from './ViewPage/ViewPage';
import View from './Views/View';

function App() {
  return (
    <>
    <BrowserRouter>
    <div className="navigation">
      <Link className='btn' to="View">View</Link>
      <Link className='btn' to="create">Create</Link>
    </div>
    <Routes>
     <Route path ="/" element ={<View/>}/>
     <Route path ="/View" element ={<View/>}/>
     <Route path ="/ViewPage/:id" element ={<ViewPage/>}/>
     <Route path ="/create" element ={<Student/>}/>
     <Route path ="/update/:id" element ={<Student/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
