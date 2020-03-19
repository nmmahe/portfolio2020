import React, {Component} from 'react';
import './App.css';

class App extends Component{

state={
      error: null,
      jsonReturnedValue: null,
      projects:null,
      loadedProjects: null,
      categories:[
        "All",
        "Javascript",
        "React",
        "Python",
        "JMP",
        "MIVA",
        "PHP",
        "C#",
        "Swift",
        "SwiftUI",
        "Bootstrap",
        "Azure Web Service",
        "Machine Learning",
        "Wordpress",
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
                    <h1>{project.name}</h1>
                    
                      <div className="projectDescription">
                        <div>
                          {project.summary}
                        </div>
                      </div>
                    </div>
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
                    <h1>{project.name}</h1>
                    
                      <div className="projectDescription">
                        <div>
                          {project.summary}
                        </div>
                      </div>
                    </div>
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
        <button key={category} value={category} onClick={(category) => sortCategory(category.target.value)}>{category}</button>
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
                    <div>
                      Email: nicholasmahe@gmail.com
                    </div>
                    <div className="resume-link">
                      <a href="#">See my resume</a>
                    </div>
                    <div className="icon-container">
                      <a href="#" className="fab fa-linkedin-in"></a>
                      <a href="#" className="fab fa-github"></a>
                      <a href="#" className="fab fa-facebook"></a>
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
        <div className="subtitle">
          My name is Nick Mahe, and I am a web developer. I love building applications and searching for ways to automate and be innovative.
        </div>
        Grab resume
      <div>
        <h1>Projects</h1>
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
