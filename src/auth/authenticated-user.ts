export interface AuthenticatedUser {
  subject: string;
  issuer: string;
  scopes: string[];
  /*
   readonly email?: string;
     readonly audience: string | string[];

  readonly clinicId?: string; // custom claim de Auth0
  readonly permissions?: string[]; // si usas RBAC de Auth0*/
}
