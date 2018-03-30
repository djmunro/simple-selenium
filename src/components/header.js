import React from 'react';
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

const Header = () => (
  <header style={{ marginBottom: `1.5rem` }}>
      <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
      <g.H3 marginBottom={rhythm(2)} display={`inline`}>
        Simple Selenium
      </g.H3>
      </Link>
      
      <ul className={linkListStyle}>
        <g.A
          href="/"
          display="inline-block"
          marginRight=".5em"
        >Home
        </g.A>
        <g.A
          href="/about"
          display="inline-block"
          marginRight=".5em"
        >
          About
        </g.A>
        <g.A
          href="https://github.com/djmunro"
          display="inline-block"
        >
          GitHub
        </g.A>
      </ul>
    </header>
);

export default Header;