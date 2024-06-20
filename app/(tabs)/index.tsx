import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import CardsService, { Subscription } from "@/services/CardsService";
import { useEffect, useState } from "react";
import MonthItems from "@/components/MonthItems";
import React from "react";

export default function Calendar() {
  const [paternsList, setPaternsList] = useState<Subscription>();

  const getCardsList = async () => {
    try {
      var result = await CardsService.getCards();
      if (result != null) {
        result.calendar.sort((a, b) => {
          if (a.year === b.year) {
            return a.month - b.month;
          }
          return a.year - b.year;
        });
        setPaternsList(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function getMonthName(monthNumber: number): string {
    const monthNames: string[] = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[monthNumber - 1];
  }

  useEffect(() => {
    getCardsList();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.title]}>Calendar</Text>
      <ScrollView>
        {paternsList &&
          paternsList.calendar.map((item) => (
            <View>
              <Text style={[styles.dateTitle]}>
                {getMonthName(item.month)} {item.year}
              </Text>
              {item.actions.length > 0 ? (
                <MonthItems
                  actions={item.actions}
                  customer={paternsList.customer}
                />
              ) : (
                <View style={[styles.noDataContainer]}>
                  <Text style={[styles.noDataText]}>
                    No Maintenance Scheduled
                  </Text>
                </View>
              )}
            </View>
          ))}
        <View style={[styles.space]}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "bold",
    marginVertical: 28,
    textShadowColor: "#DCDCDC",
    textShadowOffset: { width: -1, height: 2 },
    textShadowRadius: 1,
  },
  dateTitle: {
    marginVertical: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  noDataContainer: {
    backgroundColor: "#848FA5",
    borderRadius: 4,
    marginLeft: "10%",
    flex: 1,
  },
  noDataText: {
    color: "#FFFFFF",
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  space: {
    height: 100,
  },
});
