export const authorize = (permissions: string[]) => {
  return (requiredPermissions: string | string[]) => {
    if (typeof requiredPermissions === "string") {
      return permissions.includes(requiredPermissions);
    }

    return requiredPermissions.every((permission) =>
      permissions.includes(permission)
    );
  };
};
