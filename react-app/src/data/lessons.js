export const lessons = {
  elementary: [
    {
      id: 'saying-hello',
      title: '01 Saying Hello',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2959d43?auto=format&fit=crop&w=1000&q=80',
      
      // 1. СЛОВНИК (VOCABULARY)
      vocabulary: [
        { id: 1, word: 'my', translation: 'мій', img: 'https://cdn-icons-png.flaticon.com/512/1077/1077012.png' },
        { id: 2, word: 'your', translation: 'твій', img: 'https://cdn-icons-png.flaticon.com/512/615/615075.png' },
        { id: 3, word: 'you', translation: 'ти', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' },
        { id: 4, word: 'who', translation: 'хто', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828940.png' },
        { id: 5, word: 'what', translation: 'який', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828940.png' },
        { id: 6, word: 'we', translation: 'ми', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' },
        { id: 7, word: 'they', translation: 'вони', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png' },
        { id: 8, word: 'teacher', translation: 'вчитель', img: 'https://cdn-icons-png.flaticon.com/512/1995/1995531.png' },
        { id: 9, word: 'surname', translation: 'прізвище', img: 'https://cdn-icons-png.flaticon.com/512/2912/2912761.png' },
        { id: 10, word: 'student', translation: 'студент', img: 'https://cdn-icons-png.flaticon.com/512/3541/3541423.png' },
        { id: 11, word: 'she', translation: 'вона', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png' },
        { id: 12, word: 'phone', translation: 'телефон', img: 'https://cdn-icons-png.flaticon.com/512/597/597177.png' },
        { id: 13, word: 'number', translation: 'номер', img: 'https://cdn-icons-png.flaticon.com/512/3505/3505433.png' },
        { id: 14, word: 'profession', translation: 'професія', img: 'https://cdn-icons-png.flaticon.com/512/1063/1063376.png' },
        { id: 15, word: 'it', translation: 'це', img: 'https://cdn-icons-png.flaticon.com/512/2921/2921251.png' },
        { id: 16, word: 'I', translation: 'я', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' },
        { id: 17, word: 'how', translation: 'як', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828940.png' },
        { id: 18, word: 'hobby', translation: 'улюблена справа', img: 'https://cdn-icons-png.flaticon.com/512/2964/2964514.png' },
        { id: 19, word: 'his', translation: 'його', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' },
        { id: 20, word: 'her', translation: 'її', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png' },
        { id: 21, word: 'he', translation: 'він', img: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' },
        { id: 22, word: 'good', translation: 'добре', img: 'https://cdn-icons-png.flaticon.com/512/148/148767.png' },
        { id: 23, word: 'friend', translation: 'друг', img: 'https://cdn-icons-png.flaticon.com/512/2583/2583118.png' },
        { id: 24, word: 'beautiful', translation: 'гарний', img: 'https://cdn-icons-png.flaticon.com/512/1067/1067357.png' }
      ],

      // 2. ТЕОРІЯ (THEORY)
      theory: [
        {
          id: 'alphabet',
          title: 'Alphabet',
          type: 'grid',
          content: [
            { l: 'Aa', t: '[ei]' }, { l: 'Bb', t: '[bi:]' }, { l: 'Cc', t: '[si:]' }, { l: 'Dd', t: '[di:]' },
            { l: 'Ee', t: '[i:]' }, { l: 'Ff', t: '[ef]' }, { l: 'Gg', t: '[dʒi:]' }, { l: 'Hh', t: '[eitʃ]' },
            { l: 'Ii', t: '[ai]' }, { l: 'Jj', t: '[dʒei]' }, { l: 'Kk', t: '[kei]' }, { l: 'Ll', t: '[el]' },
            { l: 'Mm', t: '[em]' }, { l: 'Nn', t: '[en]' }, { l: 'Oo', t: '[ou]' }, { l: 'Pp', t: '[pi:]' },
            { l: 'Qq', t: '[kju:]' }, { l: 'Rr', t: '[a:]' }, { l: 'Ss', t: '[es]' }, { l: 'Tt', t: '[ti:]' },
            { l: 'Uu', t: '[ju:]' }, { l: 'Vv', t: '[vi:]' }, { l: 'Ww', t: '[`dʌbl `ju:]' }, { l: 'Xx', t: '[eks]' },
            { l: 'Yy', t: '[wai]' }, { l: 'Zz', t: '[zed]' }
          ],
          info: 'Alphabet: 26 letters (6 vowels: a, e, i, o, u, y and 20 consonants). Spell – S-P-E-L-L'
        },
        {
          id: 'numbers',
          title: 'Numbers',
          type: 'list',
          content: [
            '1-10: One, two, three, four, five, six, seven, eight, nine, ten',
            '11-12: Eleven, twelve',
            '13-19: base + teen (thirteen, fourteen...)',
            '20-90: base + ty (twenty, thirty...)',
            '100: One hundred'
          ]
        },
        {
          id: 'greetings',
          title: 'Greetings & Farewells',
          type: 'dual_list',
          hi: ['Hello! / Hi!', 'Good morning!', 'Good afternoon!', 'Good evening!'],
          bye: ['Bye! / Goodbye!', 'See you later!', 'Have a nice day!', 'Good luck!']
        }
      ],

      // 3. РОЗМОВНИК (PHRASEBOOK)
      phrasebook: [
        { id: 101, phrase: 'He is twenty years old', translation: 'Йому двадцять років.' },
        { id: 102, phrase: 'We are students', translation: 'Ми студенти.' },
        { id: 103, phrase: 'Good luck!', translation: 'Успіхів!' },
        { id: 104, phrase: 'See you later!', translation: 'До скорого!' },
        { id: 105, phrase: 'It is wrong', translation: 'Це не вірно.' },
        { id: 106, phrase: 'Have a nice day!', translation: 'Гарного дня!' },
        { id: 107, phrase: 'Nice to meet you!', translation: 'Приємно познайомитися!' },
        { id: 108, phrase: 'Good evening!', translation: 'Добрий вечір!' },
        { id: 109, phrase: 'Who are they?', translation: 'Хто вони?' },
        { id: 110, phrase: 'I am a teacher', translation: 'Я вчитель.' },
        { id: 111, phrase: 'How are you?', translation: 'Як справи?' },
        { id: 112, phrase: 'She is a good friend', translation: 'Вона гарна подруга.' },
        { id: 113, phrase: 'Thank you!', translation: 'Спасибі!' }
      ],

      // 4. ПРАКТИКА (PRACTICE)
      practice: [
        {
          id: 201,
          type: 'input',
          question: 'She is ____ years old. (22)',
          answer: 'twenty two'
        },
        {
          id: 202,
          type: 'input',
          question: 'She is ____ (I) friend.',
          answer: 'my'
        },
        {
          id: 203,
          type: 'constructor',
          translation: 'Гарного дня!',
          steps: [
            { options: ['hev', 'have', 'hav'], correct: 'have' },
            { options: ['a nice dei', 'a nace day', 'a nice day'], correct: 'a nice day' }
          ]
        },
        {
          id: 204,
          type: 'constructor',
          translation: 'До побачення!',
          steps: [
            { options: ['Gud', 'Good', 'Gode'], correct: 'Good' },
            { options: ['buy', 'bai', 'bye'], correct: 'bye' }
          ]
        },
        {
          id: 205,
          type: 'input',
          question: 'It ____ (be) nice.',
          answer: 'is'
        },
        {
          id: 206,
          type: 'constructor',
          translation: 'Йому вісім років.',
          steps: [
            { options: ['He', 'His', 'Him'], correct: 'He' },
            { options: ['is', 'are', 'am'], correct: 'is' },
            { options: ['eight', 'eigt', 'ait'], correct: 'eight' }
          ]
        },
        {
          id: 207,
          type: 'input',
          question: 'They ____ (be) students.',
          answer: 'are'
        },
        {
          id: 208,
          type: 'constructor',
          translation: 'Мене звати Пітер.',
          steps: [
            { options: ['My', 'Me', 'I'], correct: 'My' },
            { options: ['name', 'surname', 'phone'], correct: 'name' },
            { options: ['is', 'are', 'am'], correct: 'is' },
            { options: ['Peter', 'Piter', 'Petya'], correct: 'Peter' }
          ]
        },
        {
          id: 209,
          type: 'constructor',
          translation: 'Ти мій друг.',
          steps: [
            { options: ['You', 'Your', 'He'], correct: 'You' },
            { options: ['is', 'are', 'am'], correct: 'are' },
            { options: ['my', 'me', 'mine'], correct: 'my' },
            { options: ['friend', 'student', 'teacher'], correct: 'friend' }
          ]
        },
        {
          id: 210,
          type: 'constructor',
          translation: 'Ваше місце двадцять чотири.',
          steps: [
            { options: ['Your', 'You', 'Youre'], correct: 'Your' },
            { options: ['seat', 'place', 'room'], correct: 'seat' },
            { options: ['is', 'are', 'am'], correct: 'is' },
            { options: ['twenty four', 'twenti for', 'twenty-four'], correct: 'twenty four' }
          ]
        }
      ]
    }
  ]
};