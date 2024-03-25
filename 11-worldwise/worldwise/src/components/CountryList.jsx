import React from "react";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;

  if (cities.length === 0) return <Message message={"Add your first city!"} />;

  const countries = cities.reduce((acc, city) => {
    if (acc.map((el) => el.country).includes(city.country)) return acc;
    return [...acc, { country: city.country, emoji: city.emoji }];
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
