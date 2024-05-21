
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useAppContext } from "../../contextApi/AppContext";
import MyComponent from "./CardPayment";

export const AppPayment = () => {
    const [loading, setLoading] = useState(false);
    const [cartItem, setCartItem] = useState([]);
    const params = useParams()
    const location = useLocation();
    const { base_url } = useAppContext()
    const urlParams = new URLSearchParams(location.search);
    const amountTerm = urlParams.get('amount') || null;
    const codTerm = urlParams.get('cod') || '';
    const creditTerm = urlParams.get('credit') || '';
    const manualAddress = urlParams.get('address') || '';
    const note = urlParams.get('note') || '';

    const amount = amountTerm ? parseFloat(amountTerm) : null;
    const cod = amountTerm ? parseFloat(codTerm) : 0;
    const credit = amountTerm ? parseFloat(creditTerm) : 0;

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const req = await fetch(`${base_url}/api/v1/user/cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ cardCode: params.code }),
                });
                const res = await req.json();
                const newitem = res?.data?.Items?.map((item) => ({
                    itemCode: item.itemCode,
                    quantity: item.quantity,
                    price: item.price,
                    whsCode: "PT-FGTG",
                    fright1Amount: item.fright1Amount * item.quantity,
                }));
                setCartItem(newitem || []);
            } catch (error) {
                // toast.error(error);
            } finally{
                setLoading(false)
            }
        }
        if (params.code) {
            fetchCartItems()
        }
    }, [params])

    if (!params.code || cartItem.length === 0 || !amount) {
        return null
    }

    return (
        <div >
            <div className="">
                <div className="">
                    <div className="modal-header text-bg-info">
                        <h5 className="modal-title text-center p-3">Payment Details</h5>
                    </div>
                    {loading ? (
                        <div className="modal-body">
                            <div style={{ width: "4rem", height: "4rem", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="modal-body">
                            <p className="text-center text-bg-warning">Amount to pay {amount.toFixed(2)}</p>
                            <MyComponent amount={amount} selectedItem={cartItem} cashOnDelivery={cod} freeCreditLimit={credit} code={params?.code} manualAddress={manualAddress} note={note} />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}