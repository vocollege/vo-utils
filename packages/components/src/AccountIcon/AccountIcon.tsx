import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import PersonIcon from "@material-ui/icons/Person";
import CircularProgress from "@material-ui/core/CircularProgress";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import clsx from "clsx";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// Custom.
import VoAuth from "@vocollege/app/dist/modules/VoAuth";
import VoRouter from "@vocollege/app/dist/modules/VoRouter";
import VoConfig from "@vocollege/app/dist/modules/VoConfig";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { encodeQueryData } from "@vocollege/app/dist/modules/VoHelpers";
import { useStyles } from "./styles";
import Session, { CallParams } from "./Session";
// import AccountDialog from "./AccountDialog";

export interface AccountIconProps {
  className?: string;
  externalSession?: boolean;
  onChange?: (data: CallParams) => void;
  onlyImage?: boolean;
  noButtonLabel?: boolean;
  callParams?: CallParams;
}

const AccountIcon: React.FC<AccountIconProps> = (props) => {
  const {
    className,
    externalSession,
    onChange,
    onlyImage = false,
    noButtonLabel,
    callParams: callParamsProp,
  } = props;
  const classes = useStyles();
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ [key: string]: any } | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [userImage, setUserImage] = useState<any>(null);
  const [callParams, setCallParams] = useState<null | CallParams>(null);

  // Methods.

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (firstLoad || loading) {
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (firstLoad || loading) {
      return;
    }
    let loginUrl = "";
    if (!externalSession) {
      loginUrl = VoAuth.getAppLoginUrl;
    } else {
      loginUrl =
        VoConfig.get.ADMIN_BASE_URL +
        "/login?" +
        encodeQueryData({
          redirectTo: window.location.href,
        });
    }
    window.location.href = loginUrl;
  };

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    try {
      setLoading(true);
      if (!externalSession) {
        await VoAuth.logout();
        VoRouter.redirectToLogout();
      } else {
        setCallParams({
          action: "logout",
        });
      }
    } catch (error) {
      console.error("Logout", error);
    }
    handleAccountMenuClose();
  };

  const handleSessionChange = (data: any) => {
    setCallParams(null);
    let dataToReturn = null;
    switch (data.action) {
      case "getCurrentUser":
        setUser(data.value);
        if (data.value && data.value.images && data.value.images.length > 0) {
          setUserImage(
            <img
              className={classes.userImage}
              src={`${data.value.images[0].url}?d=100x100`}
              alt={data.value.name}
            />
          );
        }
        if (data.value && data.value.permissions) {
          VoAuth.ability.update(data.value.permissions);
        }
        setLoading(false);
        dataToReturn = data.value;
        break;
      case "logout":
        setUser(null);
        VoRouter.redirectToLogout();
        break;
      case "checkAbility":
        break;
    }
    setFirstLoad(false);
    if (onChange) {
      onChange(dataToReturn);
    }
  };

  const handleAccountOpen = () => {
    handleAccountMenuClose();
  };

  const getButtonVariant = () => {
    if (firstLoad || onlyImage) {
      return "text";
    }
    return user ? "outlined" : "contained";
  };

  const getUserImage = () => {
    return userImage || <PersonIcon fontSize="large" />;
  };

  const getUser = async () => {
    if (externalSession) {
      setCallParams({
        action: "getCurrentUser",
      });
    } else {
      try {
        const userData = await VoAuth.check(false, true);
        handleSessionChange({
          action: "getCurrentUser",
          value: userData,
        });
      } catch (error) {
        console.log("useEffect() error", error);
      }
    }
  };

  const getEditAccountUrl = () => {
    if (!user) {
      return "";
    }
    return `${VoConfig.get.ADMIN_BASE_URL}/users/${user.id}?${encodeQueryData({
      redirectTo: window.location.href,
    })}`;
  };

  // Effects.

  useEffect(() => {
    if (!VoAuth.currentUser) {
      getUser();
    } else {
      handleSessionChange({
        action: "getCurrentUser",
        value: VoAuth.currentUser,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (callParamsProp) {
      setCallParams(callParamsProp);
    }
  }, [callParamsProp]);

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.loading]: loading,
        [classes.onlyImage]: (onlyImage && userImage) || noButtonLabel,
      })}
    >
      {externalSession && (
        <Session onChange={handleSessionChange} callParams={callParams} />
      )}

      {/* {accountOpen && (
        <AccountDialog
          open={accountOpen}
          onChange={handleAccountDialogChange}
          onCancel={() => setAccountOpen(false)}
        />
      )} */}

      <Button
        color="inherit"
        aria-label="account menu"
        variant={getButtonVariant()}
        startIcon={getUserImage()}
        onClick={user ? handleAccountMenuOpen : handleLogin}
        className={classes.button}
        title={user && user.name}
      >
        {(!onlyImage || !userImage) && !noButtonLabel && !firstLoad && (
          <span className={classes.buttonText}>
            {user ? user.name : I18n.get.misc.login}
          </span>
        )}
        {loading && (
          <CircularProgress
            className={classes.loader}
            size={20}
            color="inherit"
          />
        )}
      </Button>

      {!firstLoad && user && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleAccountMenuClose}
          classes={{ paper: classes.paper }}
        >
          <MenuItem
            onClick={handleAccountOpen}
            component="a"
            href={getEditAccountUrl()}
          >
            {I18n.get.misc.account}
          </MenuItem>
          <MenuItem onClick={handleLogout}>{I18n.get.misc.signOut}</MenuItem>
        </Menu>
      )}
    </div>
  );
};

export default AccountIcon;
