import React from 'react';

const UserContext = React.createContext();

export const UserProvider = UserContext.Provider;

export default UserContext;

// Creates a Context object
// A context object as the name states is a data type of an object that can be used to store information that can be shared to other components within the app
// The context object is a different approach to passing information between components and allows easier access by avoiding the use of prop-drilling
// The "Provider" component allows other components to consume/use the context object and supply the necessary information needed to the context object