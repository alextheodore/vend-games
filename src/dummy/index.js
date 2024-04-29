import LogoCircle from '../assets/logo-circle.png';
export const dummyData = [
  {
    no: 1,
    question: "Apa kepanjangan dari BRI?",
    picture: LogoCircle,
    // incorrectAnswer: ["Bank Remaja Indonesia", "Bank Republik Indonesia"],
    // // correctAnswer: "Bank Rakyat Indonesia",
    answer: [
      { answer: "Bank Remaja Indonesia", status: false },
      { answer: "Bank Rakyat Indonesia", status: true },
      { answer: "Bank Republik Indonesia", status: false },
    ],
  },
  {
    no: 2,
    question: "Apa nama Mobile Banking yang disediakan BRI?",
    answer: [
      { answer: "BRITAMA", status: false },
      { answer: "BRIMO", status: true },
      { answer: "BRIZZI", status: false },
    ],
  },
  {
    no: 3,
    question: "Apa nama produk uang elektronik BRI?",
    answer: [
      { answer: "BRIZZI", status: false },
      { answer: "BRITAMA", status: true },
      { answer: "BRIMO", status: false },
    ],
  },
  {
    no: 4,
    question: "Nomor call center BRI adalah 1500017?",
    answer: [
      { answer: "BENAR", status: true },
      { answer: "SALAH", status: false },
    ],
  },
  {
    no: 5,
    question: "Slogan BRI adalah 'Melayani dengan setulus hati?'",
    answer: [
      { answer: "BENAR", status: true },
      { answer: "SALAH", status: false },
    ],
  },
];
