import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import utility from './utility';
import { JoinSoundsForUser } from '../models/JoinSoundsForUser';
import { JoinSound } from '../models/JoinSound';
import { SongInfo } from '../models/SongInfo';



@Injectable({
    providedIn: 'root',
  })
export class PlaySoundService {
    constructor(private http: HttpClient){}

    AddSongToQueue(link: string) {
        console.log(encodeURI(link));
        let url = utility.getUrl() + "OperationGrant/rest/music/add/youtube/" + utility.GetYouTubeVideoID(link);
        console.log(url);
        return this.http.get<any>(url);
    }

    GetSongQueue() {
        let url = utility.getUrl() + "OperationGrant/rest/music/getqueue";
        return this.http.get<SongInfo[]>(url);
    }
}