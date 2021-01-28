router.get('/seed', async (req, res) => {
    let c = db.collection('categories')
  
    let categories = {
      'grains': c.doc('grains'),
      'tubers': c.doc('tubers'),
      'protein': c.doc('protein'),
      'legumes': c.doc('legumes'),
      'fish': c.doc('fish'),
      'vegetables': c.doc('vegetables'),
      'fruits': c.doc('fruits'),
      'dairy': c.doc('dairy'),
      'fats': c.doc('fats'),
      'sugars': c.doc('sugars'),
      'drinks': c.doc('drinks'),
      'others': c.doc('others'),
    }
    let ingredients = [
      {
        name: "White Rice",
        category: categories.grains,
      },
      {
        name: "Brown Rice",
        category: categories.grains,
      },
      {
        name: "Noodles",
        category: categories.grains,
      },
      {
        name: "Flour",
        category: categories.grains,
      },
      {
        name: "Spring Roll Skin",
        category: categories.grains,
      },
      {
        name: "Rice Noodles",
        category: categories.grains,
      },
      {
        name: "Quinoa",
        category: categories.grains,
      },
      {
        name: "Barley",
        category: categories.grains,
      },
      {
        name: "Couscous",
        category: categories.grains,
      },
      {
        name: "Linguine",
        category: categories.grains,
      },
      {
        name: "Fuscilli",
        category: categories.grains,
      },
      {
        name: "Turnip",
        category: categories.tubers,
      },
      {
        name: "Potatoes",
        category: categories.tubers,
      },
      {
        name: "Sweet Potatoes",
        category: categories.tubers,
      },
      {
        name: "Yam",
        category: categories.tubers,
      },
      {
        name: "Tapioca",
        category: categories.tubers,
      },
      {
        name: "Taro",
        category: categories.tubers,
      },
      {
        name: "Water Chestnuts",
        category: categories.tubers,
      },
      {
        name: "Chicken",
        category: categories.protein,
      },
      {
        name: "Eggs",
        category: categories.protein,
      },
      {
        name: "Pork",
        category: categories.protein,
      },
      {
        name: "Beef",
        category: categories.protein,
      },
      {
        name: "Duck",
        category: categories.protein,
      },
      {
        name: "Mutton",
        category: categories.protein,
      },
      {
        name: "Venison",
        category: categories.protein,
      },
      {
        name: "Turkey",
        category: categories.protein,
      },
      {
        name: "Peanuts",
        category: categories.legumes,
      },
      {
        name: "Peanuts",
        category: categories.legumes,
      },
      {
        name: "Soy Beans",
        category: categories.legumes,
      },
      {
        name: "Green Beans",
        category: categories.legumes,
      },
      {
        name: "Tofu",
        category: categories.legumes,
      },
      {
        name: "Salmon",
        category: categories.fish,
      },
      {
        name: "Oysters",
        category: categories.fish,
      },
      {
        name: "Prawns",
        category: categories.fish,
      },
      {
        name: "Squid",
        category: categories.fish,
      },
      {
        name: "Cockles",
        category: categories.fish,
      },
      {
        name: "Tuna",
        category: categories.fish,
      },
      {
        name: "Pomfret",
        category: categories.fish,
      },
      {
        name: "Batang",
        category: categories.fish,
      },
      {
        name: "Threadfin",
        category: categories.fish,
      },
      {
        name: "Snapper",
        category: categories.fish,
      },
      {
        name: "Fish",
        category: categories.fish,
      },
      {
        name: "Mushrooms",
        category: categories.vegetables,
      },
      {
        name: "Shallots",
        category: categories.vegetables,
      },
      {
        name: "Bean Spouts",
        category: categories.vegetables,
      },
      {
        name: "Chives",
        category: categories.vegetables,
      },
      {
        name: "Lettuce",
        category: categories.vegetables,
      },
      {
        name: "Cucumber",
        category: categories.vegetables,
      },
      {
        name: "Broccoli",
        category: categories.vegetables,
      },
      {
        name: "Carrots",
        category: categories.vegetables,
      },
      {
        name: "Spinach",
        category: categories.vegetables,
      },
      {
        name: "Cauliflower",
        category: categories.vegetables,
      },
      {
        name: "Bok Choy",
        category: categories.vegetables,
      },
      {
        name: "Brussel Sprouts",
        category: categories.vegetables,
      },
      {
        name: "Capsicums",
        category: categories.vegetables,
      },
      {
        name: "Cabbage",
        category: categories.vegetables,
      },
      {
        name: "Pumpkin",
        category: categories.vegetables,
      },
      {
        name: "Tomatoes",
        category: categories.fruits,
      },
      {
        name: "Lime",
        category: categories.fruits,
      },
      {
        name: "Thai Chillis",
        category: categories.fruits,
      },
      {
        name: "Apples",
        category: categories.fruits,
      },
      {
        name: "Oranges",
        category: categories.fruits,
      },
      {
        name: "Grapes",
        category: categories.fruits,
      },
      {
        name: "Melon",
        category: categories.fruits,
      },
      {
        name: "Bananas",
        category: categories.fruits,
      },
      {
        name: "Avocado",
        category: categories.fruits,
      },
      {
        name: "Grapefruit",
        category: categories.fruits,
      },
      {
        name: "Olives",
        category: categories.fruits,
      },
      {
        name: "Dragon Fruit",
        category: categories.fruits,
      },
      {
        name: "Guava",
        category: categories.fruits,
      },
      {
        name: "Durian",
        category: categories.fruits,
      },
      {
        name: "Lychee",
        category: categories.fruits,
      },
      {
        name: "Longan",
        category: categories.fruits,
      },
      {
        name: "Pineapple",
        category: categories.fruits,
      },
      {
        name: "Whole Milk",
        category: categories.dairy,
      },
      {
        name: "Skim Milk",
        category: categories.dairy,
      },
      {
        name: "Cheddar Cheese",
        category: categories.dairy,
      },
      {
        name: "Mozarella",
        category: categories.dairy,
      },
      {
        name: "American Cheese",
        category: categories.dairy,
      },
      {
        name: "Cream",
        category: categories.dairy,
      },
      {
        name: "Palm Oil",
        category: categories.fats,
      },
      {
        name: "Olive Oil",
        category: categories.fats,
      },
      {
        name: "Sunflower Oil",
        category: categories.fats,
      },
      {
        name: "Vegetable Oil",
        category: categories.fats,
      },
      {
        name: "Butter",
        category: categories.fats,
      },
      {
        name: "Margarine",
        category: categories.fats,
      },
      {
        name: "Lard/Tallow",
        category: categories.fats,
      },
      {
        name: "Sesame Oil",
        category: categories.fats,
      },
      {
        name: "Fish Sauce",
        category: categories.others,
      },
      {
        name: "Soy Sauce",
        category: categories.others,
      },
      {
        name: "Dark Sauce",
        category: categories.others,
      },
    ]
  
    let ing = [
      {
        name: "Veggies",
        category: categories.vegetables,
      },
    ]
    try {
      for (let i of ing) {
        await db.collection('ingredients').add({
          name: i.name,
          category: i.category,   // Category it should belong to
          calories: 0,                    // kcal/100g
          carbs: 0,                       // g/100g
          protein: 0,                     // g/100g
          fat: 0,                         // g/100g
          footprint: 0,                   // kg CO2/kg
        });
      }
  
      return res.status(200).json({ test: 'seed successful!' });
  
    } catch (e) {
      console.log(e)
      return res.status(400).json({ error: 'error' });
    }
  });