import db from '../config/firestoreConfig.js';

let categories = db.collection('categories')

let categories = [
    'dairy',
    'fats',
    'fruits',
    'grains',
    'protein',
    'sugars',
    'tubers',
    'vegetables',
]

/* 
    {
        name: "Chicken",                       // Food Name
        category: categories.doc('protein'),   // Category it should belong to
        calories: 0,                    // kcal/100g
        carbs: 0,                       // g/100g
        protein: 0,                     // g/100g
        fat: 0,                         // g/100g
        footprint: 0,                   // kg CO2/kg
    },
*/
let ingredients = [
    {
        name: "Chicken",
        category: categories.doc('protein'),
    },
    {
        name: "Rice",
        category: categories.doc('grains'),
    },
    {
        name: "Eggs",
        category: categories.doc('protein'),
    },
    {
        name: "Fish",
        category: categories.doc('protein'),
    },
    {
        name: "Mushrooms",
        category: categories.doc('vegetables'),
    },
    {
        name: "Pork",
        category: categories.doc('protein'),
    },
    {
        name: "Noodles",
        category: categories.doc('grains'),
    },
    {
        name: "Tomato",
        category: categories.doc('vegetables'),
    },
    {
        name: "Beef",
        category: categories.doc('protein'),
    },
    {
        name: "Milk",
        category: categories.doc('dairy'),
    },
    {
        name: "Flour",
        category: categories.doc('grains'),
    },
    {
        name: "Oysters",
        category: categories.doc('protein'),
    },
    {
        name: "Turnip",
        category: categories.doc('tubers'),
    },
    {
        name: "Prawns",
        category: categories.doc('protein'),
    },
    {
        name: "Peanuts",
        category: categories.doc('protein'),
    },
    {
        name: "Shallots",
        category: categories.doc('vegetables'),
    },
    {
        name: "Bean Sprouts",
        category: categories.doc('vegetables'),
    },
    {
        name: "Spring roll skin",
        category: categories.doc('grains'),
    },
    {
        name: "Spaghetti",
        category: categories.doc('grains'),
    },
    {
        name: "Sliced Squid",
        category: categories.doc('protein'),
    },
    {
        name: "Shrimp",
        category: categories.doc('protein'),
    },
        {
        name: "Lime Juice",
        category: categories.doc('fruits'),
    },
    {
        name: "Thai Chilies",
        category: categories.doc('fruits'),
    },
    {
        name: "Cockles",
        category: categories.doc('protein'),
    },
    {
        name: "Chinese Chives",
        category: categories.doc('vegetables'),
    },
]
