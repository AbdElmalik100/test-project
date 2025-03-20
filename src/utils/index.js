export const hasPermission = (user, permissions) => {
    if (user) return user?.roles[0]?.permissions.some(perm => Array.isArray(permissions) ? permissions.includes(perm.display_name) : perm.display_name === permissions)
}