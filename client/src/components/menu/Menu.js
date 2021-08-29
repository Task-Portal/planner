import React, { Fragment } from "react";
import "./menu.css";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../auth";

const Menu = ({ history }) => {
  return (
    <div className="container-fluid">
      <nav className="navbar navbar-inverse #880e4f pink darken-4">
        <div className="container">
          <ul className="nav navbar-nav ">
            <li>
              <Link id="len1" className="hoverable" to="/">
                Home
              </Link>
            </li>
            {/*<li><Link id="len2" className="hoverable" to="#">About</Link></li>*/}
          </ul>

          <ul className="nav navbar-nav right">
            {!isAuthenticated() && (
              <>
                <li>
                  <Link id="len2" className="hoverable" to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link id="len3" className="hoverable" to="/signin">
                    Sign In
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated() && (
              <li>
                <Link id="len3" className="hoverable" to="/user/boards">
                  Your boards
                </Link>
                <span
                  id="len2"
                  className="hoverable"
                  onClick={() =>
                    signout(() => {
                      history.push("/signin");
                    })
                  }
                >
                  Sign out
                </span>
              </li>
            )}
            {/*<li><Link id="len2" className="hoverable" to="#">Logout</Link></li>*/}
            {/*<li><Link id="len2" className="hoverable" to="#">Login</Link></li>*/}
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default withRouter(Menu);
