import React, { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../../contextApi/AppContext";

const MyComponent = ({amount,selectedItem,cashOnDelivery,freeCreditLimit, manualAddress, note, code}) => {
  const [cardtoken , setCardtoken] = useState("")
  const [paymentCreated, setPaymentCreated] = useState(false);

  const {Createpayment} = useAppContext()


  useEffect(() => {
    const loadScript = async () => {
      try {
        // Dynamically load the securePayUI script
        const script = document.createElement("script");
        script.id = "securepay-ui-js";
        script.src =
          "https://payments.auspost.net.au/v3/ui/client/securepay-ui.min.js";
        script.async = true;
        document.body.appendChild(script);

        // Wait for the script to be loaded
        await new Promise((resolve) => {
          script.onload = resolve;
        });
  

        // Initialize securePayUI once the script is loaded
        window.mySecurePayUI = new window.securePayUI.init({
          containerId: "securepay-ui-container",
          scriptId: "securepay-ui-js",
          clientId: "G37yGcxKnSKW4gOU6VGbcvkEROHEMWAr",
          merchantCode: "6KB0031",
          style: {
            backgroundColor: 'rgba(135, 206, 250)',
            label: {
              font: {
                family: 'Arial, Helvetica, sans-serif',
                size: '1.1rem',
                color: 'black'
              }
            },
            input: {
              font: {
                family: 'Arial, Helvetica, sans-serif',
                size: '1.1rem',
                color: 'darkblue'
              }
            }
          },
          card: {
            onTokeniseSuccess: async function (tokenisedCard) {
                await Createpayment(
                  tokenisedCard.token,
                  selectedItem,
                  cashOnDelivery,
                  freeCreditLimit,
                  amount,
                  manualAddress,
                  note,
                  code || null
                );
            },
          },
          onLoadComplete: function () {
            // The SecurePay UI Component has successfully loaded
            // setPaymentCreated(true)
          },
        });

        // Cleanup when the component unmounts
        return () => {
          window.mySecurePayUI.reset(); // Assuming reset function exists in securePayUI
        };
      } catch (error) {
        console.error("Error loading or initializing securePayUI:", error);
      }
    };

    loadScript();
  }, []); // Empty dependency array to ensure the effect runs once on mount

  const handleSubmit = () => {
    if (window.mySecurePayUI) {
      window.mySecurePayUI.tokenise();
    } else {
      console.error("SecurePayUI not initialized yet");
    }
  };

  const handleReset = () => {
    if (window.mySecurePayUI) {
      window.mySecurePayUI.reset();
    } else {
      console.error("SecurePayUI not initialized yet");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="container mt-5">
      <div
        id="securepay-ui-container"
        className="mb-3 d-flex justify-content-center item-center p-3"
        style={{ backgroundColor: 'rgba(135, 206, 250)' }}
      ></div>
      <button onClick={handleSubmit} className="btn btn-primary me-2">
        Submit
      </button>
      <button onClick={handleReset} className="btn btn-secondary">
        Reset
      </button>
    </form>
  );
};

export default MyComponent;
