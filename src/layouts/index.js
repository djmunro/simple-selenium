import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";

import { rhythm } from "../utils/typography";

const linkListStyle = css({ listStyle: `none`, float: `right` });

const ListLink = props =>
    <li style={{ display: `inline-block`, marginRight: `1rem` }}>
        <Link to={props.to}>
            {props.children}
        </Link>
    </li>

export default ({ children, data }) =>
  <g.Div
    margin={`0 auto`}
    maxWidth={800}
    padding={rhythm(2)}
    paddingTop={rhythm(1.5)}
  >
    <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
      <g.H3 marginBottom={rhythm(2)} display={`inline`}>
        {data.site.siteMetadata.title}
      </g.H3>

      </Link>
      <ul className={linkListStyle}>
        <ListLink to="/">Home</ListLink>
        <ListLink to="/about/">About</ListLink>
        <ListLink to="/contact/">Contact</ListLink>
      </ul>
    </header>
    {children()}
  </g.Div>

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`