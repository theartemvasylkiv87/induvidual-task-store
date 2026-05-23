// js/state.js

const defaultProducts = [
  {
    id: 1,
    name: "Rolex Submariner",
    price: 12500,
    quantity: 2,
    image:
      "https://media.rolex.com/image/upload/q_auto/f_auto/c_limit,w_1920/v1775305300/rolexcom/094398bf1f99/navigation/professional-watches-submariner-navigation-portrait",
  },
  {
    id: 2,
    name: "Omega Speedmaster",
    price: 6800,
    quantity: 5,
    image:
      "https://www.omegawatches.com/media/catalog/product/o/m/omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425004001-5bcb6e.png?w=1100",
  },
  {
    id: 3,
    name: "Casio G-Shock GA-2100",
    price: 120,
    quantity: 15,
    image:
      "https://www.casio.com/content/dam/casio/product-info/locales/de/de/timepiece/product/watch/G/GA/GA2/ga-2100bm-7a2/assets/GA-2100BM-7A2.png.transform/main-visual-pc/image.png",
  },
  {
    id: 4,
    name: "Tissot Le Locle",
    price: 650,
    quantity: 8,
    image:
      "https://www.tissotwatches.com/dw/image/v2/BKKD_PRD/on/demandware.static/-/Sites-Tissot-Catalogue/default/dwf7ea6df5/product-pictures/45f68220-5164-45bd-862a-20d5f845f9ab_T006-407-16-033-01_shadow.png?sm=fit&sw=1680&sh=1680,gravity=center",
  },
  {
    id: 5,
    name: "Seiko 5 Sports",
    price: 300,
    quantity: 12,
    image:
      "https://owp.klarna.com/product/640x640/3021705635/Seiko-5-Sports-(SRPJ83K1).jpg?ph=true",
  },
  {
    id: 6,
    name: "Cartier Tank",
    price: 4200,
    quantity: 3,
    image:
      "https://www.weber-juwelier.de/cdn/2000x2000/e/7/5/2/e752624340260efab42f48e151b959edda07a2fb_WSTA0041_01_PROD_1058_Cartier_2000x2000_33_7x25_5mm.jpg",
  },
  {
    id: 7,
    name: "Patek Philippe Nautilus",
    price: 85000,
    quantity: 1,
    image:
      "https://www.uhren2000.de/cdn/shop/files/3900-001-G11.jpg?v=1732704593",
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: 450,
    quantity: 10,
    image:
      "https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/apple-watch-series-9.png",
  },
];

// ПЕРЕВІРКА: Якщо в стореджі пусто — записуємо дефолтні
if (!localStorage.getItem("myProducts")) {
  localStorage.setItem("myProducts", JSON.stringify(defaultProducts));
}

let _products = JSON.parse(localStorage.getItem("myProducts"));

// ГЕТЕР для поточних продуктів
export function getProducts() {
  return _products;
}

// СЕТТЕР для збереження продуктів
export function saveProducts(newProducts) {
  _products = newProducts;
  localStorage.setItem("myProducts", JSON.stringify(_products));
}
