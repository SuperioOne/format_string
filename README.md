# Yet another format string function

Fast, small and basic string templating function. This library is intended for use cases where the position of parameters 
in a format string is not known at compile-time.

> **For situations with predictable/constant string formats, using JavaScript's built-in string templating is highly recommended.**

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

### Format Syntax

Consider `arg="value"`

| Format          | Output          | Description                                                              |
|-----------------|-----------------|--------------------------------------------------------------------------|
| `{arg}`         | `value`         | Replaces `{arg}` with the value of `arg`                                 |
| `{arg }`        | `{arg }`        | Treats `{arg }` as a string as it doesn't follow correct formatting      |
| `{ arg}`        | `{ arg}`        | Treats `{ arg}` as a string since it doesn't follow correct formatting   |
| `{arg arg}`     | `{arg arg}`     | Treats `{arg arg}` as a string since it doesn't follow correct formatting   |
| `{\narg}`       | `{\narg}`       | Treats `{\narg}` as a string since it doesn't follow correct formatting  |
| `{}`            | `{}`            | Empty placeholders are ignored and treats as a string                    |
| `{{arg}}`       | `{arg}`         | Escapes the placeholder syntax                                           |
| `{{{{arg}}}}`   | `{{{arg}}}`     | Escapes the inner placeholder syntax, outputting `{{{arg}}}` as a string |
| `{{{ {arg} }}}` | `{{{ value }}}` | Inserts `value` within triple curly braces, outputting `{{{ value }}}`   |

Please avoid using whitespace characters in placeholder names as they will be interpreted as strings, not placeholders. 

| Whitespace Character | Description                                                                                                                                            | 
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `' '`                | Space                                                                                                                                                  |
| `\f`                | Form Feed                                                                                                                                              |
| `\n`                | Line Feed (New Line)                                                                                                                                   |
| `\r`                | Carriage Return                                                                                                                                        |
| `\t`                | Horizontal Tab                                                                                                                                         |
| `\v`                | Vertical Tab                                                                                                                                           |
| `\u00a0`            | No-Break Space                                                                                                                                         |
| `\u1680`            | Ogham Space Mark                                                                                                                                       |
| `\u2000` to `\u200a` | En Quad, Em Quad, En Space, Em Space, Three-Per-Em Space, Four-Per-Em Space, Six-Per-Em Space, Figure Space, Punctuation Space, Thin Space, Hair Space |
| `\u2028`            | Line Separator                                                                                                                                         |
| `\u2029`            | Paragraph Separator                                                                                                                                    |
| `\u202f`            | Narrow No-Break Space                                                                                                                                  |
| `\u205f`            | Medium Mathematical Space                                                                                                                              |
| `\u3000`            | Ideographic Space                                                                                                                                      |
| `\ufeff`            | Zero Width No-Break Space                                                                                                                              |

### Building the Project

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
· @superior-one/format_string with positional args  2,667,454.58  0.0003  0.8361  0.0004  0.0004  0.0004  0.0006  0.0016  ±0.30%  2667455   fastest
· @superior-one/format_string with named args       2,202,596.97  0.0004  0.6137  0.0005  0.0005  0.0005  0.0005  0.0009  ±0.21%  2202597  
· string-template with named args                     866,472.63  0.0011  0.2794  0.0012  0.0012  0.0012  0.0013  0.0018  ±0.16%   866473  
· string-template with positional args                993,227.21  0.0009  1.0439  0.0010  0.0010  0.0011  0.0012  0.0018  ±0.24%   993228  
· @stdlib/string-format with positional args        1,740,323.68  0.0005  0.1582  0.0006  0.0006  0.0007  0.0008  0.0010  ±0.18%  1740324  
· string-format with positional args                  534,816.99  0.0017  0.2324  0.0019  0.0018  0.0037  0.0038  0.0051  ±0.22%   534817  
· string-format with named args                       370,986.79  0.0025  0.1357  0.0027  0.0027  0.0029  0.0030  0.0061  ±0.15%   370987   slowest
· pupa with positional args                           512,409.23  0.0018  0.1490  0.0020  0.0019  0.0021  0.0022  0.0039  ±0.14%   512410  
· pupa with named args                                455,322.46  0.0021  0.1525  0.0022  0.0022  0.0023  0.0024  0.0045  ±0.14%   455323  
· string replaceAll positional args function        1,604,997.66  0.0006  0.1082  0.0006  0.0006  0.0007  0.0008  0.0012  ±0.12%  1604998  
· string replaceAll named args function             1,709,737.81  0.0005  0.7950  0.0006  0.0006  0.0006  0.0008  0.0012  ±0.17%  1709739  

BENCH  Summary

@superior-one/format_string with positional args - index.bench.js >
1.21x faster than @superior-one/format_string with named args
1.53x faster than @stdlib/string-format with positional args
1.56x faster than string replaceAll named args function
1.66x faster than string replaceAll array args function
2.69x faster than string-template with positional args
3.08x faster than string-template with named args
4.99x faster than string-format with positional args
5.21x faster than pupa with positional args
5.86x faster than pupa with named args
7.19x faster than string-format with named args
```

## License

This project is licensed under the terms of the MIT license.