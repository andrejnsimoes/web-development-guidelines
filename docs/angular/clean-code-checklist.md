
Angular has rapidly grown to become one of the most popular frameworks for building front-end, cross-platform web applications. It gives you a lot of the out-of-the-box features, such as a routing system, a dependency injection framework, forms handling, etc. Angular also enforces you to use both TypeScript and RxJS, since its already part of the Angular ecosystem. This extensive width of features makes Angular a good candidate for large enterprise solutions.

While Angular is an extremely powerful framework with a broad toolkit, it’s hard to master, especially if it’s your first JavaScript framework. In an attempt to reduce complexity, I decided to put together a clean code checklist which covers my personal recommendations for writing clean and production-ready Angular code.

## **Background**

As we become better developers, structuring and organizing code becomes more and more important. We want to write code that improves readability, scalability, maintainability and performance, and minimizes the time spent debugging.

As **Martin Golding** stated:
>  Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.

Sounds disturbing, but it doesn’t make the message any less true. Programmers are really authors and other developers are their target audience. The time spent attempting to understand someone else’s code takes up large portion of our day to day operations. We should therefore consciously try to improve the quality of our code. It’s essential for creating a successful, maintainable product.

## **Style Guide**

The logical place to start looking for best practices in Angular is the [Angular Style Guide](https://angular.io/guide/styleguide). This is an opinionated guide on syntax, conventions, and application structuring. The style guide presents preferred conventions and explains with examples why you should use them.

## Angular CLI

The [Angular CLI](https://cli.angular.io/) is a great tool for creating and working with Angular applications. It increases productivity by taking away the tedious work of creating each file manually. With only a few commands, you’re able to:

* Create a project from scratch

* Scaffold components, directives and services

* Lint your code

* Serve the application

* Run unit- and end to end tests

You can find more information about the Angular CLI [here](https://www.intertech.com/Blog/angular-tutorial-getting-started-with-the-angular-cli/).

## **Folder Structure**

As the application grows in size, it’s important to have a structure in place that allows for easy management and maintenance of your code base. Whichever structure you decide to use, it’s important to be consistent and choose a structure the entire team is happy with.

The article “[How to define a highly scalable folder structure for your Angular project](https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7)” discusses these topics, and can be used as a reference point when deciding on your own structure.

## **Write Readable Code**

If you want the refactoring to be as efficient as possible, it’s important to have readable code. Readable code is easier to understand, which makes it easy to debug, maintain and extend.

### **File names**

While adding new files, pay attention to the file-names you decide to use. File names should be consistent and describe the feature by dot separation.

```TypeScript
|-- my-feature.component.ts
or
|-- my-service.service.ts
```

### **Variable- and function names**

You need to name the variables and functions so the next developer understands them. Be descriptive and use meaningful names — clarity over brevity*.*

This will help us avoid writing functions like this:

```TypeScript
function div(x, y)) {
    const val = x / y;
    return val;
}
```

And hopefully more like this:

```TypeScript
function divide(divident, divisor) {
    const quotient = divident / divisor;
    return quotient;
}
```

### **Write Small pure functions**

When we write functions to execute some business logic, we should keep them small and clean. Small functions are easier to test and maintain. When you start noticing that your function is getting long and cluttered, it’s probably a good idea to abstract some of the logic to a new one.

This avoids functions like this:

```TypeScript
addOrUpdateData(data: Data, status: boolean) {
    if (status) {
    return this.http.post<Data>(url, data)
        .pipe(this.catchHttpErrors());
    }
    return this.http.put<Data>(`${url}/${data.id}`, data)
    .pipe(this.catchHttpErrors());
    }
}
````

And hopefully more like this:

```TypeScript
addData(data: Data) {
    return this.http.post<Data>(url, data)
    .pipe(this.catchHttpErrors());
}

updateData(data: Data) {
    return this.http.put<Data>(`${url}/${data.id}`, data)
    .pipe(this.catchHttpErrors());
}
````

### **Remove unused code**

It is extremely valuable to know if a piece of code is being used or not. If you let unused code stay, then in the future, it can be hard or almost impossible to be certain if it’s actually used or not. Therefore, you should make it a high priority to remove unused code.

### **Avoid code comments**

Although there are cases for comments, you should really try to avoid them. You don’t want your comments to compensate for your failure to express the message in your code. Comments should be updated as code is updated, but a better use of time would be to write code that explains itself. Inaccurate comments are worse than no comments at all, as stated by **anonymous**:
>  Code never lies, comments do.

This avoids writing code like this:

```TypeScript
// check if meal is healthy or not
if (meal.calories < 1000 &&
    meal.hasVegetables) {
    ...
}
```

And hopefully more like this:

```TypeScript
if (meal.isHealthy()) {
    ...
}
```

## **Separation of Concerns**

Angular is built around separation of concerns. This is a design-pattern that makes our code easier to maintain and extend, and more reusable and testable. It helps us encapsulate and limit the logic of components to satisfy what the template actually needs, and nothing more. Separation of concerns is the core of writing clean code in Angular, and uses the following rule-set:

* Split the application into multiple modules. The project becomes more organized, maintainable, readable and reusable, and we’re able to lazy load features.

```TypeScript
|-- modules
|    |-- home
|    |     |-- home.spec|module|component|scss||routing.module|.ts
|    |-- about
|    |     |-- about.spec|module|component|scss|routin.module|.ts
```

* When we find ourself in situations where we want to reuse business logic in other parts of our application, we should consider creating a service. Services are a central part of Angular and a great place for your reusable business logic. The most common use case for services are HTTP-related events. By using a service to manage our HTTP calls, we know exactly where the changes has to be made and those are the only line affected.

*Quick tip! You can also create an API service which handles a lot of the HTTP-related logic for you. I recommend checking out [this](https://github.com/gothinkster/angular-realworld-example-app/blob/master/src/app/core/services/api.service.ts) GitHub-example.*

* You should create something like a “common frame” for your application where you will include common components. This comes in handy when you don’t want to contaminate your components with the same code. Since Angular doesn’t allow us to import component directly between different modules, we need to put these components inside the shared module.

```TypeScript
// src/app/shared/components/reusable/resuable.component

...

export class ReusableComponent implements OnInit {
    @Input() title: string;
    @Input() body: string;
    
    @Output() buttonClick = new EventEmitter();

    constructor() { }

    ngOnInit() {}

    onButtonClick(){
    this.buttonClick.emit('Button was clicked');
    }
}
```

--------------------------------------------------------------------

```TypeScript
// You can then use this component directly inside the components of
// your choice

// src/app/some/some.component

@Component({
    selector: 'app-some',
    template: `<app-reusable [title]="'Awesome title!'"
                [body]="'Lorem ipsum'"
                (buttonClick)="buttonClick($event)>
                </app-reusable>`,
})
export class SomeComponent implements OnInit {

    constructor() {}

    ngOnInit() {}

    public buttonClick(e){
    console.log(e);
    }
}
```

*Quick tip! We’re able to control the HTML contents from the “parent” component by using the ng-content tag. Read more about content projection with ng-content [here](https://codecraft.tv/courses/angular/components/content-projection/).*

* When we find our self in situations where multiple HTML elements share the same behavior (e.g. some piece of text is highlighted on click), we should consider using an attribute directive. Attribute directives are used to change the behavior or appearance of a HTML-element.

## **Utilize TypeScript**

TypeScript is a superset of JavaScript which primary provides static typing, classes and interfaces. Angular is built on TypeScript, and as a result, using TypeScript with Angular becomes a pleasurable experience. It provides us with advanced autocompletion, quick navigation and refactoring. Having such a tool at your disposal shouldn’t be taken for granted.

To get the most out of TypeScript:

* We should always use interfaces to force the class to implement declared functions and properties.

```TypeScript
// .../burger.model.ts
export interface Burger {
    name: string;
    calories: number;
}

// .../show-burger.component.ts
this.burger: Burger;
```

* We should make use of type unions and intersections. This comes extremely handy when dealing with data from an API.

```TypeScript
export interface Burger {
    ...,
    bestBefore: string | Date;
}
```

*Quick tip! We should always declare variables and constants with a type definition other than “any”. Strictly typed code is less error-prone.*

## **Use TSLint**

One way of improving your development experience immensely is by using TSLint. This is a static code analysis tool we use in software development for checking if TypeScript code complies with the coding rules. Having these rules in place will give you an error when you do something wrong.

### [Prettier with TSLint](https://www.npmjs.com/package/tslint-config-prettier)

You can combine TSLint with Prettier. Prettier is an amazing tool that enforces a consistent style by parsing your code and re-printing it, with it’s own rules in place. Having Prettier setup with TSLint gives you a strong foundation for your applications, as you no longer need to maintain your code-style manually. Prettier takes care of code formatting and TSLint handles the rest.

### [Lint with Husky](https://www.npmjs.com/package/husky)

Even with these rules in place, it can be hard to maintain them. You can easily forget to run these commands before pushing your code to production, which leads to a broken result. One way to work around this problem is by using husky. Husky allows us to run custom scripts before the staged files are committed — keeping our production code clean and organized.

## RxJS in Angular

RxJS is a library for reactive programming that allows us to work with asynchronous data streams. Angular comes packaged with RxJS, so it’s to our great advantage to make the most of it.

### Pipeable operators

RxJS 5.5 introduced pipeable operators. This pipe-based approach to observable-composition allows us to import on a per-operators basis, rather than importing everything. Pipeable operators does also have tree-shaking advantages and allows us to build own custom operators without extending the Observable.prototype.

This will help us avoid writing code like this:

```TypeScript
...

const name = this.loadEmployees()
    .map(employee => employee.name)
    .catch(error => Rx.Observable.of(null));

And hopefully more like this:

const name = this.loadEmployees()
    .pipe(
        map(employee => employee.name),
        catchError(error => of(null))
    );
```

### Subscribe in Template

Imagine a case where we need to subscribe to multiple streams. It would be a headache to manually map every single property to the corresponding value and manually unsubscribe when the component gets destroyed.

With the async pipe, we subscribe to the stream directly inside our template, without having to store the result in an intermediate property. The subscription will terminate when the component gets destroyed, which makes subscription-handling easier and contributes to cleaner code.

This will help us avoid writing code like this:

```TypeScript
@Component({
    ...
    template: `<items [items]="item">`
})
class AppComponent {
    items: Item[];

    constructor(private itemService: ItemService) {}

    ngOnInit() {
    this.loadItems()
        .pipe(
        map(items => this.items = items;
        ).subscribe();
    }

    loadItems(): Observable<Item[]> {
    return this.itemService.findItems();
    }
}
```

And hopefully more like this:

```TypeScript
@Component({
    ...
    template: `<items [items]="items$ | async"></items>`
})
class AppComponent {
    items$: Observable<Item[]>;

    constructor(private itemService: ItemService) {}

    ngOnInit() {
    this.items = this.loadItems();
    }

    loadItems(): Observable<Item[]> {
    return this.itemService.findItems();
    }
}
```

### Avoid memory leaks

While Angular takes care of unsubscribing when using the async pipe, it quickly becomes a mess when we have to do this on our own. Failing to unsubscribe will lead to memory leaks, as the observable stream is left open.

The solution is to compose our subscription with the takeUntil operator, and use a subject that emits a value when the component gets destroyed. This will complete the observable-chain, causing the stream to unsubscribe.

This help us avoid writing code like this:

```TypeScript
this.itemService.findItems()
    .pipe(
    map((items: Item[]) => items),
    ).subscribe()
```

And hopefully more like this:

```TypeScript
private unsubscribe$: Subject<void> = new Subject<void>();

...

this.itemService.findItems()
.pipe(
    map(value => value.item)
    takeUntil(this._destroyed$)
    )
.subscribe();

...

public ngOnDestroy(): void {
this.unsubscribe$.complete();
this.unsubscribe$.unsubscribe();
}
```

### Don’t use nested subscriptions

There may be situations where you need to consume data from multiple observable streams. In those cases, you should generally try to avoid socalled nested subscriptions. Nested subscriptions becomes hard to understand and may introduce unexpected side effects. We should instead use chainable methods like switchMap, forkJoin and combineLatest to condense our code.

This will help us avoid writing code like this:

```TypeScript
this.returnsObservable1(...)
    .subscribe(
    success => {
        this.returnsObservable2(...)
        .subscribe(
            success => {
            this.returnsObservable3(...)
                .subscribe(
                success => {
                    ...
                },
```

And hopefully more like this:

```TypeScript
this.returnsObservable1(...)
    .pipe(
    flatMap(success => this.returnObservable2(...),
    flatMap(success => this.returnObservable3(...)
    )
    .subscribe(success => {...});
```

*Quick tip! There may be confusion around when to use the appropriate operators when dealing with multiple streams. I recommend checking out [this ](https://medium.com/@shairez/a-super-ninja-trick-to-learn-rxjss-switchmap-mergemap-concatmap-and-exhaustmap-forever-88e178a75f1b)article for some clarity on this topic.*

### Subjects in RxJS

A Subject acts as both an observable and an observer. Because Subjects allows us to emit data into an observable stream, people tend to abuse them. This is especially popular among developers new to RxJS. To determine when it might be a good time to use a Subject, we’re first going to see what subjects are, and what subjects are not.

What subjects **are**:

* Subjects are multicasted, which means you can create multiple subscriptions on a single observer. You can notify all the observers in the list with the next() method. This is the primarily use of Subjects in RxJS.

* Since Subjects implements Observable and Observer simultaneously, their suitable for both input and output events.

What subjects **are not**:

* RxJS Subjects can’t be reused. You’re not allowed to call the next() method on a completed Subject.

*Quick tip! On top of vanilla Subject, there are also a few specialized types of subjects like async subjects, behavior subjects and replay subjects. You can read more about those types of subjects [here](https://alligator.io/rxjs/subjects/).*

## **Clean up imports with path aliases**

Consider a case where you need to import something far down the application hierarchy. This would lead to an import statement looking something like this:

```TypeScript
import 'reusableComponent' from '../../../shared/components/reusable/reusable.component.ts';
```

Then imagine that you need to change the location this file. You would then have to update the path of every single file which uses that feature. This doesn’t sound very efficient, does it?

We can clean up these imports considerably by using aliases to reference our files, which looks something like this:

```TypeScript
import 'reusableComponent' from '@app/shared/components/reusable.component.ts';
```

To be able to do this, we need to add a baseUrl and the desired paths inside our tsconfig.json file:

```TypeScript
{
    "compilerOptions": {
    ...
    "baseUrl": "src",
    "paths": {
        "@app:": ["@app/*"]
    }
    }
}
```

The most common use case for imports are component and services from the Core- and Shared module. To avoid writing out the entire path for those features, we’ll create multiple index.ts-files, which exports those features:

```TypeScript
// src/app/shared/components/index.ts

export * from './reusable/reusable.component.ts';

// src/app/shared

export * from '/components';
```

We can now reference the file import like this:

```TypeScript
import 'ReusableComponent' from '@app/shared/';
```

*Quick tip! Be aware when using path aliases to import services or components inside the Shared- or Core module. This may lead to “circular dependencies”. In those cases, you need to write the entire path.*

## Spice up your App with animations

Animation is defined as the transition from an initial state to a final state. It is an integral part of any modern web application. Animation not only helps us create a great UI but it also makes the application interesting and fun to use. A well-structured animation keeps the user engaged with the application and enhances the user experience.

## **Lazy Load Your Modules**

If your using a multiple-module architecture, it’s probably a good idea to lazy load your modules. Only the feature module which is used to display the initial content to the user should be loaded synchronously. The advantage of using lazy loading is that module isn’t loaded before the user actually accesses the route. This helps decrease the overall startup time by only loading the modules we’re currently presenting.

## **State Management**

When building large, complex applications that has lots of information coming from and going to the database, and where state is shared across multiple components, you might start considering adding a state management library. By using a state management library, you are able to keep the application state in one single place, which reduces the communication between components and keeps your app more predictable and easier to understand.

## **Conclusion**

Angular is a very powerful framework with a lot of functionality. But if you’re new to the game, it can seem overwhelming with all its different options and whatnot. Hopefully, by following the guidelines outlined here, some of the concepts became more clear to you. Although there are no blueprint for how to write clean code, there’s some key takeaways here:

**Write readable code**. Focus on writing code that is easy to understand.

**Separation of concerns**. Encapsulate and limit logic inside your components, services and directives. Each file should only be responsible for a single functionality.

**Utilize TypeScript**. TypeScript provides advanced autocompletion, navigation and refactoring. Having such a tool at your disposal shouldn’t be taken for granted.

**Use TSLint**. TSLint checks if TypeScript code complies with the coding rules in place. Combined with Prettier and Husky makes for an excellent workflow.

**RxJS in Angular**. RxJS comes packaged with Angular, it’s to our great advantage to make the most of it.

**Clean up imports with path aliases**. We can clean up our imports considerably by using path aliases to reference our files.

**Lazy load your modules**. Lazy loading helps us decrease the startup time of our app by only loading the modules we’re currently presenting.

**State management (if necessary)**. State management is a great tool to have at your disposal, but should only be used for large, complex applications where multiple components shares the same state.

Other useful resources on this topic:

* [https://medium.freecodecamp.org/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f](https://medium.freecodecamp.org/best-practices-for-a-clean-and-performant-angular-application-288e7b39eb6f)

* [https://code-maze.com/angular-best-practices/](https://code-maze.com/angular-best-practices/)

* [https://github.com/ryanmcdermott/clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)


<br>

::: tip BASED ON
[`Clean Code Checklist in Angular `](https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74) article from Mathis Garberg on Medium
:::