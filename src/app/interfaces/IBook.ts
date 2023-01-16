import { IAuthor } from "./IAuthor";

export interface IBook 
{
    id: number;
    author:IAuthor;
    name:string;
}
export interface IBook1 
{
    id: number;
    author:string;
    name:string;
}