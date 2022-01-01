export function About() {
  return (
    <section className="about">
      <h1>Appsus</h1>
        <h4>
          Our main goal is to help you keep your note, stay in touch and
          entertained yourself with some of the best books!
        </h4>
        <h1>About Us</h1>
      <div className="about-container">
        <div className="may">
          <div className="img-container">
            <img src="img/may.jpg"></img>
          </div>
          <h3>May Elgarat</h3>
          <p> My name is May Elgarat, 26 years old, from Herzeliya. </p>
          <p> I study Full Stack Development (Javascript) at Coding Academy.</p>
          <p>     I also have BSc in industrial management engineer.</p>
        </div>
        <div className="lee">
          <div className="img-container">
            <img src="img/lee.png"></img>
          </div>
          <h3>Lee Segal</h3>
          <p> My name is Lee Segal, 27 years old, from Tel Aviv. </p>
          <p> I study Full Stack Development (Javascript) at Coding Academy.</p>
          <p> I also  have BOT in Occupational therapy.</p>
        </div>
      </div>
    </section>
  );
}
