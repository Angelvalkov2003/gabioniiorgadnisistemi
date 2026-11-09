export type Img = { src: string; alt: string; w: number; h: number };

const i = (name: string, alt: string, w: number, h: number): Img => ({ src: `/images/${name}.webp`, alt, w, h });

export const images = {
  darvo: i("gabionna-ograda-darvo", "Ниска габионна стена с дървени греди отгоре пред къща", 1600, 900),
  aluOgrada: i("gabionni-koloni-alu-ograda", "Габионни колони и основа с хоризонтални метални пана", 1170, 875),
  paneliKoloni: i("ograda-paneli-gabion-koloni", "Черна оградна система с габионни колони над каменна подпорна стена", 1170, 965),
  lameli: i("gabionna-ograda-lameli", "Висока габионна ограда, комбинирана с черни ламели", 1207, 1569),
  terasi: i("mehanizatsiya-terasi", "Изкопни работи и терасиране на двор с габионни подпорни стени", 1600, 1200),
  stalbiSteni: i("podporni-steni-stalbi", "Терасирани габионни подпорни стени с габионно стълбище", 1600, 1200),
  paneli3d: i("ograda-3d-paneli-vrata", "Зелена ограда от 3D пана с врата върху габионна основа", 1600, 1200),
  stalbi: i("gabionni-stalbi", "Стъпала от габиони с декинг настилка към тераса", 1600, 1202),
  visokaStena: i("visoka-podporna-stena", "Висока габионна подпорна стена по наклонен терен", 1600, 900),
} satisfies Record<string, Img>;

export const gallery: Img[] = [
  images.visokaStena,
  images.aluOgrada,
  images.stalbiSteni,
  images.lameli,
  images.paneliKoloni,
  images.stalbi,
  images.darvo,
  images.paneli3d,
  images.terasi,
];
