import React from "react";
import { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

import '../styles/style.css';

const Card = ({pokemon, loading}) => {
  const [searchInput, setSearchInput] = useState('');

  return(
    <>
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback">
          <RiSearch2Line className="search-icon" />
        </span>
        <input
          type="text"
          className="form-control"
          onChange={event => {setSearchInput(event.target.value)}}
          placeholder="Search"
        />
      </div>

      <div className="row card-row">
        {loading ? <h1>Loading...</h1> :
          pokemon.filter((item) => {
            if (searchInput === "") {
              return item
            } else if (item.name.toLowerCase().includes(searchInput.toLowerCase())){
              return item
            }
          }).sort(function(a, b) {
            return a.id - b.id;
          }).map((item) => {
            return (                                
              <Link to={`pokemon/${item.id}`} className="col-md-3">
                <div className="card poke-card" key={item.id} >
                  <img className="card-img-top card-img" src={item.sprites.front_default} alt="Card cap" />
                  <div className="card-body">
                    <h3 className="card-title poke-name">{item.name}</h3>
                    <h5 className="card-title poke-name">#{item.id}</h5>
                  </div>
                </div>
              </Link>                            
            )
          })
        }
      </div>
    </>        
  )
}

export default Card;