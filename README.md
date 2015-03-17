# Voluntr

## To run the app:

- Have node.js installed
- Have MongoDB installed and running.
- Have gulp installed `npm install -g gulp`
- Every time someone adds a npm depency, you have to run `npm install`
- Run `gulp`
  - Browser should fire up automatically and page should refresh when files are changed.
  - You might need to rerun gulp (`Ctrl+C` to exit) if you add new client-side files to force injection.
  - This also runs all the tests continuously.

## Testing
- Run `gulp test`
- This runs all the tests once.
- To add new tests create them in the tests folder.
- The tests use the jasmin testing framework

## Developing guidelines

- Don't push into master branch.
- Test before committing.
- Include the issue ID in the commit message.
- There are seed scripts to populate the database in development and testing environment in `/server/config/seed`. By using them everyone can have the same dummy data. Always clean up the db.

## Git guides

- To create a new branch: `git checkout -b branch-name`
- Before committing it's good to do `git diff`
- And `git status`
- Then `git add -A`
- Then `git commit -a` and enter your commit message.
