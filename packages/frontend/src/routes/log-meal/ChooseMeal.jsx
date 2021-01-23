import { useState, useEffect } from 'react';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { getData } from '../../common/axiosInstances';
import { SearchResults } from '../../components/search-results/SearchResults';
import { useAuth } from '../../contexts/AuthContext';
import { useMealContext } from '../../contexts/MealContext';
import styles from '../../styles/ChooseMeal.module.css';

export const ChooseMeal = () => {
  // const history = useHistory();
  const { currUser } = useAuth();
  const { meals } = useMealContext();
  let { meal } = useParams();
  const [favourite, setFavourite] = useState(false);
  const [mealLogged, setMealLogged] = useState(false);
  const [listOfFavourites, setListOfFavourites] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    const getFavourites = async () => {
      let faves = await getData.get(`/dishes/favourite?user=${currUser.uid}`);
      setListOfFavourites(faves.data);
    };
    getFavourites();
  }, []);
  useEffect(() => {
    const doSearch = async () => {
      try {
        let results = await getData.get(`/dishes?user=${currUser.uid}&keyword=${search}`);
        setSearchResults(results.data.dishes);
      } catch (e) {
        console.log(e);
      }
    };
    if (search) {
      doSearch();
    } else {
      setSearchResults();
    }
  }, [search]);

  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal)) {
    return <Redirect to="/app" />;
  }
  if (mealLogged) {
    return <Redirect to="/app" />;
  }
  // const logThisMeal = (food) => {
  //   history.push(`/add-to-log/${meal}/${food}`);
  // };

  const showTabs = () => {
    return (
      <div className={`${styles.tabs}`}>
        <div
          role="button"
          tabIndex="0"
          className={`${styles.tab} ${!favourite ? styles.tabActive : ''}`}
          onClick={() => setFavourite(false)}
          onKeyPress={() => {}}
        >
          All
        </div>
        <div
          role="button"
          tabIndex="0"
          className={`${styles.tab} ${favourite ? styles.tabActive : ''}`}
          onClick={() => setFavourite(true)}
          onKeyPress={() => {}}
        >
          Favourites
        </div>
      </div>
    );
  };
  const showSearchResults = () => {
    return (
      <div className={`${styles.results}`}>
        <div className={`${styles.heading}`}>
          <h1>Search Results</h1>
        </div>
        <div className={`${styles.resultsContainer}`}>
          <SearchResults
            meals={searchResults}
            favourites={listOfFavourites}
            setFavourites={setListOfFavourites}
            toggleFavourite={toggleFavourite}
            logDish={logDish}
          />
        </div>
      </div>
    );
  };
  const toggleFavourite = async (id) => {
    let body = {
      user: currUser.uid,
      dish: id,
    };
    let index = listOfFavourites.findIndex((x) => x.id === id);
    let temp = [...listOfFavourites];
    try {
      await getData.put('/dishes/favourite', body);

      if (index !== -1) {
        temp.splice(index, 1);
        setListOfFavourites(temp);
      } else {
        temp.push({ id });
        setListOfFavourites(temp);
      }
    } catch (e) {
      console.log(e);
      alert('error adding dish to favourites');
    }
  };
  const logDish = async (id) => {
    try {
      let date = Date.now();
      let body = {
        userID: currUser.uid,
        date,
        mealType: meals.findIndex((x) => x === meal),
      };
      console.log(id);
      console.log(body);
      await getData.post('/diary', body);
      setMealLogged(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="page-container">
      <div className="heading">
        <h1>{meal}</h1>
      </div>
      <div id="search" className={`${styles.search}`}>
        <input
          placeholder="Search for a food"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div id="meal-choices-container" className={`page-content ${styles.pageContent}`}>
        {searchResults ? showSearchResults() : showTabs()}
        <div className={`${styles.addNewMealOption}`}>
          <NavLink to="/create-food">Create a food</NavLink>
        </div>
      </div>
    </div>
  );
};

{
  /* <div className={`${styles.mealChoiceHeading}`}>
          <h2>Most Recent</h2>
          <div>View by categories</div>
        </div>
        <div id="meal-choices">
          {exampleMeals.map((m) => (
            <div
              role="button"
              tabIndex="0"
              key={m.id}
              className={`${styles.eachMealChoice}`}
              onClick={() => logThisMeal(m.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  logThisMeal(m.id);
                }
              }}
            >
              <div>{m.mealName}</div>
              <div>{`>`}</div>
            </div>
          ))}
        </div> */
}
