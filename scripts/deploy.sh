#!bin/bash

if [[ ! -d dist ]]; then
	mkdir dist
fi

uncommitted_changes=$(git status --porcelain)

if [[ -n "$uncommitted_changes" ]]; then
	git add -A
	git commit -m "Deployment"
fi

if [[ ! `git branch --list gh-pages` ]]; then
	git branch gh-pages
fi

git checkout gh-pages && git merge main --no-edit

npx webpack --config webpack/webpack.prod.js

git add dist -f && git commit -m "Deployment commit"
git subtree push --prefix dist origin gh-pages
git checkout main
