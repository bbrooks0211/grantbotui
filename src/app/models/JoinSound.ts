export class JoinSound {
    public id: number;
    public creatorID: string;
    public username: string;
    public userid: string;
    public link: string;
    public name: string;
    public volume: number;
    
    constructor(id: number, userid: string, username: string, creatorid: string, link: string, name: string, volume: number){
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.creatorID = creatorid;
        this.link = link;
        this.name = name;
        this.volume = volume;
    }
}