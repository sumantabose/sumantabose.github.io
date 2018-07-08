clear

echo -e "\n\t Add, Commit, Remote Add and Push to Git initiated ...\n"

read -e -p "Enter the commit comment: " comment

git config credential.username "sumantabose"
git add .
git commit -m "$comment"
git push origin master

echo -e "\n\t '$comment' Add, Commit, Remote Add and Push to Git completed ...\n"