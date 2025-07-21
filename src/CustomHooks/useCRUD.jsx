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
  };
};

export default useCRUD;
