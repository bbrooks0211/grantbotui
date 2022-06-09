import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { SongInfo } from '../models/SongInfo';
import { PlaySoundService } from '../services/PlaySoundService';
import { delay, interval } from 'rxjs';

@Component({
  selector: 'app-play-sounds',
  templateUrl: './play-sounds.component.html',
  styleUrls: ['./play-sounds.component.css']
})
export class PlaySoundsComponent implements OnInit {

  queueData: SongInfo[];

  addLinkForm = this.formBuilder.group({
    submitLink: ""
  });

  constructor(private formBuilder: FormBuilder, private playSoundService: PlaySoundService) { }

  ngOnInit(): void {
    this.getQueueData();

    interval(10000).subscribe(x => {
      this.getQueueData();
    });
  }

  submitLinkForm() {
    if(this.addLinkForm.value.submitLink == "")
    {
      return;
    }
    
    this.playSoundService.AddSongToQueue(this.addLinkForm.value.submitLink!).subscribe(data => {
      this.getQueueData();
    });

    this.addLinkForm.setValue({
      submitLink: ""
    });
  }

  getQueueData() {
    console.log("calling queue data");
    this.playSoundService.GetSongQueue().subscribe((data: SongInfo[]) => {
      this.queueData = data;
    });
  }
}
