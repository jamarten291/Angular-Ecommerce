import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string): string {
    /*
    const creationDate = Date.parse(value);
    const currentDate = Date.now();

    const seconds = Math.floor((currentDate - creationDate) / 1000);
    if (seconds < 60) {
      return `Hace ${seconds} ${seconds == 1 ? 'segundo' : 'segundos'}`;
    } 

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `Hace ${minutes} ${minutes == 1 ? 'minuto' : 'minutos'}`;
    } 

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `Hace ${hours} ${hours == 1 ? 'hora' : 'horas'}`;
    } 

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `Hace ${days} ${days == 1 ? 'día' : 'días'}`;
    } 

    const weeks = Math.floor(days / 7);
    if (weeks < 4) {
      return `Hace ${weeks} ${weeks == 1 ? 'semana' : 'semanas'}`;
    } 

    const months = Math.floor(weeks / 4);
    if (months < 12) {
      return `Hace ${months} ${months == 1 ? 'mes' : 'meses'}`;
    } 

    const years = Math.floor(months / 12);
    return `Hace ${years} ${years == 1 ? 'año' : 'años'}`
    */
    return formatDistanceToNow(new Date(value), {
      addSuffix: true,
      locale: es,
    });
  }
}
