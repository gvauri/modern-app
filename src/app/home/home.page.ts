import {Component, inject} from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonAlert,
  IonAvatar, IonBadge,
  IonContent,
  IonHeader, IonInfiniteScroll, IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonSkeletonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {MovieService} from "../services/movie.service";
import {catchError, finalize} from "rxjs";
import {MovieResult} from "../services/interfaces";
import {DatePipe} from "@angular/common";
import {RouterModule} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonAvatar, IonSkeletonText, IonAlert, IonLabel, DatePipe, RouterModule, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class HomePage {
  private curentPage = 1
  private movieService = inject(MovieService)
  protected error = null
  protected isLoading: boolean = false
  protected movies: MovieResult[] = []
  protected dummyArray = new Array(5)
  protected imageBaseUrl = environment.imgBaseUrl;

  constructor() {
    this.loadMovies()
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null
    if (!event) {
      this.isLoading = true
    }
    this.movieService.getTopRatedMovies(this.curentPage).pipe(
      finalize(() => {
        this.isLoading = false
        if (event) {
          event.target.complete()
        }
      }),
      catchError((error: any) => {
        this.error = error.error.status_message
        return []
      })
    ).subscribe({
      next: (res) => {
        console.log(res)
        this.movies.push(...res.results)
        if (event) {
          event.target.disabled = res.total_pages === this.curentPage
        }
      }
    })
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    console.log(this.curentPage)
    this.curentPage ++
    this.loadMovies(event)
  }
}
