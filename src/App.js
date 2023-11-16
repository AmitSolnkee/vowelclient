import { Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./component/main/Main";
import Nav from "./component/nav/Nav";
import ViewProduct from "./component/viewproduct/ViewProduct";
import Login from "./component/regsiter/Login";
import Register from "./component/regsiter/Register";
import Cart from "./component/cart/Cart";
import ProtectedRoutes from "./protectedroutes/ProtectedRoute";
import Address from "./component/address/Address";
import Order from "./component/order/Order";
import Admin from "./component/admin/Admin";

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/product" element={<ViewProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/address"
          element={
            <ProtectedRoutes>
              <Address />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoutes>
              <Admin />
            </ProtectedRoutes>
          }
        />
        
      </Routes>
    </div>
  );
}

export default App;
