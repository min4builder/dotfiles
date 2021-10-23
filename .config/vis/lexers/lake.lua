-- Copyright 2006-2017 Mitchell mitchell.att.foicica.com. See LICENSE.

local l = require('lexer')
local token, word_match = l.token, l.word_match
local P, R, S = lpeg.P, lpeg.R, lpeg.S

local M = {_NAME = 'lake'}

-- Whitespace.
local ws = token(l.WHITESPACE, l.space^1)

-- Comments.
local line_comment = '//' * l.nonnewline_esc^0
local block_comment = '/*' * (l.any - '*/')^0 * P('*/')^-1
local comment = token(l.COMMENT, line_comment + block_comment)

-- Strings.
local sq_str = P('L')^-1 * l.delimited_range("'", true)
local dq_str = P('L')^-1 * l.delimited_range('"', true)
local string = token(l.STRING, sq_str + dq_str)

-- Numbers.
local number = token(l.NUMBER, (l.float * P('f')^-1) +
                               (l.integer * S('uU')^-1))

-- Preprocessor.
local preproc_word = word_match{
  'define', 'import', 'undef'
}

local preproc = token(l.PREPROCESSOR, l.starts_line(S'\t '^0 * preproc_word))

-- Keywords.
local storage_class = word_match{
  'type', 'pub', 'static', 'auto', 'register',
}

local keyword = token(l.KEYWORD, word_match{
  'break', 'case', 'continue', 'default', 'do', 'else', 'enum', 'for', 'goto',
  'if', 'inline', 'return', 'switch', 'while',
  '_Generic', 'static_assert',
} + storage_class)

-- Constants.
local constant = token(l.CONSTANT, word_match{ 'true', 'false', 'nil', } +
  P('__') * (l.alnum + '_')^0
  + (l.word - (l.upper + l.digit + '_')^0 * l.lower)
)

-- Types.
local type = token(l.TYPE, word_match{
  'bool', 'char', 'rune', 'int', 'long', 'mut', 'noreturn', 'uint', 'ulong',
  'struct', 'union', 'void'}
  + S('uif') * l.dec_num^1 + l.upper * (l.alnum + '_')^0 * P'?'^-1 + P'?'
)

-- Pragmas.
local pragma = token(l.PREPROCESSOR, '#' * l.word * P'?'^-1 + '#[' * (l.any - ']')^0 * ']')

-- Labels.
-- FIXME: Accept whitespace before label.
local label = token(l.LABEL, l.starts_line(l.word * ':'))

-- Identifiers.
local identifier = token(l.IDENTIFIER, l.word * P'?'^-1)

-- Operators.
local operator = token(l.OPERATOR,
  S('+-/*%<>~!=^&|~:;,.()[]{}#') +
  word_match{ 'sizeof', 'alignof' }
)

M._rules = {
  {'whitespace', ws},
  {'comment', comment},
  {'keyword', keyword},
  {'constant', constant},
  {'type', type},
  {'pragma', pragma},
  {'operator', operator},
  {'label', label},
  {'preproc', preproc},
  {'identifier', identifier},
  {'string', string},
  {'number', number},
}

M._foldsymbols = {
  _patterns = {'[{}]', '/%*', '%*/', '//'},
  [l.OPERATOR] = {['{'] = 1, ['}'] = -1},
  [l.COMMENT] = {
    ['/*'] = 1, ['*/'] = -1, ['//'] = l.fold_line_comments('//'),
  }
}

return M
