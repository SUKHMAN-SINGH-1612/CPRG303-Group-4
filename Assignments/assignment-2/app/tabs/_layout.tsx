import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="calgary" options={{ title: "Calgary" }} />
      <Tabs.Screen name="edmonton" options={{ title: "Edmonton" }} />
    </Tabs>
  );
}
