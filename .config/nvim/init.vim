set number
nmap gx viW"ay:!xdg-open <C-R>a &<CR>
set shada='100,<50,s10,h
autocmd BufReadPost *
	\ if line("'\"") >= 1 && line("'\"") < line("$") |
	\   exe "normal! `\"zz" |
	\ endif
