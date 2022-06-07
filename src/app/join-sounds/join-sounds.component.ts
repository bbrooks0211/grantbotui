import { Component, Input, OnInit } from '@angular/core';
import { JoinSound } from '../models/JoinSound';
import { JoinSoundsForUser } from '../models/JoinSoundsForUser';
import { JoinSoundsService } from '../services/JoinSoundsService';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { delay, interval } from 'rxjs';

@Component({
  selector: 'app-join-sounds',
  templateUrl: './join-sounds.component.html',
  styleUrls: ['./join-sounds.component.css']
})
export class JoinSoundsComponent implements OnInit {

    JoinSoundsUsers: JoinSoundsForUser[] = [];
    NewArray: FormGroup[] = [];

    newSoundForm = this.formBuilder.group({
      submitUserID: "",
      submitName: "",
      submitLink: ""
    });

    newSoundForm1: FormArray = this.formBuilder.array([]);

    constructor(private service: JoinSoundsService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.refreshData();
      
      interval(1000).subscribe(x => {
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
          item.setValue({
            submitUserID: userid,
            submitName: "",
            submitLink: ""
          });

          this.JoinSoundsUsers.forEach((meme, index) => {
            if(meme.userid == userid) {
              let model: JoinSound = new JoinSound(-1, userid, "", "", link, name);
              meme.sounds.push(model);
            }
          });

          await this.addSound(link, userid, name);
          
        }
      }
    }

    async refreshData() {
      
      await this.service.GetAllJoinSounds().then(data => {
        console.log(data);
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
                console.log("New User: ");
                console.log(newuser);
                if(user.userid == newuser.userid && user.sounds.length != newuser.sounds.length)
                {
                  this.clearFormFromSubmit(user.userid);
                  this.JoinSoundsUsers[i] = newuser;
                }
              }
            })
          }

          console.log("length poop: " + this.NewArray.length)
          if(this.NewArray.length < 1)
          {
            this.loadFormArray();
          }
        }, 100);

      });
    }

    loadFormArray() {
      console.log("poopoo");
      console.log(this.JoinSoundsUsers);
      this.NewArray = [];
      for(var i = 0; i < this.JoinSoundsUsers.length; i++) {
        this.addFormToArray("", "", this.JoinSoundsUsers[i].userid);
      } 
    }

    clearFormFromSubmit(userid: string) {
      this.NewArray.forEach((obj, index) => {
        if(obj.value.submitUserID == userid) {
          this.NewArray[index] = this.formBuilder.group({
            submitUserID: userid,
            submitName: "",
            submitLink: ""
          });
        }
      });
    }

    addFormToArray(name: string, link: string, userid: string) {
      
      this.NewArray.push(this.formBuilder.group({
        submitUserID: userid,
        submitName: name,
        submitLink: link
      }));
    }

    getForm() {
      let meme = this.newSoundForm1 as FormArray;
      return meme.controls;
    }

    async addSound(link: string, userid: string, name: string) {
      let model: JoinSound = new JoinSound(-1, userid, "", "", link, name);
      await this.service.AddJoinSound(model).then(x => {
        this.refreshData();
      });
    }
}
