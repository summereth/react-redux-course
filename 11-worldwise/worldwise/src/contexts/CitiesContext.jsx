import React, { useReducer } from "react";
import { useContext, createContext, useEffect, useCallback } from "react";

const CitiesContext = createContext();
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action in CitiesProvider reducer.");
  }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      dispatch({ type: "loading" });
      const res = await fetch("http://localhost:8000/cities");
      const data = await res.json();
      dispatch({ type: "cities/loaded", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error fetching data" });
    }
  }

  /**
   * Set currentCity with given cityId, which can be retrieved from url params.
   * This function updates the context's state, which leads to a re-render and the function will be re-created again.
   * Thus, we memoize the function here, to avoid inifite loop (e.g. in useEffect) when using this function in other hooks
   * @param {*} id cityId retrieved from url
   * @returns
   */
  const getCity = useCallback(
    async function getCity(id) {
      if (id === currentCity.id) return;
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`http://localhost:8000/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch {
        dispatch({ type: "rejected", payload: "Error fetching data" });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({ type: "rejected", payload: "Error updating data" });
    }
  }

  async function deleteCity(cityId) {
    try {
      dispatch({ type: "loading" });
      await fetch(`http://localhost:8000/cities/${cityId}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: cityId });
    } catch {
      dispatch({ type: "rejected", payload: "Error deleting data" });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext is used outside of provider");
  return context;
}

export { CitiesProvider, useCities };
