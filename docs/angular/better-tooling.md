**How to leverage the best from React ecosystem and beyond to make our daily task easier and more effective within Angular apps and in the end become the best friends ever !**

Question is where to start? or **how** to achieve that goal.

## How

To answer the question “How to leverage other ecosystems” we need to introduce and take a look at 3 categories that cover an integral part of software development:

* Tools

* Architecture

* Libraries
> # As a baseline we will use “Industry standard” for booting up new Angular apps — Angular CLI

![Angular CLI, industry standard for booting up Angular apps](https://cdn-images-1.medium.com/max/2000/1*J_Y3KKxV3f6nP8vyORjw6w.png)

We can boot new Angular app in matter of seconds, with all “recommended/required tooling and setup”, by executing simple command:

    npx @angular/cli new my-app
>  **NOTE:*** never use a -g flag when installing packages! Global things are bad for your machine/life and thanks to **npx**, you don't need them anyway :)*

Let’s take a look what CLI gives us by default from perspective of our 3 defined categories:

* **Libraries:** all @angular/* packages and RxJs

* **Architecture:** Component driven architecture with Service layer, but no restrictions on this front ( use what you want )

* **Tools:**

→ we’ve got webpack as a module bundler

→ Protractor/Selenium for e2e testing

→ Jasmine with Karma for unit testing

→ and last but not least, ***the best thing that ever happened to JavaScript — Typescript*** with solid static analysis extensions for adhering to proper style-guides and — TSLint and Codelyzer.

![Angular CLI defaults from our 3 categories perspective](https://cdn-images-1.medium.com/max/5040/1*-Tc8D8wgf3dqCiahV-0OOg.png)

So far so good right ?!

## Tools

Tooling is indeed crucial for our productivity. Let’s see what can be done on this front.

Let’s start with package manager…

## Package Manager/Task Runner

Most of you are probably using npm, which was super annoying to use and slow until version 5. While npm is constantly improving, you don’t have to wait and instead you can switch to a better tool -> [yarn](https://yarnpkg.com/en/)

I’m not going to enumerate all the benefits, just a few time savers that you can leverage on daily basis.

How would you execute locally installed TypeScript from CLI with npm, or execute custom npm-script or pass additional arguments to your custom npm-script ? You’re smart and sure know how to do those, but with yarn it’s much easier. Comparison is on following image:

![npm vs yarn ( from task runner perspective )](https://cdn-images-1.medium.com/max/2932/0*Ubpcib5fnNg-JUB2.png)

How are you bumping you dependencies ? Manually by hand ? Seriously ? We can do better with yarn:

![yarn upgrade-interactive](https://cdn-images-1.medium.com/max/2000/0*gf4wYljVyt5vfg0k.gif)
>  *Just to not be biased against npm, you can achieve the same via 3rd party package(***npm-check***) and ***npx*** via npx npm-check -u just sayin’...*

## Formatting

CLI comes with pre-configured TSLint supported by Codelyzer, which helps us lint our code and adhere to strictly set style guides within our project. TSLint takes also care of consistent spaces at various places ( functions, module imports, etc… ), empty lines, single/double quotes, semicolons/no-semicolons… But if you think that this is the right way to do formatting, you are fundamentally wrong. Anyway, Lint is for linting not for formatting !

So how can we efficiently/consistently format our codebase instead of using wrong tool for that job — yes I’m talking about you Mr. linter(TSlint) ?

Ladies and gentleman, please welcome, The humble Prettier!

![](https://cdn-images-1.medium.com/max/2000/0*yXh_vSp-J4ZSXsFA.)

### [Prettier](https://prettier.io/)

is an opinionated formatter created by Facebook and OSS community. You can read more about it on prettier website.

We can add it to our CLI very easily:

*Install:*

    yarn add -D prettier

and define a new npm script:

    {
      "scripts": {
        "format": "prettier {src/e2e}/**/* --write"
      }
    }

By executing yarn format our whole codebase is formatted in matter of seconds and it's super fast!

That’s it? Not entirely! Because TSlint contains formatting rules, which has nothing to do with linting, we need to turn off these rules… Uff looks like lot of manual work !

### tslint-config-prettier

Thanks to OSS we can leverage [tslint-config-prettier](https://github.com/alexjoverm/tslint-config-prettier) package, which handles everything for us!

*Install:*

    yarn add -D tslint-config-prettier

and extend tslint.json rules with it:

    {
      "extends": [
        "tslint-config-prettier"
      ],
      "rulesDirectory": [
        "node_modules/codelyzer"
      ],
      "rules": {...}
    }

There are still issues though. CLI defines lot’s of rules within tslint.json which are overriding anything that extends our config. Again, tslint-config-prettier comes with a handy CLI tool, that detects those rules in conflict, which need to be removed:

By executing local binary:

    yarn tslint-config-prettier-check ./tslint.json

We will get output like this:

![tslint-config-prettier-check output](https://cdn-images-1.medium.com/max/2024/0*eJwwtii1QqKZed6T.png)
> # I see a great PR opportunity here, to automate removal of those conflicting lint rules ;)

### tslint-config-airbnb

You can also install [tslint-config-airbnb](https://github.com/progre/tslint-config-airbnb) to import Airbnb JavaScript Style rules

*Install:*

    yarn add -D tslint-config-airbnb

and extend tslint.json rules with it:

    {
      "extends": [
        "tslint-config-airbnb"
      ],
      "rulesDirectory": [
        "node_modules/codelyzer"
      ],
      "rules": {...}
    }

Formatting/Linting Done!

There is room for improvement though! I don’t know about you, but I’m lazy and just the thought of manually executing former command to format/lint my code, makes me ill…

### Hey Robot! Do your work!

![](https://cdn-images-1.medium.com/max/2000/1*v-04n2SFVT0nZD7onCCEzg.png)

Robots (I mean npm packages) can handle that for us. This can be achieved with following node libraries:

* [lint-staged](https://github.com/okonet/lint-staged) 🚫💩 — Run linters/formatters on git staged files

* [husky](https://github.com/typicode/husky) 🐶 Git hooks made easy

*Install:*

    yarn add -D lint-staged husky

*Configure* lint-staged:

![lint-staged config within package.json](https://cdn-images-1.medium.com/max/2152/0*K5LaiFUz79bPx6Cs.png)

And add commit hook via custom npm script, which will be recognised by husky and executed on particular git-hook. In our case, we want to hook into pre-commit git life cycle and execute lint-staged binary which will consume our formerly defined configuration.

npm script, which will be executed by husky, looks like following:

    {
      "scripts": {
        "precommit": "lint-staged"
      }
    }

Now, every time we will commit to the repo, our staged files will be formatted and linting violations will be fixed by TSLint (if they are auto-fixable), otherwise our commit will fail !
> # Excellent, you will never ever have to argue with your PR reviewer about semicolons vs no-semicolons, spaces…you name it…👌.

With that said, let’s switch to more serious stuff…

## Unit Testing
>  *If you’re not testing your codebase I will find you and I will… :D*

Angular CLI comes with Karma test runner and Jasmine expectation/spy library. Those tests are run usually against browser.

Karma is indeed an old tool ( levorutionary at one point some years ago ) but let’s be honest, it’s slow, debugging test is cumbersome and it needs extensive configuration. We can look outside our Angular boundaries and we will discover the “ultimate salvation”.

Everyone please welcome, silver bullet to all our testing nightmares, Dr.Jest .

### [Jest](https://facebook.github.io/jest/)

![](https://cdn-images-1.medium.com/max/2000/0*Jw3W_RvNW5rg-13i.png)

Jest is a complete testing solution, that includes both test runner and assertion/spy library and much more…

It’s super easy to setup, it’s blazingly fast and introduces a brand new type of testing — snapshot testing ( which can be leveraged with everything that is serializable — component snapshots, state snapshots, image snapshots …)

**Jest integration with Angular CLI**

To integrate Jest with Angular CLI, we need to install

* **jest**

* [**jest-preset-angular](https://github.com/thymikee/jest-preset-angular)**, which handles everything for test environment setup specific to Angular ( zones and stuff ya know ? )

    yarn add -D jest jest-preset-angular

Now we need to configure jest, to consume our preset:

    // jest.config.js
    module.exports = {
      preset: 'jest-preset-angular',
      setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
    }
>  [*For more info see the docs](https://github.com/thymikee/jest-preset-angular#exposed-configuration)*

Now we can add new npm-scripts for testing:

    {
      "scripts": {
        "test": "jest --watch",
        "test:ci": "jest --runInBand",
        "test:coverage": "jest --coverage"
      }
    }

### Jest speed

I briefly mentioned, that Jest is fast. How fast ?

![Unit testing speed comparison Karma vs Jest](https://cdn-images-1.medium.com/max/3336/0*s9xWHdUAHYgIeS7X.png)

Why is it so fast ? Well it runs against Node and [JSDOM](https://github.com/jsdom/jsdom), tests are executed in parallel and efficiently cached.

### Jest snapshot testing

Jest comes with snapshot testing, you just need to use toMatchSnapshot matcher within your test expectation on component fixture:

![Component snapshot testing](https://cdn-images-1.medium.com/max/2000/0*mUxioxAmdcEoJGV6.png)

This will save a snapshot footprint of your component in that particular moment(state) - a file physically on disk - and when something changes in the component implementation afterwards, you’ll get following failing test with detailed DIFF about what changed:

![Component snapshot diff change](https://cdn-images-1.medium.com/max/2720/0*wKJPhBGc_EcxwmM1.png)

I love this !

### Jest interactive mode

Jest comes with advanced watch mode — a CLI like tool with lot of perks, like filtering, running only tests that changed and various other features:
> # Behold — Jest interactive watch mode:

![](https://cdn-images-1.medium.com/max/2078/0*FP7v9M4YqyKu4tSi.gif)

Beautiful isn’t it ?!

### **Other Jest features**

There are moar things that comes with Jest, I will name just few:

* Powerful mocking features ( ES2015 modules, assets )

* Code coverage — 0CJS jest --coverage

* Pluggable ( run Puppeteer with Jest )

* Huge ecosystem: [jest-axe](https://github.com/nickcolley/jest-axe) ( a11y ), [jest-images-snapshots](https://github.com/americanexpress/jest-image-snapshot)

## E2E Testing

End to End testing is equally or even more important than unit testing. Let’s see what we get by default with CLI.

* Protractor with Selenium

Uh?! What did you just say? SELENIUM ? Did I tell you that every time I hear “SELENIUM” I wanna fight someone… and you don’t want to fight me, trust me 👀😇

> # Selenium was indeed useful at some point in our development carer history, but it’s 2018 and there are much better tools out there nowadays.

Please welcome, the cure for your E2E testing sickness, Dr. TestCafe 👨‍⚕️

### [TestCafe](https://devexpress.github.io/testcafe/)

TestCafe is pure NodeJS, non framework specific, open source tool for all our E2E scenario needs !

It’s 100% reliable, fast, zero config solution, works cross platform, cross browser( even works on custom environments like Windows Subsystem Linux or custom browsers ). Last but not least I forgot to mention that Typescript is 1st class citizen for writing e2e scenarios, so yay for type safety within your E2E tests!

*Install:*

    yarn add -D testcafe testcafe-live

Now we can add new npm-scripts for executin e2e tests:

![npm scripts for running e2e with TestCafe](https://cdn-images-1.medium.com/max/3468/1*3GO2vo3uwbznspgJ-_vxUQ.png)

On CI, we wanna run our suite against all browsers and by providing --app flag, we are telling TestCafe to boot UI for us and then execute the scenarios on it, so for those purposes we will execute yarn e2e:ci

For development we will use yarn e2e which runs e2e tests in watch mode in chrome, so after every change our tests are re-run. ***DX experience at it's best !***
> # Let’s see it in action (TestCafe watch mode)!

**TestCafe demo example**

In following e2e scenario, we are testing creation of new pizza, and after it’s created, we delete it to clean up after ourselves.

What might not be visible from the demo is, that when you wanna delete a pizza, browser native confirm dialog is shown, TestCafe handles all of this with ease.

After initial run, we’re adding toppings to the pizza, just to showcase complex UI entities selection within our e2e test.

Whole test scenario is powered by traditional ***PageObject pattern*** with custom helpers for our particular needs.

![E2E tests run in watch mode — brilliant DX for writing our scenarios](https://cdn-images-1.medium.com/max/2936/1*6zjG9GvkvC_FgkTH4mFcXg.gif)

## Components Development

Angular CLI doesn’t come with anything related to developing Components in isolation or for building a Demo project with components showcased in various state. Thanks to React community we can leverage [Storybook](https://github.com/storybooks/storybook) !

### Storybook

Storybook is powered by React under the hood and generates whole UI catalogue of your component demos/stories. Within Angular scope, it supports much more than just components. You can write stories for Services, Modules etc…

This is how the Storybook UI looks like:

![Storybook UI with Angular](https://cdn-images-1.medium.com/max/2616/0*vSI1f8FXaX59sJm0.gif)

Storybook is also capable to build our stories app, so we can deploy it on server, and with that, to provide a documentation for our component consumers. You can see it deployed with various [Angular stories examples here](https://storybooks-angular.netlify.com/)

**Storybook CLI integration**

To add Storybook to Angular CLI, we will leverage storybook CLI:

    npx @storybook/cli@alpha getstorybook
> # While we are enjoying our morning quick shot of espresso, everything is setup for us. Amazing!

![add storybook to angular CLI](https://cdn-images-1.medium.com/max/2000/0*kWuHmkpgmg-4oaF3.gif)

Then we execute

    yarn storybook

and our local storybook app is ready to use!

**Storybook Addons**

Storybook comes also with various plugins, although framework support varies. [You can learn more here](https://github.com/storybooks/storybook/blob/master/ADDONS_SUPPORT.md)

**Storybook: write a story**

Let’s look very quickly how to write a story for simple button component:

![Angular Componet Story](https://cdn-images-1.medium.com/max/2000/0*Or8BNN3fp09DE4P4.png)

**Storybook: Component folder structure**

With storybook covered, our final component folder structure should look like this:

![Final folder structure](https://cdn-images-1.medium.com/max/3464/0*wPasNwJBGDRReJbo.png)

* implementation

* unit test with snapshots

* external styles

* story

## Tooling summary

Thanks to other communities and ecosystems, we are able to leverage better exisitng tools for our Angular toolkit.

We replaced Karma/Jasmine with Jest, Protractor/Selenium with TestCafe, TSlint with Prettier for formatting and added husky with lint-staged for adhering to styleguides automatically. As a last step, we added Storybook for developing components in isolation.

![](https://cdn-images-1.medium.com/max/3288/0*xJ19FPB-G50-tlBb.png)

You can find everything that I’ve covered in this article open sourced on my GitHub repo:

* [Better Angular CLI defaults](https://github.com/Hotell/react-tools-for-better-angular-apps)

* [Example app](https://github.com/Hotell/react-tools-for-better-angular-apps/tree/example-app)

<br>

::: tip BASED ON
[`Use React tools for better Angular apps`](https://medium.com/@martin_hotell/use-react-tools-for-better-angular-apps-b0f14f3f8114) article from Martin Hochel on Medium
:::
