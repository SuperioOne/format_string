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
export default function format_string(format: string, namedArgs: Record<string, any>): string;
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
export default function format_string(format: string, args: any[]): string;
