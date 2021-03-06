import React from "react";
import g from "glamorous";
import Link from "gatsby-link";


import { rhythm } from "../utils/typography";

export default ({ data }) => {
  console.log(data);
  return (
    <div>
      <g.H1 display={"inline"} borderBottom={"1px solid"}>
        Posts
      </g.H1>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id} data="post">
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >
            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.frontmatter.title}
            </g.H3>
            <g.Span color="#BBB">{node.frontmatter.date}</g.Span>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt(pruneLength: 280)
        }
      }
    }
  }
`;