# Yet another format string function

Fast, small and basic string templating function. This library is intended for use cases where the position of
parameters
in a format string is not known at compile-time.

> **For situations with predictable/constant string formats, using JavaScript's built-in string templating is highly
recommended.**

## Getting Started

1. Add the library into your project.
   ```shell 
   npm install @superior-one/format_string
    ```
2. Import `default` function and start using.
    * Named parameters:
       ```javascript
       import format_string from "@superior-one/format_string";
    
       const format_tag = "({userTag}){name}, [{hash}]";
       const format_email = "<{email}>{name}, {hash}";
       const args = {
         email: "john+doe@abc.com",
         name: "John Doe",
         hash: "18c54d073b2",
         userTag: "@john" 
       };
    
       const text0 = format_string(format_tag, args);
       console.log(text0); // (@john)John Doe, [18c54d073b2]
    
       const text1 = format_string(format_email, args);
       console.log(text1); // <john+doe@abc.com>John Doe, 18c54d073b2
       ```
    * Positional parameters:
       ```javascript
       import format_string from "@superior-one/format_string";
    
       const format = "{2} {1} {0} {0} {2}\n{2} {0} {1} {0} {2}\n{2} {0} {0} {1} {2}\n";
       const text = format_string(format, ["a", 5, "|"]);
    
       console.log(text);
       // | 5 a a |
       // | a 5 a |
       // | a a 5 |
       ```

## Format Syntax

Consider `arg="value"`

| Format          | Output          | Description                                                               |
|-----------------|-----------------|---------------------------------------------------------------------------|
| `{arg}`         | `value`         | Replaces `{arg}` with the value of `arg`                                  |
| `{arg }`        | `{arg }`        | Treats `{arg }` as a string as it doesn't follow correct formatting       |
| `{ arg}`        | `{ arg}`        | Treats `{ arg}` as a string since it doesn't follow correct formatting    |
| `{arg arg}`     | `{arg arg}`     | Treats `{arg arg}` as a string since it doesn't follow correct formatting |
| `{\narg}`       | `{\narg}`       | Treats `{\narg}` as a string since it doesn't follow correct formatting   |
| `{}`            | `{}`            | Empty placeholders are ignored and treats as a string                     |
| `{{arg}}`       | `{arg}`         | Escapes the placeholder syntax                                            |
| `{{{{arg}}}}`   | `{{{arg}}}`     | Escapes the inner placeholder syntax, outputting `{{{arg}}}` as a string  |
| `{{{ {arg} }}}` | `{{{ value }}}` | Inserts `value` within triple curly braces, outputting `{{{ value }}}`    |

Avoid using space, feed, tab and separator characters in placeholder names as they will be interpreted as strings, not
placeholders.

List of invalid placeholder characters;

- `{`
- `}`
- `' '`
- `\f`
- `\n`
- `\r`
- `\t`
- `\v`
- `\u00a0`
- `\u1680`
- `\u2000` to `\u200a`
- `\u2028`
- `\u2029`
- `\u202f`
- `\u205f`
- `\u3000`
- `\ufeff`

## Building the Project

Build step only generates type decleration and CommonJS version.

```shell
npm install
npm run build
```

## Contributing

Pull requests are welcome, especially ideas for time and memory allocation reduction.

## Benchmarks

Tested against some popular packages with four parameters and single escape.

> Keep in mind some of the listed libraries provides more features like number formatting, padding etc.

```
Test Environment:
CPU       : AMD Ryzen 9 5950X 16-Core @ 32x 5.177GHz
OS        : x86_64 Linux 6.6.3-1
node      : v20.7.0
vitest    : v1.0.4
tinybench : v2.5.1

  name                                                        hz     min     max    mean     p75     p99    p995    p999     rme  samples
· @superior-one/format_string with positional args  2,693,972.54  0.0003  0.9917  0.0004  0.0004  0.0004  0.0006  0.0016  ±0.31%  2693973
· @superior-one/format_string with named args       2,260,906.19  0.0004  0.5987  0.0004  0.0004  0.0009  0.0009  0.0010  ±0.20%  2260907  
· string-template with named args                     858,246.92  0.0011  0.2475  0.0012  0.0011  0.0021  0.0022  0.0024  ±0.16%   858247  
· string-template with positional args              1,016,520.83  0.0009  0.1932  0.0010  0.0010  0.0011  0.0012  0.0019  ±0.11%  1016521  
· @stdlib/string-format with positional args        1,771,259.33  0.0005  0.2183  0.0006  0.0006  0.0007  0.0008  0.0011  ±0.19%  1771260  
· string-format with positional args                  548,726.51  0.0017  0.2494  0.0018  0.0018  0.0021  0.0029  0.0036  ±0.22%   548727  
· string-format with named args                       377,298.69  0.0025  0.1892  0.0027  0.0026  0.0029  0.0030  0.0061  ±0.16%   377299 
· pupa with positional args                           522,948.55  0.0018  0.1503  0.0019  0.0019  0.0021  0.0035  0.0041  ±0.15%   522949  
· pupa with named args                                455,937.12  0.0021  0.9894  0.0022  0.0022  0.0038  0.0043  0.0051  ±0.23%   455938  
· string replaceAll positional args                 1,619,706.37  0.0006  0.1692  0.0006  0.0006  0.0007  0.0008  0.0011  ±0.13%  1619707  
· string replaceAll named args                      1,705,262.53  0.0005  0.2296  0.0006  0.0006  0.0007  0.0011  0.0012  ±0.07%  1705263  

BENCH  Summary

@superior-one/format_string with positional args - index.bench.js > 
 1.19x faster than @superior-one/format_string with named args
 1.52x faster than @stdlib/string-format with positional args
 1.58x faster than string replaceAll named args
 1.66x faster than string replaceAll positional args
 2.65x faster than string-template with positional args
 3.14x faster than string-template with named args
 4.91x faster than string-format with positional args
 5.15x faster than pupa with positional args
 5.91x faster than pupa with named args
 7.14x faster than string-format with named args
```

## License

This project is licensed under the terms of the MIT license.