import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./signUp/Signup";
import Home from "./Home";
import SignIn from "./signIn/SignIn";
import UserBoards from "./board/UserBoards";
import PrivateRoute from "../auth/PrivateRoute";
import EditBoard from "./board/EditBoard";
import EditTask from "./task/EditTask";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={Signup} />
      <PrivateRoute path="/user/boards" component={UserBoards} />
      <PrivateRoute path="/board/edit/:boardId" component={EditBoard} />
      <PrivateRoute path="/task/edit/:taskId" component={EditTask} />
      {/*region*/}
      {/*<AdminRoute*/}
      {/*    path="/admin/dashboard"*/}
      {/*    exact*/}
      {/*    component={AdminDashboard}*/}
      {/*/>*/}

      {/*<Route path="/product/:productId" exact component={Product} />*/}
      {/*endregion*/}
    </Switch>
  );
};

export default Routes;
