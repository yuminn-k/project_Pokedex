import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchPokemonsAPI,
  PokemonListResponseType,
} from "../Service/pokemonService";

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async (nextUrl?: string) => {
    const response = await fetchPokemonsAPI(nextUrl);
    return response;
  }
);

interface PokemonsState {
  pokemons: PokemonListResponseType;
}

const initialState = {
  pokemons: {
    count: 0,
    next: "",
    results: [],
  },
} as PokemonsState;

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchPokemons.fulfilled,
      (state, action: PayloadAction<PokemonListResponseType>) => {
        if (state.pokemons.results.length > 0) {
          state.pokemons = {
            ...action.payload,
            results: [...state.pokemons.results, ...action.payload.results],
          };
        } else {
          state.pokemons = action.payload;
        }
      }
    );
  },
});

export const pokemonsReducer = pokemonsSlice.reducer;
