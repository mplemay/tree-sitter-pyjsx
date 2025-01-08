package tree_sitter_pyjsx_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_pyjsx "github.com/tree-sitter/tree-sitter-pyjsx/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_pyjsx.Language())
	if language == nil {
		t.Errorf("Error loading PyJSX grammar")
	}
}
