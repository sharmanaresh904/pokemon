import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Components/Card";
import { apiURL } from "../Constant";
import { getPokemonList, pokemonSelector } from "../redux/features/pokemon/pokemonSlice";
import '../styles/style.css';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const Home = () => {
  const dispatch = useDispatch();
  const {
    list,
    loading,
    nextUrl,
    prevUrl,
  } = useSelector(pokemonSelector);

  const prevPage = () => {
    dispatch(getPokemonList(prevUrl));
  };

  const nextPage = () => {
    dispatch(getPokemonList(nextUrl));
  };

  useEffect(() => {
    dispatch(getPokemonList(apiURL));
  }, []);

  return(
    <div className="container">
      <Card pokemon={list} loading={loading}></Card>
      <div className="my-3 d-flex justify-content-center">
        <button
          type="button"
          disabled={prevUrl == ''}
          className="btn btn-func"
          title="Prev"
          onClick={prevPage}
        >
          <FaAngleLeft />
        </button>
        <button
          type="button"
          className="btn btn-func"
          onClick={nextPage}
          title="Next"
        >
          <FaAngleRight />
        </button>
      </div>              
    </div>
  )
};

export default Home;