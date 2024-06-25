export type Lang = "en" | "sk";

type Publication = {
  id: string;
  pages: Number;
  featuredPages: number[];
};

export const TRANSLATIONS = {
  sk: {
    sng: "Slovenská národná galéria",
    igorGazdikCollection: "Výber z knižnej zbierky Igora Gazdíka",
    annotation: [
      "Pavel Dobšinský: Prostonárodné slovenské povesti, sošit 1. Turčiansky sv. Martin : Kníhtlačiarsky účastinársky spolok, 1922. Tretie vydanie. Ilustrácie Andrej Mihal. SNG, UP-P 3280/30a",
      "Pavel Dobšinský: Prostonárodné slovenské povesti, sošit 9. Turčiansky sv. Martin : Kníhtlačiarsky účastinársky spolok, 1922. Ilustrácie  Mikuláš Galanda. SNG, UP-P 3280/30b",
      "Ivan Horváth: Strieborný prach. Bratislava : Slovenská grafia, 1929. Typografia Karel Jaroň. SNG, UP-P 3280/41",
      "Jaroslav Seifert: Na vlnách TSF.  Praha : Václav Petr, 1925. Edícia Hosta, zväzok 1. Obálka a typografia Karel Teige. SNG, UP-P 3280/3649",
      "Štefan Janšák: Lovci hlinených perál. 1. zväzok bibliofilskej edície Slovenské ráno. 1934. Tlač: Linografia K. Jaroň a spol, Bratislava. Ilustrácie: Mikuláš Galanda. Grafická úprava: Karol Jaroň, UP-P 3280/809",
    ],
    description: [
      "Zážitok z čítania a vizuálne potešenie z krásnych kníh v expozícii Biblioman prinášame aj prostredníctvom digitalizovaných diel zo zbierky Igora Gazdíka.",
      "Prvý diel výberu digitalizovaných titulov je zameraný na slovenské a české knihy. Predstavuje typografické a ilustrátorské realizácie začiatkov knižného dizajnu a bibliofílie na Slovensku v podaní viacerých ich protagonistov – Ľudovíta Fullu, Mikuláša Galandu, Karola Jaroňa.",
      "Návštevníci sa v tejto sérii digitalizovaných kníh môžu začítať do slovenskej klasiky – Rozprávok Pavla Dobšinského, novely Ivana Horvátha alebo esejí Štefana Janšáka zo začiatkov slovenskej archeológie. Českú bibliofíliu reprezentuje legendárna poetistická zbierka Jaroslava Seiferta v kongeniálnej grafickej/ typografickej úprave Karola Teigeho.",
    ],
    library: {
      "1": {
        title: "Strieborný prach",
        author: "Ivan Horváth",
        year: "1929",
      },
      "2": {
        title: "Prostonárodné slovenské povesti",
        subhead: "sošit 1",
        author: "Pavel Dobšinský",
        year: "1922",
      },
      "3": {
        title: "Na vlnách TSF",
        author: "Jaroslav Seifert",
        year: "1925",
      },
    },
  },
  en: {
    sng: "Slovak National Gallery",
    igorGazdikCollection: "Selection from the book collection of Igor Gazdík",
    annotation: [
      "Pavel Dobšinský: Prostonárodné slovenské povesti (Slovak Tales), notebook 1. Turčiansky sv. Martin : Kníhtlačiarsky účastinársky spolok, 1922. Third edition. Illustrations Andrej Mihal. SNG, UP-P 3280/30a",
      "Pavel Dobšinský: Prostonárodné slovenské povesti (Slovak Tales), notebook 9. Turčiansky sv. Martin : Kníhtlačiarsky účastinársky spolok, 1922. Second edition. Illustrations  Mikuláš Galanda. SNG, UP-P 3280/30b",
      "Ivan Horváth: Strieborný prach (Silver Dust). Bratislava : Slovenská grafia, 1929. Typography Karel Jaroň. SNG, UP-P 3280/41",
      "Jaroslav Seifert: Na vlnách TSF (On the Waves of TSF). Prague : Václav Petr, 1925. Hosta Edition, Volume 1. Cover and typography Karel Teige. SNG, UP-P 3280/3649",
      "Štefan Janšák: Lovci hlinených perál (The Hunters of Clay Pearls). Bibliophile edition. 1934. Print: Linografia K. Jaroň a spol., Bratislava. Illustrations: Mikuláš Galanda. Graphic design: Karol Jaroň, UP-P 3280/809",
    ],
    description: [
      "The exposition Biblioman brings you the joy that stems from the reading experience and visual perception of bibliophile books also through digitized works from Igor Gazdík's collection.",
      "The first volume of the selected digitized titles focuses on Slovak and Czech books. It showcases typographic and illustrative creations from the beginning of book design and bibliophilia in Slovakia, featuring its several protagonists, such as Ľudovít Fulla, Mikuláš Galanda, and Karol Jaroň.",
      "In this series of digitized books, visitors can dive into Slovak classics like the Fairy Tales by Pavel Dobšinský, Ivan Horváth's novella or essays by Štefan Janšák from the beginnings of Slovak archaeology. Czech bibliophilia is represented by the legendary collection of poems by Jaroslav Seifert in the equally masterful graphic/typographic design by Karol Teige.",
    ],
    library: {
      "1": {
        title: "Silver Dust",
        author: "Ivan Horváth",
        year: "1929",
      },
      "2": {
        title: "Slovak Tales",
        subhead: "notebook 1",
        author: "Pavel Dobšinský",
        year: "1922",
      },
      "3": {
        title: "On the Waves of TSF",
        author: "Jaroslav Seifert",
        year: "1925",
      },
    },
  },
};

export const LIBRARY: Array<Publication> = [
  {
    id: "1",
    pages: 26,
    featuredPages: [3, 2, 16],
  },
  {
    id: "2",
    pages: 29,
    featuredPages: [8, 5, 2],
  },
  {
    id: "3",
    pages: 19,
    featuredPages: [5, 4, 2],
  },
];
