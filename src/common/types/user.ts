export enum UserRole{

    USER,
    ADMIN,
    SUPERADMIN
}

export interface Token{
    id:number,
    role:string
}