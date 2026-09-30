import { Product } from "@/types"

const IMG = "https://denzautodetailing.com/wp-content/uploads/2026/05/"

export const products: Product[] = [
  {
    id: "1",
    name: "ENGINE DEGREASER",
    price: 35000,
    image: `${IMG}ENGINE-DEGREASER-250ML.jpg`,
    images: [
      `${IMG}ENGINE-DEGREASER-250ML.jpg`,
      `${IMG}ENGINE-DEGREASER-250ML.jpg`,
      `${IMG}ENGINE-DEGREASER-250ML.jpg`,
    ],
    category: "lorem",
    categoryLabel: "Lorem",
    stock: 150,
    rating: 4.9,
    sold: 1240,
    description:
      "Engine Degreaser Denz Auto Detailing diformulasikan khusus untuk membersihkan noda oli, minyak, dan kotoran membandel di area mesin kendaraan. Formulanya cepat meresap dan mengangkat kotoran tanpa merusak komponen karet maupun plastik di sekitar mesin, sehingga ruang mesin terlihat bersih dan terawat seperti baru.",
    highlights: [
      "Mengangkat noda oli dan grease membandel",
      "Aman untuk komponen karet dan plastik",
      "Hasil bersih tanpa bekas usap",
      "Cocok dipakai rutin mingguan",
    ],
    variants: [
      { size: "100ml", price: 35000, discount: 90 },
      { size: "250ml", price: 65000, discount: 20 },
      { size: "500ml", price: 110000, discount: 20 },
    ],
  },
  {
    id: "2",
    name: "SEMIR BAN",
    price: 18000,
    image: `${IMG}SEMIR-BAN-250-ML.jpg`,
    images: [
      `${IMG}SEMIR-BAN-250-ML.jpg`,
      `${IMG}SEMIR-BAN-250-ML.jpg`,
    ],
    category: "ipsum",
    categoryLabel: "Ipsum",
    stock: 200,
    rating: 4.8,
    sold: 980,
    description:
      "Semir Ban Denz Auto Detailing memberikan tampilan hitam pekat mengilap pada ban tanpa efek lengket atau menarik debu berlebih. Diformulasikan untuk melindungi karet ban dari retak akibat paparan sinar matahari dan cuaca panas, sekaligus menjaga tampilan ban tetap baru lebih lama.",
    highlights: [
      "Hasil hitam pekat, tidak lengket",
      "Melindungi karet ban dari retak",
      "Tahan lama, tidak mudah pudar",
      "Mudah diaplikasikan dengan spons atau kuas",
    ],
    variants: [
      { size: "100ml", price: 18000 },
      { size: "250ml", price: 32000, discount: 10 },
    ],
  },
  {
    id: "3",
    name: "SILICON OIL",
    price: 85000,
    image: `${IMG}SILICON-OIL-100ML.jpg`,
    images: [
      `${IMG}SILICON-OIL-100ML.jpg`,
      `${IMG}SILICON-OIL-100ML.jpg`,
      `${IMG}SILICON-OIL-100ML.jpg`,
    ],
    category: "dolor",
    categoryLabel: "Dolor",
    stock: 75,
    rating: 4.7,
    sold: 410,
    description:
      "Silicon Oil Denz Auto Detailing adalah cairan serbaguna untuk melumasi, melindungi, dan mengilapkan berbagai permukaan karet dan plastik pada kendaraan, mulai dari list body, karet pintu, hingga dashboard. Membantu mencegah karet menjadi getas dan pecah akibat usia dan cuaca.",
    highlights: [
      "Melumasi karet pintu dan kaca",
      "Mengilapkan dashboard dan trim plastik",
      "Mencegah karet getas dan pecah",
      "Formula ringan, tidak lengket",
    ],
    variants: [
      { size: "250ml", price: 85000, discount: 10 },
      { size: "500ml", price: 150000, discount: 20 },
      { size: "1L", price: 260000, discount: 25 },
    ],
  },
  {
    id: "4",
    name: "HYPER DRESSING",
    price: 25000,
    image: `${IMG}HYPER-DRESSING-250ML.jpg`,
    images: [
      `${IMG}HYPER-DRESSING-250ML.jpg`,
      `${IMG}HYPER-DRESSING-250ML.jpg`,
    ],
    category: "sit-amet",
    categoryLabel: "Sit Amet",
    stock: 300,
    rating: 4.9,
    sold: 2100,
    description:
      "Hyper Dressing memberikan efek glossy tahan lama pada interior maupun eksterior plastik kendaraan, seperti dashboard, bumper, dan trim samping. Formula water-based membuatnya aman digunakan tanpa meninggalkan residu berminyak yang mudah menarik debu.",
    highlights: [
      "Efek glossy tahan lama",
      "Aman untuk dashboard dan bumper",
      "Berbasis air, tidak berminyak",
      "Tidak menarik debu berlebih",
    ],
    variants: [
      { size: "1 pcs", price: 25000 },
      { size: "3 pcs (paket hemat)", price: 75000, discount: 20 },
    ],
  },
  {
    id: "5",
    name: "SHINE PROTECT",
    price: 48000,
    image: `${IMG}SHINE-PROTECT-100ML.jpg`,
    images: [
      `${IMG}SHINE-PROTECT-100ML.jpg`,
      `${IMG}SHINE-PROTECT-100ML.jpg`,
    ],
    category: "veniam",
    categoryLabel: "Veniam",
    stock: 90,
    rating: 4.6,
    sold: 320,
    description:
      "Shine Protect adalah lapisan pelindung cepat pakai yang memberikan kilap tambahan sekaligus melindungi cat kendaraan dari debu, air, dan sinar UV. Cocok digunakan setelah mencuci mobil untuk mempertahankan hasil detailing lebih lama.",
    highlights: [
      "Menambah kilap pada cat mobil",
      "Melindungi dari debu dan sinar UV",
      "Aplikasi cepat, tanpa dibilas",
      "Cocok untuk perawatan rutin",
    ],
    variants: [
      { size: "250ml", price: 48000, discount: 10 },
      { size: "500ml", price: 85000, discount: 20 },
    ],
  },
  {
    id: "6",
    name: "DAILY FOAM",
    price: 120000,
    image: `${IMG}DAILY-FOAM-500ML.jpg`,
    images: [
      `${IMG}DAILY-FOAM-500ML.jpg`,
      `${IMG}DAILY-FOAM-500ML.jpg`,
      `${IMG}DAILY-FOAM-500ML.jpg`,
    ],
    category: "laboris",
    categoryLabel: "Laboris",
    stock: 40,
    rating: 5.0,
    sold: 156,
    description:
      "Daily Foam adalah sabun cuci mobil berbusa tebal yang efektif mengangkat debu dan kotoran harian tanpa membuat cat kendaraan baret. Formula pH balanced menjaga lapisan wax atau coating tetap awet meski dipakai mencuci setiap hari.",
    highlights: [
      "Busa tebal, mengangkat kotoran maksimal",
      "pH balanced, aman untuk coating",
      "Tidak menyebabkan baret halus",
      "Cocok dipakai cuci harian",
    ],
    variants: [
      { size: "500ml", price: 120000, discount: 10 },
      { size: "1L", price: 210000, discount: 15 },
      { size: "2L", price: 380000, discount: 20 },
    ],
  },
]