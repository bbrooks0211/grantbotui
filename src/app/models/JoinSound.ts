export class JoinSound {
    public id: string;
    public creatorID: string;
    public username: string;
    public userid: string;
    public link: string;
    public name: string;
    public volume: number;
    
    constructor(id: string, userid: string, username: string, creatorid: string, link: string, name: string, volume: number){
        this.id = id;
        this.userid = userid;
        this.username = username;
        this.creatorID = creatorid;
        this.link = link;
        this.name = name;
        this.volume = volume;
    }
}