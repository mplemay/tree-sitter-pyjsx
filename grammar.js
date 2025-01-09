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

    jsx_element: $ => choice(
      seq(
        "<",
        $.element_name,
        repeat($.jsx_attribute),
        ">",
        repeat($.jsx_child),
        "</",
        $.element_name,
        ">"
      ),
      seq(
        "<",
        $.element_name,
        repeat($.jsx_attribute),
        "/>"
      )
    ),

    jsx_fragment: $ => seq(
      "<>",
      repeat($.jsx_child),
      "</>"
    ),

    jsx_child: $ => choice(
      $.jsx_element,
      $.jsx_fragment,
      $.jsx_expression,
      $.jsx_text
    ),

    jsx_attribute: $ => choice(
      seq($.attribute_name, "=", choice($.attribute_string_value, $.jsx_expression)),
      $.jsx_spread_attribute
    ),

    jsx_spread_attribute: $ => seq(
      "{",
      "...",
      $._expressions,
      "}"
    ),

    jsx_expression: $ => seq(
      "{",
      $._expressions,
      "}"
    ),

    jsx_text: $ => /[^<>{}\s][^<>{}]*/,

    element_name: $ => /[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*/,
    
    attribute_name: $ => /[^\s='\"<>{}]+/,
    
    attribute_string_value: $ => choice(
      seq("'", /[^']*/, "'"),
      seq('"', /[^"]*/, '"')
    )
  }
});
