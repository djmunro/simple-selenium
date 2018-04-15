module.exports = {
  siteMetadata: {
    title: `Simple Selenium`,
    description: `Making selenium simple`,
    siteUrl: 'http://www.simpleselenium.com',
  },
    plugins: [
      'gatsby-plugin-catch-links',
      `gatsby-transformer-remark`,
      `gatsby-plugin-glamor`, {
        resolve: `gatsby-plugin-typography`,
        options: {
          pathToConfigModule: `src/utils/typography.js`,
        },
      },
      `gatsby-plugin-sharp`, {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `src`,
          path: `${__dirname}/src/`,
        },
      },
      {
        resolve: 'gatsby-transformer-remark',
        options: {
          plugins: [{
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
            },
          }, {
            resolve: 'gatsby-remark-images',
            maxWidth: 950,
          }],
        },
      }
    ],
  };