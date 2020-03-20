import React, {Component} from 'react';
import './App.css';
import Pdf from './documents/Nick Mahe Resume February 2020.pdf';

class App extends Component{

state={
      error: null,
      jsonReturnedValue: null,
      projects:null,
      loadedProjects: null,
      categories:[
        "All",
        "Javascript",
        "Python",
        "MIVA",
        "PHP",
        "C#",
        "Swift",
        "SwiftUI",
        "Machine Learning",
        "MVC"
      ]
    }
 
componentDidMount() {
    fetch('https://gitconnected.com/v1/portfolio/nmmahe')
      .then(response => response.json())
      .then((json) => {
        this.initialProjects = json.projects.filter(project => project.images[0])
        this.setState({ jsonReturnedValue: json,
          loadedProjects: json.projects.filter(project => project.images[0]).map(project => {
            return(    
                // <div key={project.name} className="projectContainer">
                //   <img alt={project.name} width={project.primaryLanguage === "Swift" ? null: 360} height={project.primaryLanguage === "Swift" ? 400 : 260} src={project.images[0].resolutions.desktop.url}></img>
                //   <div className="projectDescription">
                //     <div>
                //     {project.name}
                //     </div>
                //     <div>
                //       {project.summary}
                //     </div>
                //   </div>
                // </div> 
                
            <div key={project.name} className="projectContainer">
              <div className="flip-card" style={project.primaryLanguage === "Swift" ? {height:'400px', marginBottom:'20px'} : null}>
              <input type="checkbox"/>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img alt={project.name} width={project.primaryLanguage === "Swift" ? null: 360} height={project.primaryLanguage === "Swift" ? 400 : 260} src={project.images[0].resolutions.desktop.url}></img>
                  </div>
                  <div className="flip-card-back">
                    <h1 className="project-name">{project.name}</h1>
                    
                      <div className="projectDescription">
                        <div>
                          {project.summary}
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="icon-container project-icon">
                    {project.website ? 
                    (
                      <a href={project.website} className="fas fa-eye" target="_blank"></a>
                    ) : 
                    (
                      <a href={project.githubUrl} className="fab fa-github" target="_blank"></a>
                    )} 
                  </div>
                </div>
            </div>
            )
          }),
          projects: json.projects.filter(project => project.images[0]) 
        });
      } 
    )
  }
  render(){
    const sortCategory = (category) => {

        const filteredProjects = category === "All" ? this.state.projects : 
        this.state.projects.filter(project => {
          return project.languages.includes(category) 
        })
        const mappedProjects = filteredProjects.map(project => {
          return (
            <div key={project.name} className="projectContainer">
              <div className="flip-card" style={project.primaryLanguage === "Swift" ? {height:'400px', marginBottom:'20px'} : null}>
              <input type="checkbox"/>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img alt={project.name} width={project.primaryLanguage === "Swift" ? null: 360} height={project.primaryLanguage === "Swift" ? 400 : 260} src={project.images[0].resolutions.desktop.url}></img>
                  </div>
                  <div className="flip-card-back">
                    <h1 className="project-name">{project.name}</h1>
                    
                      <div className="projectDescription">
                        <div>
                          {project.summary}
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="icon-container project-icon">
                    {project.website ? 
                    (
                      <a href={project.website} className="fas fa-eye"></a>
                    ) : 
                    (
                      <a href={project.githubUrl} className="fab fa-github"></a>
                    )} 
                  </div>
                </div>
            </div>
          )
        })

      this.setState({
        loadedProjects: mappedProjects
      })
    }

    const categories = this.state.categories.map(category => {
      return(
        <button className="filter-button" key={category} value={category} onClick={(category) => sortCategory(category.target.value)}>{category}</button>
      );
    })

    return (
<div>
      <div className="site-header">
      <div className="shadow-overlay">
          <div className="site-header-grid">
              <div className="site-header-item1">
                  Hello, 
                  <br/>
                  I'm Nick Mahe.
                  <br/>
                  Full-stack developer
              </div>
              <div className="site-header-item2">
                  <div className="contact-header">
                    Contact Me
                  </div>
                  <div className="contact-container">
                    <a href="mailto:nicholasmahe@gmail.com">
                      Email: nicholasmahe@gmail.com
                    </a>
                    <div className="resume-link">
                      <a href={Pdf} target="_blank">See my resume</a>
                    </div>
                    <div className="icon-container">
                      <a href="https://www.linkedin.com/in/nicholas-mahe" className="fab fa-linkedin-in"></a>
                      <a href="https://github.com/nmmahe" className="fab fa-github"></a>
                      <a href="https://www.facebook.com/nick.m.mahe" className="fab fa-facebook"></a>
                    </div>
                  </div>
              </div>
          </div>
          <div className="site-header-scroll">
              Press to Scroll Down
          </div>
          <div className="arrow bounce site-header-scroll ">
              <a href="#main-container" className="fa fa-arrow-down fa-2x"></a>
          </div>
      </div> 
  </div>

      <div id="main-container" className="main-container">
        <div className="wrapper">
        <div className="title">
          Welcome,
        </div>
        <em><div className="subtitle">
          I love building applications and searching for ways to automate processes and be innovative. I have industry experience in several 
          front and back-end technologies, creating professional, user-friendly websites and applications, as well as experience working face-to-face with clients and on a team. 
        </div>
        </em>
      <div>
        <h1 className="projects-main-title">Projects</h1>
        {categories}
      </div>
        <div className="projects-grid">
        
        {this.state.jsonReturnedValue ? this.state.loadedProjects : "Loading"}
        </div>
      </div>
      </div>
</div>
     );

  }
  
}

export default App;
