import React, { useState, useEffect } from "react";
import { BASE_URL } from '../../constants/api';
import { View, Text, StyleSheet, Alert, ScrollView, ActivityIndicator } from "react-native";

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
        const response = await fetch(`${BASE_URL}/funds/summary`);
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
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#1976d2" />
        <Text style={styles.loadingText}>Loading summary...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Funds Summary</Text>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Funds</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Chizlog Funds:</Text>
            <Text style={styles.value}>${summary.totalChizlogFunds.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>GCash Funds:</Text>
            <Text style={styles.value}>${summary.totalGcashFunds.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Print Funds:</Text>
            <Text style={styles.value}>${summary.totalPrintFunds.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total Funds:</Text>
            <Text style={styles.totalValue}>${summary.totalFunds.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Sales</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Chizlog Sales:</Text>
            <Text style={styles.value}>${summary.totalChizlogSales.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>GCash Sales:</Text>
            <Text style={styles.value}>${summary.totalGcashSales.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Print Sales:</Text>
            <Text style={styles.value}>${summary.totalPrintSales.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalLabel}>Total Sales:</Text>
            <Text style={styles.totalValue}>${summary.totalSales.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.cardSection}>
          <Text style={styles.sectionTitle}>Revenue</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Chizlog Revenue:</Text>
            <Text style={styles.value}>${summary.totalChizlogRevenue.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>GCash Revenue:</Text>
            <Text style={styles.value}>${summary.totalGcashRevenue.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.label}>Print Revenue:</Text>
            <Text style={styles.value}>${summary.totalPrintRevenue.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  cardSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    width: '100%',
    maxWidth: 480,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalItem: {
    marginTop: 8,
    borderBottomWidth: 0,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});