
Grid layouts are fundamental to the design of websites, and the CSS Grid module is the most powerful and easiest tool for creating it. I personally think it’s a lot better than for example Bootstrap (read why [here](https://hackernoon.com/how-css-grid-beats-bootstrap-85d5881cf163)).

The module has also gotten native support by the [major browsers](https://caniuse.com/#feat=css-grid) (Safari, Chrome, Firefox, Edge) this year, so I believe that all front-end developer will have to learn this technology in the *not too distant* future.

In this article, I’ll take you through the very basics of CSS Grid as quickly as possible. I’ll be leaving out everything you shouldn’t care about until you’ve understood the basics.
> # I’ve also created a free CSS Grid course. [Click here to get full access to it.](https://scrimba.com/g/gR8PTE)

![](https://cdn-images-1.medium.com/max/5696/1*T8nvKEYxNZq0UhpF-bsmEA.png)

Now let’s jump into it!

## Your first grid layout

The two core ingredients of a CSS Grid are the **wrapper** (parent) and the **items** (children). The wrapper is the actual grid and the items are the content inside the grid.

Here’s the markup for a wrapper with six items in it:

    <div class="wrapper">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>

To turn our wrapper div into a **grid**, we simply give it a display of grid:

    .wrapper {
        display: grid;
    }

But, this doesn’t do anything yet, as we haven’t defined how we want our grid to look like. It’ll simply stacks 6 div's on top of each other.

![I’ve added a bit of styling, but that hasn’t got anything to do with CSS grid.](https://cdn-images-1.medium.com/max/3744/1*vTY7C5FMIp8OLkjrgp-vBg.png)

## Columns and rows

To make it two-dimensional, we’ll need to define the columns and rows. Let’s create three columns and two rows. We’ll use the grid-template-row and grid-template-column properties.

    .wrapper {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 50px 50px;
    }

As we’ve written three values for grid-template-columns, we’ll get three columns. We’ll get two rows, as we’ve specified two values for the grid-template-rows.

The values dictate how wide we want our columns to be (100px) and how tall we’d want our rows to be (50px). Here’s the result:

![](https://cdn-images-1.medium.com/max/2136/1*fJNIdDiScjhI9CZjdxv3Eg.png)

To make sure you properly understand the relation between the values and how the grid looks, take a look at this example as well.

    .wrapper {
        display: grid;
        grid-template-columns: 200px 50px 100px;
        grid-template-rows: 100px 30px;
    }

Try to grasp the connection between the code and the layout.

Here’s how it plays out:

![](https://cdn-images-1.medium.com/max/2780/1*M9WbiVEFcseUCW6qeG4lSQ.png)

## Placing the items

The next thing you’ll need to learn is how to place items on the grid. This is where you get superpowers, as it makes it dead simple to create layouts.

Let’s create a 3x3 grid, using the same markup as before.

    .wrapper {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        grid-template-rows: 100px 100px 100px;
    }

This will result in the following layout:

![](https://cdn-images-1.medium.com/max/2808/1*WxIT0z8OH7-rkoFMg5fwRw.png)
>  Notice, we only see a 3x2 grid on the page, while we defined it as a 3x3 grid. That’s because we only have six items to fill the grid with. If we had three more, then the lowest row would be filled as well.

To position and resize the items we’ll target them and use the grid-columnand grid-row properties:

    .item1 {
        grid-column-start: 1;
        grid-column-end: 4;
    }

What we’re saying here is that we want item1 to start on the first grid line and end on the fourth column line. In other words, it’ll take up the entire row. Here’s how that’ll play out on the screen:

![](https://cdn-images-1.medium.com/max/3292/1*he7CoAzdQB3sei_WpHOtNg.png)

Are you confused why we have 4 column lines when we only have 3 columns. Take a look at this image, where I’ve drawn the column lines in black:

![](https://cdn-images-1.medium.com/max/3292/1*l-adYpQCGve7W6DWY949pw.png)

Notice that we’re now using all the rows in the grid. When we made the first item take up the entire first row, it pushed the rest of the items down.

Finally, I’d like to show a simpler way of writing the syntax above:

    .item1 {
        grid-column: 1 / 4;
    }

To make sure you’ve understood this concept properly, let’s rearrange the items a little bit.

    .item1 {
        grid-column-start: 1;
        grid-column-end: 3;
    }

    .item3 {
        grid-row-start: 2;
        grid-row-end: 4;
    }

    .item4 {
        grid-column-start: 2;
        grid-column-end: 4;
    }

Here’s how that looks on the page. Try to wrap you head around why it looks like it does. It shouldn’t be too hard.

![](https://cdn-images-1.medium.com/max/3284/1*QDSybpxjXSat6UtoHgUapQ.png)

And that was it!

There are of course tons of concepts we haven’t gone through yet. And if you want to learn those, just check out [my free CSS Grid course on Scrimba.](https://scrimba.com/g/gR8PTE)

<br>

::: tip BASED ON
[`Learn CSS Grid in 5 Minutes`](https://medium.freecodecamp.org/learn-css-grid-in-5-minutes-f582e87b1228)  article from Per Harald Borgen on freeCodeCamp
:::