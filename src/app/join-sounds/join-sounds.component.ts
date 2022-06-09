import { Component, Input, OnInit } from '@angular/core';
import { JoinSound } from '../models/JoinSound';
import { JoinSoundsForUser } from '../models/JoinSoundsForUser';
import { JoinSoundsService } from '../services/JoinSoundsService';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { delay, interval } from 'rxjs';
import { YouTubeAPIService } from '../services/YouTubeAPIService';
import { YTVideoData } from '../models/YTVideoData';

@Component({
  selector: 'app-join-sounds',
  templateUrl: './join-sounds.component.html',
  styleUrls: ['./join-sounds.component.css']
})
export class JoinSoundsComponent implements OnInit {

    JoinSoundsUsers: JoinSoundsForUser[] = [];
    NewArray: FormGroup[] = [];
    showLengthValidationError: boolean = false;

    newSoundForm = this.formBuilder.group({
      submitUserID: "",
      submitName: "",
      submitLink: "",
      submitVolume: 100
    });

    newSoundForm1: FormArray = this.formBuilder.array([]);

    constructor(private service: JoinSoundsService, private formBuilder: FormBuilder, private ytservice: YouTubeAPIService) { }

    ngOnInit(): void {
      this.refreshData();
      
      interval(2500).subscribe(x => {
        this.refreshData();
      });
      
    }

    async onClickNewSound()
    {
      for(let item of this.NewArray)
      {

        if(item.value.submitUserID != "" && item.value.submitName != "" && item.value.submitLink != "")
        {
          let link = item.value.submitLink;
          let userid = item.value.submitUserID;
          let name = item.value.submitName;
          let volume = item.value.submitVolume;
          item.setValue({
            submitUserID: userid,
            submitName: "",
            submitLink: "",
            submitVolume: 100
          });

          let isValidated = false;
          let vidobj = this.ytservice.GetVideoFromURL(link).subscribe((data) => {
            isValidated = this.validateVideoLength(data);
          });
          

          setTimeout(() => {
            if(isValidated == false)
            {
              window.alert("That video is too long- make sure it's 10 seconds or less. Other issues might be: It's age restricted, or you entered a wrong link.");
            } else {
              
              this.JoinSoundsUsers.forEach((meme, index) => {
                if(meme.userid == userid) {
                  let model: JoinSound = new JoinSound(-1, userid, "", "", link, name, 100);
                  meme.sounds.push(model);
                }
              });
    
              this.addSound(link, userid, name, volume);
            }
          }, 200);
        }
      }
    }

    async onClickDelete(event: Event) {
      var firstid: string = (event.target as Element).id;
      var id: string = firstid.replace('delbtn_', '');
      document.getElementById(firstid)!.style.animationName = "";
      document.getElementById(firstid)!.style.animationName = "example";
      (event.target as Element).className = "bi bi-trash3 trash-icon-clicked";
      this.deleteJoinSound(id);
    }

    async refreshData() {
      
      await this.service.GetAllJoinSounds().then(data => {
        setTimeout(() => {
          if(this.JoinSoundsUsers.length < 1)
          {
            this.JoinSoundsUsers = data;
          }
          else
          {
            this.JoinSoundsUsers.forEach((user, index) => {
              for(let i = 0; i < data.length; i++)
              {
                let newuser = data[i];
                if(user.userid == newuser.userid && user.sounds.length != newuser.sounds.length)
                {
                  this.clearFormFromSubmit(user.userid);
                  
                }
                this.JoinSoundsUsers[i].sounds = newuser.sounds;
              }
            })
          }

          if(this.NewArray.length < 1)
          {
            this.loadFormArray();
          }
        }, 100);

      });
    }

    loadFormArray() {
      this.NewArray = [];
      for(var i = 0; i < this.JoinSoundsUsers.length; i++) {
        this.addFormToArray("", "", this.JoinSoundsUsers[i].userid, 100);
      } 
    }

    clearFormFromSubmit(userid: string) {
      this.NewArray.forEach((obj, index) => {
        if(obj.value.submitUserID == userid) {
          this.NewArray[index] = this.formBuilder.group({
            submitUserID: userid,
            submitName: "",
            submitLink: "",
            submitVolume: 100
          });
        }
      });
    }

    addFormToArray(name: string, link: string, userid: string, volume: number) {
      
      this.NewArray.push(this.formBuilder.group({
        submitUserID: userid,
        submitName: name,
        submitLink: link,
        submitVolume: volume
      }));
    }

    getForm() {
      let meme = this.newSoundForm1 as FormArray;
      return meme.controls;
    }

    deleteJoinSound(id: string) {
      this.service.DeleteJoinSound(id);
    }

    async addSound(link: string, userid: string, name: string, volume: number) {
      let model: JoinSound = new JoinSound(-1, userid, "", "", link, name, volume);
      await this.service.AddJoinSound(model).then(x => {
        //this.refreshData();
      });
    }

    validateVideoLength(data: any) {

      let viddata = new YTVideoData(data.items[0].contentDetails.duration);

      if(viddata.duration.days != undefined || viddata.duration.hours != undefined || viddata.duration.minutes != undefined || viddata.duration.seconds! >= 12) {
        console.log("returning false");
        return false;
      } else {
        console.log("returning true");
        return true;
      }


      /*
      if(vidobj.duration.seconds! <= 12) {
        return true;
      }
      */
    }
}
