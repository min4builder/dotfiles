require 'vis'
require 'plugins.vis-cursors'

vis.events.subscribe(vis.events.INIT, function()
	vis:map(vis.modes.NORMAL, "gx", function()
		local line = vis.win.selection.line
		local pos = vis.win.selection.col
		local str = vis.win.file.lines[line]
		local len_str = #str

		local URLchars = '[^a-zA-Z0-9%?._=+;&/:@#-]'
		local to = str:find(URLchars, pos)
		if to == nil then to = len_str else to = to - 1 end
		local from = str:reverse():find(URLchars, len_str - pos + 1)
		if from == nil then from = 1 else from = len_str - from + 2 end
		local word = str:sub(from, to)

		local cmd = "setsid xdg-open '" .. word:gsub("'", "'\''") .. "'"

		os.execute(cmd)
	end, "Open URL")
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

