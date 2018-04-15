import React from "react";
import g from "glamorous";
import Header from "../components/header";
import SiteFooter from "../components/footer";
import Helmet from 'react-helmet';
import { ThemeProvider } from 'glamorous';
import { rhythm } from "../utils/typography";
require("prismjs/themes/prism-solarizedlight.css");


const spacingPx = 10;
const theme = {
  width: `800`
};

const Layout = ({ children, data: { site: { siteMetadata: site } } }) => (
<ThemeProvider theme={theme}>
    <main>
      <Helmet>
        <title>{site.title} &middot; {site.description}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta name="HandheldFriendly" content="True" />
        <meta name="description" content={site.description} />
      </Helmet>
      <g.Div
        margin={`0 auto`}
        maxWidth={theme.width}
        padding={rhythm(.5)}
        paddingTop={rhythm(1.5)}
      >
        <Header />
        {children()}
        <SiteFooter />
      </g.Div>
    </main>
  </ThemeProvider>
);

export default Layout;

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`