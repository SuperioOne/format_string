# Yet another format string function

## Project Description
This library is intended for use cases where the position of parameters in a format string is not known at compile-time.
It is particularly useful for handling parametric localization texts, where the text itself may contain placeholders 
for dynamic values.

> **For situations with predictable string formats, using JavaScript's built-in string templating is highly recommended.**

## Getting Started

## Usage
1. Include the library into your project.
   ```shell 
   npm install format_string
    ```
2. Import `default` function and start using.
   * Named parameters:
      ```javascript
      import format_string from "format_string";
   
      const format_tag = "({userTag}){name}, [{hash}]";
      const format_email = "<{email}>{name}, {hash}";
      const args = {
        email: "john+doe@abc.com",
        name: "John Doe",
        hash: "18c54d073b2",
        userTag: "@john" 
      };
   
      const text0 = format_string(format_tag, args);
      console.log(text0); // (@john)John Doe, [18c54d073b2].
   
      const text1 = format_string(format_email, args);
      console.log(text1); // <john+doe@abc.com>John Doe, 18c54d073b2.
      ```
   * Positional parameters:
      ```javascript
      import format_string from "format_string";
   
      const format = "{2} {1} {0} {0} {2}\n{2} {0} {1} {0} {2}\n{2} {0} {0} {1} {2}\n";
      const text = format_string(format, ["a", 5, "|"]);
   
      console.log(text);
      // | 5 a a |
      // | a 5 a |
      // | a a 5 |
      ```

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