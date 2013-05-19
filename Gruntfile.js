/*global module:false*/

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    meta: {
      version: '0.1.0',
      timestamp: Math.floor(new Date().getTime() / 1000),
      banner: ''
    },
    exec: {
      clear: {
        command: 'clear',
        stdout: true
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      app: {
        options: {
          browser: true
        },
        files: {
          src: ['index.js']
        }
      }
    },
    less: {
      styles: {
        files: {
          'build/twote.css': 'less/twote.less'
        }
      }
    },
    concat: {
      scripts: {
        src: [
          'components/jquery/jquery.js',
          'components/underscore/underscore.js',
          'components/backbone/backbone.js',
          'components/highcharts/highcharts.js',
          'lib/config.js',
          'lib/helper/*',
          'lib/model/*',
          'lib/collection/*',
          'lib/view/*',
          'lib/router/*',
          'lib/main.js',
        ],
        dest: 'build/twote.js'
      },
    },
    uglify: {
      scripts: {
        options: {
          banner: '<%= meta.banner %>'
        },
        files: {
          'build/twote.min.js': 'build/twote.js'
        }
      }
    },
    cssmin: {
      compress: {
        files: {
          'build/twote.min.css': 'build/twote.css'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html',
        }
      }
    },
    imageoptim: {
      files: [
        'build/img'
      ],
    },
    copy: {
      img: {
        filter: 'isFile',
        expand: true,
        flatten: true,
        src: ['img/*'],
        dest: 'build/img/'
      },
      fonts: {
        filter: 'isFile',
        expand: true,
        flatten: true,
        src: ['less/fonts/*'],
        dest: 'build/fonts/'
      },
      html: {
        filter: 'isFile',
        expand: true,
        flatten: true,
        src: ['index.html'],
        dest: 'build'
      }
    },
    clean: {
      images: ['build/img/*', 'build/fonts/*', 'build/img/.DS_Store'],
      less: 'less/*.css'
    },
    watch: {
      files: [
        'index.html',
        'lib/*',
        'lib/**/*',
        'less/*',
        'img/*'
      ],
      tasks: [
        'exec:clear',
        'jshint',
        'less',
        'concat',
        'clean:less',
        'clean:images',
        'copy',
        'notify:dev'
      ]
    },
    notify: {
      dev: {
        options: {
          title: 'Development',
          message: 'Files ready...'
        }
      },
      prod: {
        options: {
          title: 'Production',
          message: 'Files ready...'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('default', [
    'jshint',
    'less',
    'concat',
    'cssmin',
    'uglify',
    'clean',
    'copy',
    'htmlmin',
    // 'imageoptim',
    'notify:prod'
  ]);

};
