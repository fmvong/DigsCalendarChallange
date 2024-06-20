import { Tabs } from "expo-router";
import React from "react";
import { CalendarIcon } from "react-native-heroicons/outline";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#00B47D",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 8,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          gap: 4,
          paddingBottom: 20,
          paddingTop: 20,
          height: 80,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <CalendarIcon color={"#00B47D"} />
          ),
        }}
      />
    </Tabs>
  );
}
