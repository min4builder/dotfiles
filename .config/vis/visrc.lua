require 'vis'

local plug = require 'vis-plug'
plug.init({
	{ 'lutobler/vis-commentary' }, -- gcc
	{ 'kupospelov/vis-ctags' }, -- ^], ^T, g^]
	{ 'erf/vis-cursors' },
	{ 'erf/vis-highlight', alias = 'highlight' },
	{ 'gitlab.com/mcepl/vis-jump' }, -- gx
	{ 'lutobler/vis-modelines' },
	{ 'repo.or.cz/vis-parkour.git', file = '', alias = 'parkour' },
	{ 'ingolemo/vis-smart-backspace', alias = 'smart_backspace' },
}, true)
plug.plugins.highlight.patterns['[ \t]+$'] = { style = 'back:#880000' }
plug.plugins.highlight.patterns[' +\t+'] = { style = 'back:#880000' }
plug.plugins.parkour.emacs = false

vis.events.subscribe(vis.events.INIT, function()
	-- nothing
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win)
	vis:command 'set autoindent'
	vis:command 'set cursorline'
	vis:command 'set colorcolumn 80'
	vis:command 'set ignorecase'
	vis:command 'set number'
	vis:command 'set theme alt16'
	if win.syntax == 'python' then
		vis:command 'set expandtab'
		vis:command 'set tabwidth 4'
		plug.plugins.smart_backspace.tab_width = 4
	end
end)
