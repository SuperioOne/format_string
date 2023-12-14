import {bench} from 'vitest';
import string_template from "string-template";
import string_format from "string-format";
import stdlib_string_format from "@stdlib/string-format";
import pupa from 'pupa';
import format_string from "../index";

const positionalArgs = [0, 1, 2, 3];
const namedArgs = {
  "alpha": "A",
  "beta": "B",
  "charlie": "C",
  "delta": "D"
};

console.log("format_string:", format_string("{0}{1}{2}{3} {{3}}", positionalArgs));
console.log("format_string:", format_string("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs));
console.log("string_template:", string_template("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs));
console.log("string_template:", string_template("{0}{1}{2}{3} {{3}}", positionalArgs));
console.log("stdlib_string_format:", stdlib_string_format("%s%s%s%s {3}", 0, 1, 2, 3));
console.log("string_format:", string_format("{0}{1}{2}{3} {{3}}", 0, 1, 2, 3));
console.log("string_format:", string_format("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs));
console.log("pupa:", pupa("{0}{1}{2}{3} {{3}}", positionalArgs));
console.log("pupa:", pupa("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs));

bench('@superior-one/format_string with positional args', () => {
  return format_string("{0}{1}{2}{3} {{3}}", positionalArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('@superior-one/format_string with named args', () => {
  return format_string("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('string-template with named args', () => {
  return string_template("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('string-template with positional args', () => {
  return string_template("{0}{1}{2}{3} {{3}}", positionalArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('@stdlib/string-format with positional args', () => {
  return stdlib_string_format("%s%s%s%s {3}", 0, 1, 2, 3);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('string-format with positional args', () => {
  return string_format("{0}{1}{2}{3} {{3}}", 0, 1, 2, 3);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('string-format with named args', () => {
  return string_format("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('pupa with positional args', () => {
  return pupa("{0}{1}{2}{3} {{3}}", positionalArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('pupa with named args', () => {
  return pupa("{charlie}{delta}{alpha}{beta} {{delta}}", namedArgs);
}, {time: 1000, warmupIterations: 10, iterations: 100})

// replaceAll does not escape but added anyway.
bench('string replaceAll positional args', () => {
  let result = "{0}{1}{2}{3} {{3}}";

  for (let i = 0; i < positionalArgs.length; i++) {
    result = result.replaceAll(`{${i}}`, positionalArgs[i]);
  }
  return result;
}, {time: 1000, warmupIterations: 10, iterations: 100})

bench('string replaceAll named args', () => {
  let result = "{alpha}{beta}{charlie}{delta} {{delta}}";
  for (const key in namedArgs) {
    result = result.replaceAll(`{${key}}`, namedArgs[key]);
  }
  return result;
}, {time: 1000, warmupIterations: 10, iterations: 100})

// https://stackoverflow.com/a/61634647
bench("stackoverflow named args", () => {

  return "{alpha}{beta}{charlie}{delta} {{delta}}".replace(
    /{(\w+)}/g,
    (placeholderWithDelimiters, placeholderWithoutDelimiters) =>
      namedArgs.hasOwnProperty(placeholderWithoutDelimiters) ?
        namedArgs[placeholderWithoutDelimiters] : placeholderWithDelimiters
  );

}, {time: 1000, warmupIterations: 10, iterations: 100})