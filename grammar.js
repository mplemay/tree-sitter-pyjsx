/**
 * @file Pyjsx grammar for tree-sitter
 * @author Matt LeMay <mplemay97@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const python = require('tree-sitter-python/grammar');

module.exports = grammar(python, {
  name: "pyjsx",

  rules: {
    source_file: $ => seq(
      repeat(choice($.jsx_element, $.jsx_fragment, $._statement))
    ),

    jsx_element: $ => seq(
      "<",
      $.element_name,
      ">",
      repeat(choice($.jsx_element, $.jsx_fragment, $._statement)),
      "</",
      $.element_name,
      ">"
    ),

    jsx_fragment: $ => seq(
      "<>",
      repeat(choice($.jsx_element, $.jsx_fragment, $._statement)),
      "</>"
    ),

    element_name: $ => /[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*/
  }
});
