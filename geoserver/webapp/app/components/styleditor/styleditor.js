/*global CodeMirror */
angular.module('gsApp.styleditor', [
  'ui.codemirror',
  'gsApp.styleditor.ysldhinter',
  'gsApp.styleditor.save',
  'gsApp.styleditor.undo',
  'gsApp.styleditor.layers',
  'gsApp.styleditor.font',
  'gsApp.styleditor.size',
  'gsApp.styleditor.color',
  'gsApp.styleditor.icons'
])
.directive('styleEditor', ['$compile', '$sanitize', '$timeout', '$log',
    'YsldHinter',
    function($compile, $sanitize, $timeout, $log, YsldHinter) {
      return {
        restrict: 'EA',
        scope: {
          layer: '=?',
          style: '=',
          markers: '=?',
          editor: '=?'
        },
        templateUrl: '/components/styleditor/styleditor.tpl.html',
        controller: function($scope, $element) {
          $scope.onCodeMirrorLoad = function(editor) {
            $scope.editor = editor;
            editor.on('change', function(cm, change) {
              if ('setValue' == change.origin) {
                $timeout(function() {
                  cm.clearHistory();
                }, 0);
              }
            });
          };

          $scope.codeMirrorOpts = {
            lineWrapping : true,
            lineNumbers: true,
            styleActiveLine: true,
            mode: 'yaml',
            foldGutter: true,
            gutters: ['markers', 'CodeMirror-foldgutter'],
            extraKeys: {
              'Ctrl-Space': function(cm) {
                cm.showHint({
                  hint: function(cm, options) {
                    return YsldHinter.hints(cm, angular.extend(options, {
                      layer: $scope.layer
                    }));
                  }
                });
              },
              'Ctrl-F': function(cm) {
                var pos = cm.getCursor();
                while(pos.line > 0 && cm.isFolded(pos)) {
                  pos = {line: pos.line-1, ch:0};
                }
                cm.foldCode(pos, {
                  rangeFinder: CodeMirror.fold.indent,
                  scanUp: true
                });
              },
              'Tab': function(cm) {
                // replace tabs with spaces
                var spaces =
                  new Array(cm.getOption('indentUnit') + 1).join(' ');
                cm.replaceSelection(spaces);
              }
            },
            tabMode: 'spaces'
          };

          $scope.$watch('markers', function(newVal) {
            $scope.editor.clearGutter('markers');
            if (newVal != null) {
              newVal.forEach(function(mark) {
                var html = '<i class="icon-warning" ' +
                  'popover="' + $sanitize(mark.problem) + '" ' +
                  'popover-placement="left" ' +
                  'popover-trigger="mouseenter" ' +
                  'popover-append-to-body="true"></i>';

                var marker = $compile(html)($scope)[0];
                $scope.editor.setGutterMarker(mark.line, 'markers', marker);
              });
            }
          });
        }
      };
    }])
.run(['$log',
    function($log) {
      CodeMirror.prototype.insertOrReplace = function(value) {
        if (this.somethingSelected()) {
          // replace the selection
          this.replaceSelection(value, 'around');
        }
        else {
          // insert
          this.replaceRange(value, this.getCursor());
        }
      };
    }]);
