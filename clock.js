const clock = [
  [
    { w: "it's", active: () => true },
    { w: "five ", active: (h, m) => m === 5 || m === 55 },
    { w: "ten", active: (h, m) => m === 10 || m === 50 },
  ],
  [
    { w: "half", active: (h, m) => m >= 25 && m < 40 },
    { w: "a quarter", active: (h, m) => m === 15 || m === 45 },
  ],
  [
    { w: "twenty", active: (h, m) => m === 20 || m === 40 },
    { w: "to", active: (h, m) => m > 35 },
    {
      w: "past",
      active: (h, m) => m > 0 && m <= 35,
    },
  ],
  [
    { w: "two", active: (h) => h === 2 },
    { w: "four", active: (h) => h === 4 },
    { w: "three", active: (h) => h === 3 },
  ],
  [
    { w: "one", active: (h) => h === 1 },
    { w: "seven", active: (h) => h === 7 },
    { w: "five ", active: (h) => h === 5 },
  ],
  [
    { w: "eight", active: (h) => h === 8 },
    { w: "six", active: (h) => h === 6 },
    { w: "nine", active: (h) => h === 9 },
  ],
  [
    { w: "twelve", active: (h) => h === 12 },
    { w: "ten", active: (h) => h === 10 },
    { w: "two" },
  ],
  [
    { w: "eleven", active: (h) => h === 11 },
    { w: "o'clock", active: (h, m) => m === 0 },
  ],
];

const hours12 = (hours) => (hours + 24) % 12 || 12;

function closest(num, step) {
  var resto = num % step;
  if (resto <= 2) {
    return num - resto;
  } else {
    return num + step - resto;
  }
}

function getClock(date) {
  let hours = hours12(date.getHours());
  const minutes = closest(date.getMinutes(), 5);
  if (minutes > 35) {
    hours++;
  }

  return clock.map((line) =>
    line.map((w) => {
      if (typeof w.active === "function") {
        return { ...w, active: w.active(hours, minutes) };
      }

      return w;
    })
  );
}

module.exports = getClock;
