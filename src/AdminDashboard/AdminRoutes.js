
import Dashboard from './Dashboard';
import Home from "./Pages/Home"
import Prov6Index from './Pages/PageComponents/Province/Prov6/Prov6Index';


export const AdminRoutes = [
   {path : '/home' , element : <Dashboard><Home /></Dashboard>},
   {path : '/Prov6' , element : <Dashboard><Prov6Index/></Dashboard>}
   ,
]

