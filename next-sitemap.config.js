/** @type {import('next-sitemap').IConfig} */

module.exports = {
    siteUrl: process.env.WEBSITE_URL || 'https://caretechit.com.br',
    generateRobotsTxt: true,
}