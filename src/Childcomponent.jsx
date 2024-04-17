// // ChildComponent.js
// import  { useContext } from "react";
// import { DataContext } from "./apicontext";

// function ChildComponent() {
//   const { state, loading } = useContext(DataContext);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {state.map((user) => (
//         <div key={user.id}>{user.name}</div>
//       ))}
//     </div>
//   );
// }

// export default ChildComponent;
