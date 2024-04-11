import React, { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./Nav.module.css";
import AuthCtx from "../../context/AuthCtx";

const NavBar = () => {
  const ctx = useContext(AuthCtx);

  const logoutHandler = () => {
    ctx.logout();
    localStorage.removeItem("lastSentDate");
  };

  return (
    <nav className={styles.navBar}>
      {ctx.isLogin ? (
        <div className={styles.navBarTitle}>
          {" "}
          Hello: {ctx.token?.name || ctx.token.email}{" "}
        </div>
      ) : (
        <h3>Incentive Calculator</h3>
      )}
      <div className={styles.navBarLinks}>
        {ctx.isLogin ? (
          <>
            {ctx.token?.isAdmin ? (
              <Link to="/login" className={styles.navBarLink}>
                Packages
              </Link>
            ) : (
              <Link to="/incentive" className={styles.navBarLink}>
                Incentive
              </Link>
            )}
            <button onClick={logoutHandler} className={styles.navBarLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.navBarLink}>
              Login
            </Link>
            <Link to="/register" className={styles.navBarLink}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
