import { Component, ElementRef, Input, ViewChild, AfterViewInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { signal } from 'wavesurfer.js/dist/reactive/store.js';

@Component({
  selector: 'app-wave-audio',
  imports: [],
  templateUrl: './wave-audio.html',
  styleUrl: './wave-audio.css',
})
export class WaveAudio implements AfterViewInit {
  @Input({ required: true }) audioUrl!: string;
  @ViewChild('wave') container!: ElementRef;
  isPlaying = signal(false);
  private wsRef!: WaveSurfer;

  ngAfterViewInit() {
    this.wsRef = WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
    });

    this.wsRef.on('play', () => this.isPlaying.set(true));
    this.wsRef.on('pause', () => this.isPlaying.set(false));
  }

  playPause() {
    this.wsRef.playPause();
  }
}
