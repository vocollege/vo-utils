import React from "react";
import { Route, RouteProps, Navigate, RouteObject } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { toast } from "react-toastify";

// Custom.
import { VoConfig, VoAuth } from "@vocollege/app";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

interface ProtectedRouteType {
  component: any;
  action: RouteObject["action"];
  subject?: string;
  path?: string;
}

type ProtectedRouteProps = RouteObject & ProtectedRouteType;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  action,
  subject,
  path,
  ...rest
}) => {
  // Methods.

  const isVisible = () => {
    let visible = VoAuth.ability.can(action, subject);
    if (!visible) {
      toast.error(
        I18n.trans(I18n.get.acl.errors.routeNotAllowed, { route: path }),
        { autoClose: false }
      );
    }
    return visible;
  };

  return isVisible() ? (
    <Component {...rest} />
  ) : (
    <Navigate to={VoConfig.get.HOME || "/"} />
  );
};
export default ProtectedRoute;
