const isProduction = process.env.NODE_ENV === "production";
const basePath = isProduction ? "/pictures" : "/src/pictures";

const images = {
    gallery: [
        { url: `${basePath}/Drink_1.jpg`, alt: "Lemon Cocktail" },
        { url: `${basePath}/Food_1.jpg`, alt: "Steak Grill" },
        { url: `${basePath}/Food_2.jpg`, alt: "Pizza Slice" },
        { url: `${basePath}/Food_3.jpg`, alt: "Spaghetti" },
        { url: `${basePath}/Drink_2.jpg`, alt: "Mimosa" },
        { url: `${basePath}/Food_4.jpg`, alt: "2 Meals" },
        { url: `${basePath}/Misc_1.jpg`, alt: "Condiments" },
        { url: `${basePath}/Food_5.jpg`, alt: "Pizza Oven" },
        { url: `${basePath}/Food_6.jpg`, alt: "Carbonara" },
        { url: `${basePath}/Food_8.jpg`, alt: "Oysters" },
        { url: `${basePath}/Drink_3.jpg`, alt: "Wine Rack" },
        { url: `${basePath}/Food_9.jpg`, alt: "Anti-Pasti" },
        { url: `${basePath}/Drink_4.jpg`, alt: "Cocktail" },
        { url: `${basePath}/Food_7.jpg`, alt: "Making Spaghetti" },
        { url: `${basePath}/Food_11.jpg`, alt: "Making Spaghetti" },
        { url: `${basePath}/Drink_5.jpg`, alt: "Making Spaghetti" },
    ],
    about: [
        { url: `${basePath}/Chef_1.jpg`, alt: "Chef Cookings" },
        { url: `${basePath}/Food_10.png`, alt: "Delicious Food" }
    ],
    home: [
        { url: `${basePath}/ClinkGlass_1.png`, alt: "Glasses Clinking" }
        // ... other home images
    ]
    // ... other sections as needed
};
export default images