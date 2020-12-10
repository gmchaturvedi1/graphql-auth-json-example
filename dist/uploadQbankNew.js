"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var mammoth = require('mammoth'); // function getPngDimensions (base64) {
//   const header = atob(base64.slice(0, 50)).slice(16, 24)
//   const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
//   const dataView = new DataView(uint8.buffer)
//   return {
//     width: dataView.getInt32(0),
//     height: dataView.getInt32(4)
//   }
// }


var options1 = {
  convertImage: mammoth.images.imgElement( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(image) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", image.read('base64').then( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(imageBuffer) {
                  return _regenerator.default.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          return _context.abrupt("return", {
                            src: 'data:' + image.contentType + ';base64,' + imageBuffer // style: `max-height:100px;width:50px;`

                          });

                        case 1:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }())
};
/* GET users listing. */

var uploadQ = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(file) {
    var _startWith, _startWithForMatch;

    var result, html, messages, htmlArr, matchCriteria, docErrors, errorCodes, questions, paraQues, fixes, tempQues, tempParaQues, tempLastLineType, tempHfound, questionType, paraQuestNum, i, tempStr, _tempLastLineType, matchStr, eText, _tempLastLineType2, _matchStr, _tempHfound, _tempHfound2, _tempLastLineType3, _paraQuestNum, _tempParaQues, _tempQues, _matchStr2, startQues, endQues, j, _matchStr3, key, _matchStr4, _matchStr5, _matchStr6, _matchStr7, _matchStr8, _matchStr9, _eText, _matchStr10, _eText2, substrObt, _matchStr11, _eText3, _matchStr12, _eText4, matchError, lastOpt;

    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return mammoth.convertToHtml({
              // path: "public/MathPaper.docx"
              path: _path.default.join(__dirname, '../../uploads/') + file
            }, options1);

          case 2:
            result = _context3.sent;
            html = result.value; // The generated HTML
            // console.log(html)

            messages = result.messages; // Any messages, such as warnings during conversion
            // console.log( html );

            console.log(messages);
            htmlArr = html.split('<p>').join('').split('</p>'); //   console.log( htmlArr )

            matchCriteria = {
              startWith: (_startWith = {
                mcq: '[ [ ][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ] ]',
                paragraph: '^[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
                option: '(?:[a-zA-Z]{1})[)]',
                ans: '[A][N][S][:]',
                type: '[t][y][p][e][:]',
                sol: '[S][O][L][N][:]',
                mp: '[m][p][:]',
                mn: '[m][n][:]'
              }, (0, _defineProperty2.default)(_startWith, "sol", '[S][O][L][N][:]'), (0, _defineProperty2.default)(_startWith, "essay", '^[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'), _startWith),
              contains: {
                mcq: '[ [ ][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ] ]',
                ans: '[A][N][S][:]',
                type: '[t][y][p][e][:]',
                sol: '[S][O][L][N][:]',
                mp: '[m][p][:]',
                mn: '[m][n][:]',
                paragraph: '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
                option: '(?:[a-zA-Z]{1})[)]',
                solution: '[@][:]',
                essay: '[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'
              },

              /* Only to be used when sorting into they type or for matching */
              startWithForMatch: (_startWithForMatch = {
                mcq: '[ [ ][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ] ]',
                ans: '^[$][:]'
              }, (0, _defineProperty2.default)(_startWithForMatch, "ans", '[A][N][S][:]'), (0, _defineProperty2.default)(_startWithForMatch, "type", '[t][y][p][e][:]'), (0, _defineProperty2.default)(_startWithForMatch, "sol", '[S][O][L][N][:]'), (0, _defineProperty2.default)(_startWithForMatch, "mp", '[m][p][:]'), (0, _defineProperty2.default)(_startWithForMatch, "mn", '[m][n][:]'), (0, _defineProperty2.default)(_startWithForMatch, "paragraph", '^[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'), (0, _defineProperty2.default)(_startWithForMatch, "option", '^(?:[a-zA-Z]{1})[)]'), (0, _defineProperty2.default)(_startWithForMatch, "solution", '^[@][:]'), (0, _defineProperty2.default)(_startWithForMatch, "essay", '^[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'), _startWithForMatch),
              notStartWith: {
                option: '/^[(]/'
              },
              raiseError: [// MCQ
              // Spaces in between
              '[Qq][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]', // missed .
              '[Qq](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed number
              '[Qq][.](?:)[)]', // missed )
              '[Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})', // PARAGRAPH
              // Spaces in between
              '[Pp][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[-][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]', // missed .
              '[Pp](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed -
              '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed .first num
              '[Pp][.](?:)[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed second num
              '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:)[)]', // missed )
              '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})', // missed P
              '[.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // single number in (without - and second number)
              '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // ESSAYS
              // Spaces in between
              '[Ee][ ]{0,1}[.][ ]{0,1}[Qq][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]', // missed first .
              '[Ee][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed second .
              '[Ee][.][Qq](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed E
              '[.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed Q
              '[Ee][.][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]', // missed number
              '[Ee][.][Qq][.](?:)[)]', // missed )
              '[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})', // OPTIONS
              // Spaces or any char in between
              '(?:[a-zA-Z]{1})[ S]{0,1}[)]', // SOLUTIONS
              // Spaces in between
              '[@][ ]{0,1}[:]', '[A][N][S][ ]{0,1}[:]', '[t][y][p][e][ ]{0,1}[:]', '[S][O][L][N][ ]{0,1}[:]', '[m][p][ ]{0,1}[:]', '[m][n][ ]{0,1}[:]']
            };
            docErrors = [];
            errorCodes = {
              option: 'option seperator placement error',
              seperator: {
                mcq: 'MCQ format issue',
                paragraph: 'paragraph question format issue',
                essay: 'essay question format issue',
                option: 'option format issue',
                solution: 'solution format issue'
              },
              uncategorised: 'other error'
            };
            questions = [];
            paraQues = [];
            fixes = [];
            tempQues = {};
            tempParaQues = {};
            /* to manage multiple line fields - options: M, P, O, S, I */

            tempLastLineType = '';
            /* var to manage mutilne [H] support */

            tempHfound = false;
            questionType = ''; // q,p,m

            paraQuestNum = [];
            i = 0;

          case 20:
            if (!(i < htmlArr.length)) {
              _context3.next = 155;
              break;
            }

            tempStr = htmlArr[i].toString().trim();
            /* FOR debugging: */
            // console.log( tempStr );

            /**
                 * MCQ Question - string starts with [Q.1) ]
                 * Paragraph Question -
                 * Options of Questions -
                 * Solution of Questions - string starts with [@: ]
                 * Image -
                 */
            //                console.log( tempStr.match( matchCriteria.startWith.solution ), tempStr.match( matchCriteria.startWith.ans ) )

            if (!tempStr.match(matchCriteria.startWithForMatch.essay)) {
              _context3.next = 35;
              break;
            }

            /* Essay type question */
            _tempLastLineType = 'p'; // console.log( questionType )

            /* Pushng temp Objects */

            if (questionType == 'm') {
              if (!isObjectEmpty(tempQues)) {
                questions.push(tempQues);
              }
            } else if (questionType == 'p') {
              if (!isObjectEmpty(tempQues)) {
                delete tempQues.type;
                tempParaQues.questions.push(tempQues);
              } // paraQues.push(tempParaQues);

            }

            tempQues = {
              qtitle: {
                english: null,
                hindi: null
              },
              solution: {
                english: null,
                hindi: null
              }
            };
            matchStr = tempStr.match(matchCriteria.startWith.essay).toString(); // console.log( tempQues )
            // tempQues.qtitle = {
            //     english: null,
            //     hindi: null
            // };

            tempQues.ans = {
              english: null,
              hindi: null
            };
            tempQues.options = []; // tempQues.solution = {
            //     english: null,
            //     hindi: null
            // };

            tempQues.number = parseInt(matchStr.split('E.Q.').join('').split('e.q.').join('').split(')').join('')); // console.log( tempStr.match( matchCriteria.startWith.solution ), tempStr.match( matchCriteria.startWith.ans ) )

            eText = tempStr.split(matchStr).join('').toString();

            if (eText.indexOf('[H]') > -1) {
              tempHfound = true;
              tempQues.qtitle.english = eText.split('[H]')[0];
              tempQues.qtitle.hindi = eText.split('[H]')[1];
            } else {
              tempHfound = false;
              tempQues.qtitle.english = eText.split('[H]').join('');
            }

            if (questionType == 'p' && paraQuestNum.indexOf(tempQues.number) > -1) {// console.log("of Paragaraph:");
            } else {
              questionType = 'm';
            }

            _context3.next = 152;
            break;

          case 35:
            if (!tempStr.match(matchCriteria.startWithForMatch.mcq)) {
              _context3.next = 47;
              break;
            }

            /* MCQ Question - string starts with [Q.1) ] */
            _tempLastLineType2 = 'M';
            /* Pushng temp Objects */

            if (questionType == 'm') {
              if (!isObjectEmpty(tempQues)) {
                questions.push(tempQues);
              }
            } else if (questionType == 'p') {
              if (!isObjectEmpty(tempQues)) {
                delete tempQues.type;
                tempParaQues.questions.push(tempQues);
              } // paraQues.push(tempParaQues);

            }

            tempQues = {
              qtitle: {
                english: null,
                hindi: null
              },
              solution: {
                english: null,
                hindi: null
              }
            };
            _matchStr = tempStr.match(matchCriteria.startWith.mcq).toString(); //  ansStr = tempStr.match( matchCriteria.startWith.ans ).toString();
            // tempQues.type = 'MCQ';
            // tempQues.qtitle = {
            //     english: null,
            //     hindi: null
            // };

            tempQues.options = []; // tempQues.solution = {
            //     english: null,
            //     hindi: null
            // };

            tempQues.number = parseInt(_matchStr.split('Q.').join('').split('q.').join('').split(')').join(''));
            eText = tempStr.split(_matchStr).join('').toString(); //  var ansText = tempStr.split( ansStr ).join( '' ).toString();
            // console.log( ansText )

            if (eText.indexOf('[H]') > -1) {
              _tempHfound = true;
              tempQues.qtitle.english = eText.split('[H]')[0];
              tempQues.qtitle.hindi = eText.split('[H]')[1];
            } else {
              _tempHfound2 = false;
              tempQues.qtitle.english = eText.split('[H]').join('');
            }

            if (questionType == 'p' && paraQuestNum.indexOf(tempQues.number) > -1) {// console.log("of Paragaraph:");
            } else {
              questionType = 'm';
            }

            _context3.next = 152;
            break;

          case 47:
            if (!tempStr.match(matchCriteria.startWithForMatch.paragraph)) {
              _context3.next = 66;
              break;
            }

            /* Paragraph Question - string starts with [P. 1-5) ] */
            _tempLastLineType3 = 'P';
            /* Pushng temp Objects */

            if (questionType == 'm') {
              if (!isObjectEmpty(_tempQues)) {
                questions.push(_tempQues);
              }

              if (!isObjectEmpty(_tempParaQues)) {
                paraQues.push(_tempParaQues);
              }
            } else if (questionType == 'p') {
              if (!isObjectEmpty(_tempQues)) {
                delete _tempQues.type;

                _tempParaQues.questions.push(_tempQues);
              }

              if (!isObjectEmpty(_tempParaQues)) {
                paraQues.push(_tempParaQues);
              }
            }

            _paraQuestNum = [];
            _tempParaQues = {};
            _tempQues = {};
            _matchStr2 = tempStr.match(matchCriteria.startWith.paragraph).toString();
            startQues = parseInt(_matchStr2.split('-')[0].split('P.').join('').split('p.').join(''));
            endQues = parseInt(_matchStr2.split('-')[1].split(')').join(''));

            for (j = startQues; j <= endQues; j++) {
              _paraQuestNum.push(j);
            }

            questionType = 'p';
            _tempParaQues.type = 'PARAGRAPH';
            _tempParaQues.numberofQuestions = _paraQuestNum.length;
            _tempParaQues.para_text = {};
            _tempParaQues.questions = [];
            eText = tempStr.split(_matchStr2).join('').toString();

            if (eText.indexOf('[H]') > -1) {
              tempHfound = true;
              _tempParaQues.para_text.english = eText.split('[H]')[0];
              _tempParaQues.para_text.hindi = eText.split('[H]')[1];
            } else {
              tempHfound = false;
              _tempParaQues.para_text.english = eText.split('[H]').join('').trim();
            }
            /* Push para questions numbers */


            _context3.next = 152;
            break;

          case 66:
            if (!(tempStr.match(matchCriteria.startWithForMatch.option) && !tempStr.match(matchCriteria.notStartWith.option))) {
              _context3.next = 74;
              break;
            }

            /* Options of Questions - string starts with [a) ] */
            // console.log('found option');
            // console.log(tempStr.match(matchCriteria.startWithForMatch.option));
            // console.log(!tempStr.match(matchCriteria.notStartWith.option));
            tempLastLineType = 'O';
            _matchStr3 = tempStr.match(matchCriteria.startWith.option).toString();
            key = _matchStr3.split(')').join('').trim();
            eText = tempStr.split(_matchStr3).join('').toString().trim(); // var tempEObj = {};
            // var tempHObj = {};

            if (eText.indexOf('[H]') > -1) {
              tempHfound = true; // tempEObj.key = key;
              // tempHObj.key = key;
              // tempEObj.value = eText.split('[H]')[0].trim();
              // tempHObj.value = eText.split('[H]')[1].trim();
              // tempQues.english.options.push(tempEObj);
              // tempQues.hindi.options.push(tempHObj);
              // if options dne - push to errors

              if (tempQues.options == 'undefined' || typeof tempQues.options === 'undefined') {
                // error here
                docErrors.push({
                  lineNumber: i + 1,
                  lineContent: tempStr.trim(),
                  errCode: errorCodes.option
                });
              } else {
                tempQues.options.push({
                  english: eText.split('[H]')[0].trim(),
                  hindi: eText.split('[H]')[1].trim()
                });
              }
            } else {
              tempHfound = false; // tempEObj.key = key;
              // tempEObj.value = eText.split('[H]').join('').trim();
              // tempQues.english.options.push(tempEObj);

              if (tempQues.options == 'undefined' || typeof tempQues.options === 'undefined') {
                // error here
                docErrors.push({
                  lineNumber: i + 1,
                  lineContent: tempStr.trim(),
                  errCode: errorCodes.option
                });
              } else {
                tempQues.options.push({
                  english: eText.split('[H]').join('').trim(),
                  hindi: null
                });
              }
            }

            _context3.next = 152;
            break;

          case 74:
            if (!tempStr.match(matchCriteria.contains.ans)) {
              _context3.next = 80;
              break;
            }

            //  let matchStr = tempStr.match( matchCriteria.contains.ans ).toString();
            //  console.log( matchStr )
            _matchStr4 = tempStr.match(matchCriteria.startWith.ans).toString();
            eText = tempStr.split(_matchStr4).join('').toString().trim();
            tempQues.ans = eText.replace(/<[^>]*>/g, '').trim();
            _context3.next = 152;
            break;

          case 80:
            if (!tempStr.match(matchCriteria.contains.type)) {
              _context3.next = 86;
              break;
            }

            //  let matchStr = tempStr.match( matchCriteria.contains.ans ).toString();
            //  console.log( matchStr )
            _matchStr5 = tempStr.match(matchCriteria.startWith.type).toString();
            eText = tempStr.split(_matchStr5).join('').toString().trim();
            tempQues.type = eText.replace(/<[^>]*>/g, '').trim();
            _context3.next = 152;
            break;

          case 86:
            if (!tempStr.match(matchCriteria.contains.mp)) {
              _context3.next = 92;
              break;
            }

            //   mp = tempStr.match( matchCriteria.contains.mp ).toString();
            //                mn = tempStr.match( matchCriteria.contains.mn ).toString();
            // tempHfound = false;
            //                    console.log( 'ans' )
            _matchStr6 = tempStr.match(matchCriteria.startWith.mp).toString();
            eText = tempStr.split(_matchStr6).join('').toString().trim();
            tempQues.mp = eText.replace(/<[^>]*>/g, '').trim();
            _context3.next = 152;
            break;

          case 92:
            if (!tempStr.match(matchCriteria.contains.mn)) {
              _context3.next = 98;
              break;
            }

            //  mn = tempStr.match( matchCriteria.contains.mn ).toString();
            _matchStr7 = tempStr.match(matchCriteria.startWith.mn).toString();
            eText = tempStr.split(_matchStr7).join('').toString().trim();
            tempQues.mn = eText.replace(/<[^>]*>/g, '').trim();
            _context3.next = 152;
            break;

          case 98:
            if (!tempStr.match(matchCriteria.startWithForMatch.solution)) {
              _context3.next = 105;
              break;
            }

            /* Solution of Questions - string starts with [@: ] */
            //                console.log( 'ans' )
            tempLastLineType = 'S';
            _matchStr8 = tempStr.match(matchCriteria.startWith.solution).toString();
            eText = tempStr.split(_matchStr8).join('').toString().trim();

            if (eText.indexOf('[H]') > -1) {
              tempHfound = true;
              tempQues.solution.english = eText.split('[H]')[0].trim();
              tempQues.solution.hindi = eText.split('[H]')[1].trim();
            } else {
              tempHfound = false;
              tempQues.solution.english = eText.split('[H]').join('').trim();
            }
            /* Remove images = test */
            // } else if (tempStr.match("^[<]img")) {
            //   /* Images - string starts with [<img ] - to be appended with qtitle */
            //   tempLastLineType = 'I';
            //   matchStr = tempStr.match("^[<]img").toString();
            //   var eText = tempStr.trim();
            //   var tempOptLen = tempQues.options.length - 1;
            //   if (tempQues.qtitle.english != null && tempQues.options[tempOptLen]['english'] != null) {
            //     tempQues.qtitle.english += '<br/>' + eText;
            //   }
            //   if (tempQues.qtitle.hindi != null && tempQues.options[tempOptLen]['hindi'] != null) {
            //     tempQues.qtitle.hindi += '<br/>' + eText;
            //   }
            //   // tempQues.image = eText;


            _context3.next = 152;
            break;

          case 105:
            if (!tempStr.match(matchCriteria.contains.mcq)) {
              _context3.next = 114;
              break;
            }

            _matchStr9 = tempStr.match(matchCriteria.contains.mcq).toString();
            _eText = tempStr.split(_matchStr9)[1];
            fixes.push({
              lineNumber: i + 1,
              content: tempStr,
              type: 'question',
              match: _matchStr9,
              usedContent: _eText
            });
            htmlArr[i] = _matchStr9 + _eText;
            i--;
            return _context3.abrupt("continue", 152);

          case 114:
            if (!tempStr.match(matchCriteria.contains.paragraph)) {
              _context3.next = 123;
              break;
            }

            _matchStr10 = tempStr.match(matchCriteria.contains.paragraph).toString();
            _eText2 = tempStr.split(_matchStr10)[1];
            fixes.push({
              lineNumber: i + 1,
              content: tempStr,
              type: 'paragraph',
              match: _matchStr10,
              usedContent: _eText2
            });
            htmlArr[i] = _matchStr10 + _eText2;
            i--;
            return _context3.abrupt("continue", 152);

          case 123:
            if (!tempStr.match(matchCriteria.contains.option)) {
              _context3.next = 134;
              break;
            }

            // do only if there is '(' before the matched string of option
            substrObt = tempStr.substring(0, tempStr.match(matchCriteria.contains.option).index);

            if (!(substrObt.indexOf('(') < 0)) {
              _context3.next = 132;
              break;
            }

            _matchStr11 = tempStr.match(matchCriteria.contains.option).toString();
            _eText3 = tempStr.split(_matchStr11)[1];
            fixes.push({
              lineNumber: i + 1,
              content: tempStr,
              type: 'option',
              match: _matchStr11,
              usedContent: _eText3
            });
            htmlArr[i] = _matchStr11 + _eText3;
            i--;
            return _context3.abrupt("continue", 152);

          case 132:
            _context3.next = 141;
            break;

          case 134:
            if (!tempStr.match(matchCriteria.contains.solution)) {
              _context3.next = 141;
              break;
            }

            _matchStr12 = tempStr.match(matchCriteria.contains.solution).toString();
            _eText4 = tempStr.split(_matchStr12)[1];
            fixes.push({
              lineNumber: i + 1,
              content: tempStr,
              type: 'solution',
              match: _matchStr12,
              usedContent: _eText4
            });
            htmlArr[i] = _matchStr12 + _eText4;
            i--;
            return _context3.abrupt("continue", 152);

          case 141:
            _context3.t0 = _regenerator.default.keys(matchCriteria.raiseError);

          case 142:
            if ((_context3.t1 = _context3.t0()).done) {
              _context3.next = 151;
              break;
            }

            matchError = _context3.t1.value;

            if (!tempStr.match(matchCriteria.raiseError[matchError])) {
              _context3.next = 149;
              break;
            }

            if (!isValidMatch(tempStr, tempStr.match(matchCriteria.raiseError[matchError]).index)) {
              _context3.next = 149;
              break;
            }

            // Valid Match - Provide response
            // console.log('ERROR MATCH LINE: ' + tempStr.trim());
            // console.log('ERROR WITH REGEX: ' + matchError + " : " + matchCriteria.raiseError[matchError]);
            // console.log(tempStr.match(matchCriteria.raiseError[matchError]).toString());
            // console.log(tempStr.match(matchCriteria.raiseError[matchError]).index);
            // error here
            // 4 MCQ 0-3
            // 8 PARAGRAPH 4-11
            // 7 ESSAYS 12-18
            // 1 OPTIONS 19
            // 1 SOLUTIONS 20
            if (matchError >= 0 && matchError <= 3) {
              errKey = 'mcq';
            } else if (matchError >= 4 && matchError <= 11) {
              errKey = 'paragraph';
            } else if (matchError >= 12 && matchError <= 18) {
              errKey = 'essay';
            } else if (matchError == 19) {
              errKey = 'option';
            } else if (matchError == 20) {
              errKey = 'solution';
            }

            docErrors.push({
              lineNumber: i + 1,
              lineContent: tempStr.trim(),
              errCode: errorCodes.seperator[errKey]
            });
            return _context3.abrupt("break", 151);

          case 149:
            _context3.next = 142;
            break;

          case 151:
            /* APPEND as New line to last line */
            if (tempLastLineType == 'M' || tempLastLineType == 'I') {
              /* Append in qtitle */
              eText = tempStr.trim();

              if (eText.indexOf('[H]') > -1) {
                tempQues.qtitle.english += ' <br/>' + eText.split('[H]')[0].trim();
                tempQues.qtitle.hindi += ' <br/>' + eText.split('[H]')[1].trim();
              } else if (tempHfound) {
                tempQues.qtitle.hindi += ' <br/>' + eText.split('[H]').join('').trim();
              } else {
                tempQues.qtitle.english += ' <br/>' + eText.split('[H]').join('').trim();
              }
            } else if (tempLastLineType == 'P') {
              /* Append in para title */
              eText = tempStr.trim();

              if (eText.indexOf('[H]') > -1) {
                tempParaQues.para_text.english += ' <br/>' + eText.split('[H]')[0].trim();
                tempParaQues.para_text.hindi += ' <br/>' + eText.split('[H]')[1].trim();
              } else if (tempHfound) {
                tempParaQues.para_text.hindi += ' <br/>' + eText.split('[H]').join('').trim();
              } else {
                tempParaQues.para_text.english += ' <br/>' + eText.split('[H]').join('').trim();
              }
            } else if (tempLastLineType == 'O') {
              // if options dne - push to errors
              if (tempQues.options == 'undefined' || typeof tempQues.options === 'undefined') {
                // error here
                docErrors.push({
                  lineNumber: i + 1,
                  lineContent: tempStr.trim(),
                  errCode: errorCodes.option
                });
              } else {
                lastOpt = tempQues.options.length - 1;
                /* Append in options */

                eText = tempStr.trim();

                if (eText.indexOf('[H]') > -1) {
                  tempQues.options[lastOpt].english += ' <br/>' + eText.split('[H]')[0].trim();
                  tempQues.options[lastOpt].hindi += ' <br/>' + eText.split('[H]')[1].trim();
                } else if (tempHfound) {
                  tempQues.options[lastOpt].hindi += ' <br/>' + eText.split('[H]').join('').trim();
                } else {//    tempQues.options[lastOpt]['english'] += ' <br/>' + eText.split( '[H]' ).join( '' ).trim();
                }
              }
            } else if (tempLastLineType == 'S') {
              /* Append in solution */
              eText = tempStr.trim();

              if (eText.indexOf('[H]') > -1) {
                tempQues.solution.english += ' <br/>' + eText.split('[H]')[0].trim();
                tempQues.solution.hindi += ' <br/>' + eText.split('[H]')[1].trim();
              } else if (tempHfound) {
                tempQues.solution.hindi += ' <br/>' + eText.split('[H]').join('').trim();
              } else {
                tempQues.solution.english += ' <br/>' + eText.split('[H]').join('').trim();
              }
            } else {
              // console.log('UNCATEGORISED LINE: ' + tempStr.trim());
              // error here
              docErrors.push({
                lineNumber: i + 1,
                lineContent: tempStr.trim(),
                errCode: errorCodes.uncategorised
              }); // break;
            }

          case 152:
            i++;
            _context3.next = 20;
            break;

          case 155:
            /* Pushng last temp Objects */
            if (questionType == 'm') {
              if (!isObjectEmpty(tempQues)) {
                questions.push(tempQues);
              }
            } else if (questionType == 'p') {
              if (!isObjectEmpty(tempQues)) {
                delete tempQues.type;
                tempParaQues.questions.push(tempQues);
              }
            }

            if (!isObjectEmpty(tempParaQues)) {
              paraQues.push(tempParaQues);
            }

            if (!(docErrors.length <= 0)) {
              _context3.next = 161;
              break;
            }

            return _context3.abrupt("return", {
              // data: html,
              // dataProcessed: response,
              success: true,
              questions: questions.concat(paraQues),
              fixes: fixes
            });

          case 161:
            return _context3.abrupt("return", {
              success: false,
              questions: questions.concat(paraQues),
              fixes: fixes,
              errors: docErrors
            });

          case 162:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function uploadQ(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

function isObjectEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
}

function isValidMatch(tempStr, matchIndex) {
  var regexToMatch = '(?:[ ]*<.*>[ ]*)';
  var substrObt = tempStr.substring(0, matchIndex);
  var tempSubstrObt = tempStr.substring(0, matchIndex);

  if (tempSubstrObt.length) {
    return false;
  }

  return true;
}

var _default = uploadQ;
exports.default = _default;