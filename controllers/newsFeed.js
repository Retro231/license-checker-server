import Parser from "rss-parser";
const parser = new Parser();

const rssFeedUrl = "https://homeofficemedia.blog.gov.uk/feed/";
export const newsfeedConroller = async (req, res) => {
  try {
    const feed = await parser.parseURL(rssFeedUrl);
    res.json({ data: feed.items });
  } catch (error) {
    console.error("Error fetching or parsing RSS feed:", error);
  }
};
