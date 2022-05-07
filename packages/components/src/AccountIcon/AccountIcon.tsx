import React, { useEffect, useState } from "react";
// import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import { SvgIconProps } from "@mui/material/SvgIcon";
import CircularProgress from "@mui/material/CircularProgress";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import clsx from "clsx";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
// import { toast } from "react-toastify";
import { ApolloClient } from "@apollo/client";

// Custom.
import VoAuth from "@vocollege/app/dist/modules/VoAuth";
import VoRouter from "@vocollege/app/dist/modules/VoRouter";
import VoConfig from "@vocollege/app/dist/modules/VoConfig";
import VoApi from "@vocollege/app/dist/modules/VoApi";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import {
  encodeQueryData,
  getContactName,
} from "@vocollege/app/dist/modules/VoHelpers";
import { GeneralObject } from "@vocollege/app/dist/global";
import { useStyles } from "./styles";
import Session, { CallParams } from "./Session";
import AccountDialog from "./AccountDialog";

export interface AccountIconProps {
  className?: string;
  classes?: AccountIconClassesProps;
  externalSession?: boolean;
  onChange?: (data: CallParams) => void;
  onlyImage?: boolean;
  noButtonLabel?: boolean;
  callParams?: CallParams;
  buttonProps?: ButtonProps;
  iconProps?: SvgIconProps;
  client?: ApolloClient<object>;
}

export interface AccountIconClassesProps {
  button?: string;
  icon?: string;
}

const AccountIcon: React.FC<AccountIconProps> = (props) => {
  const {
    className,
    classes: classesProp,
    externalSession,
    onChange,
    onlyImage = false,
    noButtonLabel,
    callParams: callParamsProp,
    buttonProps,
    iconProps,
    client,
  } = props;
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<GeneralObject | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [userImage, setUserImage] = useState<any>(null);
  const [accountOpen, setAccountOpen] = useState<any>(false);
  const [callParams, setCallParams] = useState<null | CallParams>(null);
  const classes = useStyles();

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

  // const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
  const logout = async () => {
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
        } else {
          setUserImage(null);
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
    if (externalSession) {
      window.location.href = getEditAccountUrl();
    } else {
      handleAccountMenuClose();
      setAccountOpen(true);
    }
  };

  const getButtonVariant = () => {
    if (firstLoad || onlyImage) {
      return "text";
    }
    return user ? "outlined" : "contained";
  };

  const getUserImage = () => {
    return (
      userImage || (
        <PersonIcon
          color="inherit"
          className={clsx(classes.personIcon, classesProp?.icon, {
            // [classes.personIconBig]: onlyImage,
            // [classes.personIconBig]: noButtonLabel,
          })}
          {...iconProps}
        />
      )
    );
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
        console.error(error);
        logout();
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

  const getUserNameString = (): string => {
    if (!user) {
      return "";
    }
    return getContactName(user);
  };

  const handleAccountDialogChange = async (action: string) => {
    if (action === "updated") {
      setAccountOpen(false);
      await VoAuth.loadUser(true);
      handleSessionChange({
        action: "getCurrentUser",
        value: VoAuth.currentUser,
      });
    }
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

  useEffect(() => {
    if (user) {
      document.body.classList.add("vo-global__authenticated");
    } else {
      document.body.classList.remove("vo-global__authenticated");
    }
  }, [user]);

  return (
    <div
      className={clsx(classes.root, className, {
        [classes.loading]: loading,
        [classes.onlyImage]: (onlyImage && userImage) || noButtonLabel,
        "vo-global__authenticated": user,
      })}
    >
      {externalSession && (
        <Session onChange={handleSessionChange} callParams={callParams} />
      )}

      {(accountOpen || (user && !user.gdpr)) && (
        <AccountDialog
          open={accountOpen || (user && !user.gdpr)}
          onChange={handleAccountDialogChange}
          onCancel={() => setAccountOpen(false)}
          client={client}
        />
      )}

      {onlyImage && (
        <IconButton
          color="inherit"
          className={clsx(classes.button, classesProp?.button)}
          onClick={user ? handleAccountMenuOpen : handleLogin}
          title={getUserNameString()}
          {...buttonProps}
        >
          {getUserImage()}
        </IconButton>
      )}
      {!onlyImage && (
        <Button
          color="inherit"
          aria-label="account menu"
          variant={getButtonVariant()}
          startIcon={getUserImage()}
          onClick={user ? handleAccountMenuOpen : handleLogin}
          className={clsx(classes.button, classesProp?.button)}
          title={getUserNameString()}
          {...buttonProps}
        >
          {/* {(!onlyImage || !userImage) && !noButtonLabel && !firstLoad && (
          <span className={classes.buttonText}>
            {user ? user.name : I18n.get.misc.login}
          </span>
        )} */}
          {!noButtonLabel && !firstLoad && (
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
      )}

      {!firstLoad && user && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleAccountMenuClose}
          classes={{ paper: classes.paper }}
        >
          <MenuItem
            onClick={handleAccountOpen}
            // component="a"
            // href={getEditAccountUrl()}
          >
            {I18n.get.misc.account}
          </MenuItem>
          <MenuItem onClick={() => logout()}>{I18n.get.misc.signOut}</MenuItem>
          {/* <MenuItem onClick={handleLogout}>{I18n.get.misc.signOut}</MenuItem> */}
        </Menu>
      )}
    </div>
  );
};

export default AccountIcon;
