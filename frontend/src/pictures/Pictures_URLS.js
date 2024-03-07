const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/pictures" : "/src/pictures";

const images = {
  gallery: [
    { url: `${basePath}/Drink_1.webp`, alt: "Lemon Cocktail" },
    { url: `${basePath}/Food_1.webp`, alt: "Steak Grill" },
    { url: `${basePath}/Food_2.webp`, alt: "Spaghetti & Pizza" },
    { url: `${basePath}/Food_3.webp`, alt: "Spaghetti" },
    { url: `${basePath}/Drink_2.webp`, alt: "Mimosa" },
    { url: `${basePath}/Food_4.webp`, alt: "2 Meals" },
    { url: `${basePath}/Misc_1.webp`, alt: "Condiments" },
    { url: `${basePath}/Food_5.webp`, alt: "Pizza Oven" },
    { url: `${basePath}/Food_6.webp`, alt: "Carbonara" },
    { url: `${basePath}/Food_8.webp`, alt: "Oysters" },
    { url: `${basePath}/Drink_3.webp`, alt: "Wine Rack" },
    { url: `${basePath}/Food_9.webp`, alt: "Anti-Pasti" },
    { url: `${basePath}/Drink_4.webp`, alt: "Cocktail" },
    { url: `${basePath}/Food_7.webp`, alt: "Making Spaghetti" },
    { url: `${basePath}/Food_11.webp`, alt: "Pasta" },
    { url: `${basePath}/Drink_5.webp`, alt: "3 Cocktails" },
  ],
  gallery_mobile: [
    { url: `${basePath}/Drink_1.webp`, alt: "Lemon Cocktail" },
    { url: `${basePath}/Food_1_mobile.webp`, alt: "Pizza Slice" },
    { url: `${basePath}/Food_2.webp`, alt: "Spaghetti & Pizza" },
    { url: `${basePath}/Food_3.webp`, alt: "Spaghetti" },
    { url: `${basePath}/Drink_2_mobile.webp`, alt: "Mimosa" },
    { url: `${basePath}/Food_4_mobile.webp`, alt: "2 Meals" },
    { url: `${basePath}/Misc_1_mobile.webp`, alt: "Condiments" },
    { url: `${basePath}/Food_5_mobile.webp`, alt: "Pizza Oven" },
    { url: `${basePath}/Food_6.webp`, alt: "Carbonara" },
    { url: `${basePath}/Food_8_mobile.webp`, alt: "Oysters" },
    { url: `${basePath}/Drink_3_mobile.webp`, alt: "Wine Rack" },
    { url: `${basePath}/Food_9_mobile.webp`, alt: "Anti-Pasti" },
    { url: `${basePath}/Drink_4_mobile.webp`, alt: "Cocktail" },
    { url: `${basePath}/Food_7_mobile.webp`, alt: "Making Spaghetti" },
    { url: `${basePath}/Food_11.webp`, alt: "Pasta" },
    { url: `${basePath}/Drink_5_mobile.webp`, alt: "3 Cocktails" },
  ],
  about: [
    { url: `${basePath}/Chef_1.webp`, alt: "Chef Cookings" },
    { url: `${basePath}/Food_10.webp`, alt: "Delicious Food" },
  ],
  home: [
    {
      url: `${basePath}/ClinkGlass_1.webp`,
      alt: "Glasses Clinking",
    },
    // ... other home images
  ],
  // ... other sections as needed
};
export default images;
