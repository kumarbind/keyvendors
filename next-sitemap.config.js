/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.HOST,
    generateRobotsTxt: true, // (optional)
    exclude: ['/cart', '/profile'],
    robotsTxtOptions: {
        additionalSitemaps: [
            `${process.env.HOST}/location-sitemap.xml`
        ],
      },
 
  }