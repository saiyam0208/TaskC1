import React from 'react';
import Hero from '../components/Hero.jsx';
import Portfolio from '../components/Portfolio.jsx';
import Articles from '../components/Articles.jsx';
import Tutorials from '../components/Tutorials.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Articles />
      <Tutorials />
    </>
  );
}
