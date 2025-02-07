import { useEffect, useState } from "react"; // importing things we need from react so react can work.
import "./App.css"; //importing the css

// const id = 10;
// const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
const url = "https://pokeapi.co/api/v2/pokemon/33/";
const splitUrl = url.split("/");
console.log(splitUrl);
console.log(splitUrl[6]);
const urlObject = new URL("https://pokeapi.co/api/v2/pokemon/33/");

function App() {
  //this function is called app
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon"); //url. later we say fetch from this url. its set/usestate because vi have pagination. next previous buttons. url changes based on this.
  const [pokemon, setPokemon] = useState([]); // we say the state value is pokemon(s) and the function is setPokemon. state is something that will change and setPokemon will make it change. usestate is an empty array at default to fill in pokemons there later.
  const [previousUrl, setPreviousUrl] = useState(""); // for previous button. state value previousUrl. setPreviousUrl makes it change. empty at default.
  const [nextUrl, setNextUrl] = useState(""); // for next button. state value nextUrl. setNextUrl makes it change. empty at default.
  useEffect(() => {
    //preforms side effects. like fetching api etc. doing things outside the dom.
    async function getData() {
      // saying to javascript that it needs to wait, because we are getting stuff from databses for example.
      const res = await fetch(url); // saying res means we have to wait for fetching from the url.
      const data = await res.json(); // saying that data means we wait for res ^ to be json'ed.
      console.log(data.results); // logs out the result
      setPreviousUrl(data.previous); // previous is built in the api. shows previous page in the list of pokemon.
      setNextUrl(data.next); // next is built in the api . shows next page in the list of pokemon.
      setPokemon(data.results); // saying that setPokemon (what will make the sate value change) should interfear with the fetching results. it re renders. getting the newest update from database.
    }
    getData(); // activates the whole function getData
  }, [url]); //
  return (
    //returning a html displaying everything after fetching.
    <>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-xl font-bold text-red-500">
          Welcome to the <img src="./src/assets/pokilogo.png" alt="Pokemon" />
        </h1>{" "}
        <h2 className="text-xl font-bold text-red-500">finder website!</h2>
      </div>
      {/* main heading ^ */}
      <div className="pokemon-container flex flex-row flex-wrap justify-center items-center text-center p-4">
        {/* container for the whole pokemon section ^ */}
        {pokemon.map((pokemon) => {
          // we loop over each pokemon in a new array using map. the array have elements. each element is an object with id, info, name etc. for each/every pokemon, run this function , it says.
          const splitString = pokemon.url.split("/"); // we need to split the url every /. so we get the id for itself. else we need to fetch each pokemon. not gonna happen!
          const id = splitString[6]; //after we split, we say on the 6th / is where the pokemons id is, and we need that.
          // Compute a dynamic image URL for this specific Pokémon:
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; //images for api from github. url.

          return (
            <div key={pokemon.name}>
              <h2 className="capitalize">{pokemon.name}</h2>
              <img src={imageUrl} alt={pokemon.name} />
            </div>
          );
        })}
      </div>
      <div>
        {" "}
        {/* we make a new div for the prev, next buttons.  */}
        {previousUrl ? ( // if true that there is a prevous url, checks if not null or empty sting, shows previous button.
          <button
            onClick={() => {
              setUrl(previousUrl); // when button is clicked, it changes the url to the previous url/go back.
            }}
          >
            prev
          </button>
        ) : (
          <button disabled>prev</button> //if false, the button will be disabled/cant click on.
        )}
        {nextUrl ? ( // if true that there is a next url, checks if not null or empty sting, if true shows next button.
          <button
            onClick={() => {
              setUrl(nextUrl); //when button is clicked it changes the url to the next url/go to next page
            }}
          >
            next
          </button>
        ) : (
          <button disabled>next</button> // if no next page/url, disable button and cant be clicked
        )}
      </div>
    </>
  );
}

export default App; // exporting the whole app function.
