import React from 'react'
import './About.css'

const About = () => {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">Minha História</h2>
            <div className="about-story">
              <p className="about-paragraph">
                Olá! Eu sou a Thaffny Silva Barboza e tenho 23 anos. Minha paixão é trabalhar com a beleza e 
                ajudar as pessoas a se sentirem incríveis! Eu me dedico integralmente à arte de transformar 
                olhares e sorrisos.
              </p>
              <p className="about-paragraph">
                Cada cliente que recebo é único, e é por isso que dedico atenção especial a cada detalhe. 
                Acredito que a beleza vai muito além da estética—é sobre confiança, autoestima e sentir-se 
                bem consigo mesma. Minha missão é fazer com que cada pessoa saia do meu espaço não apenas 
                mais bonita, mas também mais confiante e radiante.
              </p>
              <p className="about-paragraph">
                Se você está buscando uma profissional atenciosa para cuidar da sua beleza com carinho e 
                técnica, adoraria te receber! Me chame para agendar e vamos juntas realçar a sua beleza natural.
              </p>
            </div>
          </div>
          <div className="about-visual">
            <div className="about-ornament"></div>
            <div className="about-accent"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

