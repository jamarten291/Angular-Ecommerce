import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Counter } from '@shared/components/counter/counter.component';
import { WaveAudio } from '../../../../components/wave-audio/wave-audio';
import { Highlight } from '@shared/directives/highlight.directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  imports: [Counter, WaveAudio, Highlight, FormsModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class About {
  duration = signal<number>(1000);
  message = signal<string>('¡Hola!');

  handleTextInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.message.set(value);
  }

  handleNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.valueAsNumber;
    this.duration.set(value);
  }
}
