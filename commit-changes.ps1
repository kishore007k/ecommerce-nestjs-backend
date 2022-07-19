param($commitMsg, $branchName)

Write-Host "Congratulations! Your first script executed successfully"

Git config --global user.email "kishore.kumar@m8y.one"
Git config --global user.name "Kishore Kumar"


Write-Host "Adding changes with git add ."
git add .

Write-Host "Commiting chnages with message: $commitMsg"
git commit -m "$commitMsg"

Write-Host "Puching changes to branch $branchName"
git push origin $branchName