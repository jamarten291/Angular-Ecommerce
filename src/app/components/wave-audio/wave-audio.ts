import { Component, ElementRef, input, viewChild, afterNextRender } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { signal } from 'wavesurfer.js/dist/reactive/store.js';

@Component({
  selector: 'app-wave-audio',
  imports: [],
  templateUrl: './wave-audio.html',
  styleUrl: './wave-audio.css',
})
export class WaveAudio {
  readonly audioUrl = input.required<string>();
  container = viewChild.required<ElementRef<HTMLDivElement>>('wave');

  isPlaying = signal(false);
  private wsRef!: WaveSurfer;

  constructor() {
    afterNextRender(() => {
      this.wsRef = WaveSurfer.create({
        url: this.audioUrl(),
        container: this.container().nativeElement,
      });

      this.wsRef.on('play', () => this.isPlaying.set(true));
      this.wsRef.on('pause', () => this.isPlaying.set(false));
    });
  }

  playPause() {
    this.wsRef.playPause();
  }
}
