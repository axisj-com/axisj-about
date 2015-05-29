﻿module.exports = function(grunt) {
  // sample code 빌드
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				stripBanners: true,
				separator: '\n\n',
				banner: '<!DOCTYPE html>\n<!-- \n' +
				' <%= pkg.name %> - v<%= pkg.version %> \n' +
				' publish date : <%= grunt.template.today("yyyy-mm-dd") %> \n' +
				'-->\n',
				separator: '\n\n<!-- split -->\n\n'
			},
            core: {
				src: [
					'samples/layout/head.html',
					'samples/layout/visual-dom.html',
					'samples/axisj/core/*.html',
					'samples/axisj/css/*.html',
					'samples/layout/bottom.html'
				],
				dest: 'samples/index.html'
			}
		},
		watch: {
            core: {
                files: ['samples/ax5/util/*.html', 'samples/ax5/dom/*.html', 'samples/ax5/xhr/*.html'],
                tasks: ['concat:core', 'replace:core']
            }
		},
        replace: {
            core: {
                src: ['samples/index.html'],
                overwrite: true,                 // overwrite matched source files
                options: {
                    processTemplates: false
                },
                replacements: [{
                    from: /<pre[^>]*>([^<]*(?:(?!<\/?pre)<[^<]*)*)<\/pre\s*>/gi,
                    to: function (matchedWord, index, fullText, regexMatches) {
                        if(regexMatches.join('').substr(0, 9) == "$noscript"){
                            return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/\$noscript\$/g, "").replace(/</g, "&lt;") +'</pre>';
                        }else{
                            return '<pre class="prettyprint linenums">'+ regexMatches.join('').replace(/</g, "&lt;") +'</pre>' + '<h4>Result</h4>' + regexMatches.join('');
                        }
                    }
                }]
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-text-replace');
    
	grunt.registerTask('axisj-core', ['concat:core','replace:core','watch:core']);
    //grunt.registerTask('ax5-css', ['concat:css','replace:css','watch:css']);
    //grunt.registerTask('ax5-ui-class', ['concat:ui_class','replace:ui_class','watch:ui_class']);
};