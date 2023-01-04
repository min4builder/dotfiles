local lexers = vis.lexers

local brightblack = '#727272'
local sel = '#2a2a2a'
local brightsel = '#474747'

lexers.STYLE_DEFAULT = 'fore:default,back:default'
lexers.STYLE_NOTHING = 'fore:default,back:default'
lexers.STYLE_CLASS = 'fore:cyan'
lexers.STYLE_COMMENT = 'fore:'..brightblack..',italics'
lexers.STYLE_CONSTANT = 'fore:blue'
lexers.STYLE_DEFINITION = 'fore:default'
lexers.STYLE_ERROR = 'fore:red,italics'
lexers.STYLE_FUNCTION = 'fore:green'
lexers.STYLE_KEYWORD = 'fore:magenta'
lexers.STYLE_LABEL = 'fore:magenta'
lexers.STYLE_NUMBER = 'fore:blue'
lexers.STYLE_OPERATOR = 'fore:magenta'
lexers.STYLE_REGEX = 'fore:yellow'
lexers.STYLE_STRING = 'fore:yellow'
lexers.STYLE_PREPROCESSOR = 'fore:blue'
lexers.STYLE_TAG = 'fore:green'
lexers.STYLE_TYPE = 'fore:cyan'
lexers.STYLE_VARIABLE = 'fore:default'
lexers.STYLE_WHITESPACE = ''
lexers.STYLE_EMBEDDED = 'fore:white'
lexers.STYLE_IDENTIFIER = 'fore:default'

lexers.STYLE_LINENUMBER = 'fore:'..brightblack..',back:'..sel
lexers.STYLE_LINENUMBER_CURSOR = 'fore:'..brightblack..',back:'..sel
lexers.STYLE_CURSOR = 'fore:black,back:white'
lexers.STYLE_CURSOR_PRIMARY = 'fore:black,back:white'
lexers.STYLE_CURSOR_LINE = 'back:'..sel
lexers.STYLE_COLOR_COLUMN = 'back:'..sel
lexers.STYLE_SELECTION = 'back:'..brightsel
lexers.STYLE_STATUS = 'fore:'..brightblack..',back:'..sel
lexers.STYLE_STATUS_FOCUSED = 'fore:'..brightblack..',back:'..sel
lexers.STYLE_SEPARATOR = lexers.STYLE_DEFAULT
lexers.STYLE_INFO = 'fore:default,back:default,bold'
lexers.STYLE_EOF = ''
