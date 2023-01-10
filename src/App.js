import { Navigate, Route, Routes } from 'react-router-dom';
// import './App.css';
import Navbar from './Components/NavBar/Navbar';
import Footer from './Components/Footer/Footer';
import AboutView from './Pages/AboutView/AboutView';
import ContactList from './Pages/ContactList/ContactList';
import CreateContact from './Pages/CreateContact/CreateContact';
import EditContact from './Pages/EditContact/EditContact';
import ViewContact from './Pages/ViewContact/ViewContact';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route exact path='/' element={<Navigate to={'contacts/list'}></Navigate>}></Route>
        <Route exact path={'/contacts/list'} element={<ContactList></ContactList>}></Route>
        <Route exact path={'/contacts/create'} element={<CreateContact></CreateContact>}></Route>
        <Route exact path={'/contacts/edit/:contactId'} element={<EditContact></EditContact>}></Route>
        <Route exact path={'/contacts/view/:contactId'} element={<ViewContact></ViewContact>}></Route>
        <Route exact path={'/about'} element={<AboutView></AboutView>}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;