import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {MovieService} from "../services/movie.service";
import {environment} from "../../environments/environment";
import {MovieResult} from "../services/interfaces";
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonBackButton, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonLabel, IonItem, IonIcon, IonCard, CurrencyPipe, DatePipe]
})
export class DetailsPage implements OnInit {
  private movieService: MovieService = inject(MovieService);
  protected imageBaseUrl = environment.imgBaseUrl;
  protected movie: WritableSignal<MovieResult| null> = signal(null)
  @Input()
    set id(movieId: string){
    this.movieService.getMovieDetails(movieId).subscribe({
      next: (movie: MovieResult) => {
        console.log(movie)
        this.movie.set(movie)
      }
    })
  }
  constructor() {
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }

  ngOnInit() {
  }

}
