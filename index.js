const CURLY_BRACE_OPEN = "{".codePointAt(0);
const CURLY_BRACE_CLOSE = "}".codePointAt(0);

// based on '\s' regexp https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Cheatsheet
/**
 * @type {Record<number,boolean>}
 */
const WHITE_SPACE_CHARS = {
  32: true, 9: true, 10: true, 11: true, 12: true, 13: true, 0x00a0: true, 0x1680: true, 0x2000: true, 0x2001: true,
  0x2002: true, 0x2003: true, 0x2004: true, 0x2005: true, 0x2006: true, 0x2007: true, 0x2008: true, 0x2009: true,
  0x200a: true, 0x2028: true, 0x2029: true, 0x202f: true, 0x205f: true, 0x3000: true, 0xfeff: true,
};

/**
 * Checks if the given character code represents a white space character.
 *
 * @param {number} charCode - The character code to check.
 * @return {boolean} - `true` if the character code represents a white space character, otherwise `false`.
 */
function is_white_space(charCode) {
  return WHITE_SPACE_CHARS[charCode] ?? false;
}

/**
 * Replaces placeholders in the given text with values from a lookup map.
 *
 * @param {string} text - The text to format.
 * @param {Record<string, string>} argLookup - The lookup map containing placeholder-value pairs.
 * @return {string} The formatted text with replaced placeholders.
 */
function formatter(text, argLookup) {
  // Concatenation yields faster results than string array and string.join("") for this context, possibly because of average format input isn't that big. 
  let result = "";
  let templateIndex = -1;
  let sliceStart = 0;
  let escapeFlag = false;

  for (let i = 0; i < text.length; i++) {
    let charCode = text.codePointAt(i);

    if (templateIndex < 0 && charCode === CURLY_BRACE_OPEN) {
      templateIndex = i;

    } else if (templateIndex > -1) {
      if (charCode === CURLY_BRACE_CLOSE) {
        {
          if (templateIndex + 1 === i) {
            templateIndex = -1;
            continue;
          }

          if (sliceStart < templateIndex) {
            result += text.slice(sliceStart, templateIndex);
          }

          const canEscape = escapeFlag && text[i + 1] === "}"
          const key = text.slice(templateIndex + 1, i);
          result += canEscape
            ? key
            : argLookup[key]?.toString() ?? "";

          escapeFlag = false;
          templateIndex = -1;
          sliceStart = i + 1;
        }
      } else if (charCode === CURLY_BRACE_OPEN) {
        {
          templateIndex = i;
          escapeFlag = true;
        }
      } else if (charCode !== undefined && is_white_space(charCode)) {
        {
          templateIndex = -1;
          escapeFlag = false;
        }
      }
    }
  }

  if (sliceStart < text.length) {
    result += text.slice(sliceStart);
  }

  return result;
}

/**
 * Formats a string by replacing placeholders with named arguments.
 * @overload
 * @param {string} format The string with placeholders to be replaced.
 * @param {Record<string, any>} namedArgs The object containing named arguments.
 * @returns {string} The formatted string.
 * @example
 * import format_string from "format_string";
 * const formatStringFromSomewhere = "{date} : {log}";
 *
 * format_string(formatStringFromSomewhere, { date: new Date().toISOString(), log: "My log"});
 * // "2023-12-10T16:31:22.442Z : My log"
 */
/**
 * Formats a string by replacing placeholders with provided arguments.
 * @overload
 * @param {string} format The format string with placeholders.
 * @param {any[]} args The arguments to replace the placeholders.
 * @return {string} The formatted string.
 * @example
 * import format_string from "format_string";
 * const formatStringFromSomewhere = "{0}x{0} = {1}";
 *
 * format_string(formatStringFromSomewhere,[2,4]);
 * // "2x2 = 4"
 **/
/**
 * @param {string} format
 * @param {Record<string, any> | any[]} args
 * @returns {string}
 */
export default function format_string(format, args) {
  if (format === undefined || format === null || format.length === 0)
    return format;

  /** @type {Record<string, any>} */
  let params;

  if (Array.isArray(args)) {
    params = {};

    for (let i = 0; i < args.length; i++) {
      params[i.toString()] = args[i];
    }
  } else {
    params = args ?? {};
  }

  return formatter(format, params);
}