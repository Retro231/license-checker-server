const Parser = require("rss-parser");
const parser = new Parser();

const rssFeedUrl = "https://homeofficemedia.blog.gov.uk/feed/";

const newsfeedConroller = async (req, res) => {
  console.log("i'm in newsFeed controller");
  try {
    const feed = await parser.parseURL(rssFeedUrl);
    res.json(feed.items);
  } catch (error) {
    console.error("Error fetching or parsing RSS feed:", error);
  }
};

module.exports = { newsfeedConroller };
