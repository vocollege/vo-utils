import React from "react";
import { Route, RouteProps, Navigate } from "react-router-dom";
// import { useSnackbar } from "notistack";
import { toast } from "react-toastify";

// Custom.
import { VoConfig, VoAuth } from "@vocollege/app";
import { I18n } from "@vocollege/app";

interface ProtectedRouteProps extends RouteProps {
  component: any;
  action: string;
  subject?: string;
}

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
    <Navigate to={VoConfig.get.HOME} />
  );

  //   return (
  //     <Route
  //       path={path || ""}
  //       {...rest}
  //       render={(props) => {
  //         return isVisible() ? (
  //           <Component {...props} />
  //         ) : (
  //           <Redirect
  //             to={{
  //               pathname: VoConfig.get.HOME,
  //               state: { from: props.location },
  //             }}
  //           />
  //         );
  //       }}
  //     />
  //   );
};
export default ProtectedRoute;
