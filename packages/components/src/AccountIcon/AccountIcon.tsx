import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";

// Custom.
import { VoAuth, VoRouter, I18n } from "@vocollege/app";
import { useStyles } from "./styles";

const AccountIcon: React.FC = () => {
  const classes = useStyles();
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  // Methods.

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    const loginUrl = VoAuth.getAppLoginUrl;
    window.location.href = loginUrl;
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      setLoading(true);
      await VoAuth.logout();
      VoRouter.redirectToLogout();
    } catch (error) {
      console.error("Logout", error);
    }
    handleAccountMenuClose();
  };

  // Effects.

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await VoAuth.check();
        setUser(userData);
        setLoading(false);
        setFirstLoad(false);
      } catch (error) {
        console.log("useEffect() error", error);
      }
    };
    if (!VoAuth.currentUser) {
      getUser();
    } else {
      setUser(VoAuth.currentUser);
      setLoading(false);
      setFirstLoad(false);
    }
  }, []);

  return (
    <div className={clsx(classes.root, { [classes.loading]: loading })}>
      {/* <Button
        onClick={() =>
          user ? setUser(null) : setUser({ id: 10, name: "admin" })
        }
      >
        setUser
      </Button>
      <Button onClick={() => setLoading(!loading)}>setLoading</Button> */}

      {firstLoad && loading && <CircularProgress size={20} color="primary" />}

      {!firstLoad && !user && (
        <Button
          color="primary"
          aria-label="account menu"
          variant="contained"
          startIcon={<PersonIcon />}
          onClick={handleLogin}
        >
          <span className={classes.buttonText}>{I18n.get.misc.login}</span>
          {loading && (
            <CircularProgress
              className={classes.loader}
              size={20}
              color="inherit"
            />
          )}
        </Button>
      )}

      {!firstLoad && user && (
        <>
          <Button
            color="primary"
            aria-label="account menu"
            variant="outlined"
            startIcon={<PersonIcon />}
            onClick={handleAccountMenuOpen}
          >
            <span className={classes.buttonText}>{user.name}</span>
            {loading && (
              <CircularProgress
                className={classes.loader}
                size={20}
                color="inherit"
              />
            )}
          </Button>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={handleAccountMenuClose}
            classes={{ paper: classes.paper }}
          >
            <MenuItem onClick={handleAccountMenuClose}>
              {I18n.get.misc.account}
            </MenuItem>
            <MenuItem onClick={handleLogout}>{I18n.get.misc.signOut}</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};

export default AccountIcon;
