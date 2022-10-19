function setRolesToUser(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  user.app_metadata = user.app_metadata || {};

  auth0.users
    .updateAppMetadata(user.user_id, user.app_metadata)
    .then(function () {
      context.idToken["https://learn.konamars.com/roles"] =
        user.app_metadata.roles;
      context.idToken["https://learn.konamars.com/permissions"] =
        user.app_metadata.permissions;
      callback(null, user, context);
    })
    .catch(function (err) {
      callback(err);
    });
}
