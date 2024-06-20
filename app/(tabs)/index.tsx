import { Alert, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import CardsService, { Subscription } from "@/services/CardsService";
import { useEffect, useState } from "react";
import MonthItems from "@/components/MonthItems";
import { CheckCircleIcon } from "react-native-heroicons/solid";

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
        {paternsList?.calendar &&
          paternsList?.calendar.length > 0 &&
          paternsList.calendar.map((item, index) => (
            <>
              <Text style={[styles.dateTitle]}>
                {getMonthName(item.month)} {item.year}
              </Text>
              <MonthItems
                actions={item.actions}
                customer={paternsList.customer}
                status={paternsList.status}
              ></MonthItems>
            </>
          ))}
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
});
