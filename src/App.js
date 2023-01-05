import './App.css';
import Navbar from './Components/Navbar/Navbar'
import Dashboard from './Components/Dashboard/Dashboard'
import Footer from './Components/Footer/Footer'
export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <Dashboard/>
      <Footer/>
    </div>
  );
}
