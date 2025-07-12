
import { BookService } from "./static/Book"
import { MusicService } from "./static/Music"
import { SearchService } from "./static/Search"

export class Service {

  public static createService() {
    const bookService = new BookService()
    const musicService = new MusicService()
    const searchService = new SearchService(musicService, bookService)

    return {
      bookService,
      musicService,
      searchService,
    }
  }

}