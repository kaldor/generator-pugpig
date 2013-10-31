# generator-pugpig

A generator for [Yeoman](http://yeoman.io).


## Getting Started

To make use of all of the tools that the Pugpig Generator provides, here is the full list of dependencies.

### Dependencies

#### Dependencies for Yeoman Generator

* Ruby 1.9.3
* Sass - http://sass-lang.com/ - gem install sass
* nodejs - http://nodejs.org/
* PhantomJS
```npm install -g phantomjs```
* CasperJS - http://casperjs.org/ - install using homebrew

#### Dependencies for HTML Validation

* nokogiri - gem install nokogiri
* nestful - gem install nestful

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Updating

Before you generate a project, you should type:

```
yo
```

For a list of your generators and you will also be shown which generators have updates available. Please try and use the latest version of the generator unless otherwise specified.

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-pugpig from npm, run:

```
$ npm install -g generator-pugpig
```

Finally, initiate the generator:

```
$ yo pugpig
```

### Yeoman Sub Generators

The Pugpig generator comes with several "sub generators" for your generating pleasure. 

#### Testing Sub Generator

The first is a testing sub generator which is used by running:

```
$ yo pugpig:testing all
```

This will output the Pugpig Boilerplate test folder in the folder it is run in. It will include functional and unit testing examples and the libraries that are required. An added bonus is the inclusion of the Pugpig CSS Regression testing tool (https://github.com/kaldor/pugpig-css-regression) and the Pugpig Feed Page Validator tool(https://github.com/kaldor/pugpig-feed-page-validator). Currently the dependencies for these tools need to be installed manually but will be automated in a future release.

You can output only the functional test example, or only the unit test examples by running:


```
$ yo pugpig:testing unit
```

Or

```
$ yo pugpig:testing functional
```

You can only generate the CSS Regression testing tool by running:

```
$ yo pugpig:testing css
```

You can only generate the Feed Page Validator tool by running:

```
$ yo pugpig:testing html
```

#### Template Sub Generator

Want to start a new template? The template generator is here for you.

```
$ yo pugpig:template "Template Name"
```

This will be appended automatically to your index.html table of contents and a new Sass file will be created for your template and used within.

#### Component Sub Generator

Also included is a component generator for outputting a new CSS file for a component in your template. This is used by running:

```
$ yo pugpig:component "Component Name"
```

This will be appended automatically to your components partial.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
