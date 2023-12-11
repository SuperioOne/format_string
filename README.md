# Yet another format string function

## Project Description

This library is intended for use cases where the position of parameters in a format string is not known at compile-time.
It is particularly useful for handling parametric localization texts, where the text itself may contain placeholders
for dynamic values.

> **For situations with predictable string formats, using JavaScript's built-in string templating is highly recommended.**

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

## License

This project is licensed under the terms of the MIT license.