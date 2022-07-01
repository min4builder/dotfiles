if ! [ "$ENV" ]; then
	_login=true
else
	_login=false
fi
export SHORTHOST="$(printf %.1s "$(hostname)")"
export PATH="$HOME/bin:$HOME/bin/$SHORTHOST:${PATH#"$HOME/bin:$HOME/bin/$SHORTHOST":}"
export ENV="$HOME/.profile"
export TERMINAL=foot
export EDITOR=kak VISUAL=kak
export PAGER=less
export BROWSER=librewolf
export HISTFILE="$HOME/.mksh-history"

ulimit -c unlimited

[ -f "$HOME/.config/${SHORTHOST}profile" ] && . "$HOME/.config/${SHORTHOST}profile"

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
	printf '\033]0;%s\033\\' "$(prompt_pwd)"
}
export PS1="$(printf '\001\r\001\033[1m\001')r \$(date +'%H:%M:%S') \$(prompt_status \"\$?\" \"level \$? \")at \$(prompt_pwd)\$(prompt_git_branch)$(printf '\001\033[0m\001') \$(todo)\$(prompt_term_title)
"

ls() {
	if [ ! "${1##-*}" ]; then
		command ls "$@"
	else
		command ls -F "$@" | cols
	fi
}
cd() {
	builtin cd "$@" || return $?
	echo -n "$PWD" > ~/.lastpwd
}
kak() {
	if [ "$#" -eq 0 ]; then
		file=$(fzf)
		if [ "$file" ]; then
			print -s kak "$(echo "$file" | sed "s/[' &;()|]/\\&/g")"
			command kak "$file"
		fi
	else
		command kak "$@"
	fi
}

if ! $_login; then
	[ -f ~/.lastpwd ] && cd "$(cat ~/.lastpwd)"
	ls
	printf "\\n\\033[1mWelcome, $USER\\033[0m\\n"
fi
