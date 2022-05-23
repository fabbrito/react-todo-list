# Simple TO-DO list with React

A Single Page Application that implements a simple TO-DO(tasks) list with persistent data (by Browser Local Storage).

Created using React and Typescript, plus a few extra libraries: _lodash/debounce_, _uuid_, _date-fns_ and _SASS_.

Github pages: [https://fabbrito.github.io/react-todo-list/](https://fabbrito.github.io/react-todo-list/)

## Features:

### Toolbar
- Always on the top of the page.
- Check all option (checkbox).
- Delete all visible and checked (icon).
- Search bar with debounced input.

### TO-DO cards
- Checkbox for deletion and emphasis.
- Delete button for each card.
- Timestamp on mouse hover.

### Add TO-DO
- Textarea with a maximum of 500 chars.
- For testing purposes, an empty todo can be added: With an empty string or with its "uuid" as text (only if no changes are detected on the textarea field).

### Extras
- All delete functions opens a modal to confirm deletion. The modal closes, without deletion, on clicking the backdrop or the Cancel button.
- Button to return to the top of the page. Only visible after scroll reaches: `window.pageYOffset > 300`.
- CSS changes for small screens:
  - Design changes to vertically stacked, with the "Add to-do" functionality at the top.
  - Card specific checkbox is overlaid on the top left of the card.

## References and Inspirations:

[How to Use localStorage with React Hooks to Set and Get Items](https://www.freecodecamp.org/news/how-to-use-localstorage-with-react-hooks-to-set-and-get-items/)

[SASS Functions - w3schools](https://www.w3schools.com/sass/sass_functions_color.php)

[CodePen - React Fancy Cards With Delete Button](https://codepen.io/davidmellul/pen/oyopdx)

[CSS { IRL } - Animating Underlines](https://css-irl.info/animating-underlines/)

[Free Frontend - 91 Checkboxes CSS](https://freefrontend.com/css-checkboxes/)

[Pure CSS Custom Checkbox Style](https://moderncss.dev/pure-css-custom-checkbox-style/#custom-checkbox-style)

[Robinwieruch - Using a indeterminate React Checkbox](https://www.robinwieruch.de/react-checkbox-indeterminate/)

[Testing local storage with testing library](https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b)

[Setting up a CI/CD workflow on GitHub Actions for a React App (with GitHub Pages and Codecov)](https://dev.to/dyarleniber/setting-up-a-ci-cd-workflow-on-github-actions-for-a-react-app-with-github-pages-and-codecov-4hnp)

[The Focus-Indicated Pseudo-class: :focus-visible](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo)

[Paper icons created by Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/paper)

<!-- ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

 -->
