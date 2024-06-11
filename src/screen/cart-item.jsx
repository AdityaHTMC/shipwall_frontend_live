import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";

export const CartItem = ({
  item,
  decrementQuantity,
  incrementQuantity,
}) => {
  const { removeCartItem, updateQuantity } =
    useAppContext();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    if (item?.quantity) {
      setQuantity(item.quantity);
    }
  }, [item?.quantity]);

  useEffect(() => {
    const update = async () => {
        if(Number(quantity) !== item.quantity){
            await updateQuantity(item.itemCode, Number(quantity), Number(quantity) * item.price);
        }
    };

    const timeInterval = setTimeout(() => {
        update()
    }, 600)

    return () => {
        clearTimeout(timeInterval)
    }
  }, [quantity, item.quantity]);

  return (
    <tr key={item.itemCode}>
      <td>
        <div className="d-flex flex-column">
          <Link
            // to={`/product-details/${item._id}`}
            className="nav-link"
          >
            <img
              src={item.image1}
              className="border rounded me-3"
              style={{
                maxWidth: "90px",
                maxHeight: "90px",
              }}
              alt={""}
            />
            <div className="product-name">
              {item.itemName ? item.itemName?.slice(0, 15) : ""}
            </div>
          </Link>
        </div>
      </td>
      {/* <td>1</td> */}
      <td>
        <div className="text-muted text-nowrap align-items-center gap-1 m-auto d-flex">
          <button
            onClick={() =>
              decrementQuantity(item.itemCode, item.quantity, item.price)
            }
            className="btn btn-outline-secondary border-0"
          >
            <i className="fa-solid fa-minus"></i>
          </button>
          {/* <span className="p-2">{item.quantity}</span> */}
          <input
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            min={1}
            type="number"
            placeholder=""
            style={{ height: 40, padding: "10px 5px", width: 100 }}
            // className={!mobileValid ? "invalid" : ""}
          />

          <button
            onClick={() =>
              incrementQuantity(item.itemCode, item.quantity, item.price)
            }
            className="btn btn-outline-secondary border-0"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </td>
      <td>{item.price?.toFixed(2)}</td>
      <td>{(item.quantity * item.price)?.toFixed(2)}</td>
      <td>{(item.quantity * item.fright1Amount)?.toFixed(2)}</td>
      <td>{((item.quantity * item.price * item.taxPerc) / 100)?.toFixed(2)}</td>
      <td>
        {(
          item.quantity * (item.price + item.fright1Amount) +
          item.quantity * item.price * (item.taxPerc / 100)
        )?.toFixed(2)}
      </td>
      <td>
        <button
          onClick={() => {
            removeCartItem(item.itemCode);
          }}
          className="btn btn-light border text-danger icon-hover-danger"
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
