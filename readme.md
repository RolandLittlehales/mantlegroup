**Assumptions**
That this would need to run on in a repeated fashion (possibly to generate daily reports) and therefore "real" data sizes would not be excessive.
Due to this focus was on maintainable code instead of pure code speed execution.


getMostFrequent - That we only care about the most frequent and not proper podium finishes (i.e. no special care around handling ties)


**Instructions**
node v20.11.0 (shouldn't matter if you have older node versions)
run: npm install, to install deps
run: npm run start, this will generate the JS code on the fly and then run it without creating a perm js file (via ts-node library)
run: npm test, this will run (and watch) the test cases


**Notes**
Developed on windows 11
Jest was chosen as the Unit Test Library.
run npx jest --coverage to generate a coverage report.
Untested lines is the error boundary logic.
Coverage report:
----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   95.65 |       80 |     100 |   94.28 | 
 code.ts  |   95.65 |       80 |     100 |   94.28 | 48,74
----------|---------|----------|---------|---------|-------------------