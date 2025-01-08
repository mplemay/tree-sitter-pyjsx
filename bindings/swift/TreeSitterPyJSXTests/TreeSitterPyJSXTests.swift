import XCTest
import SwiftTreeSitter
import TreeSitterPyJSX

final class TreeSitterPyJSXTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_pyjsx())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading PyJSX grammar")
    }
}
