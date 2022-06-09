export default class utility {
    //private static url: String = "http://192.168.0.34:8080/";
    private static url: String = "http://68.104.238.128:9994/";

    public static getUrl() {
        return this.url;
    }

    public static GetYouTubeVideoID(url: string) {

        var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        var result = regExp.exec(url);
        if(result == null || result == undefined) {
            return "";
        }
        else {
            return result![3];
        }
    }
    
}