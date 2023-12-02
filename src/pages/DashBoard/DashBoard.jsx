import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BarChart from "../../components/BarChart";
import "./DashBoard.css";

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
    <div className="page flex-center">
      <div className="dashboard-container flex-center flex-col">
        {adminDetails && (
          <>
            <h1 className="dashboard-title">
              {name}, {location} on Dhun Jam
            </h1>
            <section className="dashboard-section ">
              <section className="questions-section grid-layout">
                <div className="charge-customers-section grid">
                  <p>
                    Do you want to charge your customers for requesting songs?
                  </p>
                  <div className="radio-buttons flex">
                    <label htmlFor="radio-yes" className="radio-label">
                      <input
                        className="radio-input"
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
                    <label htmlFor="radio-no" className="radio-label">
                      <input
                        type="radio"
                        name="radio"
                        id="radio-no"
                        className="radio-input"
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
                <div className="song-charges-section grid">
                  <p>Custom song request amount-</p>
                  <label htmlFor="song-charges" className="input-label">
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
                      className="input-field-dashboard"
                    />
                  </label>
                </div>
                <div className="regular-song-charges-section grid">
                  <p>Regular song request amounts, from high to low-</p>
                  <ul className="grid-four">
                    {[7, 8, 9, 10].map((category) => (
                      <label
                        key={`regular-song-charges-${category}`}
                        htmlFor={`regular-song-charges-${category}`}
                        className="input-label"
                      >
                        <input
                          type="number"
                          id={`regular-song-charges-${category}`}
                          disabled={charge_customers === false}
                          required={charge_customers ? true : false}
                          value={adminDetails.amount[`category_${category}`]}
                          min={(11 - category) * 20}
                          onChange={(event) => {
                            setAdminDetails((prev) => {
                              return {
                                ...prev,
                                amount: {
                                  ...prev.amount,
                                  [`category_${category}`]: Number(
                                    event.target.value
                                  ),
                                },
                              };
                            });
                          }}
                          className="input-field-dashboard"
                        />
                      </label>
                    ))}
                  </ul>
                </div>
              </section>
              {charge_customers && (
                <div className="bar-chart">
                  <BarChart data={adminDetails.amount} className="barchart" />
                </div>
              )}

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
                className="save-button"
              >
                Save
              </button>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
