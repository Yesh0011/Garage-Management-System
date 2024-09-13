import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";



// import User from "./components/User";


// Ishini's Imports
import AdminFeedBacks from "./pages/SupportPages/Home";
import CreateFeedback from "./pages/SupportPages/CreateFeedback";
import EditFeedback from "./pages/SupportPages/EditFeedback";
import DeleteFeedback from "./pages/SupportPages/DeleteFeedback";
import ShowFeedback from "./pages/SupportPages/ShowFeedback";
import CreateFAQ from "./pages/SupportPages/CreateFAQ";
// import RealHome from "./pages/SupportPages/RealHome";
import FAQs from "./pages/SupportPages/FAQs";
import Report from "./pages/SupportPages/Report";

import CreateListin from './pages/services/CreateListing';
import Listing from './pages/services/Listing';
import UpdateListing from './pages/services/updateListing';
import ShowService from "./pages/services/showService";
import ClientReport from './pages/services/ClientReport';
import ClientSearch from './pages/services/ClientSearch';
import ShowCart from "./pages/services/showCart";

import About from './pages/About';
import Hearder from './components/Header';
import Admin from './pages/Admin';
import Progresssupervisor from './pages/Progresssupervisor';
import Customer from './pages/Customer';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Customersignup from './pages/Customersignup';
import PrivateRoute from './components/PrivateRoute';
import Staffsignin from './pages/Staffsignin';
import User from './components/User';
import Admindashboard from './components/Admindashboard';

import AdminDashboardGarageManager from '../src/pages/services/AdminDashboardGarageManager'

import Repairdashboard from './components/Repairdashboard';
import Repaiissue from './pages/Repaiissue';
import View from './pages/View';
import UpdateIssue from './pages/UpdateIssue';
import Customerdashboard from './components/Customerdashboard';
import Customerprofile from './components/Customerprofile';
import Customerview from './pages/Customerview';
import Requiments from './pages/Requiments';
import QR from './pages/QR';
import QRScanner from './pages/QRScanner';
import Customerreaction from './pages/Customerreaction';
import AddDailystatus from './pages/AddDailystatus';
import AllDailyStatus from './pages/AllDailyStatus';
import Dailyupdate from './pages/Dailyupdate';
import Customerdaliupdate from './pages/Customerdaliupdate';
import Updaterequirment from './pages/Updaterequirment';
import Search from './components/Search';
import History from './pages/History';
import CustomerReport from './pages/CustomerReport';
import HaryUP from './pages/HaryUP';
import AddNewItemToInventory from './pages/AddNewItemToInventory';
import Itemlist from './pages/Itemlist';
import ItemDetails from './pages/ItemDetails';
import Updateitemdataininventory from './pages/Updateitemdataininventory';
import DashboardInventory from './pages/DashboardInventory';
import Addorder from './pages/Addorder';
import Pendingorders from './pages/Pendingorders';
import Getorders from './pages/Getorders';
import Acceptedorders from './pages/Acceptedorders';
import Suplierorder from './pages/Suplierorder';
import Toacceptorder from './pages/Toacceptorder';
import AcceptOrderForm from './pages/AcceptOrderForm';
import Ordersystem from './pages/Ordersystem';


import CreateAppointment from './pages/appointment/CreateAppointment';
import AppointmentHistory from './pages/appointment/AppointmentHistory';
import UpdateAppointment from './pages/appointment/UpdateAppointment';
import GarageManager from './pages/appointment/GarageManager';
import UserProfile from './pages/appointment/UserProfile';
=======
import AddSpareParts from './pages/finance/AddSpareParts';
import Payment from './pages/finance/Payment';
import Checkout from './pages/finance/Checkout';
import Itembuyer from './pages/finance/Itembuyer';
import Invoice from './pages/finance/Invoice';
import BuyerEdit from './pages/finance/BuyerEdit';
import PaymentEdit from './pages/finance/PaymentEdit';
import SpareParts from './pages/finance/SpareParts';
import Cart from './pages/finance/Cart';
import FinancialAdmin from './pages/finance/FinancialAddmin';



import EditUSer from './pages/EditUSer';
import Fristattendence from './components/Fristattendence';
import MarkAttedence from './components/MarkAttedence';
import EviningMark from './components/EviningMark';
import LeaveAttendence from './components/LeaveAttendence';
import AddSalary from './pages/AddSalary';
import Salary from './pages/Salary';
import Salaryreport from './pages/Salaryreport';
import Employee from './pages/Employee';
// import AdminHome from './pages/services/AdminHome';
import VReport from "./pages/VReport";





export default function App() {
  return (
    <BrowserRouter>
      <Hearder />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<Signin />} />

        {/* <Route element={<PrivateRoute />}>
          <Route path="/signup" element={<Signup />} />


        <Route path="/signin" element={<Signin />} />
        <Route path="/about" element={<About />} />

        <Route path="/signin" element={<Signin/>} />
        
        <Route  element={<PrivateRoute />} >
         <Route path="/signup" element={<Signup/>} />

        </Route>
        

        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<Admin />} />
        </Route> */}

        <Route path="/about" element={<About />} />

        {/* <Route element={<PrivateRoute />}>
          <Route path="/progresssupervisor" element={<Progresssupervisor />} />
        </Route>


        <Route element={<PrivateRoute />}>
          <Route path="/employee" element={<Employee />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/customer" element={<Customer />} />
        </Route> */}

        <Route path="/customersignup" element={<Customersignup />} />

        {/* <Route element={<PrivateRoute />}>
          <Route path="/staffsignin" element={<Staffsignin />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/user" element={<User />} />
        </Route> */}

        <Route element={<PrivateRoute />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/progresssupervisor" element={<Progresssupervisor />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/staffsignin" element={<Staffsignin />} />
        <Route path="/adminFeeds" element={<AdminFeedBacks />} />
        </Route>

        
        <Route  element={<PrivateRoute />} >
         <Route path="/employee" element={<Employee />} />
        </Route>

        <Route  element={<PrivateRoute />} >
         <Route path="/edituser/:id" element={<EditUSer />} />
        </Route>

       
        
         <Route  element={<PrivateRoute />} >
           <Route path="/customer" element={<Customer />} />
        </Route>
        

        <Route path="/customersignup" element={<Customersignup />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/show-service" element={<ShowService />} />
        <Route path="/search" element={<ClientSearch />} />
        
        <Route element={<PrivateRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          <Route path="/progresssupervisor" element={<Progresssupervisor />} />


          <Route path="/adminGarage" element={<AdminDashboardGarageManager />} />

          <Route path="/adminGarage" element={<Admindashboard />} />


          {/* <Route path="/adminGarage" element={<AdminHome />} /> */}

          <Route path="/employee" element={<Employee />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/staffsignin" element={<Staffsignin />} />
          <Route path="/user" element={<User />} />
          <Route path="/show-report" element={<ClientReport />} />
          <Route path="/create-service" element={<CreateListin />} />
          <Route path="/show-cart" element={<ShowCart />} />
        </Route>



        <Route  element={<PrivateRoute />} >
           <Route path="/user" element={<User />} />
        </Route>

        <Route  element={<PrivateRoute />} >
          <Route path="/admindashboard" element={<Admindashboard />} />
        </Route>


        <Route  element={<PrivateRoute />} >
        <Route path="/repairdashboard" element={<Repairdashboard />} />

        </Route>

        <Route  element={<PrivateRoute />} >
        <Route path="/repairissue" element={<Repaiissue />} />
       </Route>

       <Route  element={<PrivateRoute />} >
                 <Route path="/view" element={<View />} />
       </Route>

       <Route  element={<PrivateRoute />} >
               <Route path="/view/updateissue/:id" element={<UpdateIssue />} />
       </Route>


       <Route  element={<PrivateRoute />} >
               <Route path="/customerdashboard" element={<Customerdashboard />} />
       </Route>

       <Route path="/customerprofile" element={<Customerprofile />} />

       <Route path="/customerview" element={<Customerview />} />

       <Route path="/requirments" element={<Requiments />} />

       <Route path="/reaction" element={<Customerreaction />} />

       <Route path="/reaction/adddailyupdate/:id" element={<AddDailystatus />} />

       <Route path="/allstatus" element={<AllDailyStatus />} />

       <Route path="/allstatus/dailyupdate/:id" element={<Dailyupdate />} />



       <Route path="/vreport" element={<VReport />} />

       <Route path="/customerdailyupdate" element={<Customerdaliupdate />} />

       <Route path="/updaterequirment" element={<Updaterequirment />} />

       <Route path="/search" element={<Search />} />

       <Route path="/history" element={<History />} />
       <Route path="/cusreport" element={<CustomerReport />} />



       <Route path="/qr" element={<QR />} />
       <Route path="/qrreder" element={<QRScanner />} />
       <Route path="/haryup" element={<HaryUP />} />

       <Route path="/addinventory" element={<AddNewItemToInventory/>} />
       <Route path="/item" element = {<Itemlist/>} />
       <Route path ='/details/:itemid' element={<ItemDetails/>}/>
       <Route path='/update/:itemid' element ={<Updateitemdataininventory/>} />
       <Route path ="/dashboardinventory" element ={<DashboardInventory/>}/>

       <Route path="/addnewitemorder" element={<Addorder/>} />
       <Route path="/pendingorders" element={<Pendingorders/>} />
       <Route path='/orderdetails/:orderid' element={<Getorders/>}/>
       <Route path ='/acceptedorders' element={<Acceptedorders/>}/>
       <Route path='/suplierorder' element={<Suplierorder/>}/>
       <Route path='/toacceptorders/:orderid' element={<Toacceptorder/>}/>
       <Route path='/acceptform' element ={<AcceptOrderForm/>}/>
       <Route path ="/ordersystem" element={<Ordersystem/>}/>

       



       
{/* Sanjula */}
<Route path="/addspareparts" element={<AddSpareParts />} />
<Route path="/payment" element={<Payment />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/buyer" element={<Itembuyer />} />
<Route path="/invoice" element={<Invoice />} />
<Route path="/buyerEdit/:id" element={<BuyerEdit />} />
<Route path="/paymentEdit/:id" element={<PaymentEdit />} />
<Route path="/paymentEdit/:id" element={<PaymentEdit />} />
<Route path="/spareparts" element={<SpareParts />} />
<Route path="/cart" element={<Cart />} />
<Route path="/financialadmin" element={<FinancialAdmin />} />
    
    


        <Route path="/arrival" element={<Fristattendence />} />

        <Route path="/arrival/mark/:id" element={<MarkAttedence />} />

        <Route path="/leave" element={<EviningMark />} />

        <Route path="/leave/emark/:id" element={<LeaveAttendence />} />


 {/* kanishka */}
 <Route path="/createappointment" element={< CreateAppointment/>} />
 <Route path="/appointmenthistory" element={< AppointmentHistory/>} />
 <Route path="/appointmenthistory/updateappointment/:id" element={< UpdateAppointment/>} />
 <Route path="/garageManager" element={< GarageManager/>} />
 <Route path="/userProfile" element={< UserProfile/>} />

        <Route path="/addsalary" element={<AddSalary />} />

        {/* <Route path="/addsalary" element={<AddSalary />} /> */}


        <Route path="/addsalary/salary/:id" element={<Salary/>} />

        <Route path="/salaryreport" element={<Salaryreport />} />



       


        {/* Ishinis's Routings */}
        {/* <Route path="/Home" element={<RealHome />} /> */}
        <Route path="/feedback/create" element={<CreateFeedback />} />
        <Route path="/faqs" element={<FAQs />} />


        <Route path="/faq/create" element={<CreateFAQ />} />
       
        <Route path="/report" element={<Report />} />
        <Route path="/feedback/details/:id" element={<ShowFeedback />} />
        <Route path="/feedback/edit/:id" element={<EditFeedback />} />
        <Route path="/feedback/delete/:id" element={<DeleteFeedback />} />
      </Routes>

      <Toaster position="top-center" />
    </BrowserRouter>
  );

}

//This is first comment

