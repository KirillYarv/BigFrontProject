import { IAuthor } from "./IAuthor";

export interface IBook 
{
    id: number;
    author:IAuthor;
    name:string;
    countPages:number;
}