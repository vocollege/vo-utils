import React from "react";
import { Route, RouteProps, Navigate, RouteObject } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { toast } from "react-toastify";

// Custom.
import { VoConfig, VoAuth } from "@vocollege/app";
import I18n from "@vocollege/app/dist/modules/Services/I18n";

interface ProtectedRouteTypeAbility {
  // action: RouteObject["action"];
  action: string;
  subject?: string;
}

interface ProtectedRouteType {
  component: any;
  abilities: ProtectedRouteTypeAbility[];
  path?: string;
}

// type ProtectedRouteProps = RouteObject & ProtectedRouteType;
type ProtectedRouteProps = ProtectedRouteType;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  abilities,
  path,
  ...rest
}) => {
  // Methods.

  const isVisible = () => {
    let visible = abilities.every(
      (ability: ProtectedRouteTypeAbility) =>
        !ability || VoAuth.ability.can(ability.action, ability.subject)
    );
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
