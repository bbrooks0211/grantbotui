import { Duration, parse } from "tinyduration";

export class YTVideoData {
    public duration: Duration;
    
    constructor(iso8601: string){
        let dur = parse(iso8601);
        this.duration = dur;
    }
}