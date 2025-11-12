# MAL News Scraper API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Node.js API that scrapes and serves the latest anime news from MyAnimeList (MAL) in a clean JSON format. This API provides easy access to MAL's news feed without the need for authentication or API keys.

## 🌟 Features

- 🚀 Fast and lightweight API for fetching MAL news
- 📰 Get latest anime news in a clean JSON format
- 🔍 Search through news articles
- 📱 Mobile-friendly responses
- ⚡ Cached responses for better performance
- 🔄 Automatic data refresh
- 🎨 Clean and structured data output

## 🚀 Demo

Check out the live demo: [https://malnews-scraper.vercel.app/](https://malnews-scraper.vercel.app/)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/notsopreety/malnews-scraper.git
   cd malnews-scraper
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. For production:
   ```bash
   npm start
   ```

## 🛠️ API Endpoints

### Get Latest News
```
GET /
```
Returns a welcome message and API status.

### Get News List
```
GET /api/news
```
Get a list of latest news articles.

## 📝 Example Response
```json
{
  "data": [
    {
      "id": "73489390",
      "title": "'Kanchigai no Atelier Meister: Eiyuu Party no Moto Zatsuyougakari ga, Jitsu wa Sentou Igai ga SSS Rank Datta to Iu Yoku Aru Hanashi' Second Season in Production",
      "link": "https://myanimelist.net/news/73489390",
      "image": "https://cdn.myanimelist.net/r/100x156/s/common/uploaded_files/1762942815-836fe6e4d03c9f7ae7816af72f056f3c.jpeg?s=b57efc3b0f76010de3f296aabe99a0ad",
      "text": "The official website for the television anime adaptation of Yousuke Tokino's Kanchigai no Atelier Meister: Eiyuu Party no Moto Zatsuyougakari ga, Jitsu wa Sentou Igai ga SSS-Rank Datta to Iu Yoku Aru Hanashi (The Unaware Atelier Master) light novel announced a second season on We...",
      "time": "1 hour ago",
      "author": "Naitik7897"
    },
    {
      "id": "73489384",
      "title": "'Hidarikiki no Eren' Unveils Main Cast, Staff, Teaser Promo for Spring 2026",
      "link": "https://myanimelist.net/news/73489384",
      "image": "https://cdn.myanimelist.net/r/100x156/s/common/uploaded_files/1762942724-32062af814ff5c349b6ed9ef4067c5ff.jpeg?s=bc728cbc478718c8166ca896ce5d10a1",
      "text": "Production company GAGA opened an official website for the television anime adaptation of Kappi's Hidarikiki no Eren (Eren the Southpaw) web manga on Wednesday. The website also revealed the main cast, staff, teaser visual (pictured), and a teaser promotional video. The anime is...",
      "time": "2 hours ago",
      "author": "Syureria"
    },
    // ... more news items ...
  ],
  "pagination": {
    "current_page": 1,
    "has_next": true,
    "next_page": 2,
    "max_page": 20
  }
}
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Number of items per page (max: 100)

### Get News by ID
```
GET /api/news/:id
```
Get detailed information about a specific news article.

## 📝 Example Response

```json
{
  "id": "73488820",
  "title": "Web Manga 'Kashita Maryoku wa \"Revo Barai\" de Kyousei Choushuu' Gets TV Anime in 2026",
  "author": "DatRandomDude",
  "time": "7 hours ago",
  "image": "https://cdn.myanimelist.net/s/common/uploaded_files/1762922096-635d1c9c93785f69def4286278eb402f.jpeg",
  "content": "HTML encoded content",
  "content_type": "html"
}
```

**⚠️ Optional note:** If you want to get the content in markdown format, you can use the `markdown.js` file as a main in `package.json` or use `npm run markdown`.

## 🛠️ Built With

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Express](https://expressjs.com/) - Web framework
- [Cheerio](https://cheerio.js.org/) - HTML parsing
- [Axios](https://axios-http.com/) - HTTP client
- [CORS](https://github.com/expressjs/cors) - Cross-Origin Resource Sharing

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Author

[**Samir Badaila**](https://samirbadaila.is-a.dev/)

- Email: contact@samirb.com.np
- GitHub: [@notsopreety](https://github.com/notsopreety)

## 🙌 Acknowledgments

- [MyAnimeList](https://myanimelist.net/) for the amazing anime content
- All contributors who helped improve this project

## ⚠️ Disclaimer

This project is not affiliated with or endorsed by MyAnimeList. Please use it responsibly and respect MAL's terms of service.
