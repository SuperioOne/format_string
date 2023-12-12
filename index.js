/**
 * Replaces placeholders in the given text with values from a lookup map.
 *
 * @param {string} text - The text to format.
 * @param {Record<string, any>} argLookup - The lookup map containing placeholder-value pairs.
 * @return {string} The formatted text with replaced placeholders.
 */
function formatter(text, argLookup) {
  // Concatenation yields faster results than string array and string.join("") for this context, possibly because of average format input isn't that big. 
  let result = "";
  let templateIndex = -1;
  let sliceStart = 0;
  let escapeFlag = false;

  for (let i = 0; i < text.length; i++) {
    const charCode = text[i];

    if (templateIndex < 0 && charCode === "{") {
      templateIndex = i;

    } else if (templateIndex > -1) {

      switch (charCode) {
        case "}": {
          if (templateIndex + 1 === i) {
            templateIndex = -1;
            continue;
          }

          if (sliceStart < templateIndex) {
            result += text.slice(sliceStart, templateIndex);
          }

          const canEscape = escapeFlag && text[i + 1] === "}";
          const key = text.slice(templateIndex + 1, i);
          result += canEscape ? key : argLookup[key]?.toString() ?? "";

          escapeFlag = false;
          templateIndex = -1;
          sliceStart = i + 1;
          break;
        }
        case "{": {
          templateIndex = i;
          escapeFlag = true;
          break;
        }
        case "\u0020":
        case "\u0009":
        case "\u000a":
        case "\u000b":
        case "\u000c":
        case "\u000d":
        case "\u00a0":
        case "\u1680":
        case "\u2000":
        case "\u2001":
        case "\u2002":
        case "\u2003":
        case "\u2004":
        case "\u2005":
        case "\u2006":
        case "\u2007":
        case "\u2008":
        case "\u2009":
        case "\u200a":
        case "\u2028":
        case "\u2029":
        case "\u202f":
        case "\u205f":
        case "\u3000":
        case "\ufeff": {
          templateIndex = -1;
          escapeFlag = false;
          break;
        }
        default:
          break;
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