#!/bin/bash

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Add changes to git.
git add .

# Get package version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Ask for user commentary
read -p "Your commits: "  commentary

# Commit changes.
# msg="GAS `date` v$PACKAGE_VERSION $commentary"
msg="$PACKAGE_VERSION $commentary"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master
