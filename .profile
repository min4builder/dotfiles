if ! [ "$ENV" ]; then
	_login=true
else
	_login=false
fi
export ROOT="$HOME/local"
export ADDPATH="$ROOT/bin:$HOME/bin"
export PATH="$ADDPATH:${PATH#$ADDPATH:}"
export ENV="$HOME/.profile"
export EDITOR=vis VISUAL=vis

export QT_QPA_PLATFORM_PLUGIN=wayland

ulimit -c unlimited

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
export PS1="$(print '\001\r\001\033[1m\001')r \$(date +'%H:%M') \$(prompt_status \"\$?\" \"level \$? \")at \$(prompt_pwd)\$(prompt_git_branch)$(print '\001\033[0m\001') \$(todo)
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

