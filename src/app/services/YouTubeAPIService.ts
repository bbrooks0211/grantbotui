import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YTVideoData } from '../models/YTVideoData';
import utility from './utility';

@Injectable({
    providedIn: 'root',
  })
export class YouTubeAPIService {
    private APIKey : string = "AIzaSyCa5LaETwxUb9sFcneqX4IZA44RM6FOaSo";
    private APIUrl : string = "https://www.googleapis.com/youtube/v3/";

    constructor(private http: HttpClient){}

    GetVideoFromURL(url: string) {
        let id: string = this.getVideoId(url);
        return this.GetVideo(id);
    }

    GetVideo(id: string) {
        let url = this.APIUrl + "videos?id=" + id + "&part=contentDetails&key=" + this.APIKey;
        //let viddata = new YTVideoData('P1Y2M3DT4H5M6S');

        return this.http.get<any>(url);
        /*
        return this.http.get<any>(url).subscribe(data => {
            viddata = new YTVideoData(data.items.contentDetails.duration);
            console.log("data: ");
            console.log(viddata);
            return viddata;
        });
        */
    }

    getVideoId(url: string) {

        return utility.GetYouTubeVideoID(url);
        // var regExp = /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm;
        // var result = regExp.exec(url);
        // if(result == null || result == undefined) {
        //     return "";
        // }
        // else {
        //     return result![3];
        // }
    }
}