require 'vis'
require 'vis-commentary' -- gcc
require 'vis-ctags' -- ^], ^T, g^]
require 'vis-cursors'
require 'vis-jump' -- gx
local smart_backspace = require 'vis-smart-backspace'

vis.events.subscribe(vis.events.INIT, function()
	-- nothing
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win)
	vis:command 'set autoindent'
	vis:command 'set cursorline'
	vis:command 'set colorcolumn 80'
	vis:command 'set ignorecase'
	vis:command 'set number'
	vis:command 'set theme custom-16'
	if win.syntax == 'python' then
		vis:command 'set expandtab'
		vis:command 'set tabwidth 4'
		smart_backspace.tab_width = 4
	end
end)
