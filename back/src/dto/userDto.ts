 export interface UserRegisterDto{
    name:string
    nDni:number
    email:string
    username:string
    password:string
    birthdate:Date

}

export interface UserCredentialDto {
    username:string
    password:string
}

export interface UserLoginDto {
    login:boolean
    user:UserDataLoginDTO
}

 interface UserDataLoginDTO{
    id?:number
    name?:string
    nDni?:number
    email?:string
    birthdate?:Date
}

export interface UserDto {
    id:number
    name: string
    email:string
}

