# grunt-license-concat

> Concatinate dependency licenses

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-license-concat --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-license-concat');
```

## The "license_concat" task

### Overview
In your project's Gruntfile, add a section named `license_concat` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  license_concat: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.include
Type: `Array` or `String`
Default value: `['dependencies', 'devDependencies', 'peerDepedencies']`

A list of dependency types.

### Usage Examples

#### Default Options
In this example, we concatenate all dependencies from package.json and write them into the LICENSES file.

[See an example result file](https://github.com/SteffiB/grunt-license-concat/blob/master/example.txt)

```js
grunt.initConfig({
  license_concat: {
    options: {},
    files: {
      'LICENSES': 'package.json'
    }
  },
});
```

#### Custom Options
In this example, we concatenate only the licenses of the peerDependencies.

```js
grunt.initConfig({
  license_concat: {
    peer: {
    options: {
      include: 'peerDependencies'
    },
    files: {
      'tmp/string_options': 'package.json'
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
