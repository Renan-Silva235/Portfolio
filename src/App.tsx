import ResponsiveAppBar from './components/header';
import GlobalStyle from './styles/GlobalStyle';
import Hero from './components/hero';
import About from './components/about';
import Skills from './components/skills';
import Projects from './components/projects';
// import Contact from './components/contact';

function App() {
  return (
    <>
      <GlobalStyle />
      <ResponsiveAppBar />

      <div id="home">
        <Hero />
      </div>
      <div id="sobre">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projetos">
        <Projects />
      </div>
      {/* <div id="contato">
        <Contact />
      </div> */}
    </>
  );
}

export default App;
