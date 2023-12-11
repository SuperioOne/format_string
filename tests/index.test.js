import {expect, test, describe} from 'vitest';
import format_string from '../index';

test('should process array parameters properly', () => {
  const result = format_string('Hello {0}, you are {1} years old', ['John', 25]);
  expect(result).toBe('Hello John, you are 25 years old');
});

test('should process object parameters properly', () => {
  const result = format_string('Hello {name}, you are {age} years old', {name: 'John', age: 25});
  expect(result).toBe('Hello John, you are 25 years old');
});

test('should handle undefined format properly', () => {
  const result = format_string(undefined, ['John', 25]);
  expect(result).toBeUndefined();
});

test('should handle null format properly', () => {
  const result = format_string(null, ['John', 25]);
  expect(result).toBeNull();
});

test('should handle empty string format properly', () => {
  const result = format_string('', ['John', 25]);
  expect(result).toBe('');
});

test('should handle whitespace string format properly', () => {
  const result = format_string('         ', ['John', 25]);
  expect(result).toBe('         ');
});

test('should process array parameters at the beginning and end properly', () => {
  const result = format_string('{0} is {1} years old today', ['John', 25]);
  expect(result).toBe('John is 25 years old today');

  const result2 = format_string('He is {1} years old, his name is {0}', ['John', 25]);
  expect(result2).toBe('He is 25 years old, his name is John');
});

test('should process object parameters at the beginning and end properly', () => {
  const result = format_string('{name} is {age} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is 25 years old today');

  const result2 = format_string('He is {age} years old, his name is {name}', {name: 'John', age: 25});
  expect(result2).toBe('He is 25 years old, his name is John');
});

test('should escape double braces properly', () => {
  let result = format_string('{name} is {{age}} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {age} years old today');
});

test('should handle empty replacement key properly', () => {
  let result = format_string('{name} is {} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {} years old today');
});

test('should handle uncompleted replacement key properly', () => {
  let result = format_string('{name} is {{ years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {{ years old today');
});

test('should handle missing replacement key properly', () => {
  let result = format_string('{name} is {0} years old today', {name: 'John'});
  expect(result).toBe('John is  years old today');
});

test('should handle keys with extra spaces properly - case 1', () => {
  let result = format_string('{name} is { age } years old today', {name: 'John', age: 25});
  expect(result).toBe('John is { age } years old today');
});

test('should handle keys with extra spaces properly - case 2', () => {
  let result = format_string('{name} is { age} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is { age} years old today');
});

test('should handle keys with extra spaces properly - case 3', () => {
  let result = format_string('{name} is {age } years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {age } years old today');
});

test('should handle keys with extra spaces properly - case 4', () => {
  let result = format_string('{name} is {age\u2004} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {age\u2004} years old today');
});

test('should handle keys with extra spaces properly - case 5', () => {
  let result = format_string('{name} is {\tage} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {\tage} years old today');
});

test('should handle line feed properly', () => {
  let result = format_string('Hello,\n{name}', {name: 'John'});
  expect(result).toBe('Hello,\nJohn');
});

test('should handle Unicode white space properly', () => {
  let result = format_string('Hello,\u2004{name}', {name: 'John'});
  expect(result).toBe('Hello,\u2004John');
});

test('format level: gibberish', () => {
 
  let result = format_string('{name}{{ name}} { {{{ a{{name}{😕} d}}}}} } {{{{age}}}} {age age} {{{age}{{a}}\{\}{\u4356}', {
    "name": 'Gonarch',
    age: 25,
    "{a}": "!!INJECTION_CASE_0!!",
    "{": "!!INJECTION_CASE_1!!",
    "}": "!!INJECTION_CASE_2!!",
    "}}": "!!INJECTION_CASE_3!!",
    "{{": "!!INJECTION_CASE_4!!",
    "\u4356": "???",
    "😕": "{a}"
  });
  expect(result).toBe('Gonarch{{ name}} { {{{ a{Gonarch{a} d}}}}} } {{{age}}} {age age} {{25{a}{}???');
});
