import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";

const App = () => {
  const [connectionStatus, setConnectionStatus] = useState(null);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      // Try fetching data from a simple table or making any valid API request
      const { data, error } = await supabase
        .from("example")
        .select("*")
        .limit(1);

      if (error) {
        console.error("Supabase connection failed:", error);
        setConnectionStatus("Failed to connect to Supabase");
      } else {
        console.log("Supabase is connected:", data);
        setConnectionStatus("Successfully connected to Supabase");
      }
    };

    checkSupabaseConnection();
  }, []);

  return (
    <div>
      <h1>Supabase Connection Status</h1>
      <p>{connectionStatus || "Checking connection..."}</p>
    </div>
  );
};

export default App;
