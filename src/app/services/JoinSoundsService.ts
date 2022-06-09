import { Injectable, resolveForwardRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import utility from './utility';
import { JoinSoundsForUser } from '../models/JoinSoundsForUser';
import { JoinSound } from '../models/JoinSound';



@Injectable({
    providedIn: 'root',
  })
export class JoinSoundsService {

    constructor(private http: HttpClient){}

    async GetAllJoinSounds()
    {
        let list: JoinSoundsForUser[] = [];

        this.http.get<any>(utility.getUrl() + 'OperationGrant/rest/joinsounds/getall').subscribe({
            next: data => {
                for(let item of data)
                {
                    var joinSounds: JoinSound[] = [];
                    var MainJoinObject = new JoinSoundsForUser(-1, item.userId, item.username, joinSounds);
                    
                    for(var actualCurrent of item.joinSounds)
                    {
                        var joinSoundItem = new JoinSound(actualCurrent.id, actualCurrent.userid, actualCurrent.username, actualCurrent.creatorID, actualCurrent.link, actualCurrent.name, actualCurrent.volume);
    
                        joinSounds.push(joinSoundItem);
                    }
    
                    MainJoinObject.sounds = joinSounds;
                    list.push(MainJoinObject);
                }
                
                return list;
            }
        });
        return list;
    }

    async AddJoinSound(sound: JoinSound)
    {
        console.log(sound);
        return this.http.post<any>(utility.getUrl() + 'OperationGrant/rest/joinsounds/add', sound, {
            headers: {
                "content-type": "application/json"
            }
        }).subscribe();
    }

    async DeleteJoinSound(id: string)
    {
        this.http.get<any>(utility.getUrl() + 'OperationGrant/rest/joinsounds/delete/' + id).subscribe({

        });
    }

    PlayJoinSound(id: string) {
        return this.http.get<any>(utility.getUrl() + 'OperationGrant/rest/joinsounds/play/' + id);
    }
}