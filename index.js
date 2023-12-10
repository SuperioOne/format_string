const CharMap = {
  OpenCurly: "{".charCodeAt(0),
  CloseCurly: "}".charCodeAt(0),
  Whitespace: " ".charCodeAt(0),
};

/**
 * Replaces placeholders in the given text with values from a lookup map.
 *
 * @param {string} text - The text to format.
 * @param {Record<string, string>} lookupMap - The lookup map containing placeholder-value pairs.
 * @return {string} The formatted text with replaced placeholders.
 */
function formatter(text, lookupMap) {
  // string concat yield better result for the Node20.
  let result = "";
  let templateIndex = -1;
  let sliceStart = 0;

  for (let i = 0; i < text.length; i++) {
    let charCode = text.codePointAt(i);

    if (charCode === CharMap.OpenCurly) {
      templateIndex = i;

    } else if (charCode === CharMap.CloseCurly && templateIndex > -1) {
      if (templateIndex + 1 === i) {
        templateIndex = -1;
        continue;
      }

      if (sliceStart < templateIndex) {
        result += text.slice(sliceStart, templateIndex);
      }

      const key = text.slice(templateIndex + 1, i);
      result += lookupMap[key]?.toString() ?? "";
      templateIndex = -1;
      sliceStart = i + 1;

    } else if ((charCode === CharMap.Whitespace || charCode === CharMap.OpenCurly) && templateIndex > -1) {
      templateIndex = -1;
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
  if (format === undefined || format === null || format.length === 0) return format;

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

format_string("dsada", {});