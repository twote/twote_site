/*global module:false*/

module.exports = function (grunt) {
  'use strict';

  var date       = new Date();
  var timestamp  = Math.floor(date.getTime() / 1000);
  var timestring = [
    date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth(),
    '/',
    date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
    '/',
    date.getFullYear(),
    ' ',
    date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
    ':',
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
    ':',
    date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  ].join('');

  grunt.initConfig({
    meta: {
      version: '0.1.0',
      timestamp: timestamp,
      banner: [
        '/*!',
        ' * twote.io - ' + timestring,
        ' */',
        ''
      ].join('\n')
    },
    exec: {
      clear: {
        command: 'clear',
        stdout: true
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: ['lib/**/*.js']
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
          'lib/main.js'
        ],
        dest: 'build/twote.js'
      }
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
        },
        options: {
          banner: '<%= meta.banner %>'
        }
      }
    },
    jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: {
          'build/index.html': ['index.jade']
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
          'build/index.html': 'build/index.html'
        }
      }
    },
    'regex-replace': {
      html: {
        src: ['build/index.html'],
        actions: [
          {
            name: 'replace with min.css',
            search: 'twote.css',
            replace: 'twote.min.css'
          },
          {
            name: 'replace with min.js',
            search: 'twote.js',
            replace: 'twote.min.js'
          }
        ]
      }
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
      }
    },
    clean: ['build/**/*'],
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
        'clean',
        'jade',
        'less',
        'concat',
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
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-regex-replace');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-devtools');

  grunt.registerTask('default', [
    'jshint',
    'clean',
    'less',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    // 'htmlmin',
    'jade',
    'regex-replace',
    'notify:prod'
  ]);

};
