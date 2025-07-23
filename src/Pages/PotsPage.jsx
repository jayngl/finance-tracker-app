import React, { useState } from "react";
import { FaPlus, FaTimesCircle } from "react-icons/fa";
import useCrud from "../CustomHooks/useCRUD";
import SinglePot from "../Components/SinglePot";
import Spinners from "../Components/Spinners";
import ProgressBar from "@ramonak/react-progress-bar";

const PotsPage = () => {
  const [formModalVisibiliy, setFormModalVisibility] = useState(false);
  const [potNameCount, setPotNameCount] = useState(30);
  const [colorCode, setColorCode] = useState("green");
  const [potName, setPotName] = useState("");
  const [target, setTarget] = useState(0);
  const [amountSaved, setAmountSaved] = useState(0);
  const [moneyModalVisibiliy, setMoneyModalVisibiliy] = useState(false);
  const [singularPotData, setSingularPotData] = useState({});
  const [newAddAmount, setnewAddAmount] = useState(0);
  const [withdrawModalVisibiliy, setWithdrawModalVisibiliy] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const [singlePotId, setSinglePotId] = useState("");
  // get id from single pot and open the modal also filter all the pots

  // --------------------------------------------------
  const {
    postPotsData,
    PotsData,
    isPotsLoading,
    putPotAmount,
    withDrawFromPot,
    deletePot,
    editPot,
  } = useCrud();

  const handleAddMoney = (data) => {
    setSinglePotId(data);
    setMoneyModalVisibiliy(true);
    console.log(moneyModalVisibiliy);
    const singlePlot = PotsData.filter((el) => {
      return el.id === data;
    });
    setSingularPotData(singlePlot[0]);
    console.log(singlePlot);
  };

  const handleWithdraw = (data) => {
    setSinglePotId(data);
    setWithdrawModalVisibiliy(true);
    const singlePlot = PotsData.filter((el) => {
      return el.id === data;
    });
    setSingularPotData(singlePlot[0]);
    console.log(singlePlot);
  };

  const handleDelete = (data) => {
    deletePot(data);
  };

  const handleEdit = (data) => {
    // editPot(data);
    setIsEditing(true);
    setFormModalVisibility(!formModalVisibiliy);

    const singlePot = PotsData.filter((el) => {
      return el.id === data;
    });
    // setSingularPotData(singlePot[0]);

    setColorCode(singlePot[0].colorCode);
    setPotName(singlePot[0].potName);
    setTarget(singlePot[0].target);
    setAmountSaved(singlePot[0].amountSaved);
    setSinglePotId(singlePot[0].id);
  };

  // ------------------------------------------------------

  const handleFormData = (e) => {
    e.preventDefault();

    const newPotItem = {
      potName: potName,
      target: target,
      colorCode: colorCode,
      amountSaved: 0,
    };

    console.log(newPotItem);
    postPotsData(newPotItem);
  };

  const handlePotAmountUpdate = (e) => {
    e.preventDefault();

    const newAmount = {
      amountSaved: Number(newAddAmount) + Number(singularPotData.amountSaved),
      id: singlePotId,
    };
    putPotAmount(newAmount);
  };

  const handlePotAmounWithdraw = (e) => {
    e.preventDefault();

    const newAmount = {
      amountSaved: Number(singularPotData.amountSaved) - Number(withdrawAmount),
      id: singlePotId,
    };
    withDrawFromPot(newAmount);
  };

  const handleEditForm = (e) => {
    e.preventDefault();

    const potEdit = {
      potName: potName,
      target: target,
      colorCode: colorCode,
      amountSaved: amountSaved,
      id: singlePotId,
    };

    editPot(potEdit);
  };

  return (
    <section
      className={`relative min-h-screen w-full flex justify-center items-start  bg-main-bg`}
    >
      <div className="h-full w-full flex justify-start items-center flex-col lg:px-5 px-3 pb-5">
        <div className="flex justify-between items-center lg:px-4 w-full">
          <h1 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold my-5">
            Pots
          </h1>
          <button
            className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] cursor-pointer hover:brightness-75 text-white
                          text-[clamp(.9rem,2vw,1rem)]
                       "
            onClick={() => {
              setFormModalVisibility(!formModalVisibiliy);
            }}
          >
            <FaPlus className="inline-block mr-2 mb-1 " />
            Add new budget
          </button>
        </div>

        <div className="w-full  grid grid-cols-1 gap-3 lg:grid-cols-2   ">
          {isPotsLoading ? (
            <Spinners isLoading={isPotsLoading} />
          ) : Object.entries(PotsData).length <= 0 ? (
            <h1 className="w-full h-full flex justify-center items-center text-[1.2rem]">
              No Pots Yet Add A Pot...
            </h1>
          ) : (
            Object.values(PotsData).map((el, index) => {
              return (
                <SinglePot
                  key={index}
                  title={el.potName}
                  totalSaved={el.amountSaved}
                  target={el.target}
                  id={el.id}
                  colorCode={el.colorCode}
                  onSendData={handleAddMoney}
                  onSendID={handleWithdraw}
                  onSendDeleteId={handleDelete}
                  onSendEditId={handleEdit}
                />
              );
            })
          )}
        </div>
      </div>
      {/* add pots form */}
      <div
        className={`w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10  ${
          formModalVisibiliy ? "flex " : "hidden "
        }`}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[50%]  justify-center items-center flex-col flex fixed top-10`}
          onSubmit={isEditing ? handleEditForm : handleFormData}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              {isEditing ? "Edit Pot" : "Pots Form"}
            </h1>
            <FaTimesCircle
              onClick={() => {
                setFormModalVisibility(!formModalVisibiliy);
                setIsEditing(false);
              }}
              className="text-xl"
            />
          </div>

          <p className="py-3">
            {isEditing === false &&
              "Create a pot to set savings targets. These can help keep you on track as you save for special purchases."}
          </p>

          <label htmlFor="potName" className="w-full mb-2 font-bold text-gray">
            Pot Name
          </label>
          <input
            type="text"
            name="potName"
            maxLength={30}
            className="w-full mb-2 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            placeholder="eg. Vacation"
            value={potName}
            onChange={(e) => {
              setPotNameCount(30 - Number(e.target.value.length));
              setPotName(e.target.value);
            }}
            required
          />
          <h3 className="w-full text-right text-[.9rem]">
            {potNameCount} Characters Left
          </h3>
          <label htmlFor="target" className="w-full mb-2 font-bold text-gray">
            Target
          </label>
          <input
            type="text"
            placeholder="eg. $50"
            id="target"
            name="target"
            className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] outline-0"
            value={target}
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            required
          />
          <label
            htmlFor="colorCode"
            className="w-full mb-2 font-bold text-gray"
          >
            Color Code
          </label>
          <div className="w-full mb-4 border-1 border-gray-400 py-2.5 px-2 rounded-[.5rem] flex justify-center items-center">
            <div
              className={`w-3 h-3  rounded-full mr-2`}
              style={{ backgroundColor: colorCode }}
            ></div>

            <select
              name="colorCode"
              id="colorCode"
              className="w-full  outline-0"
              value={colorCode}
              onChange={(e) => {
                setColorCode(e.target.value);
              }}
              required
            >
              <option value="green">Green</option>
              <option value="blue">Blue</option>
              <option value="yellow">yellow</option>
              <option value="gray">Gray</option>
            </select>
          </div>
          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            {isEditing ? "Edit Pot" : "Add Pot"}
          </button>
        </form>
      </div>

      {/* add money form */}
      <div
        className={`  ${
          moneyModalVisibiliy ? "flex " : "hidden "
        }w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10`}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[40%]  justify-center items-center flex-col flex fixed top-20 lg:right-[25%]`}
          onSubmit={handlePotAmountUpdate}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Add to ‘Savings’
            </h1>
            <FaTimesCircle
              onClick={() => {
                setMoneyModalVisibiliy(!moneyModalVisibiliy);
              }}
              className="text-xl"
            />
          </div>
          <p>
            Add money to your pot to keep it separate from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </p>

          <div className="flex justify-center items-center flex-col w-full pb-3">
            <div className="flex justify-between items-center w-full my-4  cursor-pointer">
              <p className="text-gray-400">New Amount</p>
              <h2 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">
                ${Number(singularPotData.amountSaved) + Number(newAddAmount)}
              </h2>
            </div>

            <ProgressBar
              completed={newAddAmount}
              maxCompleted={Number(singularPotData.target)}
              bgColor={singularPotData.colorCode}
              height=".7rem"
              animateOnRender={true}
              labelColor={singularPotData.colorCode}
              className="w-full my-4"
            />

            <div className="flex justify-between items-center w-full">
              <p
                className="font-semibold "
                style={{ color: singularPotData.colorCode }}
              >
                {Math.ceil(
                  ((Number(singularPotData.amountSaved) +
                    Number(newAddAmount)) /
                    singularPotData.target) *
                    100
                )}
                %
              </p>
              <h2 className="text-[clamp(.8rem,3vw,.9rem)]">
                target of ${singularPotData.target}
              </h2>
            </div>
          </div>
          <label
            htmlFor="potName"
            className="w-full mb-2 font-bold text-gray text-[.8rem]"
          >
            Add Amount
          </label>
          <input
            type="number"
            name="potName"
            maxLength={30}
            className="w-full mb-2 border-1 border-blue-400 py-3 px-2 rounded-[.5rem] outline-0"
            placeholder="$ 0"
            value={newAddAmount}
            required
            onChange={(e) => {
              setnewAddAmount(e.target.value);
            }}
          />

          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            Add Money
          </button>
        </form>
      </div>

      {/* withdraw money form */}
      <div
        className={`  ${
          withdrawModalVisibiliy ? "flex " : "hidden "
        }  w-full h-full bg-[rgba(99,94,112,0.08)] absolute z-10 top-0  justify-center items-center px-10 `}
      >
        <form
          className={`bg-white py-5 rounded-[.5rem] w-full px-4 lg:w-[40%]   justify-center items-center flex-col flex fixed top-20 lg:right-[25%]`}
          onSubmit={handlePotAmounWithdraw}
        >
          <div className="w-full flex justify-between items-center mb-2">
            <h1 className="font-bold text-[clamp(1.2rem,3vw,1.5rem)]">
              Withdraw from ‘Savings’
            </h1>
            <FaTimesCircle
              onClick={() => {
                setWithdrawModalVisibiliy(!withdrawModalVisibiliy);
              }}
              className="text-xl cursor-pointer"
            />
          </div>
          <p>
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </p>

          <div className="flex justify-center items-center flex-col w-full pb-3">
            <div className="flex justify-between items-center w-full my-4  cursor-pointer">
              <p className="text-gray-400">New Amount</p>
              <h2 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">
                ${Number(singularPotData.amountSaved - Number(withdrawAmount))}
              </h2>
            </div>

            <ProgressBar
              completed={
                Number(singularPotData.amountSaved) - Number(withdrawAmount)
              }
              maxCompleted={Number(singularPotData.target)}
              bgColor={singularPotData.colorCode}
              height=".7rem"
              animateOnRender={true}
              labelColor={singularPotData.colorCode}
              className="w-full my-4 transform-[rotateX(180deg)]"
            />

            <div className="flex justify-between items-center w-full">
              <p
                className={`font-semibold ${
                  Number(singularPotData.amountSaved - withdrawAmount) > 0
                    ? `${singularPotData.colorCode}`
                    : "text-red-500"
                }`}
              >
                {Math.ceil(
                  ((Number(singularPotData.amountSaved) -
                    Number(withdrawAmount)) /
                    singularPotData.target) *
                    100
                )}
                %
              </p>
              <h2 className="text-[clamp(.8rem,3vw,.9rem)]">
                target of ${singularPotData.target}
              </h2>
            </div>
          </div>
          <label
            htmlFor="potName"
            className="w-full mb-2 font-bold text-gray text-[.8rem]"
          >
            Withdraw Amount
          </label>
          <input
            type="number"
            name="potName"
            maxLength={30}
            className="w-full mb-2 border-1 border-blue-400 py-3 px-2 rounded-[.5rem] outline-0"
            placeholder="$ 0"
            value={withdrawAmount}
            required
            onChange={(e) => {
              setWithdrawAmount(e.target.value);
            }}
          />

          <button className="bg-main-accent-dark px-3 py-2 rounded-[.5rem] w-full cursor-pointer hover:brightness-75 text-white ">
            <FaPlus className="inline-block mr-2 mb-1 " />
            Withdraw Money
          </button>
        </form>
      </div>
    </section>
  );
};

export default PotsPage;
