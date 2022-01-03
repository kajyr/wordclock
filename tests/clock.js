// test/hello-world.js
const test = require("ava");
const getClock = require("../clock");

function toStr(dateStr) {
  return getClock(new Date(dateStr))
    .flatMap((line) => line.filter((w) => w.active).map((w) => w.w))
    .join(" ");
}

test("Basics", (t) => {
  t.is(toStr("2022-01-01T10:30:15"), "it's half past ten");
  t.is(toStr("2022-01-01T10:31:15"), "it's half past ten");
  t.is(toStr("2022-01-01T10:32:15"), "it's half past ten");
  t.is(toStr("2022-01-01T16:35:00"), "it's half past four");
  t.is(toStr("2022-01-01T16:38:00"), "it's twenty to five ");
  t.is(toStr("2022-01-01T16:43:00"), "it's a quarter to five ");
  t.is(toStr("2022-01-01T16:49:00"), "it's ten to five ");
});

test("Negatives", (t) => {
  t.is(toStr("2022-01-01T10:45:15"), "it's a quarter to eleven");
});

test("o'clock", (t) => {
  t.is(toStr("2022-01-01T16:02:15"), "it's four o'clock");
  t.is(toStr("2022-01-01T04:00:00"), "it's four o'clock");
});
