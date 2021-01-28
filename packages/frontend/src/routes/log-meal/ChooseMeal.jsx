import { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { debounce } from 'debounce';
import { useAuth } from '../../contexts/AuthContext';
import { useMealContext } from '../../contexts/MealContext';
import { searchForDish, addToDiary } from '../../service/api.service';
import styles from '../../styles/ChooseMeal.module.css';
import { Input } from '../../components/input';
import { SearchResults } from '../../components/search-results/SearchResults';
import { SuccessfulAdd } from '../../components/successful-add/SuccessfulAdd';
import { NoSearchResults } from '../../components/no-search-results/NoSearchResults';
import { BigYellowButton } from '../../components/big-yellow-button/BigYellowButton';

const ShowTabs = ({ favouriteTab, setFavouriteTab }) => {
  return (
    <div className={`${styles.tabs}`}>
      <div
        role="button"
        tabIndex="0"
        className={`${styles.tab} ${!favouriteTab ? styles.tabActive : ''}`}
        onClick={() => setFavouriteTab(false)}
        onKeyPress={() => {}}
      >
        All
      </div>
      <div
        role="button"
        tabIndex="0"
        className={`${styles.tab} ${favouriteTab ? styles.tabActive : ''}`}
        onClick={() => setFavouriteTab(true)}
        onKeyPress={() => {}}
      >
        Favourites
      </div>
    </div>
  );
};
const ShowSearchResults = ({ searchResults, logDish }) => {
  return (
    <div className={`${styles.results}`}>
      <div className={`${styles.heading}`}>
        <h1>Search Results</h1>
      </div>
      <div>
        <SearchResults meals={searchResults} logDish={logDish} />
      </div>
    </div>
  );
};
const ShowFavouriteDishes = ({ list, logDish }) => {
  return (
    <div className={`${styles.results}`}>
      <div>
        <SearchResults meals={list} logDish={logDish} />
      </div>
    </div>
  );
};

export const ChooseMeal = () => {
  const history = useHistory();
  const { currUser } = useAuth();
  const { meals, favourites } = useMealContext();
  let { meal } = useParams();
  const [favouriteTab, setFavouriteTab] = useState(false);
  const [loggedMeal, setLoggedMeal] = useState(false);
  const [search, setSearch] = useState();
  const [searchResults, setSearchResults] = useState();
  useEffect(() => {
    if (search) {
      doSearch();
    } else {
      setSearchResults();
    }
    // todo: fix this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  const doSearch = async () => {
    try {
      let results = await searchForDish(currUser.uid, search);
      setSearchResults(results.dishes);
    } catch (e) {
      console.log(e);
    }
  };
  // todo: fix this??
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    debounce((param) => setSearch(param), 600),
    [],
  );
  /* If invalid meal or empty, return to dashboard */
  if (!meals.includes(meal)) {
    return <Redirect to="/dashboard" />;
  }

  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
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
      let newID = await addToDiary(body);
      setLoggedMeal(true);

      setTimeout(() => {
        history.push(`/meal/${newID.id}`);
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
        <Input placeholder="Search for a food" type="text" onChange={handleSearch} />
      </div>
      <div id="meal-choices-container" className="page-content full-page search">
        {!searchResults && (
          <ShowTabs favouriteTab={favouriteTab} setFavouriteTab={setFavouriteTab} />
        )}
        {searchResults ? (
          <ShowSearchResults searchResults={searchResults} logDish={logDish} />
        ) : (
          <>
            {favouriteTab ? (
              <ShowFavouriteDishes list={favourites} logDish={logDish} />
            ) : (
              <div className={`${styles.results}`}>
                <div>
                  <NoSearchResults msg="No recent history" />
                </div>
              </div>
            )}
          </>
        )}
        <div className={`${styles.addNewMealOption}`}>
          <NavLink to={`/create-food/${meals.findIndex((x) => x === meal)}`}>Create a food</NavLink>
        </div>
        <div className={`${styles.button}`}>
          <BigYellowButton text="Return Home" link="dashboard" />
        </div>
      </div>
      <SuccessfulAdd meal={meal} loggedMeal={loggedMeal} />
    </div>
  );
};
