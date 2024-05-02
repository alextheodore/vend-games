import LogoCircle from '../assets/logo-circle.png';
import BRIMO from "../assets/brimo.png";
import BRIZZI from "../assets/brizzi.png";
import THANKU from "../assets/thanku.png";
import BRIMelayani from "../assets/brimelayani.png"


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
    picture: BRIMO,
    answer: [
      { answer: "BRITAMA", status: false },
      { answer: "BRIMO", status: true },
      { answer: "BRIZZI", status: false },
    ],
  },
  {
    no: 3,
    question: "Apa nama produk uang elektronik BRI?",
    picture: BRIZZI,
    answer: [
      { answer: "BRIZZI", status: false },
      { answer: "BRITAMA", status: true },
      { answer: "BRIMO", status: false },
    ],
  },
  {
    no: 4,
    question: "Nomor call center BRI adalah 1500017?",
    picture: THANKU,
    answer: [
      { answer: "BENAR", status: true },
      { answer: "SALAH", status: false },
    ],
  },
  {
    no: 5,
    question: "Slogan BRI adalah 'Melayani dengan setulus hati?'",
    picture: BRIMelayani,
    answer: [
      { answer: "BENAR", status: true },
      { answer: "SALAH", status: false },
    ],
  },
];
