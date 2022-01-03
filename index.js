// Require the lib, get a working terminal
const termkit = require("terminal-kit");
const getClock = require("./clock");
const ScreenBuffer = termkit.ScreenBuffer;

const LINE_LENGHT = 15;

let term;

function init(callback) {
  termkit.getDetectedTerminal(function (error, detectedTerm) {
    if (error) {
      throw new Error("Cannot detect terminal.");
    }

    term = detectedTerm;

    viewport = new ScreenBuffer({
      dst: term,
      width: Math.min(term.width),
      height: Math.min(term.height - 1),
      y: 2,
    });

    /* term.moveTo.eraseLine.bgWhite.green(
      1,
      1,
      "Arrow keys: move the ship - Q/Ctrl-C: Quit\n"
    ); */
    term.fullscreen();
    term.hideCursor();
    term.grabInput();
    term.on("key", inputs);
    term.on("resize", () => {
      term.clear();
      draw();
    });
    callback();
  });
}

function inputs(key) {
  switch (key) {
    case "q":
    case "CTRL_C":
      terminate();
      break;
  }
}

function terminate() {
  term.fullscreen(false);
  term.hideCursor(false);
  term.grabInput(false);
  term.processExit();
}

function loop() {
  draw();
  setTimeout(loop, 1000);
}

function draw() {
  const time = new Date();

  const clock = getClock(time);

  const x = (term.width - LINE_LENGHT) / 2;
  let y = (term.height - 7) / 2;

  for (const line of clock) {
    term.moveTo(x, y).eraseLine();
    for (const word of line) {
      const l = `${word.w} `;
      if (word.active) {
        term.bold(l);
      } else {
        term(l);
      }
    }
    y++;
  }
}

init(loop);
