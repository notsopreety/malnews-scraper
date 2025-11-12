/**
 * This is a test file
 * It shows the markdown format of the news article
 */


const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;
const MAL_NEWS_URL = 'https://myanimelist.net/news';

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to extract news list
async function scrapeMALNews(page = 1) {
  try {
    const url = page > 1 ? `${MAL_NEWS_URL}?p=${page}` : MAL_NEWS_URL;
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(data);
    const newsList = [];

    $('.news-unit.clearfix.rect').each((_, el) => {
      const element = $(el);
      const title = element.find('.title a').text().trim();
      const newsLink = element.find('.title a').attr('href');
      const image = element.find('a.image-link img').attr('src');
      const text = element.find('.text').text().trim();
      const infoText = element.find('.info.di-ib').text().trim();
      const timeMatch = infoText.match(/^(.+?) by/);
      const time = timeMatch ? timeMatch[1].trim() : null;
      const author = element.find('.info.di-ib a').first().text().trim();
      
      // Extract news ID from the link
      const newsId = newsLink ? newsLink.split('/').pop() : null;

      newsList.push({
        id: newsId,
        title,
        link: newsLink,
        image,
        text,
        time,
        author,
      });
    });

    return newsList;
  } catch (error) {
    console.error('Error scraping MAL news:', error.message);
    throw new Error('Failed to fetch news list');
  }
}

// Helper function to scrape individual news article
async function scrapeNewsMarkdown(newsId) {
  const url = `https://myanimelist.net/news/${newsId}`;
  
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      },
    });

    const $ = cheerio.load(data);

    // Extract article details
    const title = $('.news-container h1.title a').text().trim();
    const author = $('.news-info-block .information a').first().text().trim();
    const time = $('.news-info-block .information')
      .text()
      .split('by')[1]
      ?.split('|')[0]
      ?.replace(author, '')
      ?.trim()
      ?.replace(/\s*\|\s*$/, '');

    const image = $('.content img.userimg').attr('src') || null;
    const contentEl = $('.content').clone();

    // Clean and format content
    contentEl.find('script, style, .sns-unit, img').remove();

    contentEl.find('a').each((_, a) => {
      const text = $(a).text().trim();
      const href = $(a).attr('href');
      if (text && href) {
        $(a).replaceWith(`[${text}](${href})`);
      } else {
        $(a).replaceWith(text);
      }
    });

    contentEl.find('br').replaceWith('\n\n');

    let content = contentEl.text().trim()
      .replace(/\n{3,}/g, '\n\n')
      .replace(/Staff\s*\n/, '**Staff**\n')
      .replace(/^Source:/m, '**Source:**');

    return {
      id: newsId,
      title,
      author,
      time,
      image,
      content,
    };
  } catch (err) {
    console.error(`Error scraping news ${newsId}:`, err.message);
    throw new Error(`Failed to fetch news with ID: ${newsId}`);
  }
}

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'MAL News API is running!' });
});

// Get all news with pagination
app.get('/api/news', async (req, res) => {
  try {
    const MAX_PAGE = 20; // Maximum allowed page number
    let page = parseInt(req.query.p) || 1;
    
    // Validate page number
    if (isNaN(page) || page < 1) {
      page = 1;
    } else if (page > MAX_PAGE) {
      return res.status(400).json({ 
        error: `Maximum page number is ${MAX_PAGE}`,
        max_page: MAX_PAGE
      });
    }
    
    const news = await scrapeMALNews(page);
    
    // Add pagination info to response
    const response = {
      data: news,
      pagination: {
        current_page: page,
        has_next: news.length > 0 && page < MAX_PAGE,
        next_page: page < MAX_PAGE ? page + 1 : null,
        max_page: MAX_PAGE
      }
    };
    
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single news article by ID
app.get('/api/news/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'News ID is required' });
    }
    const article = await scrapeNewsMarkdown(id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});