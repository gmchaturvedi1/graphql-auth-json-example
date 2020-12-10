import path from 'path'

var mammoth = require('mammoth')

// function getPngDimensions (base64) {
//   const header = atob(base64.slice(0, 50)).slice(16, 24)
//   const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
//   const dataView = new DataView(uint8.buffer)

//   return {
//     width: dataView.getInt32(0),
//     height: dataView.getInt32(4)
//   }
// }

var options1 = {
  convertImage: mammoth.images.imgElement(async function (image) {
    //  const a = image.read()

    return image.read('base64').then(async function (imageBuffer) {
      //  var dimensions = await sizeOf(imageBuffer);
      // console.log(dimensions.width, dimensions.height);

      // fs.writeFile( path.join( __dirname, '../../img/image.emf' ), imageBuffer, { encoding: 'base64' }, function ( err ) {
      //     console.log( 'File created' );
      // } );

      // var bitmap = new Buffer( imageBuffer, 'base64' );
      // fs.writeFileSync( path.join( __dirname, '../../img/image.emf' ), bitmap );

      return {
        src: 'data:' + image.contentType + ';base64,' + imageBuffer
        // style: `max-height:100px;width:50px;`
      }
    })
  })
}

/* GET users listing. */
const uploadQ = async file => {
  // if (req.body.key != 'PandaSoftwares-z2BSqrSJGS') {
  //   res.status(401)
  //   res.json({
  //     success: false,
  //     message: 'Not Authorised!'
  //   })
  // }
  // else {
  // res.sendFile(__dirname + '/public/index.html');
  // var x = processFile('MathPaper.docx');
  // res.header( "Access-Control-Allow-Origin", "*" );
  // res.header( "Access-Control-Allow-Headers", "X-Requested-With" );
  // var response = {};
  /**
     * Processing the docx file
     * @type {String}
     */
  const result = await mammoth.convertToHtml(
    {
      // path: "public/MathPaper.docx"
      path: path.join(__dirname, '../../uploads/') + file
    },
    options1
  )
  var html = result.value // The generated HTML
  //console.log(html)
  var messages = result.messages // Any messages, such as warnings during conversion
  // console.log( html );
  console.log(messages);
  const htmlArr = html
    .split('<p>')
    .join('')
    .split('</p>')
  //   console.log( htmlArr )
  var matchCriteria = {
    startWith: {
      mcq: '[Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',

      paragraph: '^[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      option: '(?:[a-zA-Z]{1})[)]',
      ans: '[A][N][S][:]',
      type: '[t][y][p][e][:]',
      sol: '[S][O][L][N][:]',
      mp: '[m][p][:]',
      mn: '[m][n][:]',
      sol: '[S][O][L][N][:]',
      essay: '^[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'
    },
    contains: {
      mcq: '[Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
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
    startWithForMatch: {
      mcq: '(^[^(]*)[Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      ans: '^[$][:]',
      ans: '[A][N][S][:]',
      type: '[t][y][p][e][:]',
      sol: '[S][O][L][N][:]',
      mp: '[m][p][:]',
      mn: '[m][n][:]',
      paragraph: '^[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      option: '^(?:[a-zA-Z]{1})[)]',
      solution: '^[@][:]',
      essay: '^[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]'
    },
    notStartWith: {
      option: '/^[(]/'
    },
    raiseError: [
      // MCQ
      // Spaces in between
      '[Qq][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]',
      // missed .
      '[Qq](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed number
      '[Qq][.](?:)[)]',
      // missed )
      '[Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})',

      // PARAGRAPH
      // Spaces in between
      '[Pp][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[-][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]',
      // missed .
      '[Pp](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed -
      '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed .first num
      '[Pp][.](?:)[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed second num
      '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:)[)]',
      // missed )
      '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})',
      // missed P
      '[.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[-](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // single number in (without - and second number)
      '[Pp][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',

      // ESSAYS
      // Spaces in between
      '[Ee][ ]{0,1}[.][ ]{0,1}[Qq][ ]{0,1}[.][ ]{0,1}(?:[0-9]{1}|[0-9]{2}|[0-9]{3})[ ]{0,1}[)]',
      // missed first .
      '[Ee][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed second .
      '[Ee][.][Qq](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed E
      '[.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed Q
      '[Ee][.][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})[)]',
      // missed number
      '[Ee][.][Qq][.](?:)[)]',
      // missed )
      '[Ee][.][Qq][.](?:[0-9]{1}|[0-9]{2}|[0-9]{3})',

      // OPTIONS
      // Spaces or any char in between
      '(?:[a-zA-Z]{1})[ S]{0,1}[)]',

      // SOLUTIONS
      // Spaces in between
      '[@][ ]{0,1}[:]',
      '[A][N][S][ ]{0,1}[:]',
      '[t][y][p][e][ ]{0,1}[:]',
      '[S][O][L][N][ ]{0,1}[:]',
      '[m][p][ ]{0,1}[:]',
      '[m][n][ ]{0,1}[:]'
    ]
  }
  const docErrors = []
  const errorCodes = {
    option: 'option seperator placement error',
    seperator: {
      mcq: 'MCQ format issue',
      paragraph: 'paragraph question format issue',
      essay: 'essay question format issue',
      option: 'option format issue',
      solution: 'solution format issue'
    },
    uncategorised: 'other error'
  }
  const questions = []
  const paraQues = []
  const fixes = []

  let tempQues = {}
  const tempParaQues = {}
  /* to manage multiple line fields - options: M, P, O, S, I */
  let tempLastLineType = ''
  /* var to manage mutilne [H] support */
  let tempHfound = false
  let questionType = '' // q,p,m
  const paraQuestNum = []
  for (var i = 0; i < htmlArr.length; i++) {
    const tempStr = htmlArr[i].toString().trim()

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

    if (tempStr.match(matchCriteria.startWithForMatch.essay)) {
      /* Essay type question */
      const tempLastLineType = 'p'
      // console.log( questionType )
      /* Pushng temp Objects */
      if (questionType == 'm') {
        if (!isObjectEmpty(tempQues)) {
          questions.push(tempQues)
        }
      } else if (questionType == 'p') {
        if (!isObjectEmpty(tempQues)) {
          delete tempQues.type
          tempParaQues.questions.push(tempQues)
        }
        // paraQues.push(tempParaQues);
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
      }
      const matchStr = tempStr.match(matchCriteria.startWith.essay).toString()
      // console.log( tempQues )

      // tempQues.qtitle = {
      //     english: null,
      //     hindi: null
      // };
      tempQues.ans = {
        english: null,
        hindi: null
      }
      tempQues.options = []
      // tempQues.solution = {
      //     english: null,
      //     hindi: null
      // };

      tempQues.number = parseInt(
        matchStr
          .split('E.Q.')
          .join('')
          .split('e.q.')
          .join('')
          .split(')')
          .join('')
      )
      // console.log( tempStr.match( matchCriteria.startWith.solution ), tempStr.match( matchCriteria.startWith.ans ) )

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()

      if (eText.indexOf('[H]') > -1) {
        tempHfound = true
        tempQues.qtitle.english = eText.split('[H]')[0]
        tempQues.qtitle.hindi = eText.split('[H]')[1]
      } else {
        tempHfound = false
        tempQues.qtitle.english = eText.split('[H]').join('')
      }
      if (questionType == 'p' && paraQuestNum.indexOf(tempQues.number) > -1) {
        // console.log("of Paragaraph:");
      } else {
        questionType = 'm'
      }
    } else if (tempStr.match(matchCriteria.startWithForMatch.mcq)) {
      /* MCQ Question - string starts with [Q.1) ] */
      const tempLastLineType = 'M'
      /* Pushng temp Objects */
      if (questionType == 'm') {
        if (!isObjectEmpty(tempQues)) {
          questions.push(tempQues)
        }
      } else if (questionType == 'p') {
        if (!isObjectEmpty(tempQues)) {
          delete tempQues.type
          tempParaQues.questions.push(tempQues)
        }
        // paraQues.push(tempParaQues);
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
      }
      const matchStr = tempStr.match(matchCriteria.startWith.mcq).toString()
      //  ansStr = tempStr.match( matchCriteria.startWith.ans ).toString();

      // tempQues.type = 'MCQ';
      // tempQues.qtitle = {
      //     english: null,
      //     hindi: null
      // };
      tempQues.options = []
      // tempQues.solution = {
      //     english: null,
      //     hindi: null
      // };

      tempQues.number = parseInt(
        matchStr
          .split('Q.')
          .join('')
          .split('q.')
          .join('')
          .split(')')
          .join('')
      )
      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
      //  var ansText = tempStr.split( ansStr ).join( '' ).toString();

      // console.log( ansText )

      if (eText.indexOf('[H]') > -1) {
        const tempHfound = true
        tempQues.qtitle.english = eText.split('[H]')[0]
        tempQues.qtitle.hindi = eText.split('[H]')[1]
      } else {
        const tempHfound = false
        tempQues.qtitle.english = eText.split('[H]').join('')
      }
      if (questionType == 'p' && paraQuestNum.indexOf(tempQues.number) > -1) {
        // console.log("of Paragaraph:");
      } else {
        questionType = 'm'
      }
    } else if (tempStr.match(matchCriteria.startWithForMatch.paragraph)) {
      /* Paragraph Question - string starts with [P. 1-5) ] */
      const tempLastLineType = 'P'
      /* Pushng temp Objects */
      if (questionType == 'm') {
        if (!isObjectEmpty(tempQues)) {
          questions.push(tempQues)
        }
        if (!isObjectEmpty(tempParaQues)) {
          paraQues.push(tempParaQues)
        }
      } else if (questionType == 'p') {
        if (!isObjectEmpty(tempQues)) {
          delete tempQues.type
          tempParaQues.questions.push(tempQues)
        }
        if (!isObjectEmpty(tempParaQues)) {
          paraQues.push(tempParaQues)
        }
      }
      const paraQuestNum = []
      const tempParaQues = {}
      const tempQues = {}
      const matchStr = tempStr.match(matchCriteria.startWith.paragraph).toString()
      var startQues = parseInt(
        matchStr
          .split('-')[0]
          .split('P.')
          .join('')
          .split('p.')
          .join('')
      )
      var endQues = parseInt(
        matchStr
          .split('-')[1]
          .split(')')
          .join('')
      )
      for (var j = startQues; j <= endQues; j++) {
        paraQuestNum.push(j)
      }
      questionType = 'p'
      tempParaQues.type = 'PARAGRAPH'
      tempParaQues.numberofQuestions = paraQuestNum.length
      tempParaQues.para_text = {}
      tempParaQues.questions = []
      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
      if (eText.indexOf('[H]') > -1) {
        tempHfound = true
        tempParaQues.para_text.english = eText.split('[H]')[0]
        tempParaQues.para_text.hindi = eText.split('[H]')[1]
      } else {
        tempHfound = false
        tempParaQues.para_text.english = eText
          .split('[H]')
          .join('')
          .trim()
      }
      /* Push para questions numbers */
    } else if (
      tempStr.match(matchCriteria.startWithForMatch.option) &&
      !tempStr.match(matchCriteria.notStartWith.option)
    ) {
      /* Options of Questions - string starts with [a) ] */
      // console.log('found option');
      // console.log(tempStr.match(matchCriteria.startWithForMatch.option));
      // console.log(!tempStr.match(matchCriteria.notStartWith.option));

      tempLastLineType = 'O'
      const matchStr = tempStr.match(matchCriteria.startWith.option).toString()
      var key = matchStr
        .split(')')
        .join('')
        .trim()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      // var tempEObj = {};
      // var tempHObj = {};
      if (eText.indexOf('[H]') > -1) {
        tempHfound = true
        // tempEObj.key = key;
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
          })
        } else {
          tempQues.options.push({
            english: eText.split('[H]')[0].trim(),
            hindi: eText.split('[H]')[1].trim()
          })
        }
      } else {
        tempHfound = false
        // tempEObj.key = key;
        // tempEObj.value = eText.split('[H]').join('').trim();
        // tempQues.english.options.push(tempEObj);
        if (tempQues.options == 'undefined' || typeof tempQues.options === 'undefined') {
          // error here
          docErrors.push({
            lineNumber: i + 1,
            lineContent: tempStr.trim(),
            errCode: errorCodes.option
          })
        } else {
          tempQues.options.push({
            english: eText
              .split('[H]')
              .join('')
              .trim(),
            hindi: null
          })
        }
      }
    } else if (tempStr.match(matchCriteria.contains.ans)) {
      //  let matchStr = tempStr.match( matchCriteria.contains.ans ).toString();

      //  console.log( matchStr )

      const matchStr = tempStr.match(matchCriteria.startWith.ans).toString()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      tempQues.ans = eText.replace(/<[^>]*>/g, '').trim()
    } else if (tempStr.match(matchCriteria.contains.type)) {
      //  let matchStr = tempStr.match( matchCriteria.contains.ans ).toString();

      //  console.log( matchStr )

      const matchStr = tempStr.match(matchCriteria.startWith.type).toString()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      tempQues.type = eText.replace(/<[^>]*>/g, '').trim()
    } else if (tempStr.match(matchCriteria.contains.mp)) {
      //   mp = tempStr.match( matchCriteria.contains.mp ).toString();
      //                mn = tempStr.match( matchCriteria.contains.mn ).toString();
      // tempHfound = false;
      //                    console.log( 'ans' )
      const matchStr = tempStr.match(matchCriteria.startWith.mp).toString()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      tempQues.mp = eText.replace(/<[^>]*>/g, '').trim()
    } else if (tempStr.match(matchCriteria.contains.mn)) {
      //  mn = tempStr.match( matchCriteria.contains.mn ).toString();
      const matchStr = tempStr.match(matchCriteria.startWith.mn).toString()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      tempQues.mn = eText.replace(/<[^>]*>/g, '').trim()
    } else if (tempStr.match(matchCriteria.startWithForMatch.solution)) {
      /* Solution of Questions - string starts with [@: ] */
      //                console.log( 'ans' )
      tempLastLineType = 'S'
      const matchStr = tempStr.match(matchCriteria.startWith.solution).toString()

      var eText = tempStr
        .split(matchStr)
        .join('')
        .toString()
        .trim()
      if (eText.indexOf('[H]') > -1) {
        tempHfound = true
        tempQues.solution.english = eText.split('[H]')[0].trim()
        tempQues.solution.hindi = eText.split('[H]')[1].trim()
      } else {
        tempHfound = false
        tempQues.solution.english = eText
          .split('[H]')
          .join('')
          .trim()
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
    } else {
      /* None of above - meaning new line  or some other character encountered */

      /* If criteria appears in the middle of the string */
      if (tempStr.match(matchCriteria.contains.mcq)) {
        const matchStr = tempStr.match(matchCriteria.contains.mcq).toString()
        const eText = tempStr.split(matchStr)[1]
        fixes.push({
          lineNumber: i + 1,
          content: tempStr,
          type: 'question',
          match: matchStr,
          usedContent: eText
        })
        htmlArr[i] = matchStr + eText
        i--
        continue
      } else if (tempStr.match(matchCriteria.contains.paragraph)) {
        const matchStr = tempStr.match(matchCriteria.contains.paragraph).toString()
        const eText = tempStr.split(matchStr)[1]
        fixes.push({
          lineNumber: i + 1,
          content: tempStr,
          type: 'paragraph',
          match: matchStr,
          usedContent: eText
        })
        htmlArr[i] = matchStr + eText
        i--
        continue
      } else if (tempStr.match(matchCriteria.contains.option)) {
        // do only if there is '(' before the matched string of option
        const substrObt = tempStr.substring(0, tempStr.match(matchCriteria.contains.option).index)
        if (substrObt.indexOf('(') < 0) {
          const matchStr = tempStr.match(matchCriteria.contains.option).toString()
          const eText = tempStr.split(matchStr)[1]
          fixes.push({
            lineNumber: i + 1,
            content: tempStr,
            type: 'option',
            match: matchStr,
            usedContent: eText
          })
          htmlArr[i] = matchStr + eText
          i--
          continue
        }
      } else if (tempStr.match(matchCriteria.contains.solution)) {
        const matchStr = tempStr.match(matchCriteria.contains.solution).toString()
        const eText = tempStr.split(matchStr)[1]
        fixes.push({
          lineNumber: i + 1,
          content: tempStr,
          type: 'solution',
          match: matchStr,
          usedContent: eText
        })
        htmlArr[i] = matchStr + eText
        i--
        continue
      }
      /** IF MATCH not fount at start and in middle
             * CHECK FOR typing ERRORS in document HERE */
      for (const matchError in matchCriteria.raiseError) {
        if (tempStr.match(matchCriteria.raiseError[matchError])) {
          // Match - check if something present before match in line
          if (isValidMatch(tempStr, tempStr.match(matchCriteria.raiseError[matchError]).index)) {
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
              errKey = 'mcq'
            } else if (matchError >= 4 && matchError <= 11) {
              errKey = 'paragraph'
            } else if (matchError >= 12 && matchError <= 18) {
              errKey = 'essay'
            } else if (matchError == 19) {
              errKey = 'option'
            } else if (matchError == 20) {
              errKey = 'solution'
            }
            docErrors.push({
              lineNumber: i + 1,
              lineContent: tempStr.trim(),
              errCode: errorCodes.seperator[errKey]
            })
            break
          }
        }
      }

      /* APPEND as New line to last line */
      if (tempLastLineType == 'M' || tempLastLineType == 'I') {
        /* Append in qtitle */
        var eText = tempStr.trim()
        if (eText.indexOf('[H]') > -1) {
          tempQues.qtitle.english += ' <br/>' + eText.split('[H]')[0].trim()
          tempQues.qtitle.hindi += ' <br/>' + eText.split('[H]')[1].trim()
        } else if (tempHfound) {
          tempQues.qtitle.hindi +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        } else {
          tempQues.qtitle.english +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        }
      } else if (tempLastLineType == 'P') {
        /* Append in para title */
        var eText = tempStr.trim()
        if (eText.indexOf('[H]') > -1) {
          tempParaQues.para_text.english += ' <br/>' + eText.split('[H]')[0].trim()
          tempParaQues.para_text.hindi += ' <br/>' + eText.split('[H]')[1].trim()
        } else if (tempHfound) {
          tempParaQues.para_text.hindi +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        } else {
          tempParaQues.para_text.english +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        }
      } else if (tempLastLineType == 'O') {
        // if options dne - push to errors
        if (tempQues.options == 'undefined' || typeof tempQues.options === 'undefined') {
          // error here
          docErrors.push({
            lineNumber: i + 1,
            lineContent: tempStr.trim(),
            errCode: errorCodes.option
          })
        } else {
          var lastOpt = tempQues.options.length - 1
          /* Append in options */
          var eText = tempStr.trim()
          if (eText.indexOf('[H]') > -1) {
            tempQues.options[lastOpt].english += ' <br/>' + eText.split('[H]')[0].trim()
            tempQues.options[lastOpt].hindi += ' <br/>' + eText.split('[H]')[1].trim()
          } else if (tempHfound) {
            tempQues.options[lastOpt].hindi +=
              ' <br/>' +
              eText
                .split('[H]')
                .join('')
                .trim()
          } else {
            //    tempQues.options[lastOpt]['english'] += ' <br/>' + eText.split( '[H]' ).join( '' ).trim();
          }
        }
      } else if (tempLastLineType == 'S') {
        /* Append in solution */
        var eText = tempStr.trim()
        if (eText.indexOf('[H]') > -1) {
          tempQues.solution.english += ' <br/>' + eText.split('[H]')[0].trim()
          tempQues.solution.hindi += ' <br/>' + eText.split('[H]')[1].trim()
        } else if (tempHfound) {
          tempQues.solution.hindi +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        } else {
          tempQues.solution.english +=
            ' <br/>' +
            eText
              .split('[H]')
              .join('')
              .trim()
        }
      } else {
        // console.log('UNCATEGORISED LINE: ' + tempStr.trim());
        // error here
        docErrors.push({
          lineNumber: i + 1,
          lineContent: tempStr.trim(),
          errCode: errorCodes.uncategorised
        })
        // break;
      }
    }
  }

  /* Pushng last temp Objects */
  if (questionType == 'm') {
    if (!isObjectEmpty(tempQues)) {
      questions.push(tempQues)
    }
  } else if (questionType == 'p') {
    if (!isObjectEmpty(tempQues)) {
      delete tempQues.type
      tempParaQues.questions.push(tempQues)
    }
  }
  if (!isObjectEmpty(tempParaQues)) {
    paraQues.push(tempParaQues)
  }
  if (docErrors.length <= 0) {
    // res.status( 200 );
    return {
      // data: html,
      // dataProcessed: response,
      success: true,
      questions: questions.concat(paraQues),
      fixes: fixes
    }
  } else {
    // res.status( 400 );
    return {
      success: false,
      questions: questions.concat(paraQues),
      fixes: fixes,
      errors: docErrors
    }
  }

  // console.log(x);
  // res.json({
  //   data: x
  // })
  // }
}

function isObjectEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false
  }

  return true
}

function isValidMatch(tempStr, matchIndex) {
  const regexToMatch = '(?:[ ]*<.*>[ ]*)'
  const substrObt = tempStr.substring(0, matchIndex)
  const tempSubstrObt = tempStr.substring(0, matchIndex)
  // console.log('---> validating match START');
  // console.log(tempStr, matchIndex);
  // console.log(substrObt);
  // while ( true ) {
  //     // console.log(">> " + tempSubstrObt);
  //     if ( tempSubstrObt.match( regexToMatch ) ) {
  //         let matchedString = tempSubstrObt.match( regexToMatch ).toString();
  //         // console.log(tempSubstrObt.match(regexToMatch));
  //         // console.log(/([ ]*\<.*\>[ ]*)/.test(tempSubstrObt));
  //         // console.log('MATCHED: ' + matchedString);
  //         // console.log(tempSubstrObt.split(matchedString));
  //         let tempSubstrObt = tempSubstrObt.split( matchedString ).join( '' );
  //     } else {
  //         break;
  //     }
  // }
  // console.log(">> " + tempSubstrObt);

  // console.log('---> validating match END');
  if (tempSubstrObt.length) {
    return false
  }
  return true
}

export default uploadQ
