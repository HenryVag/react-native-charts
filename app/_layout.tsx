import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({ Poppins_400Regular });
  return <Stack />;
}
