import { Spinner } from "react-bootstrap";
import style from "./menu.module.css";
import {
  useAppDispatch,
  useAppSelector,
} from "../../services/store/store.types";
import { addToCart } from "../../services/slices/cart/cart";
import { MenuElement, MenuObject } from "../../services/slices/menu/menu.types";
//
const Menu = () => {
  const dispatch = useAppDispatch();

  const { menu } = useAppSelector((state) => state.menu);
  const pizzaData: MenuElement = menu[0];
  const saladData: MenuElement = menu[1];
  const rollData: MenuElement = menu[2];
  const drinkData: MenuElement = menu[3];
  const generateData = (data: MenuObject[]) =>
    data.map((element) => (
      <li key={element._id} className={style.item}>
        {element.isNewProduct ? (
          <div className={style.itemLabel}>new</div>
        ) : null}
        <img className={style.itemImage} src={element.img} alt={element.name} />
        <h3 className={style.itemTitle}>{element.name}</h3>
        <p className={style.itemDescription}>{element.description}</p>
        <div className={style.itemFooter}>
          <div className={style.itemPrice}>от {element.price} ₽</div>
          <button
            onClick={() => {
              dispatch(addToCart({ ...element, amount: 1 }));
            }}
            className={style.button}
          >
            В корзину
          </button>
        </div>
      </li>
    ));

  if (pizzaData && rollData && saladData && drinkData) {
    return (
      <section>
        <article className={style.category}>
          <h2 className={style.title}>Пицца</h2>
          <ul className={style.list}>{generateData(pizzaData.pizzas)}</ul>
        </article>
        <article className={style.category}>
          <h2 className={style.title}>Роллы</h2>
          <ul className={style.list}>{generateData(rollData.rolls)}</ul>
        </article>
        <article className={style.category}>
          <h2 className={style.title}>Салаты</h2>
          <ul className={style.list}>{generateData(saladData.salads)}</ul>
        </article>
        <article className={style.category}>
          <h2 className={style.title}>Напитки</h2>
          <ul className={style.list}>{generateData(drinkData.drinks)}</ul>
        </article>
      </section>
    );
  }
  return <Spinner />;
};

export default Menu;