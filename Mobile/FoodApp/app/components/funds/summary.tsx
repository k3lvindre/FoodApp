import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

export default function Summary() {
  const [summary, setSummary] = useState(null);


// what is being called first the if statement or useeffect?

// The useEffect and the if statement are executed in different contexts, but here's the order of operations:

// Initial Render:

// When the component first renders, the useEffect has not yet run, and the summary state is still null (its initial value from useState(null)).
// The if (!summary) condition is checked during this render, and since summary is null, the if block executes, rendering the "Loading summary..." message.
// useEffect Execution:

// After the initial render completes, React runs the useEffect hook because the dependency array ([]) indicates it should run once when the component mounts.
// Inside the useEffect, the fetchSummary function is called, which fetches the data from the API and updates the summary state using setSummary(data).
// Re-render:

// When setSummary(data) is called, it updates the summary state, triggering a re-render of the component.
// During this re-render, the if (!summary) condition is checked again. This time, since summary is no longer null, the if block is skipped, and the main content (the funds summary) is rendered.
// Summary:
// The if statement is evaluated first during the initial render.
// The useEffect runs after the initial render to fetch the data.
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch("http://192.168.254.100:5114/api/funds/summary");
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch summary");
      }
    };

    fetchSummary();
  }, []);

  if (!summary) {
    return (
      <View style={styles.container}>
        <Text>Loading summary...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Funds Summary</Text>
      <Text>Total Chizlog Funds: {summary.totalChizlogFunds}</Text>
      <Text>Total GCash Funds: {summary.totalGcashFunds}</Text>
      <Text>Total Print Funds: {summary.totalPrintFunds}</Text>
      <Text>Total Chizlog Sales: {summary.totalChizlogSales}</Text>
      <Text>Total GCash Sales: {summary.totalGcashSales}</Text>
      <Text>Total Print Sales: {summary.totalPrintSales}</Text>
      <Text>Total Chizlog Revenue: {summary.totalChizlogRevenue}</Text>
      <Text>Total GCash Revenue: {summary.totalGcashRevenue}</Text>
      <Text>Total Print Revenue: {summary.totalPrintRevenue}</Text>
      <Text>Total Sales: {summary.totalSales}</Text>
      <Text>Total Funds: {summary.totalFunds}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});