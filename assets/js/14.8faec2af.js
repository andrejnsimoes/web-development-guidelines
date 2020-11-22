(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{181:function(e,t,i){"use strict";i.r(t);var n=i(0),s=Object(n.a)({},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"content"},[i("p",[e._v("In this post you’ll learn the basics of CSS Flexbox, which has become a must-have skill for web developers and designers the last couple of years.")]),e._v(" "),i("p",[e._v("We’ll be using a navbar as an example, as this is a very typical use case for Flexbox. This will introduce you to its most-used properties of the module, while leaving out the ones which aren’t as critical.")]),e._v(" "),i("blockquote",[i("h1",{attrs:{id:"i’ve-also-created-a-free-12-part-course-on-flexbox-check-it-out-here-if-you’re-interested"}},[i("a",{staticClass:"header-anchor",attrs:{href:"#i’ve-also-created-a-free-12-part-course-on-flexbox-check-it-out-here-if-you’re-interested","aria-hidden":"true"}},[e._v("#")]),e._v(" I’ve also created a free 12-part course on Flexbox. "),i("a",{attrs:{href:"https://scrimba.com/g/gflexbox",target:"_blank",rel:"noopener noreferrer"}},[e._v("Check it out here"),i("OutboundLink")],1),e._v(" if you’re interested!")])]),e._v(" "),i("p",[e._v("Now let’s get started!")]),e._v(" "),e._m(0),e._v(" "),e._m(1),e._v(" "),i("p",[e._v("Here’s the HTML for our example, which contains a container with three items:")]),e._v(" "),e._m(2),e._v(" "),i("p",[e._v("Before we turn this into a Flexbox layout, the div elements will be stacked on top of each other like this:")]),e._v(" "),e._m(3),e._v(" "),e._m(4),e._v(" "),e._m(5),e._v(" "),i("p",[e._v("This will automatically position the items nicely along the horizontal axis.")]),e._v(" "),e._m(6),e._v(" "),i("p",[e._v("If you want to check out the actual code, you can head over to "),i("a",{attrs:{href:"https://scrimba.com/c/c3zpnuB",target:"_blank",rel:"noopener noreferrer"}},[e._v("this Scrimba playground."),i("OutboundLink")],1)]),e._v(" "),i("p",[e._v("Now let’s shuffle these items around a bit.")]),e._v(" "),e._m(7),e._v(" "),e._m(8),e._v(" "),i("p",[e._v("In our case (but not always) the main axis is horizontal and the cross axis is vertical:")]),e._v(" "),e._m(9),e._v(" "),i("p",[e._v("In this article, we’ll only look at justify-content, as I’ve found to be using this one much more than align-items. However, in "),i("a",{attrs:{href:"https://scrimba.com/g/gflexbox",target:"_blank",rel:"noopener noreferrer"}},[e._v("my Flexbox course"),i("OutboundLink")],1),e._v(", I explain both properties in detail.")]),e._v(" "),i("p",[e._v("Let’s center all the items along the **main axis **by using justify-content:")]),e._v(" "),e._m(10),e._v(" "),e._m(11),e._v(" "),i("p",[e._v("Or we can set it to space-between, which will add space between the items, like this:")]),e._v(" "),e._m(12),e._v(" "),e._m(13),e._v(" "),i("p",[e._v("Here are the values you can set for justify-content:")]),e._v(" "),e._m(14),e._v(" "),i("p",[e._v("I’d recommend you to play around with these and see how they play out on the page. That should give you a proper understanding of the concept.")]),e._v(" "),e._m(15),e._v(" "),e._m(16),e._v(" "),i("p",[e._v("To do this we’ll use the good old technique of setting the margin to auto.")]),e._v(" "),e._m(17),e._v(" "),e._m(18),e._v(" "),i("p",[e._v("If we’d want both the search item and the logout item to be pushed to the right hand side, we’ll simply add the margin-left to the search item instead.")]),e._v(" "),e._m(19),e._v(" "),i("p",[e._v("It’ll push the search item as far to the right hand side as possible, which again will push the logout item with it:")]),e._v(" "),e._m(20),e._v(" "),e._m(21),e._v(" "),i("p",[e._v("So far, we’ve only had fixed-width items. But what if we want them to be responsive? To achieve that we have a property called flex. It makes it a lot easier than the old way of using percentages.")]),e._v(" "),i("p",[e._v("We’ll simply target all the items and give them a flex value of 1.")]),e._v(" "),e._m(22),e._v(" "),e._m(23),e._v(" "),i("p",[e._v("As you can see, it stretches the items to fill the entire container.")]),e._v(" "),i("p",[e._v("In many cases you’d probably want one of the items to take up the extra width, and thereby only set one if them to have flexible width. We can for example make the search item take up all the extra space:")]),e._v(" "),e._m(24),e._v(" "),e._m(25),e._v(" "),e._m(26),e._v(" "),i("p",[e._v("If you’re interested in learning them, though, I’m explaining all three properties thoroughly in "),i("a",{attrs:{href:"https://scrimba.com/g/gflexbox",target:"_blank",rel:"noopener noreferrer"}},[e._v("my free Flexbox course."),i("OutboundLink")],1)]),e._v(" "),i("br"),e._v(" "),i("div",{staticClass:"tip custom-block"},[i("p",{staticClass:"custom-block-title"},[e._v("BASED ON")]),e._v(" "),i("p",[i("a",{attrs:{href:"https://medium.freecodecamp.org/learn-css-flexbox-in-5-minutes-b941f0affc34",target:"_blank",rel:"noopener noreferrer"}},[i("code",[e._v("Learn CSS Flexbox in 5 Minutes")]),i("OutboundLink")],1),e._v("  article from Per Harald Borgen on freeCodeCamp")])])])},[function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"your-first-flexbox-layout"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#your-first-flexbox-layout","aria-hidden":"true"}},[this._v("#")]),this._v(" Your first Flexbox layout")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("The two main components of a Flexbox layout are the "),t("strong",[this._v("container")]),this._v(" and the "),t("strong",[this._v("items")]),this._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v('<nav class="container">\n  <div>Home</div>\n  <div>Search</div>\n  <div>Logout</div>\n</nav>\n')])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2976/1*egtZCVQirK8mJiacL98eBA.png",alt:"I’ve added a little bit of styling, but that has nothing to do with Flexbox."}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("To turn this into a Flexbox layout, we’ll simply give the "),t("strong",[this._v("container")]),this._v(" the following CSS property:")])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".container {\n    display: flex;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2984/1*DMA-NUgXG15-qDBAnLu3tA.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"justify-content-and-align-items"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#justify-content-and-align-items","aria-hidden":"true"}},[this._v("#")]),this._v(" Justify content and Align items")])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("p",[i("strong",[e._v("Justify-content")]),e._v(" and "),i("strong",[e._v("align-items")]),e._v(" are two CSS properties which help us distribute the items in the container. They control how the items are positioned along the "),i("strong",[e._v("main axis")]),e._v(" and "),i("strong",[e._v("cross axis")]),e._v(".")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2960/1*SDah34Yygu4CkLUcdsSytQ.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".container {\n    display: flex;\n    justify-content: center;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2604/1*1NQGeHIcXFdlYsNwP-kuXQ.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".container {\n    display: flex;\n    justify-content: space-between;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2604/1*rYctxBrNeO2019wscgaaQA.png",alt:""}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",[i("li",[i("p",[e._v("flex-start ("),i("strong",[e._v("default")]),e._v(")")])]),e._v(" "),i("li",[i("p",[e._v("flex-end")])]),e._v(" "),i("li",[i("p",[e._v("center")])]),e._v(" "),i("li",[i("p",[e._v("space-between")])]),e._v(" "),i("li",[i("p",[e._v("space-around")])]),e._v(" "),i("li",[i("p",[e._v("space-evenly")])])])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"controlling-a-single-item"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#controlling-a-single-item","aria-hidden":"true"}},[this._v("#")]),this._v(" Controlling a single item")])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("We can also control single "),t("strong",[this._v("items")]),this._v(". Let’s say we for example want to keep the first two items on the left side, but move the logout button to the right side.")])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".logout {\n    margin-left: auto;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2400/1*Z9GbnGBvlJdIYjiH3DQbbQ.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".search {\n    margin-left: auto;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2592/1*C5bwvvQjhgnrufVNo4jfwA.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"the-flex-property"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#the-flex-property","aria-hidden":"true"}},[this._v("#")]),this._v(" The flex property")])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".container > div {\n    flex: 1;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2380/1*fI8C475J2qbF5LMu82voEQ.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("pre",[t("code",[this._v(".search {\n    flex: 1;\n}\n")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[t("img",{attrs:{src:"https://cdn-images-1.medium.com/max/2596/1*7nmqNtWDHHh7pCgsUAUXfw.png",alt:""}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("p",[this._v("Before we end this article, I want to mention that the flex property is actually a shorthand three properties: "),t("strong",[this._v("flex-grow")]),this._v(", "),t("strong",[this._v("flex-shrink")]),this._v(" and "),t("strong",[this._v("flex-basis")]),this._v(". However, learning those takes more than five minutes, so it’s outside of the scope of this tutorial.")])}],!1,null,null,null);s.options.__file="css-flexbox.md";t.default=s.exports}}]);