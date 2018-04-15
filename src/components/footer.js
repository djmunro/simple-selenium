import React from 'react';
import g, {Footer, A} from 'glamorous';

const P = g.p(({ theme }) => ({
  margin: `2px 0`,
  fontSize: `.8em`
}));

const SiteFooter = () => (
  <Footer
    textTransform={`uppercase`}
    textAlign={'center'}
    opacity={'0.35'}
    display={'flex'}
    flexDirection={'column'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <P>&copy; 2018 David Munro</P>
    <P>
    <small>
      This site is built with <A inline href="https://www.gatsbyjs.org/">GatsbyJS</A>.
      You can find the <A inline href="https://github.com/djmunro/simple-selenium">source code on GitHub</A>.
    </small>
    </P>
  </Footer>
);

export default SiteFooter;