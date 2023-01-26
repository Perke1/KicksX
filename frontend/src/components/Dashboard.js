import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";
import { notify } from "../hooks/notify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  PencilSquareIcon,
  MinusCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const uid = user.id;

  useEffect(() => {
    console.log("triggering use effect");
    const fetchData = async () => {
      const userData = await axios.get(
        `http://localhost:3001/getUserData/${uid}`
      );

      console.log("FETCHING...");

      setUserData(userData.data);
      setLoading(false);
    };
    if (userData !== []) {
      fetchData().catch((e) => console.error(e));
    } else {
      setUserData([]);
    }
  }, [uid]);

  const deleteUserBid = (bid) => {
    const { id, name, price, size } = bid;
    const payload = {
      uid: uid,
      id: id,
      name: name,
      price: price,
      size: size,
    };

    axios
      .post("http://localhost:3001/deleteBid", payload)
      .then((response) => notify(response.data, "success"))
      .catch((err) => console.warn(err));

    setUserData({
      ...userData,
      bids: userData.bids.filter((bid) => bid.id !== id),
    });

    console.log(userData.bids);

    // TO DO REFRESH DATA ON PAGE
  };
  console.log(userData);
  const editUserBid = (bid) => {};

  const test = !loading && userData.bids !== undefined;

  return (
    <>
      <div className="text-center mt-5 text-white">
        <h2 className="text-2xl font-medium">DASHBOARD</h2>
        <div className="text-lg relative mt-5 left-0 right-0">
          <p className="mb-5">YOUR UID: {uid}</p>
          <button onClick={() => dispatch(logout())} className="button">
            Logout
          </button>
        </div>
        {test &&
          (console.log(userData),
          (
            <>
              <h1>BIDS:</h1>
              {userData.bids.length > 1 &&
                userData.bids.map((bid) => {
                  const { id, name, price, size } = bid;
                  const condition = id.length > 0;
                  return (
                    <div key={id} className="flex justify-center gap-4">
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                          <PencilSquareIcon className="h-5 w-5" />
                          <MinusCircleIcon
                            onClick={() => deleteUserBid(bid)}
                            className="h-5 w-5"
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              <h1>ASKS:</h1>
              {userData.asks.length > 1 !== "" &&
                userData.asks.map((ask) => {
                  const { id, name, price, size } = ask;
                  const condition = id.length > 0;
                  return (
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  );
                })}
              <h1>PURCHASES:</h1>
              {userData.purchases.length > 1 !== "" &&
                userData.purchases.map((purchase) => {
                  const { id, name, price, size } = purchase;
                  const condition = id.length > 0;
                  return (
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  );
                })}
              <h1> SALES:</h1>
              {userData.sales.length > 1 !== "" &&
                userData.sales.map((sale) => {
                  const { id, name, price, size } = sale;
                  const condition = id.length > 0;
                  return (
                    <div key={id}>
                      {condition && (
                        <>
                          <h1>
                            {name} {size}, ${price}
                          </h1>
                        </>
                      )}
                    </div>
                  );
                })}
            </>
          ))}
        <Link to={"/settings"}>GENERAL SETTINGS</Link>
      </div>
    </>
  );
};

export default Dashboard;
