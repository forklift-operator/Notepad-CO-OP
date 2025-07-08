export interface IUser {
    id: string,
    name: string,
    username: string,
    createdAt: Date,
}

export interface IUserCreate {
    name: string,
    username: string,
    password: string;
}