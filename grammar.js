/**
 * @file Pyjsx grammar for tree-sitter
 * @author Matt LeMay <mplemay97@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "pyjsx",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
