set number
set shiftwidth=0
" need to wait for 0.8.0 for this to work
"set cmdheight=0
set statusline=%f\ %m%=%y%h%w\ %c\ %l/%L\ %P
nmap gx viW"ay:!xdg-open <C-R>a &<CR>
set shada='100,<50,s10,h
autocmd BufReadPost *
	\ if line("'\"") >= 1 && line("'\"") < line("$") |
	\   exe "normal! `\"zz" |
	\ endif
