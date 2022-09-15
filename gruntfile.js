'use strict'

var path = require('path')

module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json')

    var paths = {
        app: path.join(path.resolve(), '/src'),
        test: path.join(path.resolve(), '/test/**/*.js'),
    }

    var shell = {
        babel: {
            command: 'npx babel src --out-dir dist',
        },
        exec: {
            command: 'node app',
        },
        verpatch: {
            command:
                'npm version --no-git-tag-version patch && git add -A && git commit -a -m "Version Patch Updated"',
        },
        verminor: {
            command:
                'npm version --no-git-tag-version minor && git add -A && git commit -a -m "Version Minor Updated"',
        },
        vermajor: {
            command:
                'npm version --no-git-tag-version major && git add -A && git commit -a -m "Version Major Updated"',
        },
        deploy: {
            command: 'npm publish',
        },
        gitflowrelease: {
            command: 'git flow release start ' + pkg.version,
        },
        gitflowreleasefinish: {
            command: 'git flow release finish -m <%= pkg.version %> ' + pkg.version,
        },
    }

    var clean = {
        src: [
            path.resolve() + '/dist',
            path.resolve() + '/*.log',
            path.resolve() + '/*.txt',
            path.resolve() + '/*.zip',
            path.resolve() + '/*.heapsnapshot',
        ],
    }

    var mochaTest = {
        test: {
            options: {
                reporter: 'spec',
                captureFile: 'results.txt',
                timeout: 60000,
            },
            src: ['<%= paths.test %>'],
        },
    }

    var watch = {
        debug: {
            files: ['<%= paths.app %>/**/*.js', '<%= paths.test %>'],
            tasks: ['compile', 'env:debugtest', 'mochaTest', 'env:debugdev'],
        },
        js: {
            files: ['<%= paths.app %>/**/*.js', '<%= paths.test %>'],
            tasks: ['compile', 'env:test', 'mochaTest', 'env:dev'],
        },
    }
    grunt.initConfig({
        pkg: pkg,
        env: {
            debugdev: {
                NODE_ENV: 'development',
                DEBUG: path.basename(path.resolve()),
            },
            debugtest: {
                NODE_ENV: 'test',
                DEBUG: path.basename(path.resolve()),
            },
            dev: {
                NODE_ENV: 'development',
            },
            test: {
                NODE_ENV: 'test',
            },
        },
        mochaTest: mochaTest,
        shell: shell,
        paths: paths,
        clean: clean,
        watch: watch,
    })

    require('load-grunt-tasks')(grunt)

    grunt.registerTask('compile', ['clean'])

    grunt.registerTask('test', ['env:test', 'compile', 'mochaTest'])
    grunt.registerTask('debug-test', ['env:debugtest', 'compile', 'mochaTest'])

    grunt.registerTask('dev', ['compile', 'env:dev', 'watch:js'])
    grunt.registerTask('debug-dev', ['compile', 'env:debugdev', 'watch:debug'])

    grunt.registerTask('default', ['test', 'env:dev'])

    grunt.registerTask('version', ['shell:verpatch'])
    grunt.registerTask('version:minor', ['shell:verminor'])
    grunt.registerTask('version:major', ['shell:vermajor'])

    grunt.registerTask('build', ['shell:babel'])
    grunt.registerTask('deploy', ['test', 'build', 'shell:deploy'])

    grunt.registerTask('release', ['test', 'build', 'shell:gitflowrelease'])
    grunt.registerTask('release:finish', ['shell:gitflowreleasefinish', 'deploy'])
}
