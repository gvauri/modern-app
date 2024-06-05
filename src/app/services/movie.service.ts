import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {delay, Observable} from "rxjs";
import {ApiResult, MovieResult} from "./interfaces";

const BASE_URL = environment.baseUrl;
const API_KEY = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient)

  getTopRatedMovies(page = 1):Observable<ApiResult> {
    return this.http.get<ApiResult>(`${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`)
  }

  getMovieDetails(id:string):Observable<MovieResult> {
    return this.http.get<MovieResult>(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
  }
}
