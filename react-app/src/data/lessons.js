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
  ],
  intermediate: [
    {
      id: 'workplace-communication',
      title: '01 Workplace Communication',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',

      vocabulary: [
        { id: 1, word: 'deadline', translation: 'дедлайн / кінцевий термін', img: 'https://cdn-icons-png.flaticon.com/512/2693/2693507.png' },
        { id: 2, word: 'priority', translation: 'пріоритет', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828640.png' },
        { id: 3, word: 'clarify', translation: 'уточнювати', img: 'https://cdn-icons-png.flaticon.com/512/4712/4712035.png' },
        { id: 4, word: 'proposal', translation: 'пропозиція', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
        { id: 5, word: 'feedback', translation: 'відгук / зворотний зв’язок', img: 'https://cdn-icons-png.flaticon.com/512/942/942748.png' },
        { id: 6, word: 'schedule', translation: 'розклад / планувати', img: 'https://cdn-icons-png.flaticon.com/512/747/747310.png' },
        { id: 7, word: 'delay', translation: 'затримка', img: 'https://cdn-icons-png.flaticon.com/512/2088/2088617.png' },
        { id: 8, word: 'approve', translation: 'схвалювати', img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
        { id: 9, word: 'negotiate', translation: 'вести переговори', img: 'https://cdn-icons-png.flaticon.com/512/4207/4207247.png' },
        { id: 10, word: 'requirement', translation: 'вимога', img: 'https://cdn-icons-png.flaticon.com/512/2666/2666505.png' },
        { id: 11, word: 'available', translation: 'доступний / вільний', img: 'https://cdn-icons-png.flaticon.com/512/5610/5610944.png' },
        { id: 12, word: 'update', translation: 'оновлення', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png' },
        { id: 13, word: 'resolve', translation: 'вирішувати', img: 'https://cdn-icons-png.flaticon.com/512/753/753345.png' },
        { id: 14, word: 'consider', translation: 'розглядати', img: 'https://cdn-icons-png.flaticon.com/512/3405/3405802.png' },
        { id: 15, word: 'outcome', translation: 'результат', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135789.png' },
        { id: 16, word: 'brief', translation: 'короткий / інструктаж', img: 'https://cdn-icons-png.flaticon.com/512/942/942799.png' }
      ],

      theory: [
        {
          id: 'polite-requests',
          title: 'Polite Requests',
          type: 'list',
          content: [
            'Could you send me the update by Friday?',
            'Would it be possible to move the meeting to 3 p.m.?',
            'Do you mind clarifying the main requirement?',
            'I was wondering if we could discuss the proposal tomorrow.'
          ],
          info: 'Use Could you / Would it be possible / I was wondering to sound polite and professional.'
        },
        {
          id: 'softening-opinions',
          title: 'Softening Opinions',
          type: 'list',
          content: [
            'I think we should focus on the main priority first.',
            'It seems that the deadline may be difficult to meet.',
            'From my point of view, this outcome is realistic.',
            'Perhaps we could consider another option.'
          ],
          info: 'Intermediate speakers often soften direct opinions with I think, it seems, perhaps, and from my point of view.'
        },
        {
          id: 'meeting-language',
          title: 'Useful Meeting Language',
          type: 'list',
          content: [
            'Let’s go through the agenda.',
            'Could you give us a brief update?',
            'What is the next step?',
            'Let’s agree on the deadline before we finish.'
          ]
        }
      ],

      phrasebook: [
        { id: 101, phrase: 'Could you clarify the main requirement?', translation: 'Не могли б ви уточнити головну вимогу?' },
        { id: 102, phrase: 'I will send you a brief update by the end of the day.', translation: 'Я надішлю вам коротке оновлення до кінця дня.' },
        { id: 103, phrase: 'We need to agree on the deadline.', translation: 'Нам потрібно домовитися про дедлайн.' },
        { id: 104, phrase: 'The proposal looks good, but we need more feedback.', translation: 'Пропозиція виглядає добре, але нам потрібно більше відгуків.' },
        { id: 105, phrase: 'Would it be possible to schedule the meeting for tomorrow?', translation: 'Чи можливо запланувати зустріч на завтра?' },
        { id: 106, phrase: 'This task should be our top priority.', translation: 'Це завдання має бути нашим головним пріоритетом.' },
        { id: 107, phrase: 'There might be a short delay.', translation: 'Може бути невелика затримка.' },
        { id: 108, phrase: 'Let’s consider another option.', translation: 'Давайте розглянемо інший варіант.' },
        { id: 109, phrase: 'Who needs to approve the final version?', translation: 'Хто має схвалити фінальну версію?' },
        { id: 110, phrase: 'What outcome do we expect?', translation: 'Якого результату ми очікуємо?' }
      ],

      practice: [
        {
          id: 201,
          type: 'input',
          question: 'Could you ____ the main requirement?',
          answer: 'clarify'
        },
        {
          id: 202,
          type: 'input',
          question: 'This task is our top ____.',
          answer: 'priority'
        },
        {
          id: 203,
          type: 'constructor',
          translation: 'Чи можливо запланувати зустріч на завтра?',
          steps: [
            { options: ['Would', 'Could', 'Should'], correct: 'Would' },
            { options: ['it be possible', 'it possible be', 'be it possible'], correct: 'it be possible' },
            { options: ['to schedule', 'schedule to', 'scheduling'], correct: 'to schedule' },
            { options: ['the meeting', 'a meet', 'the meet'], correct: 'the meeting' },
            { options: ['for tomorrow', 'on tomorrow', 'at tomorrow'], correct: 'for tomorrow' }
          ]
        },
        {
          id: 204,
          type: 'constructor',
          translation: 'Нам потрібно домовитися про дедлайн.',
          steps: [
            { options: ['We', 'Our', 'Us'], correct: 'We' },
            { options: ['need to', 'need', 'must to'], correct: 'need to' },
            { options: ['agree on', 'agree with', 'agree to'], correct: 'agree on' },
            { options: ['the deadline', 'deadline the', 'a delay'], correct: 'the deadline' }
          ]
        },
        {
          id: 205,
          type: 'input',
          question: 'There might be a short ____.',
          answer: 'delay'
        },
        {
          id: 206,
          type: 'constructor',
          translation: 'Я надішлю коротке оновлення до кінця дня.',
          steps: [
            { options: ['I will', 'I am', 'I do'], correct: 'I will' },
            { options: ['send', 'sent', 'sending'], correct: 'send' },
            { options: ['a brief update', 'briefly update', 'an update brief'], correct: 'a brief update' },
            { options: ['by the end', 'in the end', 'at the end'], correct: 'by the end' },
            { options: ['of the day', 'from the day', 'on the day'], correct: 'of the day' }
          ]
        },
        {
          id: 207,
          type: 'input',
          question: 'Who needs to ____ the final version?',
          answer: 'approve'
        },
        {
          id: 208,
          type: 'constructor',
          translation: 'Давайте розглянемо інший варіант.',
          steps: [
            { options: ['Let’s', 'Lets', 'Let'], correct: 'Let’s' },
            { options: ['consider', 'clarify', 'approve'], correct: 'consider' },
            { options: ['another option', 'other option', 'another outcome'], correct: 'another option' }
          ]
        },
        {
          id: 209,
          type: 'input',
          question: 'What ____ do we expect?',
          answer: 'outcome'
        },
        {
          id: 210,
          type: 'constructor',
          translation: 'Пропозиція виглядає добре, але нам потрібно більше відгуків.',
          steps: [
            { options: ['The proposal', 'The priority', 'The schedule'], correct: 'The proposal' },
            { options: ['looks good', 'look good', 'looks well'], correct: 'looks good' },
            { options: ['but we need', 'but need we', 'and we needs'], correct: 'but we need' },
            { options: ['more feedback', 'many feedbacks', 'more proposal'], correct: 'more feedback' }
          ]
        }
      ]
    }
  ]
};
