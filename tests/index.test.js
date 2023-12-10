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

test('should handle double braces properly', () => {
  let result = format_string('{name} is {{age}} years old today', {name: 'John', age: 25});
  expect(result).toBe('John is {25} years old today');
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

test('format level: gibberish', () => {
  let result = format_string('{name}{{ { {{{ a{{name}{{😕}} d}}}}} } {{{age}{{a}}\{\}{\u4356}', {
    "name": 'Gonarch',
    age: 25,
    "{a}": "injection",
    "\u4356": "???",
    "😕": "{a}"
  });
  expect(result).toBe('Gonarch{{ { {{{ a{Gonarch{{a}} d}}}}} } {{25{}{}???');
});