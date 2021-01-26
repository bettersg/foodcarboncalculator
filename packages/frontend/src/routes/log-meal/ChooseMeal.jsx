import { useState, useEffect, useCallback } from 'react';
import { useParams, NavLink, Redirect, useHistory } from 'react-router-dom';
import { debounce } from 'debounce';
import { getData } from '../../common/axiosInstances';
import { Input } from '../../components/input';
import { SearchResults } from '../../components/search-results/SearchResults';
import { SuccessfulAdd } from '../../components/successful-add/SuccessfulAdd';
import { useAuth } from '../../contexts/AuthContext';
import { useMealContext } from '../../contexts/MealContext';
<<<<<<< HEAD
import { getFavouritesList } from '../../service/api.service';
=======
import { NoSearchResults } from '../../components/no-search-results/NoSearchResults';
>>>>>>> mealdetails-afteradd
import styles from '../../styles/ChooseMeal.module.css';
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
<<<<<<< HEAD
    const getFavourites = async () => {
      const favourites = await getFavouritesList(currUser.uid);
      setListOfFavourites(favourites);
    };
    getFavourites();
  }, [currUser.uid]);

  useEffect(() => {
=======
>>>>>>> mealdetails-afteradd
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
      let results = await getData.get(`/dishes?user=${currUser.uid}&keyword=${search}`);
      setSearchResults(results.data.dishes);
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

<<<<<<< HEAD
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
  // const showFavouriteDishes = () => {
  //   return (
  //     <div className={`${styles.results}`}>
  //       <div className={`${styles.heading}`}>
  //         <h1>Search Results</h1>
  //       </div>
  //       <div className={`${styles.resultsContainer}`}>
  //         <SearchResults
  //           meals={searchResults}
  //           favourites={listOfFavourites}
  //           setFavourites={setListOfFavourites}
  //           toggleFavourite={toggleFavourite}
  //           logDish={logDish}
  //         />
  //       </div>
  //     </div>
  //   );
  // }
  console.log(listOfFavourites);
  console.log(searchResults);
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
=======
  const handleSearch = (e) => {
    debouncedSearch(e.target.value);
>>>>>>> mealdetails-afteradd
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
      let newID = await getData.post('/diary', body);
      setLoggedMeal(true);

      setTimeout(() => {
        history.push(`/meal/${newID.data.id}`);
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
      <div id="meal-choices-container" className="page-content full-page">
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
              <NoSearchResults msg="No recent history" />
            )}
          </>
        )}
        <div className={`${styles.addNewMealOption}`}>
          <NavLink to="/create-food">Create a food</NavLink>
        </div>
        <div className={`${styles.button}`}>
          <BigYellowButton text="Return Home" link="dashboard" />
        </div>
      </div>
      <SuccessfulAdd meal={meal} loggedMeal={loggedMeal} />
    </div>
  );
};
