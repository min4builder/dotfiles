require 'vis'

vis.events.subscribe(vis.events.INIT, function()
	-- Your global configuration options
end)

vis.events.subscribe(vis.events.WIN_OPEN, function(win)
	vis:command 'set relativenumbers'
	vis:command 'set autoindent'
	vis:command 'set theme custom-16'
	if win.syntax == 'java' then
		vis:command 'set colorcolumn off'
		vis:command 'set tabwidth 4'
	else
		vis:command 'set colorcolumn 80'
		vis:command 'set tabwidth 8'
	end
end)

