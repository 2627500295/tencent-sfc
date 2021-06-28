/**
 * 身份验证动作动词
 */
export enum PermissionActionVerb {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  READ = 'read',
}

/**
 * 身份验证
 */
export enum PermissionPossession {
  ANY = 'any',
  OWN = 'own',
  OWN_ANY = 'own|any',
}
