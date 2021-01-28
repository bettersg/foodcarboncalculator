router.get('/seed', async (req, res) => {

    let dishes = [
      // {
      //   name: "Chicken Rice",
      //   ingredients: [
      //     {
      //       ingredient: "Chicken",
      //       weight: 70,
      //     },
      //     {
      //       ingredient: "White Rice",
      //       weight: 60,
      //     },
      //     {
      //       ingredient: "Cucumber",
      //       weight: 6,
      //     },
      //   ]
      // },
      // {
      //   name: "Nasi Lemak",
      //   ingredients: [
      //     {
      //       ingredient: "Chicken",
      //       weight: 85,
      //     },
      //     {
      //       ingredient: "White Rice",
      //       weight: 70,
      //     },
      //     {
      //       ingredient: "Cucumber",
      //       weight: 20,
      //     },
      //     {
      //       ingredient: "Eggs",
      //       weight: 45,
      //     },
      //     {
      //       ingredient: "Fish",
      //       weight: 10,
      //     },
      //   ]
      // },
      // {
      //   name: "Bak Chor Mee",
      //   ingredients: [
      //     {
      //       ingredient: "Noodles",
      //       weight: 75,
      //     },
      //     {
      //       ingredient: "Pork",
      //       weight: 60,
      //     },
      //     {
      //       ingredient: "Mushrooms",
      //       weight: 20,
      //     },
      //     {
      //       ingredient: "Spring Onion",
      //       weight: 15,
      //     },
      //   ]
      // },
      {
        name: "Spaghetti Bolognese (Beef)",
        ingredients: [
          {
            ingredient: "Spaghetti",
            weight: 75,
          },
          {
            ingredient: "Tomatoes",
            weight: 160,
          },
          {
            ingredient: "Beef",
            weight: 80,
          },
          {
            ingredient: "Veggies",
            weight: 20,
          },
        ]
      },
      {
        name: "Spaghetti Bolognese (Pork)",
        ingredients: [
          {
            ingredient: "Spaghetti",
            weight: 75,
          },
          {
            ingredient: "Tomatoes",
            weight: 160,
          },
          {
            ingredient: "Pork",
            weight: 80,
          },
          {
            ingredient: "Veggies",
            weight: 20,
          },
        ]
      },
      {
        name: "Ban Mian",
        ingredients: [
          {
            ingredient: "Noodles",
            weight: 80,
          },
          {
            ingredient: "Eggs",
            weight: 45,
          },
          {
            ingredient: "Pork",
            weight: 30,
          },
          {
            ingredient: "Veggies",
            weight: 20,
          },
        ]
      },
      {
        name: "Prata",
        ingredients: [
          {
            ingredient: "Flour",
            weight: 75,
          },
          {
            ingredient: "Eggs",
            weight: 6,
          },
          {
            ingredient: "Whole Milk",
            weight: 20,
          },
        ]
      },
      {
        name: "Fried Oyster Omelette",
        ingredients: [
          {
            ingredient: "Flour",
            weight: 10,
          },
          {
            ingredient: "Eggs",
            weight: 100,
          },
          {
            ingredient: "Oysters",
            weight: 60,
          },
        ]
      },
      {
        name: "Popiah",
        ingredients: [
          {
            ingredient: "Turnip",
            weight: 24,
          },
          {
            ingredient: "Prawns",
            weight: 24,
          },
          {
            ingredient: "Peanuts",
            weight: 12,
          },
          {
            ingredient: "Shallots",
            weight: 12,
          },
          {
            ingredient: "Bean Spouts",
            weight: 24,
          },
          {
            ingredient: "Spring Roll Skin",
            weight: 20,
          },
          {
            ingredient: "Eggs",
            weight: 45,
          },
        ]
      },
      {
        name: "Seafood Aglio Olio",
        ingredients: [
          {
            ingredient: "Spaghetti",
            weight: 75,
          },
          {
            ingredient: "Prawns",
            weight: 20,
          },
          {
            ingredient: "Squid",
            weight: 10,
          },
        ]
      },
      {
        name: "Tom Yum Soup",
        ingredients: [
          {
            ingredient: "Shrimp",
            weight: 24,
          },
          {
            ingredient: "Lime",
            weight: 2,
          },
          {
            ingredient: "Thai Chillis",
            weight: 2,
          },
          {
            ingredient: "Fish Sauce",
            weight: 2,
          },
          {
            ingredient: "Mushrooms",
            weight: 12,
          },
        ]
      },
      {
        name: "Char Kway Teow",
        ingredients: [
          {
            ingredient: "Prawns",
            weight: 24,
          },
          {
            ingredient: "Rice Noodles",
            weight: 80,
          },
          {
            ingredient: "Cockles",
            weight: 10,
          },
          {
            ingredient: "Eggs",
            weight: 45,
          },
          {
            ingredient: "Bean Spouts",
            weight: 15,
          },
          {
            ingredient: "Chives",
            weight: 15,
          },
        ]
      },
    ]
  
    try {
      for (let d of dishes) {
        console.log(d.name);
        for (let i of d.ingredients) {
          let findIngredient = await db.collection('ingredients').where('name', '==', i.ingredient).get();
          console.log(i.ingredient);
          i.ingredient = db.collection('ingredients').doc(findIngredient.docs[0].id);
        }
        // console.log(d);
        d.createdBy = "";
        // await db.collection('dishes').doc('sample-dish').set(d);
  
        await db.collection('dishes').add(d);
      }
  
      return res.status(200).json({ test: 'seed successful!' });
  
    } catch (e) {
      console.log(e)
      return res.status(400).json({ error: 'error' });
    }
  });
  