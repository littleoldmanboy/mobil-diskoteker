import { createClient } from "@/prismicio";
import HeaderClient from "./HeaderClient";

export default async function Header() {
    const client = createClient();
    const settings = await client.getSingle("settings");

    return (
        <HeaderClient navigation={settings.data.navigation} />
    );
}
