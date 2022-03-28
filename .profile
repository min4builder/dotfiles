if ! [ "$ENV" ]; then
	_login=true
else
	_login=false
fi
export PATH="$HOME/bin:${PATH#$HOME/bin}"
export ENV="$HOME/.profile"
export TERMINAL=st
export EDITOR=kak VISUAL=kak
export PAGER=less
export BROWSER=firefox

ulimit -c unlimited

[ "$BASH_VERSION" ] && alias print=printf

prompt_status() {
	if [ "$1" -ne 0 ]; then
		echo -n "$2"
	fi
}
prompt_pwd() {
	echo "$PWD" | sed 's|\([^./]\)[^/]*/|\1/|g'
}
prompt_git_branch() {
	branch=$(git symbolic-ref -q HEAD 2>/dev/null)
	case $? in
	0) echo ": ${branch##*/}";;
	1) echo ': no branch';;
	*) ;;
	esac
}
prompt_term_title() {
	print '\033]0;'"$(prompt_pwd)"'\007'
}
export PS1="$(print '\001\r\001\033[1m\001')r \$(date +'%H:%M:%S') \$(prompt_status \"\$?\" \"level \$? \")at \$(prompt_pwd)\$(prompt_git_branch)$(print '\001\033[0m\001') \$(todo)\$(prompt_term_title)
"

lc() {
	ls -F "$@" | cols
}
cd() {
	builtin cd "$@"
	echo -n "$PWD" > ~/.lastpwd
}

if ! $_login; then
	[ -f ~/.lastpwd ] && cd "$(cat ~/.lastpwd)"
	lc
	print "\\n\\033[1mWelcome, $USER\\033[0m\\n"
fi

