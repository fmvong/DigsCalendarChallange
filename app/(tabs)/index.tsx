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
          (() => {
            const allMonths = Array.from({ length: 12 }, (_, i) => i + 1);
            return allMonths.map((monthNumber) => {
              const calendarItem = paternsList.calendar.find(
                (item) => item.month === monthNumber
              );
              return (
                <React.Fragment key={monthNumber}>
                  <Text style={[styles.dateTitle]}>
                    {getMonthName(monthNumber)}{" "}
                    {calendarItem
                      ? calendarItem.year
                      : new Date().getFullYear()}
                  </Text>
                  {calendarItem ? (
                    <MonthItems
                      actions={calendarItem.actions}
                      customer={paternsList.customer}
                    />
                  ) : (
                    <View style={[styles.noDataContainer]}>
                      <Text style={[styles.noDataText]}>
                        No Maintenance Scheduled
                      </Text>
                    </View>
                  )}
                </React.Fragment>
              );
            });
          })()}
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
});
