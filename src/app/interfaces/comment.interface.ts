import { User } from "./user.interface";

export interface Comment{
    _id:string;
    text: string;
    parent: Comment| null;
    user: User;
}