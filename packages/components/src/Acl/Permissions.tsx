// Vendors.
import React, { useReducer, useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

// Custom.
import SimpleTable from "SimpleTable";
import {
  GET_ACL,
  UPDATE_PERMISSIONS,
} from "@vocollege/app/dist/modules/VoApi/graphql";
import I18n from "@vocollege/app/dist/modules/Services/I18n";
import { reducer, initialState } from "./state";
import VoLoader from "VoLoader";
import { useStyles } from "./styles";
import { PermissionsProps, PermissionType, RoleType } from "./global";
import FormToolbar from "Form/FormToolbar";

const Permissions: React.FC<PermissionsProps> = (props) => {
  const { operations, categories, title, classes: classesProp } = props;
  const classes = useStyles();
  // useStylesCommon();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [changed, setChanged] = useState(false);

  // Methods.

  const parsePermissions = (permissions: PermissionType[]) => {
    let groupedPermissions: { [key: string]: any } = {};
    permissions.forEach((o: any) => {
      if (!groupedPermissions[o.subject]) {
        groupedPermissions[o.subject] = [];
      }
      groupedPermissions[o.subject].push({ ...o });
    });
    let result: any = [];
    for (let subject in groupedPermissions) {
      result.push({ label: subject });
      result.push(...groupedPermissions[subject]);
    }
    return result;
  };

  const checkboxChange = async (permission: PermissionType, role: RoleType) => {
    setChanged(true);

    // Add/remove the checked/unchecked role.
    const roles = permission.roles.map((v: any) => ({ ...v }));
    const roleIndex = permission.roles.findIndex(
      (v: RoleType) => v.id === role.id
    );
    if (roleIndex > -1) {
      roles.splice(roleIndex, 1);
    } else {
      roles.push(role);
    }

    // Update the corresponding permission.
    const permissionIndex = state.permissions.findIndex(
      (v: PermissionType) => v.id === permission.id
    );
    if (permissionIndex > -1) {
      const newPermission = { ...permission };
      newPermission.roles = roles;
      const newData = [...state.permissions];
      newData[permissionIndex] = newPermission;
      dispatch({ key: "permissions", values: newData });
    }
  };

  const getTitle = () => {
    return (
      <span className={classes.permissionGroupLabel}>
        {title || I18n.get.misc.permissions}
      </span>
    );
  };

  const getColumns = () => {
    const columns = [
      {
        title: "",
        field: "label",
        render: (rowData: any) => {
          if (!rowData.id) {
            return (
              <span className={classes.permissionGroupLabel}>
                {rowData.label}
              </span>
            );
          }
          return rowData.label;
        },
      },
    ];
    const roleColumns = state.roles.map((role: any) => {
      return {
        title: role.label,
        field: role.name,
        render: (rowData: PermissionType) => {
          if (!rowData.id) {
            return "";
          }
          return (
            <input
              type="checkbox"
              value={role.id}
              checked={!!rowData.roles.find((v: RoleType) => v.id === role.id)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                checkboxChange(rowData, role)
              }
            />
          );
        },
      };
    });
    return columns.concat(roleColumns);
  };

  const getOperation = () => {
    return operations && operations.get ? operations.get : GET_ACL;
  };

  const updateOperation = () => {
    return operations && operations.update
      ? operations.update
      : UPDATE_PERMISSIONS;
    // UPDATE_PERMISSION;
  };

  const handleSave = async () => {
    try {
      let permissions: { id: number; roles: string[] }[] = [];
      state.permissions.forEach((v: PermissionType) => {
        if (v.id) {
          permissions.push({
            id: v.id,
            roles: v.roles && v.roles.map((role: RoleType) => role.id),
          });
        }
      });
      await updatePermission({
        variables: {
          input: permissions,
        },
      });
    } catch (error: any) {
      toast.error(error.message, { autoClose: false });
    }
  };

  const handleCancel = () => {
    try {
      setChanged(false);
      loadQuery();
    } catch (error: any) {
      toast.error(error.message, { autoClose: false });
    }
  };

  const handleError = (error: any) => {
    toast.error(error.message, { autoClose: false });
  };

  // API

  const [loadQuery, { loading: queryLoading, called: queryCalled }] =
    useLazyQuery(getOperation(), {
      fetchPolicy: "cache-and-network",
      onError: handleError,
      onCompleted: (data) => {
        let permissions = parsePermissions(data[state.categoryPermissions]);
        let roles = data[state.categoryRoles].map((o: any) => ({ ...o }));
        dispatch({
          values: {
            roles,
            permissions,
          },
        });
      },
    });

  const [updatePermission, { loading: updateLoading }] = useMutation(
    updateOperation(),
    {
      onError: handleError,
      onCompleted: () => {
        toast.success(I18n.get.acl.messages.permissionSaved);
        setChanged(false);
      },
    }
  );

  // Effects.

  useEffect(() => {
    if (categories) {
      dispatch({
        values: {
          categoryRoles: categories.roles,
          categoryPermissions: categories.permissions,
        },
      });
    }
    if (!queryCalled) {
      loadQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {(queryLoading || updateLoading) && <VoLoader />}
      <FormToolbar
        title={getTitle()}
        onSave={handleSave}
        onCancel={handleCancel}
        loading={queryLoading || updateLoading}
        options={{
          saveButton: {
            disabled: !changed,
          },
          cancelButton: {
            disabled: !changed,
          },
        }}
        className={classesProp?.formToolbar || "vo-global__content-toolbar"}
      />
      {state.permissions.length > 0 && (
        <SimpleTable
          stickyHead
          className={"vo-global__content-with-toolbar"}
          columns={getColumns()}
          rows={state.permissions}
          labels={{
            nothingFound: I18n.get.misc.nothingFound,
          }}
          classes={{ head: classes.permissionHead }}
        />
      )}
    </>
  );
};

export default Permissions;
