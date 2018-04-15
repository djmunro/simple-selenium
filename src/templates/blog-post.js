import React from "react";
import g from "glamorous";
import { rhythm } from "../utils/typography";
import ReactDisqusComments from 'react-disqus-comments';  


export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <div data="post">
      <g.H1>{post.frontmatter.title}</g.H1>
      <g.H4 color="#BBB" marginTop={rhythm(0)} marginBottom={rhythm(1)}>{post.frontmatter.date}</g.H4>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
      <ReactDisqusComments
        shortname="simpleselenium"
        title={post.frontmatter.title}
      />
    </div>
  );
};

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title,
        date
      }
    }
  }
`;
