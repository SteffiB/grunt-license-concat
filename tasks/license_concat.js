/*
 * grunt-license-concat
 * https://github.com/stebau/grunt-license-concat
 *
 * Copyright (c) 2015 Stephanie Bauer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('license_concat', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      include: ['dependencies', 'devDependencies', 'peerDepedencies']
    });

    if (!Array.isArray(options.include)) {
      options.include = [options.include];
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
          // Warn on and remove invalid source files (if nonull was set).
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        });

      var dependencies = src.map(function(filepath) {
          // Read file source.
          return grunt.file.read(filepath);
        }).map(function(fileContent) {
          return JSON.parse(fileContent);
        }).map(function(json) {
        var dependencies = [];
          options.include.forEach(function(dependencyType) {
            Array.prototype.push.apply(dependencies, Object.keys(json[dependencyType] || {}));
          });
          return dependencies;
        }).reduce(function(previousValue, currentValue) {
          Array.prototype.push.apply(previousValue, currentValue);
          return previousValue;
        }, []);

      var dependencyLicenses = dependencies.map(function(dependenciy) {
          return {
            dependenciy: dependenciy,
            licenses: grunt.file.expand('node_modules/' + dependenciy + '/*LICENSE*')
              .map(function(licensePath) {
                return grunt.file.read(licensePath);
              })
              .join('\n\n')
          };
        });

      var licenseContent = dependencyLicenses.map(function(dependencyLicense){
        return 'Library: ' + dependencyLicense.dependenciy + '\nLicense:\n' + dependencyLicense.licenses;
      }).join('\n\n');

      grunt.file.write(f.dest, licenseContent);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};