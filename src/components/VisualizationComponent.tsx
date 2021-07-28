import React from "react";

export default class Visualization extends React.Component {
  private myRef: React.RefObject<HTMLDivElement>;
  private changeVis;
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const p5 = require("p5");
    window.p5 = p5;
    require("p5/lib/addons/p5.sound");

    const Sketch = (p) => {
      var fft;
      var button;
      var mic;
      var vis = 1;
      var volhistory = [];
      this.changeVis = () => {
        if (vis == 1) {
          vis = 2;
        } else {
          vis = 1;
        }
      };
      p.setup = () => {
        mic = new p5.AudioIn();
        mic.start();
        p.createCanvas(800, 600);
        p.angleMode(p5.DEGREES);
        fft = new p5.FFT();
        fft.setInput(mic);
      };

      p.draw = () => {
        p.background(0);
        p.noStroke();
        var spectrum = fft.analyze();
        if (vis !== 1) {
          p.colorMode(p.RGB);
          p.translate(p.width / 2, p.height / 2);
          for (let i = 0; i < spectrum.length; i++) {
            let angle = p.map(i, 0, spectrum.length, 0, 360);
            let amp = spectrum[i];
            let r = p.map(amp, 0, 256, 20, 100);
            let x = r * p.cos(angle);
            let y = r * p.sin(angle);
            p.stroke(255, i / 4, 0);
            p.line(0, 0, x * 2, y * 2);
          }
        } else {
          p.colorMode(p.RGB);

          for (let i = 0; i < spectrum.length; i++) {
            let amp = spectrum[i];

            let y = p.map(amp, 0, 500, p.height, 0);
            p.fill(255, i, 0);
            p.rect(i, y, p.width / 500, p.height - y);
          }
        }
        p.noFill();
      };
    };

    //We create a new p5 object on component mount, feed it
    let myP5 = new p5(Sketch, this.myRef.current);
  }

  render() {
    return (
      <>
        <div className="flex justify-center" ref={this.myRef}></div>
        <div className="flex justify-center w-full mt-2">
          <button
            className="bg-accent-spotify hover:bg-accent-spotify-darker transition ease-in-out p-2 rounded-lg text-white text-base"
            onClick={() => {
              this.changeVis();
            }}
          >
            Toggle
          </button>
        </div>
      </>
    );
  }
}
