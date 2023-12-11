import {bench} from 'vitest';
import format_string from "../index";

const positionalArgs = [0, 1, 2, 3];
const namedArgs = {
  "alpha": 0,
  "beta": 1,
  "charlie": 2,
  "delta": 3
};

bench('format_string array args function', () => {
  return format_string("{0}{1}{2}{3} {{3}}", [0, 1, 2, 3]);
}, {time: 1000})

bench('format_string named args function', () => {
  return format_string("{alpha}{beta}{charlie}{delta} {{delta}}", namedArgs);
}, {time: 1000})

// replaceAll does not escape but added anyway.
bench('string replaceAll array args function', () => {
  let result = "{0}{1}{2}{3} {{3}}";

  for (let i = 0; i < positionalArgs.length; i++) {
    result = result.replaceAll(`{${i}}`, positionalArgs[i]);
  }
  return result;
}, {time: 1000})

bench('string replaceAll named args function', () => {
  let result = "{alpha}{beta}{charlie}{delta} {{delta}}";
  for (const key in namedArgs) {
    result = result.replaceAll(`{${key}}`, namedArgs[key]);
  }
  return result;
}, {time: 1000})

// https://stackoverflow.com/a/61634647
bench("stackoverflow named args", () => {

  return "{alpha}{beta}{charlie}{delta} {{delta}}".replace(
    /{(\w+)}/g,
    (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
      namedArgs.hasOwnProperty(placeholderWithoutDelimiters) ?
        namedArgs[placeholderWithoutDelimiters] : placeholderWithDelimiters
  );

}, {time: 1000})