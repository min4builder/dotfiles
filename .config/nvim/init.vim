set number
"set viminfo='100,<50,s10,h
"`0 goes to the file as well, for some reason
"autocmd BufReadPost *
"	\ if line("'0") >= 1 && line("'0") < line("$") |
"	\   exe "normal! `0zz" |
"	\ endif
