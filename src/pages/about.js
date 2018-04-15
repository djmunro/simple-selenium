import React from "react";

export default ({ data }) =>
  <div>
    <h1>
      About {data.site.siteMetadata.title}
    </h1>
    <p>
      I am a big proponent of automated testing, unit tests to assert that my functions work for all edge cases, and Selenium testing to be sure that it's working in the browser. Not only does it make it easier to check if the entire site is still working, but it saves time in the long run from manual testings and constant regressions.
    </p>
    <p> 
      My opinion on white spacing is that it needs to be consistent, my code style will follow the code that surrounds it. Writing self-documenting code is also very important, I will give variables and functions obvious names, and comment non-trivial pieces of functionality. Also, my tests will provide further documentation.
    </p>
  </div>

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
