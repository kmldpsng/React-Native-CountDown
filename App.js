import React from "react";
import { createStackNavigator } from "react-navigation";
import EventList from "./EventList";
import EventForm from "./EventForm";
import EventDetail from "./EventDetail";

export default createStackNavigator({
  list:{
    screen: EventList,
    navigationOptions: () => ({
title: 'My Events'
    })
  },
  form:{
    screen: EventForm,
    navigationOptions: () => ({
title: 'Add an Event'
    })

  },
  detail:{
    screen: EventDetail,
    navigationOptions: () =>({
      title: 'Event Detail'
    })
  }
})

// export default class App extends React.Component {
//   render() {
//     return (
//       <EventList />
//     );
//   }
// }
