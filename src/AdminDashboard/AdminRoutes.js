
import Dashboard from './Dashboard';
import Home from "./Pages/Home"
import Prov6Index from './Pages/PageComponents/Province/Prov6/Prov6Index';
import Prov3Index from './Pages/PageComponents/Province/prov3/Prov3Index';


export const AdminRoutes = [
   {path : '/home' , element : <Dashboard><Home /></Dashboard>},
   {path : '/Prov6' , element : <Dashboard><Prov6Index/></Dashboard>},
   {path : '/Prov3' , element : <Dashboard><Prov3Index/></Dashboard>}
]

