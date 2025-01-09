/**
 * @file PyJSX grammar for tree-sitter
 * @author Matt LeMay <mplemay97@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: 'pyjsx',

  extras: _ => [],

  rules: {
    source_file: $ => repeat(choice(
      $.python_code,
      $.jsx_element,
      $.jsx_fragment,
      $.jsx_expression,
      $.content
    )),

    // Python code that's not inside JSX
    python_code: _ => prec.right(repeat1(choice(
      /[^<{]+/,  // Any chars except JSX start tokens
      /[<{]/     // < or { when not starting JSX
    ))),

    // Regular text content between JSX tags
    content: _ => prec.right(repeat1(/[^<>{]+/)),

    jsx_element: $ => choice(
      // Regular element with children
      seq(
        '<',
        $.element_name,
        repeat($.jsx_attribute),
        '>',
        repeat(choice(
          $.jsx_element,
          $.jsx_fragment,
          $.jsx_expression,
          $.content
        )),
        '</',
        $.element_name,
        '>'
      ),
      // Self-closing element
      seq(
        '<',
        $.element_name,
        repeat($.jsx_attribute),
        '/>'
      )
    ),

    jsx_fragment: $ => seq(
      '<>',
      repeat(choice(
        $.jsx_element,
        $.jsx_fragment,
        $.jsx_expression,
        $.content
      )),
      '</>'
    ),

    jsx_expression: $ => seq(
      '{',
      $.python_expression,
      '}'
    ),

    jsx_attribute: $ => choice(
      seq(
        $.attribute_name,
        '=',
        choice(
          $.attribute_string_value,
          $.jsx_expression
        )
      ),
      $.jsx_spread_attribute
    ),

    jsx_spread_attribute: $ => seq(
      '{',
      '...',
      $.python_expression,
      '}'
    ),

    // Python expression inside JSX expressions
    python_expression: _ => prec.right(repeat1(choice(
      /[^}]+/,  // Any chars except closing brace
      /}/       // Closing brace when not ending expression
    ))),

    element_name: _ => /[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*/,
    
    attribute_name: _ => /[^\s='\"<>{}]+/,
    
    attribute_string_value: _ => choice(
      seq("'", /[^']*/, "'"),
      seq('"', /[^"]*/, '"')
    )
  }
});
