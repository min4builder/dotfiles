if exists("b:did_ftplugin")
	finish
endif
let b:did_ftplugin=1

setlocal foldmethod=indent
setlocal fillchars=fold:\ 
setlocal invlist
setlocal listchars=tab:-\ 
highlight clear Folded
highlight Folded ctermfg=DarkGray
highlight Whitespace ctermfg=DarkGray
setlocal foldtext=IndentedOutlineFoldText()
function IndentedOutlineFoldText()
	return substitute(getline(v:foldstart), '	', '+       ', 'g')
endfunction
