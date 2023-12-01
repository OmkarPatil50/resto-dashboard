import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DashBoard = () => {
  const previousLocationData = useLocation();
  const [originalData, setOriginalData] = useState({});
  const [adminDetails, setAdminDetails] = useState({
    amount: {
      category_6: 0,
      category_7: 0,
      category_8: 0,
      category_9: 0,
      category_10: 0,
    },
    business_type: "",
    charge_customers: false,
    display_amount: false,
    hosts: [],
    id: 0,
    location: "",
    name: "",
  });

  const updateData = async () => {
    try {
      const changedAmountData = {};
      for (const category in adminDetails.amount) {
        if (adminDetails.amount[category] !== originalData[category]) {
          changedAmountData[category] = adminDetails.amount[category];
        }
      }
      const response = await fetch(
        `https://stg.dhunjam.in/account/admin/${previousLocationData.state}`,
        {
          method: "PUT",
          body: JSON.stringify({
            amount: changedAmountData,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const result = await response.json();
      setAdminDetails((prev) => ({
        ...prev,
        amount: { ...prev.amount, ...result.data.amount },
      }));
    } catch (error) {}
  };

  const getData = async () => {
    try {
      const response = await fetch(
        `https://stg.dhunjam.in/account/admin/${previousLocationData.state}`
      );
      const result = await response.json();
      setAdminDetails(result.data);
      setOriginalData(result.data.amount);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const {
    amount: { category_6, category_7, category_8, category_9, category_10 },
    charge_customers,
    location,
    name,
  } = adminDetails;

  return (
    <div>
      {adminDetails && (
        <>
          <h1>
            {name}, {location} on Dhun Jam
          </h1>
          <section>
            <div>
              <p>Do you want to charge your customers for requesting songs?</p>
              <div>
                <label htmlFor="radio-yes">
                  <input
                    type="radio"
                    name="radio"
                    id="radio-yes"
                    checked={charge_customers === true}
                    onChange={() => {
                      setAdminDetails((prev) => {
                        return { ...prev, charge_customers: true };
                      });
                    }}
                  />{" "}
                  Yes
                </label>
                <label htmlFor="radio-no">
                  <input
                    type="radio"
                    name="radio"
                    id="radio-no"
                    checked={charge_customers === false}
                    onChange={() => {
                      setAdminDetails((prev) => {
                        return { ...prev, charge_customers: false };
                      });
                    }}
                  />{" "}
                  No
                </label>
              </div>
            </div>
            <div>
              <p>Custom song request amount-</p>
              <label htmlFor="song-charges">
                <input
                  type="number"
                  id="song-charges"
                  disabled={charge_customers === false}
                  required={charge_customers ? true : false}
                  value={category_6}
                  min="99"
                  onChange={(event) => {
                    setAdminDetails((prev) => {
                      return {
                        ...prev,
                        amount: {
                          ...prev.amount,
                          category_6: event.target.value,
                        },
                      };
                    });
                  }}
                />
              </label>
            </div>
            <div>
              <p>Regular song request amounts, from high to low-</p>
              <label htmlFor="regular-song-charges-1">
                <input
                  type="number"
                  id="regular-song-charges-1"
                  disabled={charge_customers === false}
                  required={charge_customers ? true : false}
                  value={category_7}
                  min="79"
                  onChange={(event) => {
                    setAdminDetails((prev) => {
                      return {
                        ...prev,
                        amount: {
                          ...prev.amount,
                          category_7: event.target.value,
                        },
                      };
                    });
                  }}
                />
              </label>
              <label htmlFor="regular-song-charges-2">
                <input
                  type="number"
                  id="regular-song-charges-2"
                  disabled={charge_customers === false}
                  required={charge_customers ? true : false}
                  value={category_8}
                  min="59"
                  onChange={(event) => {
                    setAdminDetails((prev) => {
                      return {
                        ...prev,
                        amount: {
                          ...prev.amount,
                          category_8: event.target.value,
                        },
                      };
                    });
                  }}
                />
              </label>
              <label htmlFor="regular-song-charges-3">
                <input
                  type="number"
                  id="regular-song-charges-3"
                  disabled={charge_customers === false}
                  required={charge_customers ? true : false}
                  value={category_9}
                  min="39"
                  onChange={(event) => {
                    setAdminDetails((prev) => {
                      return {
                        ...prev,
                        amount: {
                          ...prev.amount,
                          category_9: event.target.value,
                        },
                      };
                    });
                  }}
                />
              </label>
              <label htmlFor="regular-song-charges-4">
                <input
                  type="number"
                  id="regular-song-charges-4"
                  disabled={charge_customers === false}
                  required={charge_customers ? true : false}
                  value={category_10}
                  min="19"
                  onChange={(event) => {
                    setAdminDetails((prev) => {
                      return {
                        ...prev,
                        amount: {
                          ...prev.amount,
                          category_10: event.target.value,
                        },
                      };
                    });
                  }}
                />
              </label>
            </div>

         

            <button
              disabled={
                charge_customers === false ||
                category_6 < 99 ||
                category_7 < 79 ||
                category_8 < 59 ||
                category_9 < 39 ||
                category_10 < 19
              }
              onClick={updateData}
            >
              Save
            </button>
          </section>
        </>
      )}
    </div>
  );
};

export default DashBoard;
