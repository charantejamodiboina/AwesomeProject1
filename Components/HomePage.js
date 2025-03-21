import React, { useEffect, useState } from "react";
import { View, useWindowDimensions } from 'react-native';
import { TabBar, TabView, SceneMap } from 'react-native-tab-view';
import AssignedTab from "./Status1";
import ReadyToPick from "./Status2";
import OutForDelivery from "./Status3";
import Delivered from "./Status4";
import { useTheme } from "./Color";
import { useAuth } from "./Auth";
import axios from "axios";




const Home = () => {
  const colors = useTheme()
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([])
  const token = useAuth()
  
  const [error, setError] = useState(null)
  useEffect(()=>{
    const fetchdata = async() => {
        try {
          const res = await axios.get("https://admin.shopersbay.com/asapi/getStatusItems",
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            }
          )
          console.log(res.data.data)
          setItems(res.data.data)
        } catch (error) {
          setError("something went wrong")
        }
    }
    fetchdata()
  },[token])

  const routes = items.map((item, index) => ({
    key : `status ${index}`,
    title : item.status,
    
  }))
  
  const renderScene = SceneMap({
    "status 0": AssignedTab,
    "status 1": ReadyToPick,
    "status 2" : OutForDelivery,
    "status 3" : Delivered,
  });
  
  
const renderTabbar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'white' }}
    style={{ backgroundColor: colors.Primary }}
  />
)
  return (
    <TabView
    renderTabBar={renderTabbar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}



export default Home;
