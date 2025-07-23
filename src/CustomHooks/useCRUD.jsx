import React, { useEffect, useState } from "react";
import axios from "axios";

const useCRUD = () => {
  const [budgetData, setBudgetData] = useState({});
  const [budgetItem, setbudgetItem] = useState({});
  const [TransactionItem, setTransactionData] = useState({});
  const [isTransactionsLoading, setIsTransactionsLoading] = useState(true);
  const [isBudgetsLoading, setIsBudgetsLoading] = useState(true);

  const [PotsData, setPotsData] = useState({});
  const [isPotsLoading, setIsPotsLoading] = useState(true);

  const fetchBudgetData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/Budgets",
        responseType: "json",
      });

      setBudgetData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsBudgetsLoading(false);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/Transactions",
        responseType: "json",
      });

      setTransactionData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTransactionsLoading(false);
    }
  };

  const fetchPotsData = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "/api/Pots",
        responseType: "json",
      });

      setPotsData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPotsLoading(false);
    }
  };

  const postBudgetData = async (newBudgetItem) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/Budgets",
        data: newBudgetItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const postTransactionData = async (newTransactionItem) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/Transactions",
        data: newTransactionItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const postPotsData = async (newPotsItem) => {
    try {
      const res = await axios({
        method: "post",
        url: "/api/Pots",
        data: newPotsItem,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const putPotAmount = async (upDatedData) => {
    try {
      const res = await axios({
        method: "patch",
        url: `/api/Pots/${upDatedData.id}`,
        data: { amountSaved: upDatedData.amountSaved },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const withDrawFromPot = async (upDatedAmount) => {
    try {
      const res = await axios({
        method: "patch",
        url: `/api/Pots/${upDatedAmount.id}`,
        data: { amountSaved: upDatedAmount.amountSaved },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deletePot = async (potId) => {
    try {
      const res = await axios({
        method: "delete",
        url: `/api/Pots/${potId}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editPot = async (newPotData) => {
    try {
      const res = await axios({
        method: "put",
        url: `/api/Pots/${newPotData.id}`,
        data: {
          id: newPotData.id,
          potName: newPotData.potName,
          target: newPotData.target,
          colorCode: newPotData.colorCode,
          amountSaved: newPotData.amountSaved,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBudgetData();
    fetchTransactionData();
    fetchPotsData();
  }, []);
  return {
    budgetData,
    setbudgetItem,
    postBudgetData,
    budgetItem,
    TransactionItem,
    postTransactionData,
    isTransactionsLoading,
    isBudgetsLoading,
    postPotsData,
    PotsData,
    isPotsLoading,
    putPotAmount,
    withDrawFromPot,
    deletePot,
    editPot,
  };
};

export default useCRUD;
