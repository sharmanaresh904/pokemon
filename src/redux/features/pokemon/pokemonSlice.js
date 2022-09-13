import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../../Constant";

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
      pokemons: {
        loading: false,
        error: '',
        pokemonDetail: {},
        list: [],
        nextUrl: apiURL,
        prevUrl: '',
      },
    },
    reducers: {
      getPokemons: (state) => {
        state.pokemons.loading = true;
        state.pokemons.list = [];
      },
      getPokemonsSuccess: (state, { payload }) => {
        if (!(state.pokemons.list.find((poke) => poke.id == payload?.id))?.id)
          state.pokemons.list = [...state.pokemons.list, payload];
        state.pokemons.loading = false;
        state.pokemons.error = '';
      },
      getPokemonsError: (state, { payload }) => {
        state.pokemons.loading = false;
        state.pokemons.error = payload;
      },
      setPokemonDetail: (state, { payload }) => {
        state.pokemons.pokemonDetail = payload;
      },
      getPokemonDetail: (state) => {
        state.pokemons.loading = true;
      },
      getPokemonDetailSuccess: (state, { payload }) => {
        state.pokemons.loading = false;
        state.pokemons.pokemonDetail = payload;
        state.pokemons.error = '';
      },
      getPokemonDetailError: (state, { payload }) => {
        state.pokemons.loading = false;
        state.pokemons.error = payload;
      },
      setPaginationUrl: (state, { payload }) => {
        state.pokemons.nextUrl = payload.nextUrl;
        state.pokemons.prevUrl = payload.prevUrl;
      }
    }
})

export const {
  getPokemons,
  getPokemonsSuccess,
  getPokemonsError,
  setPaginationUrl,
  setPokemonDetail,
  getPokemonDetail,
  getPokemonDetailSuccess,
  getPokemonDetailError,
} = pokemonSlice.actions;

export const pokemonSelector = (state) => state.pokemon.pokemons;

export default pokemonSlice.reducer;

export function getPokemonList(link) {
  return async (dispatch) => {
    try {
      dispatch(getPokemons());
      const { data: { next, previous, results }} = await axios.get(link);
      dispatch(setPaginationUrl({ nextUrl: next, prevUrl: previous }));
      results.map(async (res) => {
        const response = await axios.get(res.url)
        dispatch(getPokemonsSuccess(response.data));
      });
    } catch (error) {
      dispatch(getPokemonsError(error));
    }
  }
}

export function fetchPokemonDetail(id) {
  return async (dispatch) => {
    try {
      dispatch(getPokemonDetail());
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      dispatch(getPokemonDetailSuccess(response.data));
    } catch (error) {
      dispatch(getPokemonDetailError(error));
    }
  }
}