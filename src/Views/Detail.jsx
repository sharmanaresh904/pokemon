import React, { useEffect } from "react";
import '../styles/style.css';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import { setPokemonDetail, pokemonSelector, fetchPokemonDetail } from "../redux/features/pokemon/pokemonSlice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    list,
    loading,
    pokemonDetail = {},
  } = useSelector(pokemonSelector);

  useEffect(() => {
    if (list.length) {
      dispatch(setPokemonDetail(list.find(pokemon => pokemon.id == id)));      
    } else {
      dispatch(fetchPokemonDetail(id));
    }
  }, [id]);

  const featureTable = () => (
    <div className="my-4">
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Feature</span>
        </div>
        <div class="col-sm">
          <span className="font-weight-bold">Amount</span>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Height</span>
        </div>
        <div class="col-sm">
          <span className="">{pokemonDetail.height}</span>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Weight</span>
        </div>
        <div class="col-sm">
          <span className="">{pokemonDetail.weight}</span>
        </div>
      </div>
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Abilities</span>
        </div>
        <div class="col-sm">
          {pokemonDetail.abilities.map((ability) => (
            <div className="">{ability.ability.name}</div>
          ))}
        </div>
      </div>
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Moves</span>
        </div>
        <div class="col-sm">
          {pokemonDetail.moves.map((move) => (
            <div className="">{move.move.name}</div>
          ))}
        </div>
      </div>
      <div class="row border">
        <div class="col-sm border-right">
          <span className="font-weight-bold">Stats</span>
        </div>
        <div class="col-sm">
          {pokemonDetail.stats.map((stat) => (
            <div className=""><span className="font-weight-bold">{stat.stat.name}: </span><span>{stat.base_stat}</span></div>
          ))}
        </div>
      </div>
    </div>
  )

  if (!pokemonDetail.id) return null;
  if (loading) return <h1>Loading...</h1>;
  return(
    <div className="container">
      <Link to={'/'}><h2><BiArrowBack />Back</h2></Link>
      <h1>{pokemonDetail.name}</h1>
      <div className="d-flex justify-content-center">
        <img className="detail-img" src={pokemonDetail.sprites.front_default} alt="Card cap"></img>
      </div>
      {featureTable()}
    </div>
  )
};

export default Detail;