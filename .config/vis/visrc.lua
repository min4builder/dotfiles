require 'vis'

local plug = require 'vis-plug'
plug.init({
	{ 'lutobler/vis-commentary' }, -- gcc
	{ 'kupospelov/vis-ctags' }, -- ^], ^T, g^]
	{ 'erf/vis-cursors' },
	{ 'erf/vis-highlight', alias = 'highlight' },
	{ 'gitlab.com/mcepl/vis-jump' }, -- gx
	{ 'lutobler/vis-modelines' },
	{ 'ingolemo/vis-smart-backspace', alias = 'smart_backspace' },
	{ 'samlwood/vis-gruvbox', theme = true, file = 'gruvbox' },
}, true)
plug.plugins.highlight.patterns['[ \t]+\n'] = { style = 'back:#880000' }

vis.events.subscribe(vis.events.INIT, function()
	-- nothing
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win)
	vis:command 'set autoindent'
	vis:command 'set cursorline'
	vis:command 'set colorcolumn 80'
	vis:command 'set ignorecase'
	vis:command 'set number'
	if win.syntax == 'python' then
		vis:command 'set expandtab'
		vis:command 'set tabwidth 4'
		plug.plugins.smart_backspace.tab_width = 4
	end
end)
