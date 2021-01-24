import { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { debounce } from 'debounce';
import { getData } from '../../common/axiosInstances';
import { InputBar } from '../../components/input-bar/InputBar';
import { SearchResults } from '../../components/search-results/SearchResults';
import { SuccessfulAdd } from '../../components/successful-add/SuccessfulAdd';
import { useAuth } from '../../contexts/AuthContext';
import { useMealContext } from '../../contexts/MealContext';
import styles from '../../styles/ChooseMeal.module.css';

export const ChooseMeal = () => {
  const history = useHistory();
  const { currUser } = useAuth();
  const { meals } = useMealContext();
  let { meal } = useParams();
  const [favourite, setFavourite] = useState(false);
  const [loggedMeal, setLoggedMeal] = useState(false);
  const [listOfFavourites, setListOfFavourites] = useState();
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();

  useEffect(() => {
    let mounted = true;

    const getFavourites = async () => {
      let faves = await getData.get(`/dishes/favourite?user=${currUser.uid}`);
      if (mounted) {
        setListOfFavourites(faves.data);
      }
    };
    getFavourites();
    return () => {
      mounted = false;
    };
  }, [currUser.uid]);
  useEffect(() => {
    if (search) {
      doSearch();
    } else {
      setSearchResults();
    }
  }, [search]);
  const doSearch = async () => {
    try {
      let results = await getData.get(`/dishes?user=${currUser.uid}&keyword=${search}`);
      setSearchResults(results.data.dishes);
    } catch (e) {
      console.log(e);
    }
  };
  const debouncedSearch = useCallback(
    debounce((param) => setSearch(param), 600),
    [],
  );

  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal)) {
    console.log('here');
    return <Redirect to="/dashboard" />;
  }

  const handleSearch = (param) => {
    debouncedSearch(param);
  };
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
        dishID: id,
      };
      await getData.post('/diary', body);
      setLoggedMeal(true);
      /* TODO: To push to the edit meal */
      setTimeout(() => {
        history.push(`/`);
      }, 2500);
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
        <InputBar placeholder="Search for a food" type="text" changeHandler={handleSearch} />
      </div>
      <div id="meal-choices-container" className={`page-content ${styles.pageContent}`}>
        {searchResults ? showSearchResults() : showTabs()}
        <div className={`${styles.addNewMealOption}`}>
          <NavLink to="/create-food">Create a food</NavLink>
        </div>
      </div>
      <SuccessfulAdd meal={meal} loggedMeal={loggedMeal} />
    </div>
  );
};
