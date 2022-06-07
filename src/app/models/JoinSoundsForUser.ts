import { JoinSound } from "./JoinSound";

export class JoinSoundsForUser {
    public id: number;
    public userid: string;
    public username: string;
    public sounds: JoinSound[];
    
    constructor(id: number, userid: string, username: string, sounds: JoinSound[]){
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.sounds = sounds;
    }
}