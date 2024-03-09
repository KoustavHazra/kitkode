import React from 'react';
import './HomePage.css';
import loremContent from './LoremPosts';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div id="home" className="home-page">
      <section>
        <main>
          <div className="section-homepage">
            <div className="container grid grid-two-cols">
              
              <div className="blogs-container">
                <h1>Blogs</h1>
                {loremContent.map((content, index) => (
                  <Link key={`blog-${index}`} to={`/blogs/${index}`} className="blog-link">
                    <div className="blog-box">
                      <p className="date">{content.date}</p>
                      <h4 className="title">{content.title}</h4>
                      <p className="content">{content.content}</p>
                    </div>
                  </Link>
                  ))}
                </div>


                <div className="problems-container">
                  <h1>Questions</h1>
                  <div className="problems-list">
                    <Link to="/problem1" className="problem-box">
                      <p>1. Two sum</p>
                    </Link>
                    <Link to="/problem2" className="problem-box">
                      <p>2. Add two numbers</p>
                    </Link>
                    <Link to="/problem3" className="problem-box">
                      <p>3. Median of two sorted arrays</p>
                    </Link>
                  </div>
                </div>
                
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default HomePage;
