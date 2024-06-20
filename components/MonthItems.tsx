import { Action, Customer } from "@/services/CardsService";
import { View, Text, StyleSheet } from "react-native";
import { MapPinIcon, CheckCircleIcon } from "react-native-heroicons/solid";
import { ClockIcon } from "react-native-heroicons/outline";

type CardProps = {
  actions: Action[];
  customer: Customer;
  status: string;
};

const MonthItems: React.FC<CardProps> = (props) => {
  const { actions, customer, status } = props;

  function getDayAbbreviation(dateStr: string): string {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const dateObj = new Date(dateStr);
    const dayIndex = dateObj.getDay(); // getDay() returns 0-based day index
    const dayName = dayNames[dayIndex];

    return dayName.slice(0, 3).toUpperCase();
  }

  return (
    <View>
      {actions.map((item, index) => (
        <View style={[styles.rowContainer]}>
          {item.status === "Unscheduled" && (
            <View style={[styles.dateContainer]}>
              <Text style={[styles.dayName]}>TBD</Text>
            </View>
          )}
          {item.status !== "Unscheduled" && item.scheduledDate && (
            <View style={[styles.dateContainer]}>
              <Text style={[styles.dayName]}>
                {getDayAbbreviation(item.scheduledDate)}
              </Text>
              <Text style={[styles.dayNumber]}>
                {new Date(item.scheduledDate).getDate()}
              </Text>
              {item.status === "Completed" && (
                <CheckCircleIcon color={"#00B47D"} />
              )}
              {item.status === "Scheduled" && <ClockIcon color={"#00B47D"} />}
            </View>
          )}
          <View
            style={[
              styles.container,
              {
                backgroundColor:
                  item.status === "Completed"
                    ? "#00B47D"
                    : item.status === "Scheduled"
                    ? "#006A4B"
                    : "#011638",
              },
            ]}
          >
            <Text style={[styles.title]}>{item.name}</Text>
            <Text style={[styles.lightText]}>{item.vendor?.vendorName}</Text>
            <Text style={[styles.phoneText]}>{item.vendor?.phoneNumber}</Text>
            <View style={[styles.addressContainer]}>
              <MapPinIcon color={"#fff"} size={16} />
              <Text style={[styles.lightText]}>{customer.street}</Text>
            </View>
            <Text style={[styles.lightText]}>{item.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MonthItems;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00B47D",
    borderRadius: 4,
    paddingTop: 9,
    paddingBottom: 14,
    paddingHorizontal: 16,
    marginBottom: 5,
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 1,
  },
  lightText: {
    color: "#fff",
    fontSize: 12,
  },
  phoneText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 10,
  },
  dateContainer: {
    alignItems: "center",
    gap: 2,
    width: "8%",
  },
  dayName: {
    fontSize: 9,
    fontWeight: "black",
    opacity: 0.6,
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "bold",
    opacity: 0.8,
  },
});
