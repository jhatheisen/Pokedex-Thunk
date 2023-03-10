import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../store/items";
import { deleteItem } from "../store/items";

const PokemonItems = ({ pokemon, setEditItemId }) => {

  const dispatch = useDispatch();
  const pokemonId = pokemon.id;
  // let deleted = false;

  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });

  const stateItems = useSelector(state => state.items);

  console.log('items from stateItems: ', stateItems);

  useEffect(() => {
    dispatch(getItems(pokemonId));
  }, [pokemonId, dispatch]);

  if (!items) {
    return null;
  }


  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => {
            dispatch(deleteItem(item));
            // deleted = true;
            }
          }>
            Delete
          </button>
        </td>

      )}
    </tr>
  ));
};

export default PokemonItems;
