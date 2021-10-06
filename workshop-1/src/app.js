import {HttpClient} from 'aurelia-http-client';
import {style} from './style.css'

let httpClient = new HttpClient();

export class App {

  constructor() {
    this.search = ""
    this.data = []
    this.url = []
    this.ergebnisse = ""
    this.aktuell = ""
  }

  getSearch() {
    this.search = this.mysearch

    let key = 'Lkw14CuJxWUgkfptzBvJkPEJIlBKxJN6'

    httpClient.get('https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + this.search + '&limit=50&offset=&rating=g&lang=en')
      .then(data => {
        this.data = JSON.parse(data.response).data
        this.ergebnisse = this.data.length
        this.url = []
        for (let i = 0; i < 10; i++) {
          this.url.push(this.data[i])
        }
        this.aktuell = this.url.length
      })
      .catch(error => {
      });
  }

  getMore(scrollContext) {
    let length = this.url.length
    if (this.data.length - length >= 10) {
      for (let i = length; i < length + 10; i++) {
        this.url.push(this.data[i])
      }
      this.url = [...this.url]
    } else {
      for (let i = length; i < this.data.length; i++) {
        this.url.push(this.data[i])
      }
      this.url = [...this.url]
    }
    this.aktuell = this.url.length
  }
}
